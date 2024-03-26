import requests
from bs4 import BeautifulSoup as bs
import pandas as pd

site = requests.get("http://cnes2.datasus.gov.br/Mod_Ind_Leitos_Listar.asp?VCod_Leito=03&VTipo_Leito=1&VListar=1&VEstado=00&VMun=&VComp=")
cf = bs(site.text, "html.parser")
tabela = cf.find_all("table")[3]
tr = tabela.find_all("tr", {"bgcolor": "#cccccc"})
hospitais = list()
for e in tr:
    dicio = {
        'cnes': e.find_all('td')[0].text,
        'estab': e.find_all('td')[1].text.strip(),
        'lt_geral': int(e.find_all('td')[2].text),
        'lt_sus': int(e.find_all('td')[3].text)
    }
    hospitais.append(dicio)
df = pd.DataFrame(hospitais) 
print(df)