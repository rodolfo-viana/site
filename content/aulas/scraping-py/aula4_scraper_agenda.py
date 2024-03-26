import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

url = 'https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/agenda-do-presidente-da-republica-lula/agenda-do-presidente-da-republica/2023-05-24'
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
compromissos = soup.find_all('li', {'class': 'item-compromisso-wrapper'})
print(compromissos)