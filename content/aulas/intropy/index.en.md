+++
title = "Introduction to Python programming"
description = "Programming classes taught to students of the Data Journalism postgraduate course at IDP"
date = "2024-02-18"
weight = 1

[taxonomies]
tags=["python"]

+++

{% note(clickable=true, hidden=true, header="Variables and Data Types") %}

A **variable** is a name that references a value temporarily stored in computer memory. It works like a nickname we give to certain data.

```python
dollar_rate = 4.95
name = "Rodolfo"
is_student = True
```

Python has several basic data types:

- **Integer (`int`)**: whole numbers like `32`, `-5`, `1000`
- **Float (`float`)**: decimal numbers like `3.14`, `-2.5`, `0.001`
- **String (`str`)**: text enclosed in quotes like `"Python"`, `'Hello World'`
- **Boolean (`bool`)**: logical values `True` or `False`

You can convert between types using `int()`, `float()`, `str()`, and check types with `type()`.

```python
age = "25"
age_number = int(age)  # converts string to integer
print(type(age_number))  # <class 'int'>
```

{% end %}

{% note(clickable=true, hidden=true, header="Operations") %}

Python supports various operations:

**Arithmetic operators:**
- `+` addition
- `-` subtraction
- `*` multiplication
- `/` division
- `**` exponentiation
- `%` modulo (remainder)

**Comparison operators:**
- `==` equal to
- `!=` not equal to
- `>` greater than
- `<` less than
- `>=` greater than or equal to
- `<=` less than or equal to

**Logical operators:**
- `and` - both conditions must be True
- `or` - at least one condition must be True
- `not` - inverts the boolean value

```python
x = 10
y = 5
print(x > y and x < 20)  # True
```

{% end %}

{% note(clickable=true, hidden=true, header="Control Flow") %}

### `if` statements

Control the execution flow based on conditions:

```python
temperature = 25
if temperature > 30:
    print("It's hot!")
elif temperature > 20:
    print("It's warm")
else:
    print("It's cool")
```

### `while` loops

Execute code while a condition is True:

```python
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1
```

{% end %}

{% note(clickable=true, hidden=true, header="Data Collections") %}

### Lists
Ordered, mutable collections using square brackets:

```python
fruits = ["apple", "banana", "orange"]
fruits.append("grape")  # add item
print(fruits[0])        # access by index: "apple"
```

### Dictionaries
Key-value pairs using curly braces:

```python
person = {
    "name": "Ana",
    "age": 30,
    "city": "São Paulo"
}
print(person["name"])   # "Ana"
person["email"] = "ana@email.com"  # add new key-value
```

### Tuples
Ordered, immutable collections using parentheses:

```python
coordinates = (10, 20)
# coordinates[0] = 15  # This would cause an error - tuples are immutable
```

### Sets
Unique elements collections using curly braces:

```python
unique_numbers = {1, 2, 3, 3, 4}  # {1, 2, 3, 4} - duplicates removed
```

{% end %}

{% note(clickable=true, hidden=true, header="Loops and Iteration") %}

### `for` loops

Iterate over collections:

```python
# Iterating over a list
names = ["João", "Maria", "Pedro"]
for name in names:
    print(f"Hello, {name}!")

# Iterating over a dictionary
grades = {"Math": 85, "Science": 92, "History": 78}
for subject, grade in grades.items():
    print(f"{subject}: {grade}")
```

{% end %}

{% note(clickable=true, hidden=true, header="Functions") %}

Functions are reusable blocks of code that perform specific tasks:

```python
def greet(name):
    """Function that greets a person"""
    return f"Hello, {name}!"

def calculate_area(radius):
    """Calculate circle area"""
    pi = 3.14159
    area = pi * radius ** 2
    return area

# Using functions
message = greet("Ana")
print(message)  # "Hello, Ana!"

circle_area = calculate_area(5)
print(f"Area: {circle_area}")
```

Functions can have multiple parameters and return values. Use `return` to send data back from the function.

{% end %}

{% note(clickable=true, hidden=true, header="Modules") %}

Modules extend Python's functionality. Import them using `import`:

```python
# Standard library modules
import csv
import json
from datetime import datetime

# Reading a CSV file
with open('data.csv') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# Working with JSON
data = {"name": "Python", "type": "language"}
json_string = json.dumps(data)
```

Popular external libraries for data journalism:
- **Pandas**: data manipulation and analysis
- **Matplotlib**: data visualization
- **Requests**: HTTP requests for APIs
- **BeautifulSoup**: web scraping

Install external libraries with: `pip install library_name`

{% end %}

{% note(clickable=true, hidden=true, header="Practical Examples") %}

### Working with data

```python
# List of students with grades
students = [
    {"name": "Ana", "grade": 85, "passed": None},
    {"name": "Bruno", "grade": 72, "passed": None},
    {"name": "Carlos", "grade": 91, "passed": None}
]

# Add pass/fail status
for student in students:
    if student["grade"] >= 70:
        student["passed"] = True
    else:
        student["passed"] = False

# Calculate average grade
total = sum(student["grade"] for student in students)
average = total / len(students)
print(f"Class average: {average:.1f}")
```

### Reading data from the web

```python
import json
from urllib.request import urlopen

# Read JSON data from a URL
url = "https://api.example.com/data.json"
with urlopen(url) as response:
    data = json.loads(response.read())

# Process the data
for item in data:
    print(item["name"])
```

{% end %}

This introduction covers the fundamental concepts of Python programming essential for data journalism. Each topic builds upon the previous ones, providing a solid foundation for data analysis, web scraping, and automation tasks commonly used in journalism.
