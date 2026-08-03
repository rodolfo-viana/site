+++
title = "Notes on Mamba"
description = "An annotated reading of three papers on selective state space models: Mamba, Mamba-2's SSD duality, and Mamba-3's refinements"
date = "2026-06-23"
weight = 1

[taxonomies]
tags=["machine learning", "sequence models", "state space models", "mamba"]

[extra]
math = true
toc = true

+++

# Why these notes

I've been studying SSMs and Mamba for my master's dissertation, and taking notes along the way. The main purpose of this text is to consolidate those readings.

And why study SSMs and Mamba? Efficiency. The attention mechanism[^1] processes a sequence of length \\(L\\) by comparing every position against every other, which costs \\(\mathcal{O}(L^2)\\) in time and memory and makes very long contexts prohibitive. State space models (SSMs) offer an \\(\mathcal{O}(L)\\) alternative, but historically paid for that saving with a loss of content-dependent reasoning. The three papers below tell the story of how that gap was progressively closed:

1. **Mamba**[^2] introduces _selection_ &mdash; letting the SSM's parameters depend on the input &mdash; along with a hardware-aware scan algorithm that keeps the cost linear.
2. **Mamba-2**[^3] reveals that SSMs and attention are two faces of the same operation on structured matrices (_structured state space duality_, or SSD), and uses that equivalence to build an algorithm 2 to 8 times faster.
3. **Mamba-3**[^4] refines the recurrence with three principles drawn from SSM theory: trapezoidal discretization, complex states, and a multi-input multi-output (MIMO) formulation.

# Preliminaries: the state space model

An SSM, in its continuous form, is a linear system mapping an input signal \\(x(t) \in \mathbb{R}\\) to an output \\(y(t) \in \mathbb{R}\\) through a latent state \\(h(t) \in \mathbb{R}^{N}\\):

\\[
\begin{aligned}
h'(t) &= \mathbf{A}\,h(t) + \mathbf{B}\,x(t) \\\\
y(t) &= \mathbf{C}^\top h(t)
\end{aligned}
\\]

where \\(\mathbf{A} \in \mathbb{R}^{N \times N}\\) governs the state dynamics, \\(\mathbf{B} \in \mathbb{R}^{N}\\) injects the input, and \\(\mathbf{C} \in \mathbb{R}^{N}\\) projects the state onto the output. The state size \\(N\\) is the model's "memory": everything the sequence has seen up to time \\(t\\) must fit inside \\(h(t)\\).

To operate on discrete sequences, the system is discretized with a step \\(\Delta\\). Zero-order hold (ZOH) discretization, which assumes the input is constant within each interval \\(\Delta\\), yields

\\[
\begin{aligned}
\bar{\mathbf{A}} &= \exp(\Delta \mathbf{A}) \\\\
\bar{\mathbf{B}} &= (\Delta \mathbf{A})^{-1}\bigl(\exp(\Delta \mathbf{A}) - \mathbf{I}\bigr)\cdot \Delta \mathbf{B}
\end{aligned}
\\]

so that the discrete recurrence becomes

\\[
\begin{aligned}
h\_t &= \bar{\mathbf{A}}\,h\_{t-1} + \bar{\mathbf{B}}\,x\_t \\\\
y\_t &= \mathbf{C}^\top h\_t
\end{aligned}
\\]

One caveat worth recording right away, because it resurfaces in the Mamba-3 section: the Mamba-1 and Mamba-2 implementations do **not** use the full expression for \\(\bar{\mathbf{B}}\\) above. They adopt the first-order approximation \\(\bar{\mathbf{B}}\_t \approx \Delta\_t \mathbf{B}\_t\\), which is what you get by solving the exponential part of the transition analytically and approximating the input integral with an Euler rule at the right endpoint. That is precisely the rule Mamba-3 names _exponential-Euler_ and then generalizes.

There is, here, a duality that underpins the whole SSM literature. If \\(\bar{\mathbf{A}}, \bar{\mathbf{B}}, \mathbf{C}\\) are fixed &mdash; that is, if the system is linear time-invariant (LTI) &mdash; then unrolling the recurrence shows that \\(y\\) is a **convolution** of \\(x\\) with a fixed kernel:

