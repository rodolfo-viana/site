# rodolfoviana.com.br

This repository contains the bilingual Portuguese/English Zola site published at `rodolfoviana.com.br`. It uses [Serene](https://github.com/isunjn/serene), pinned and vendored at version 5.6.3 under `themes/serene`, with a small compatibility layer for multilingual navigation and the site's existing rich content.

## Requirements

The site targets Zola 0.22.1, which is also the minimum version required by the pinned Serene release.

- Zola 0.22.1
- No Node.js or package installation is required

Confirm the local version with:

```bash
zola --version
```

## Local preview

Zola serves the site with live reload. Run the command from the repository root and open the printed local URL.

```bash
zola serve
```

## Production build

The production build writes the complete static site to `public/`. This directory is generated and intentionally excluded from version control.

```bash
zola build
```

Expected outputs include:

- `public/index.html` and `public/en/index.html`
- Portuguese and English pages under `public/artigos/`, `public/projetos/`, `public/publicacoes/`, and `public/en/`
- Local images, fonts, videos, icons, JavaScript, and compiled theme CSS

## Content structure

Portuguese is the default language; English translations use Zola's `.en.md` naming convention. Page bundles keep their media next to each `index.md` file so Zola copies the assets to both localized output paths.

- `content/publicacoes/`: posts and notes
- `content/artigos/`: journal-paper metadata shared by the Portuguese and English indexes
- `content/projetos/`: project reports and associated images
- `content/curriculo*.md`: résumé pages
- `content/aulas/`: class-material section
- `static/assets/`: shared video files

New posts and projects inherit Serene's `post.html` presentation from their section. Use `[extra] math = true`, `mermaid = true`, or `d3 = true` only on pages that need those libraries.

Journal papers are records in `content/artigos/papers.toml`, not content pages. Each record supplies the title, journal, ISO publication date, authors, volume, issue, pages, DOI, journal-page URL, and official PDF endpoint. The `papers.html` template sorts records newest-first and generates the BibTeX citation and citation key from those fields, so no separate BibTeX string should be maintained.

## Theme maintenance

Serene is vendored to make GitHub Pages builds reproducible without submodule initialization or network access. Site-specific templates live in the root `templates/` directory and override only the interfaces needed by this site.

To update the theme:

1. Review Serene's release notes for breaking changes.
2. Replace `themes/serene` with the selected tagged release, retaining its `LICENSE`.
3. Compare the upstream templates overridden in the root `templates/` directory.
4. Update the pinned version comment in `config.toml` and this README.
5. Run the verification checklist below.

## Deployment

Pushing to `main` triggers `.github/workflows/main.yml`. The workflow builds with Zola and deploys `public/` to the `gh-pages` branch with the custom domain from `static/CNAME`.

## Verification checklist

Before publishing, run a clean production build and check the generated site locally.

- [ ] `zola build` exits successfully with Zola 0.22.1
- [ ] Portuguese and English home pages render and switch languages
- [ ] Papers, posts, projects, résumé pages, and tag pages preserve their localized URLs
- [ ] Each paper's journal, PDF, and BibTeX-copy actions work
- [ ] Math, Mermaid diagrams, the D3 chart, images, and videos render
- [ ] Light/dark theme switching works
- [ ] `public/CNAME` contains `rodolfoviana.com.br`
