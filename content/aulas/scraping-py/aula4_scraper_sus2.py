from datetime import date
from dateutil import rrule
import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

end_date = date(2023, 4, 1)
start_date = date(2022, 1, 1)

dados = list()
for dt in rrule.rrule(rrule.MONTHLY, dtstart=start_date, until=end_date):
    url = f"http://cnes2.datasus.gov.br/Mod_Ind_Tipo_Leito.asp?VEstado=33&VMun=&VComp={dt.strftime('%Y%m')}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    tables = soup.find_all('table')[5]
    trs = tables.find_all('tr', {"bgcolor": "#cccccc"})
    for tr in trs:
        dicio = {
            "competencia": dt.strftime('%Y-%m'),
            "codigo": tr.find_all('td')[0].text.strip(),
            "descicao": tr.find_all('td')[1].text.strip(),
            "lt_existente": int(tr.find_all('td')[2].text.strip()),
            "lt_sus": int(tr.find_all('td')[3].text.strip())
        }
        dados.append(dicio)
df = pd.DataFrame(dados)
print(df)