\\[
y\_t = \sum\_{k=0}^{t} \mathbf{C}^\top \bar{\mathbf{A}}^{k}\,\bar{\mathbf{B}}\;x\_{t-k} \quad\Longleftrightarrow\quad y = \bar{\mathbf{K}} \ast x, \qquad \bar{\mathbf{K}} = (\mathbf{C}^\top\bar{\mathbf{B}}, \mathbf{C}^\top\bar{\mathbf{A}}\bar{\mathbf{B}}, \dots, \mathbf{C}^\top\bar{\mathbf{A}}^{L-1}\bar{\mathbf{B}})
\\]

This equivalence is the key to the performance of S4 models[^5]: you can **train** in convolutional mode, parallelizing across the whole sequence with the Fourier transform, and **infer** in recurrent mode, generating one token at a time with constant-size state. The price, however, is that the kernel \\(\bar{\mathbf{K}}\\) is the same for the entire sequence: the model cannot treat one token differently from another based on its content. That is exactly the limitation Mamba attacks.

The equivalence is easy to check numerically. With \\(\mathbf{A}\\) diagonal, the two paths &mdash; stepping through the recurrence or building the kernel and convolving &mdash; should agree to floating-point error:

```python
import numpy as np


def discretize_zoh(A: np.ndarray, B: np.ndarray, delta: float):
    """ZOH for a diagonal SSM. A is the diagonal vector, with negative entries."""
    A_bar = np.exp(delta * A)
    # (ΔA)^{-1}(exp(ΔA) − I)·ΔB  simplifies to  A^{-1}(exp(ΔA) − I)B
    B_bar = (A_bar - 1.0) / A * B
    return A_bar, B_bar


def via_recurrence(A_bar, B_bar, C, x):
    """Recurrent mode: h_t = Ā h_{t-1} + B̄ x_t,  y_t = Cᵀ h_t."""
    h = np.zeros_like(A_bar)
    y = np.empty(len(x))
    for t, x_t in enumerate(x):
        h = A_bar * h + B_bar * x_t
        y[t] = C @ h
    return y


def via_convolution(A_bar, B_bar, C, x):
    """Convolutional mode: y = K̄ ∗ x, with K̄_k = Cᵀ Ā^k B̄. Only valid in the LTI case."""
    L = len(x)
    K = np.array([C @ (A_bar**k * B_bar) for k in range(L)])
    return np.convolve(x, K)[:L]


rng = np.random.default_rng(0)
N, L = 8, 64
A = -np.exp(rng.normal(size=N))  # negative real eigenvalues
B, C = rng.normal(size=N), rng.normal(size=N)
x = rng.normal(size=L)

A_bar, B_bar = discretize_zoh(A, B, delta=0.1)
y_rec = via_recurrence(A_bar, B_bar, C, x)
y_conv = via_convolution(A_bar, B_bar, C, x)

print(f"{np.abs(y_rec - y_conv).max():.2e}")  # -> 1.67e-16
```

What breaks this equality, as we'll see, is precisely making \\(\bar{\mathbf{A}}\\), \\(\bar{\mathbf{B}}\\) and \\(\mathbf{C}\\) depend on \\(t\\): with no fixed kernel, there is no convolution to perform.

# Mamba: selection as a mechanism

## The limitation of time-invariant SSMs

Gu and Dao's paper[^2] starts from an observation about simple synthetic tasks, such as selective copying and induction heads. Solving them requires _ignoring_ irrelevant tokens and _remembering_ the relevant ones &mdash; that is, content-dependent behaviour. An LTI SSM cannot do this: since \\(\bar{\mathbf{A}}, \bar{\mathbf{B}}, \mathbf{C}\\) do not depend on the input, the model compresses context uniformly, without deciding what to retain. Attention, by contrast, solves these tasks trivially, because it compares contents &mdash; but at quadratic cost.

