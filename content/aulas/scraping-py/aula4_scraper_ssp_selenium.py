from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
import time

url = "http://www.ssp.sp.gov.br/transparenciassp/Consulta2022.aspx"

# abro o navegador Chrome
driver = webdriver.Chrome()

# passo a URL para visitar
driver.get(url) 

# espero 5 segundos para a página carregar
time.sleep(5) 

# clico no elemento com id cphBody_btnFurtoVeiculo
driver.find_element(By.XPATH,'//*[@id="cphBody_btnFurtoVeiculo"]').click()

# espero 3 segundos
time.sleep(3)

# clico no elemento com id cphBody_lkAno22
driver.find_element(By.XPATH,'//*[@id="cphBody_lkAno22"]').click()

# espero 3 segundos
time.sleep(3)

# clico no elemento com id cphBody_lkMes4
driver.find_element(By.XPATH,'//*[@id="cphBody_lkMes4"]').click()

# espero 3 segundos
time.sleep(3)

# passo o código-fonte para Beautiful Soup trabalhar
soup = bs(driver.page_source, "html.parser")
dados = soup.find('table', {'id': 'cphBody_grdListBO'})
with open("cf_selenium.txt", "w", encoding='utf-8') as f:
    f.write(str(dados))
