import requests
from bs4 import BeautifulSoup as bs
import pandas as pd
import urllib3
urllib3.disable_warnings()

dados = list()

url = "https://buscalai.cgu.gov.br/?handler=search&ConsultaBasica.TermoPesquisa=&ConsultaBasica.IdOuvidoriaSelecionada=311&ConsultaBasica.OuvidoriaSelecionada=PETROBRAS+%E2%80%93+Petr%C3%B3leo+Brasileiro+S.A.&estados-simples=311&ConsultaBasica.IdTipoDecisaoSelecionada=&ConsultaBasica.TipoDecisaoSelecionada=&numPagina=0&maximoRegistrosPorPagina=30"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
table = soup.find('div', {'id': 'Groups'})
divs = table.find_all('div', {'id': 'PedidoLai'})
for i in divs:
    titulo = i.find('a').text.strip()
    div_detalhes = i.find('div', {'id': 'Detalhes'})
    orgao = div_detalhes.find_all('div')[0].text.strip()
    status = div_detalhes.find_all('div')[1].text.strip()
    data_hora = div_detalhes.find_all('div')[2].text.strip()
    url = f"https://buscalai.cgu.gov.br{i.find('a')['href']}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    rows = soup.find_all('div', {"class": 'row'})[1:3]
    pedido = rows[0].find('p').text.strip()
    resposta = rows[1].find('p').text.strip()
    dicio = {
        'titulo': titulo,
        'orgao': orgao,
        'status': status,
        'data_hora': data_hora,
        'pedido': pedido,
        'resposta': resposta
    }
    dados.append(dicio)
df = pd.DataFrame(dados)
print(df)