The paper's question is therefore: can an SSM be given content-dependent selection without giving up linear cost?

## The selection mechanism (S6)

The answer is to let the parameters vary with the input. In the selective SSM &mdash; named S6, being an S4 with a selection mechanism &mdash; the parameters stop being constants and become functions of the token \\(x\_t\\):

\\[
\begin{aligned}
\mathbf{B}\_t &= \text{Linear}\_B(x\_t) \\\\
\mathbf{C}\_t &= \text{Linear}\_C(x\_t) \\\\
\Delta\_t &= \text{softplus}\bigl(\text{Linear}\_\Delta(x\_t) + \text{bias}\bigr)
\end{aligned}
\\]

The matrix \\(\mathbf{A}\\) stays input-independent, but because it is discretized by \\(\Delta\_t\\), the effective transition \\(\bar{\mathbf{A}}\_t = \exp(\Delta\_t \mathbf{A})\\) also comes to depend on the input. In practice \\(\mathbf{A}\\) is kept diagonal and parameterized as \\(\mathbf{A} = -\exp(\mathbf{A}\_{\log})\\), which guarantees negative real eigenvalues and therefore stable, contractive dynamics. The recurrence becomes time-varying:

\\[
\begin{aligned}
h\_t &= \bar{\mathbf{A}}\_t\,h\_{t-1} + \bar{\mathbf{B}}\_t\,x\_t \\\\
y\_t &= \mathbf{C}\_t^\top h\_t
\end{aligned}
\\]

The role of \\(\Delta\_t\\) deserves emphasis, because it is the heart of selection. It can be read as a gate: a large \\(\Delta\_t\\) drives \\(\bar{\mathbf{A}}\_t \to 0\\) and lets \\(\bar{\mathbf{B}}\_t\\) dominate, so the state is "reset" and focuses on the current token; a small \\(\Delta\_t\\) drives \\(\bar{\mathbf{A}}\_t \to \mathbf{I}\\) and \\(\bar{\mathbf{B}}\_t \to 0\\), so the current token is ignored and the state is preserved. The model learns, token by token, how much attention to pay to each input &mdash; and it is in this sense that selection generalizes the gating mechanisms of classical RNNs.

Both regimes are evident in a single isolated step of the recurrence. Starting from a state \\(h = \mathbf{1}\\) and feeding \\(x\_t = 1\\):

```python
import numpy as np


def selective_step(h, x_t, A, B_t, delta_t):
    """One S6 step. Note that Δ_t enters both Ā_t and B̄_t at once."""
    A_bar = np.exp(delta_t * A)  # → 0 if Δ is large; → 1 if Δ is small
    B_bar = delta_t * B_t        # → 0 if Δ is small
    return A_bar * h + B_bar * x_t


A = -np.ones(4)  # fixed, negative transition
B_t = np.ones(4)
h = np.ones(4)   # whatever the model has accumulated so far

for delta_t in (5.0, 0.01):
    A_bar = np.exp(delta_t * A)
    h_new = selective_step(h, 1.0, A, B_t, delta_t)
    print(f"Δ={delta_t:<5} Ā={A_bar[0]:.4f}  B̄={delta_t:.4f}  h={h_new[0]:.4f}")

# Δ=5.0   Ā=0.0067  B̄=5.0000  h=5.0067   <- forgets the past, absorbs the token
# Δ=0.01  Ā=0.9900  B̄=0.0100  h=1.0000   <- preserves the past, ignores the token
```

With \\(\Delta\_t = 5\\), the previous state all but vanishes (\\(\bar{\mathbf{A}}\_t \approx 0.007\\)) and the new state is essentially the current token. With \\(\Delta\_t = 0.01\\), the state survives nearly intact and the token's contribution is negligible. It is this continuous, content-dependent on-off behaviour that an LTI SSM has no way of expressing.

## The hardware-aware parallel scan

Selection has a cost: by making the parameters input-dependent, the model loses the LTI property and, with it, the equivalence to convolution. There is no longer a fixed kernel \\(\bar{\mathbf{K}}\\) to apply via Fourier; what remains is the recurrence, which is sequential by nature.

