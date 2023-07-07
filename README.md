# Movie-Recommendation
This is a MERN Stack website that recommends the user 5 movies similar to the movie the user likes or has watched recently. It uses the TMDB 5000 movies dataset from Kaggle in order to form recommendations. It uses the TMDB API also to show information such as the Overview, genres, director, and rating on the movie-info page.

This project uses a cosine similarity algorithm to recommend movies based on the input movie this is done with Python which is neatly integrated into the backend with Express. We perform CountVectorization on the tags of the film. The Tags of the movie include the overview, the top 3 cast, and the director. These tags are stemmed using a Porter stemmer algorithm before being vectorized.  

## Upcoming Features
Here are some of the features I intend to add:
- User Login / User Registration
- Email Authentication
- Dashboard Page for the user
- Mobile App using ReactNative
- Theming Options
- Responsive Mobile Layout
- Improving the Recommendation UI

## ScreenShots of the Website
### Landing Page
![image](https://github.com/DhanushAdithiya/Movie-Recommendation/assets/84760124/75c11cba-139a-425c-991f-768d9812f4dc)

### Movie Info Page
![image](https://github.com/DhanushAdithiya/Movie-Recommendation/assets/84760124/135023b5-7fff-4d96-91e7-5024bb785b21)

### Recommendation Section
![image](https://github.com/DhanushAdithiya/Movie-Recommendation/assets/84760124/dd895cab-c6e2-4151-9119-3165ae6af800)
