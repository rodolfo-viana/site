import requests
from bs4 import BeautifulSoup as bs
import pandas as pd

leis = list()
for i in range(0, 100):
    site = f"https://www.al.sp.gov.br/norma/resultados?page={i}&size=10&tipoPesquisa=E&_idsTipoNorma=on&_idsTipoNorma=on&_idsTipoNorma=on&_idsTipoNorma=on&_idsTipoNorma=on&_idsTipoNorma=on&_idsTipoNorma=on&_idsTipoNorma=on&_idsTipoNorma=on&idsTipoNorma=1%3B2%3B3%3B9%3B14%3B19%3B25%3B28%3B55%3B59&_idsTipoNorma=on&palavraChaveEscape=&palavraChave=&_idsTema=1&nuNorma=&complemento=&ano=&dtNormaInicio=&dtNormaFim=&idTipoSituacao=&_idsAutorPropositura=1&buscaLivreEscape=&buscaLivre=&_temQuestionamentos=on&_pesquisaAvancada=on"
    data = requests.get(site)
    soup = bs(data.text, "html.parser")
    props = soup.find("table", {"id": "resultados"})
    props_body = props.find("tbody")
    rows = props_body.find_all("tr")
    for r in rows:
        cols = r.find_all('td')
        elemento = {
            "legislacao": cols[0].text.strip(),
            "sinopse": cols[1].text.strip()
        }
        leis.append(elemento)

df = pd.DataFrame(leis)
print(df)