The paper's solution is to compute the recurrence as a **parallel associative scan**. The recurrence \\(h\_t = \bar{\mathbf{A}}\_t h\_{t-1} + \bar{\mathbf{B}}\_t x\_t\\) is an associative operation over the pairs \\((\bar{\mathbf{A}}\_t, \bar{\mathbf{B}}\_t x\_t)\\), and associative scans admit parallel algorithms in \\(\mathcal{O}(\log L)\\) steps[^6]. On top of that, the paper adds three hardware-aware engineering decisions:

- **Kernel fusion**: the discretized parameters are materialized in the GPU's fast memory (SRAM) rather than main memory (HBM), avoiding the traffic that would dominate runtime.
- **Scanning without materializing the expanded state**: the \\(N\\)-dimensional state is kept in SRAM and only the output is written back.
- **Recomputation**: intermediate states are not stored for the backward pass but recomputed, trading memory for operations &mdash; which pays off on modern GPUs.

The result is a selective SSM that scales linearly in \\(L\\), generates tokens with constant-size state and reaches, according to the paper, roughly five times the inference throughput of a comparable Transformer.

## The Mamba block

The final architecture is deliberately simple. Instead of alternating attention blocks and multilayer perceptron (MLP) blocks the way a Transformer does, Mamba stacks a single homogeneous block. That block combines, on one path, a projection that expands the dimension, a short depthwise convolution (capturing local context before the scan), a SiLU activation and the selective SSM; in parallel, a second path supplies a multiplicative gate (in the spirit of the Gated Linear Unit). The outputs of the two paths are combined and projected back to the original dimension. With no attention and no MLP, all sequence processing falls to the selective SSM &mdash; which gives the architecture its economy and its elegance.

{% mermaid() %}

flowchart TB
    x["Input"] --> inproj["Input projection"]
    inproj -->|"x branch"| conv["Short depthwise convolution"]
    conv --> act["SiLU"]
    act --> ssm["Selective SSM (S6)"]
    inproj -->|"z branch (gate)"| gate["SiLU"]
    ssm --> mul["⊙ multiply"]
    gate --> mul
    mul --> outproj["Output projection"]
    outproj --> y["Output"]

{% end %}

# Mamba-2: structured state space duality

The second paper[^3], by Dao and Gu, is more theoretical and, in a sense, more ambitious: it explains _why_ Mamba works, placing it in a framework that also contains attention. The thesis, announced in the title itself &mdash; "Transformers are SSMs" &mdash; is that the two architectures are different factorizations of the same mathematical object.

## SSMs as semiseparable matrices

The starting point is to write the SSM not as a recurrence but as a single matrix transformation. Unrolling the recurrence (with time-varying \\(\mathbf{A}\_t\\)), each output is

\\[
y\_j = \sum\_{i \le j} \mathbf{C}\_j^\top \bigl(\bar{\mathbf{A}}\_j \bar{\mathbf{A}}\_{j-1}\cdots \bar{\mathbf{A}}\_{i+1}\bigr)\bar{\mathbf{B}}\_i\,x\_i
\\]

that is, \\(y = \mathbf{M}x\\), where \\(\mathbf{M}\\) is the lower-triangular matrix with entries

\\[
\mathbf{M}\_{ji} = \mathbf{C}\_j^\top \bar{\mathbf{A}}\_{j:i}\,\bar{\mathbf{B}}\_i, \qquad \bar{\mathbf{A}}\_{j:i} = \prod\_{k=i+1}^{j}\bar{\mathbf{A}}\_k
\\]

Matrices of this form are called **semiseparable** (more precisely, sequentially \\(N\\)-semiseparable): any submatrix entirely contained in the lower triangle has rank at most \\(N\\). This structure is what allows \\(y = \mathbf{M}x\\) to be computed in linear time, despite \\(\mathbf{M}\\) being an \\(L \times L\\) matrix.

## The dual form: masked attention

