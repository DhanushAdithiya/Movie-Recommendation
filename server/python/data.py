import pandas as pd
import json

data = pd.read_csv("data/tmdb_5000_credits.csv")
data = data[['movie_id', 'title']]


data.rename(columns= {"movie_id": "id"}, inplace=True)
data_json = data.to_dict(orient="records")


with open("data.json", "w+" ,encoding="utf-8") as f:
    json.dump(data_json,f, ensure_ascii=False, indent=4)

print(data)