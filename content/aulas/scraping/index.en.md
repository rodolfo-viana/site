+++
title = "Web scraping with Python"
description = "Data scraping classes taught to students of the Data Journalism postgraduate course at IDP"
date = "2024-03-18"
weight = 2

[taxonomies]
tags=["python", "web scraping"]

+++

{% note(clickable=true, hidden=true, header="Introduction to Web Scraping") %}

Web scraping (or data scraping) is a technique for extracting information from websites or applications. This can be done manually, through specific systems (like webscraper.io), or by creating scripts (in Python, R, Java, or other languages) for this purpose.

In journalism, web scraping has been fundamental for developing data-driven stories available on the internet. Examples include analyzing government spending, tracking legislative activity, or monitoring public information releases.

The key concept is that **scraping means instructing a script to visit a website and retrieve all data "wrapped" by specific HTML tags and CSS attributes**.

{% end %}

{% note(clickable=true, hidden=true, header="How Websites Work") %}

To understand web scraping, we first need to understand how the internet works:

1. The user, via browser, makes a request to the website's server
2. The server responds by delivering `.html`, `.css`, `.js` files, etc. to the browser
3. The browser renders these files and transforms them into what we know as a website

When we talk about data scraping, we're talking about **capturing information contained within HTML tags and CSS attributes**.

For example, a news headline might be contained in HTML like this:

```html
<h3 class="title__element headlineMain__title">
    Breaking News: Important Event Happens
</h3>
```

If we create a Python script to capture information contained in `<h3 class="title__element headlineMain__title">`, we'll get "Breaking News: Important Event Happens" as the result.

{% end %}

{% note(clickable=true, hidden=true, header="HTML and CSS Basics") %}

HTML tags come within `<` and `>`, indicating what the element is: title, paragraph, image, list, etc. Many require an end tag using `/`. For example:

```html
<div>
    <h1>Shopping List</h1>
    <p>Here are the items to buy this week:</p>
    <ul>
        <li>Rice</li>
        <li>Beans</li>
        <li>Oil</li>
    </ul>
    <p>For questions, access <a href="linktosite">this form</a></p>
</div>
```

**HTML tags show what the element is, and CSS attributes show how the element looks**.

CSS (Cascading Style Sheets) attributes indicate an element's style:

```html
<style>
    .red{color:red;}
    .blue{color:blue;}
</style>

<h1 class="red">Title 1</h1>
<h1 class="blue">Title 2</h1>
```

Both are `h1` tags (headings), but they have different classes that make them appear in different colors.

{% end %}

{% note(clickable=true, hidden=true, header="Required Tools") %}

For web scraping with Python, we'll use two main external libraries:

- **Requests**: to capture website content
- **BeautifulSoup**: to interpret the content captured by Requests

To install these libraries, run in your terminal:

```bash
python -m pip install requests beautifulsoup4
```

{% end %}

{% note(clickable=true, hidden=true, header="Using Requests") %}

Requests is a popular external library for handling HTTP requests and responses. It goes to the server where the website is hosted, gets the content, and brings it to Python.

```python
import requests

# Save the URL in a variable
site = 'https://example.com'

# The requests.get(url) function brings data to our script
data = requests.get(site)

# Check if the request was successful
print(data.status_code)  # 200 means success
print(data.text)         # Shows the website's HTML content
```

Common status codes:
- **200**: Success - page exists and connection was successful
- **404**: Not found - page doesn't exist  
- **401**: Unauthorized - you don't have permission to access it

{% end %}

{% note(clickable=true, hidden=true, header="Using Beautiful Soup") %}

Once we have the source code saved, the next step is to interpret this code and "break down" each HTML tag and CSS attribute to find the data we want. This is where **Beautiful Soup** comes in.

```python
import requests
from bs4 import BeautifulSoup as bs

url = "https://example.com"
req = requests.get(url)
soup = bs(req.text, 'html.parser')

# Now we can extract specific elements
title = soup.title.text           # Get page title
paragraphs = soup.find_all('p')   # Get all paragraphs
```

### Common Beautiful Soup methods:

- `soup.find('tag')` - finds the first occurrence of a tag
- `soup.find_all('tag')` - finds all occurrences of a tag
- `soup.find('tag', class_='className')` - finds tag with specific class
- `element.text` - extracts only the text content
- `element['attribute']` - gets attribute value (like href for links)

### Example: Scraping a news website