Mamba-2's decisive architectural choice is to restrict \\(\mathbf{A}\_t\\) to a **scalar times the identity**, \\(\bar{\mathbf{A}}\_t = a\_t \mathbf{I}\\). With that, the product of transitions becomes a product of scalars, and the matrix \\(\mathbf{M}\\) factors remarkably:

\\[
\mathbf{M}\_{ji} = \Bigl(\prod\_{k=i+1}^{j} a\_k\Bigr)\,\mathbf{C}\_j^\top \mathbf{B}\_i = \mathbf{L}\_{ji}\,(\mathbf{C}\_j^\top \mathbf{B}\_i)
\\]

where \\(\mathbf{L}\_{ji} = \prod\_{k=i+1}^{j} a\_k\\) is a lower-triangular matrix of cumulative products. In compact notation,

\\[
\mathbf{M} = \mathbf{L} \circ (\mathbf{C}\,\mathbf{B}^\top)
\\]

where \\(\circ\\) is the Hadamard product. Here is the duality: \\(\mathbf{C}\mathbf{B}^\top\\) plays the role of \\(\mathbf{Q}\mathbf{K}^\top\\) in attention, and \\(\mathbf{L}\\) is a causal mask &mdash; except that, instead of a mask of zeros and ones, it is a _decay_ mask whose entries are cumulative products of \\(a\_k\\). Computing \\(y = (\mathbf{L} \circ \mathbf{C}\mathbf{B}^\top)x\\) directly is precisely a form of masked linear attention, quadratic in \\(L\\). Computing the same thing through the recurrence is the SSM, at linear cost. They are the same function computed along two paths &mdash; **structured state space duality** (SSD).

"Same function, two paths" is a checkable claim. Below, the recurrent form (cost \\(\mathcal{O}(L)\\), state \\(P \times N\\)) and the quadratic form (cost \\(\mathcal{O}(L^2)\\), building the whole \\(L \times L\\) matrix) produce the same output:

```python
import numpy as np


def ssd_recurrent(a, B, C, X):
    """Linear form. State (P, N) updated by outer product, one token at a time."""
    L, P = X.shape
    h = np.zeros((P, B.shape[1]))
    Y = np.empty((L, P))
    for t in range(L):
        h = a[t] * h + np.outer(X[t], B[t])
        Y[t] = h @ C[t]
    return Y


def ssd_quadratic(a, B, C, X):
    """Dual form: Y = (L ∘ C Bᵀ) X, with L_ji = Π_{k=i+1}^{j} a_k."""
    S = np.cumsum(np.log(a))  # cumulative products, in log space, for stability
    mask = np.tril(np.exp(S[:, None] - S[None, :]))
    return (mask * (C @ B.T)) @ X


rng = np.random.default_rng(1)
L, N, P = 32, 16, 8
a = rng.uniform(0.85, 0.99, size=L)  # the scalars Ā_t = a_t I
B, C = rng.normal(size=(L, N)), rng.normal(size=(L, N))
X = rng.normal(size=(L, P))

print(f"{np.abs(ssd_recurrent(a, B, C, X) - ssd_quadratic(a, B, C, X)).max():.2e}")
# -> 9.44e-15
```

It's worth noting what `mask` is: a lower-triangular matrix whose entries decay as \\(j - i\\) grows. Swapping that decay for a mask of zeros and ones gives ordinary causal attention; it is literally the same line of code with a different mask. The SSD algorithm, described next, does not choose between the two paths &mdash; it uses each where it is better.

## The SSD algorithm

The equivalence is not merely conceptual: it yields a better algorithm. The idea is to partition the sequence into chunks and handle each part of the matrix \\(\mathbf{M}\\) with whichever method suits it:

- The **diagonal blocks** &mdash; interactions within a single short chunk &mdash; are computed with the quadratic dual form, which is small and makes good use of the GPU's matrix multiplication units (tensor cores).
- The **off-diagonal blocks** &mdash; the flow of information between chunks &mdash; are computed with the linear recurrent form, propagating a summary state from chunk to chunk.

