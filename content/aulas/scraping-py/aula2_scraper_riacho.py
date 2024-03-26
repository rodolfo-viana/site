import requests
from bs4 import BeautifulSoup as bs
import pandas as pd

site = 'http://rodolfoviana.com.br/idp/webscraping/agenda.html'
dados = requests.get(site) 
codigo = dados.text
cod_parseado = bs(codigo, 'html.parser')
divs = cod_parseado.find_all('div', class_='card')
lista_eventos = list()
for i in divs:
    compromisso = {
        'evento': i.h5.text,
        'local': i.find_all('li')[0].text,
        'data': i.find_all('li')[1].text,
        'horario': i.find_all('li')[2].text
    }
    lista_eventos.append(compromisso)
df = pd.DataFrame(lista_eventos)