```python
import requests
from bs4 import BeautifulSoup as bs

url = "https://news-example.com"
req = requests.get(url)
soup = bs(req.text, 'html.parser')

# Find all article headlines
headlines = soup.find_all('h2', class_='article-title')

articles = []
for headline in headlines:
    article_data = {
        'title': headline.text.strip(),
        'link': headline.find('a')['href']
    }
    articles.append(article_data)

print(articles)
```

{% end %}

{% note(clickable=true, hidden=true, header="Scraping Multiple Pages") %}

Often, the data we need spans multiple pages. There are common patterns for handling this:

### Pagination

When sites have numbered pages, the URL usually changes predictably:

```python
import requests
from bs4 import BeautifulSoup as bs

all_data = []

# Scrape pages 1 through 5
for page in range(1, 6):
    url = f"https://example.com/data?page={page}"
    req = requests.get(url)
    soup = bs(req.text, 'html.parser')
    
    # Extract data from this page
    items = soup.find_all('div', class_='item')
    for item in items:
        data = {
            'title': item.find('h3').text,
            'content': item.find('p').text
        }
        all_data.append(data)

print(f"Collected {len(all_data)} items")
```

### Following Links

Sometimes we need to follow links from a main page to get detailed information:

```python
import requests
from bs4 import BeautifulSoup as bs

# First, get all article links from the main page
main_url = "https://example.com/articles"
req = requests.get(main_url)
soup = bs(req.text, 'html.parser')

article_links = []
for link in soup.find_all('a', class_='article-link'):
    article_links.append("https://example.com" + link['href'])

# Then scrape each article page
articles = []
for link in article_links:
    req = requests.get(link)
    soup = bs(req.text, 'html.parser')
    
    article = {
        'title': soup.find('h1').text,
        'content': soup.find('div', class_='article-body').text,
        'date': soup.find('time')['datetime']
    }
    articles.append(article)

print(f"Scraped {len(articles)} articles")
```

{% end %}

{% note(clickable=true, hidden=true, header="Date Ranges") %}

When scraping time-series data, you often need to iterate through dates:

```python
from datetime import date
from dateutil import rrule
import requests
from bs4 import BeautifulSoup as bs

# Create date range
start_date = date(2023, 1, 1)
end_date = date(2023, 12, 31)

all_data = []

# Iterate through each month
for dt in rrule.rrule(rrule.MONTHLY, dtstart=start_date, until=end_date):
    # Format date for URL
    date_str = dt.strftime("%Y%m")
    url = f"https://example.com/data?date={date_str}"
    
    req = requests.get(url)
    soup = bs(req.text, 'html.parser')
    
    # Extract data for this month
    # ... scraping code here ...
```

{% end %}

{% note(clickable=true, hidden=true, header="Limitations and Advanced Tools") %}

Not all websites can be scraped with Requests and Beautiful Soup. Some limitations include:

### JavaScript-Rendered Content

Some websites load content dynamically with JavaScript. In these cases, the HTML source doesn't contain the data we want because it's loaded after the page renders.

### Interactive Elements

Sites that require clicking buttons, filling forms, or other interactions need more advanced tools.

### Solution: Selenium

For these complex cases, we can use **Selenium**, which automates a real browser:

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
import time

# Launch browser
driver = webdriver.Chrome()
driver.get("https://dynamic-site.com")

# Wait for page to load
time.sleep(3)

# Click a button
button = driver.find_element(By.CLASS_NAME, "load-more-btn")
button.click()

# Wait for content to load
time.sleep(2)

# Now scrape the updated content
soup = BeautifulSoup(driver.page_source, "html.parser")
data = soup.find_all('div', class_='dynamic-content')

# Always close the browser
driver.quit()
```

### Best Practices

1. **Respect robots.txt** - Check if the website allows scraping
2. **Rate limiting** - Don't make requests too quickly
3. **Handle errors** - Use try/except blocks for robust scraping
4. **User-Agent headers** - Identify your scraper appropriately

```python
import requests
import time

headers = {
    'User-Agent': 'Mozilla/5.0 (Data Analysis Bot 1.0)'
}

for url in urls:
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for bad status codes
        
        # Process the response
        # ... scraping code ...
        
        # Be polite - wait between requests
        time.sleep(1)
        
    except requests.RequestException as e:
        print(f"Error scraping {url}: {e}")
```

{% end %}

Web scraping is a powerful tool for data journalism, enabling reporters to gather and analyze information from multiple sources efficiently. Always ensure you're scraping ethically and in compliance with website terms of service.
