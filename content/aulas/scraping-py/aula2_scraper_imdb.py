import requests
from bs4 import BeautifulSoup as bs
import pandas as pd

url = "https://www.imdb.com/list/ls060310079/?sort=user_rating,desc&st_dt=&mode=detail&page=1"
req = requests.get(url)
cf = bs(req.text, "html.parser")
divs = cf.find_all("div", class_="lister-item-content")
filmes = list()
for d in divs:
    h3 = d.find("h3")
    dicio = {
        "titulo": h3.a.text,
        "ano": int(h3.find_all("span", class_="lister-item-year")[0].text.replace("(I) ", "").replace("(", "").replace(")", "")),
        "duracao": int(d.find("span", class_="runtime").text.replace(" min", "")),
        "nota": float(d.find("span", class_="ipl-rating-star__rating").text)
    }
    filmes.append(dicio)
df = pd.DataFrame(filmes)  
print(df)
