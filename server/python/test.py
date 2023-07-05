<<<<<<< HEAD
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import sys
import warnings
warnings.filterwarnings("ignore")

df = pd.read_csv('D:\Programming Shit\Movie-Recommendation\server\python\movieData.csv')
data = pd.read_csv('D:\Programming Shit\Movie-Recommendation\server\python\movieIndex.csv')


cv = CountVectorizer(max_features = 5000, stop_words = 'english')
v = cv.fit_transform(df['tags']).toarray()
sim = cosine_similarity(v)


def recommend(id):
    index = data[data['movie_id'] == int(id)].index[0]
    dist = sim[index]
    movies_list = sorted(list(enumerate(dist)), reverse=True, key=lambda x:x[1])[1:6]
    X = []
    for i in movies_list:
        X.append(data.iloc[i[0]].movie_id)
    print(X)



recommend(sys.argv[1])
=======
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import sys
import warnings
warnings.filterwarnings("ignore")

df = pd.read_csv('D:\Programming Shit\Movie-Recommendation\server\python\movieData.csv')
data = pd.read_csv('D:\Programming Shit\Movie-Recommendation\server\python\movieIndex.csv')


cv = CountVectorizer(max_features = 5000, stop_words = 'english')
v = cv.fit_transform(df['tags']).toarray()
sim = cosine_similarity(v)


def recommend(id):
    index = data[data['movie_id'] == int(id)].index[0]
    dist = sim[index]
    movies_list = sorted(list(enumerate(dist)), reverse=True, key=lambda x:x[1])[1:6]
    X = []
    for i in movies_list:
        X.append(data.iloc[i[0]].movie_id)
    print(X)



recommend(sys.argv[1])
>>>>>>> origin/main