This "chunkwise" algorithm combines the best of both worlds: attention's efficient parallelization within chunks and the SSM's linear scaling across chunks. In practice it is 2 to 8 times faster than the original Mamba's selective scan, and permits substantially larger states, because the scan's memory bottleneck is relieved. The \\(\mathcal{O}(L)\\) cost is preserved, with far better hardware utilization.

{% mermaid() %}

flowchart TB
    seq["Sequence of length L"] --> split["Partition into chunks"]
    split --> diag["Diagonal blocks<br/>(within chunk):<br/>quadratic dual form, attention-like"]
    split --> off["Off-diagonal blocks<br/>(across chunks):<br/>linear recurrent form, summary state"]
    diag --> comb["Combine"]
    off --> comb
    comb --> out["Output y = M x"]

{% end %}

## Architectural changes

Restricting \\(\mathbf{A}\\) to a scalar makes room for treating the SSM as a form of multi-head attention. Mamba-2 therefore introduces multiple heads and produces \\(\mathbf{B}, \mathbf{C}, \Delta\\) in parallel from the input (rather than sequentially, as in Mamba-1), which improves parallelization and the interaction with tensor parallelism in large-scale training. The result is a simpler, more scalable block, with no loss of language modelling quality.

# Mamba-3: refining state space principles

The third paper[^4], by Lahoti and colleagues, keeps the family's recurrent thread but is not merely a spot adjustment to the previous block. It reorganizes the architecture around a recipe closer to Llama &mdash; alternating Mamba-3 blocks and SwiGLU blocks &mdash; and improves the SSM mechanism on three fronts, each derived from a principle of state space theory. The motivation is inference: since generating tokens with Transformers is expensive, it pays to extract more expressivity from each unit of SSM state without increasing decoding latency, or increasing it very little.

## Trapezoidal recurrence

The first improvement is to change the discretization. Mamba-3 calls the rule used by Mamba-1 and Mamba-2 **exponential-Euler**: after analytically solving the exponential part of the transition, the input integral is approximated by an Euler rule at the right endpoint. This recovers the update

\\[
h\_t = \exp(\Delta\_t A\_t)h\_{t-1} + \Delta\_t B\_t x\_t.
\\]

Mamba-3 replaces that approximation with a **generalized exponential-trapezoidal discretization**. The idea remains causal: the update does not look at \\(x\_{t+1}\\). It mixes the previous and current endpoints of the interval,

\\[
\begin{aligned}
h\_t
&= \exp(\Delta\_t A\_t)h\_{t-1}
   {}+ (1-\lambda\_t)\Delta\_t\exp(\Delta\_t A\_t)B\_{t-1}x\_{t-1}
   {}+ \lambda\_t\Delta\_t B\_t x\_t \\\\
&= \alpha\_t h\_{t-1} + \beta\_t B\_{t-1}x\_{t-1} + \gamma\_t B\_t x\_t,
\end{aligned}
\\]

with

\\[
\alpha\_t = \exp(\Delta\_t A\_t), \qquad
\beta\_t = (1-\lambda\_t)\Delta\_t\exp(\Delta\_t A\_t), \qquad
\gamma\_t = \lambda\_t\Delta\_t.
\\]

When \\(\lambda\_t = 1\\), the rule falls back to the exponential-Euler case. When \\(\lambda\_t = 1/2\\), it recovers the classical trapezoidal rule exactly. In the final model, however, \\(\lambda\_t\\) is learned as a token-dependent gate, \\(\lambda\_t = \sigma(u\_t)\\), with \\(u\_t\\) a linear projection of the current token. For that reason the gain should not be read as literally "parameter-free": there is a small additional parameterization for the gate.

Both limiting cases can be confirmed in a few lines &mdash; with \\(\lambda\_t = 1\\) the two recurrences coincide, and with \\(\lambda\_t = 1/2\\) they diverge:

