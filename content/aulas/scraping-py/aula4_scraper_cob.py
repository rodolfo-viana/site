import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

atletas = list()
for p in range(1, 19):
    url = f"https://www.cob.org.br/pt/cob/time-brasil/atletas?&page={p}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    articles = soup.find_all("article", class_="reg-atletas")
    for i in articles:
        dicio = {
            "nome": i.find('div', class_="dados").text.strip(),
            "modalidade": i.find('div', class_="texto").text.replace("+", "").strip()
        }
        atletas.append(dicio)
print(atletas)