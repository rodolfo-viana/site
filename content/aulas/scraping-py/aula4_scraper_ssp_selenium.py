from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
import time

url = "https://www.ssp.sp.gov.br/estatistica/dados-mensais"

# abro o navegador Chrome
driver = webdriver.Chrome()

# passo a URL para visitar
driver.get(url)

# espero 3 segundos para a página carregar
time.sleep(3)

# clico no XPath referente à aba "Taxa de Delito"
driver.find_element(
    By.XPATH, '/html/body/app-root/body/div[1]/div/app-dados-mensais/div[2]/div[1]/ul/li[1]/a').click()

# espero 2 segundos
time.sleep(2)

# clico no XPath referente ao município de "Campinas"
driver.find_element(
    By.XPATH, '/html/body/app-root/body/div[1]/div/app-dados-mensais/div[2]/div[2]/form/div[2]/div[1]/select/option[110]').click()

# espero 2 segundos
time.sleep(2)

# passo o código-fonte para Beautiful Soup trabalhar
soup = bs(driver.page_source, "html.parser")
dados = soup.find(
    'table', class_='table table-striped table-hover ng-star-inserted')
with open("ssp_selenium.txt", "w", encoding='utf-8') as f:
    f.write(str(dados))