```python
import numpy as np


def trapezoidal(x, A, B, delta, lam):
    """h_t = α_t h_{t-1} + β_t B_{t-1} x_{t-1} + γ_t B_t x_t."""
    h = np.zeros(A.shape[0])
    H = np.empty((len(x), A.shape[0]))
    v_prev = np.zeros(A.shape[0])  # B_{t-1} x_{t-1}
    for t in range(len(x)):
        alpha = np.exp(delta[t] * A)
        beta = (1.0 - lam[t]) * delta[t] * alpha
        gamma = lam[t] * delta[t]
        v = B[t] * x[t]
        h = alpha * h + beta * v_prev + gamma * v
        H[t], v_prev = h, v
    return H


def exponential_euler(x, A, B, delta):
    """The Mamba-1/-2 rule: h_t = exp(Δ_t A) h_{t-1} + Δ_t B_t x_t."""
    h = np.zeros(A.shape[0])
    H = np.empty((len(x), A.shape[0]))
    for t in range(len(x)):
        h = np.exp(delta[t] * A) * h + delta[t] * B[t] * x[t]
        H[t] = h
    return H


rng = np.random.default_rng(2)
L, N = 24, 6
A = -np.exp(rng.normal(size=N))
B, x = rng.normal(size=(L, N)), rng.normal(size=L)
delta = np.exp(rng.normal(size=L) * 0.3)

euler = exponential_euler(x, A, B, delta)
print(f"λ=1    {np.abs(trapezoidal(x, A, B, delta, np.ones(L)) - euler).max():.2e}")
print(f"λ=1/2  {np.abs(trapezoidal(x, A, B, delta, np.full(L, 0.5)) - euler).max():.2e}")

# λ=1    4.44e-16   <- exactly the Mamba-1/-2 rule
# λ=1/2  1.50e+00   <- classical trapezoidal, genuinely different dynamics
```

The `v_prev` term is the width-two convolution mentioned below: the state now sees the pair \\((B\_{t-1}x\_{t-1},\, B\_t x\_t)\\), not just the current endpoint.

There is an irony here that the paper acknowledges openly. The theoretical motivation for the trapezoidal rule is second-order accuracy, with error \\(\mathcal{O}(\Delta\_t^3)\\) instead of \\(\mathcal{O}(\Delta\_t^2)\\) &mdash; but that guarantee only holds if \\(\lambda\_t = \tfrac{1}{2} + \mathcal{O}(\Delta\_t)\\), and the paper's own ablations indicate that **not** enforcing that constraint works better in practice. The default parameterization therefore gives up the convergence order that motivated the rule, keeping the extra expressivity.

The central point is different: the recurrence now contains a causal width-two convolution over the state-input stream, \\(B\_t x\_t\\), _inside_ the recurrent core &mdash; distinct, therefore, from the usual short convolutions, which are independent operations applied to \\(x\_t\\) _outside_ the recurrence. The paper reports that this, combined with explicit bias terms in \\(\mathbf{B}\\) and \\(\mathbf{C}\\), empirically allows dropping the external short convolution used in Mamba-2.

## Complex states and state tracking

The second improvement attacks a known limitation of SSMs with real transitions. When the effective transition has non-negative real eigenvalues, the state dynamics are essentially scaling: each component grows or decays without rotation. This is useful for associative memory but poor for **state tracking** &mdash; tasks such as counting parity, following modular counters or tracking oscillating states, where the model needs periodic dynamics rather than mere decay.

Mamba-3 introduces **complex-valued states**. Complex eigenvalues correspond to _rotational_ dynamics: the state does not merely decay, it rotates, naturally encoding amplitude and phase. In the implementation, these dynamics can be written as a real SSM with \\(2 \times 2\\) rotation blocks, that is, as a form of data-dependent RoPE applied to the \\(\mathbf{B}\\) and \\(\mathbf{C}\\) projections. This restores the ability to represent periodic and oscillatory patterns and, with it, competence on the state-tracking tasks where real-valued models failed.

## MIMO formulation

The third improvement concerns capacity per unit of state. Mamba-2's SSD form, by restricting \\(\mathbf{A}\\) to a scalar, makes each update effectively **single-input single-output** (SISO): the interaction of \\(\mathbf{B}\_i\\) with \\(\mathbf{C}\_j\\) is rank-one per head. Mamba-3 generalizes to a **multi-input multi-output** (MIMO) formulation, in which the state processes several channels simultaneously and the \\(\mathbf{B}\\) and \\(\mathbf{C}\\) projections produce higher-rank interactions.

The practical effect is to increase expressivity without increasing state size &mdash; and therefore without greatly increasing decoding latency, which is governed largely by the state that must be read and written for each token. Since SSM decoding tends to be memory-movement bound, the MIMO formulation raises arithmetic intensity: it performs more useful multiplications over essentially the same state traffic. The paper reports up to a 4× increase in decoding FLOPs at fixed state size while maintaining wall-clock latency similar to Mamba-2. And in the state-size experiments, Mamba-3 (MIMO) with state size 64 matches the perplexity of Mamba-2 with state size 128 &mdash; **half** the state for the same performance.

# Synthesis

The three improvements are complementary and, combined, push the frontier along three axes: retrieval, state tracking and language modelling. At the 1.5 billion parameter scale, the paper reports that Mamba-3 in its SISO variant beats the next best competing model (Gated DeltaNet) by 0.6 percentage points of accuracy, and that the MIMO variant adds another 1.2 points &mdash; 1.8 points in total over the same baseline, or 1.9 over Mamba-2 &mdash; while preserving the inference efficiency that is the whole family's reason for being. The message is that there was still expressivity to extract from the SSM framework &mdash; it was enough to revisit the discretization, the domain of the eigenvalues and the structure of the projections.

Read in sequence, the three papers form a coherent arc. **Mamba** identified time invariance as the cause of SSMs' weakness on content-dependent tasks and removed it with the selection mechanism, paying the price with a hardware-aware scan algorithm. **Mamba-2** explained that success from a higher vantage point, showing that SSMs and attention are factorizations of the same computation with semiseparable matrices, and converted that duality into a far faster algorithm. **Mamba-3** went back to first principles &mdash; discretization, eigenvalues, rank of the projections &mdash; to squeeze more expressivity out of each unit of state, without compromising inference.

The connecting thread is the permanent tension between two costs: attention's quadratic cost, which gives full expressivity to the exchange of information between positions, and the SSMs' linear cost, which compresses everything into a fixed-size state. The Mamba family is, to a large extent, a sequence of increasingly refined answers to the question of how much of attention's expressivity can be recovered within a linear budget &mdash; and each paper recovers a little more.

# References

[^1]: VASWANI, A.; SHAZEER, N.; PARMAR, N.; USZKOREIT, J.; JONES, L.; GOMEZ, A. N.; KAISER, Ł.; POLOSUKHIN, I. Attention is all you need. In: *Advances in Neural Information Processing Systems*, v. 30, 2017.

[^2]: GU, A.; DAO, T. Mamba: linear-time sequence modeling with selective state spaces. In: *Conference on Language Modeling (COLM)*, 2024. *arXiv preprint arXiv:2312.00752*, 2023.

[^3]: DAO, T.; GU, A. Transformers are SSMs: generalized models and efficient algorithms through structured state space duality. In: *International Conference on Machine Learning (ICML)*, 2024. *arXiv preprint arXiv:2405.21060*.

[^4]: LAHOTI, A.; LI, K. Y.; CHEN, B.; WANG, C.; BICK, A.; KOLTER, J. Z.; DAO, T.; GU, A. Mamba-3: improved sequence modeling using state space principles. In: *International Conference on Learning Representations (ICLR)*, 2026. *arXiv preprint arXiv:2603.15569*.

[^5]: GU, A.; GOEL, K.; RÉ, C. Efficiently modeling long sequences with structured state spaces. In: *International Conference on Learning Representations (ICLR)*, 2022. *arXiv preprint arXiv:2111.00396*.

[^6]: BLELLOCH, G. E. Prefix sums and their applications. *Technical Report CMU-CS-90-190*, School of Computer Science, Carnegie Mellon University, 1990.
