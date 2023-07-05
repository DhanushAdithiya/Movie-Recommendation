import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../MovieInfo/movieinfo.css";

const SuggestedMovies = ({ movie }) => {
  const [poster, setPoster] = useState("");

  useEffect(() => {
    async function findPoster(movie) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie[1]}?api_key=${process.env.REACT_APP_API_KEY}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data) {
          setPoster(data.poster_path);
        }
      } catch (error) {
        console.error(error);
      }
    }

    findPoster(movie);
  }, [movie]);

  if (poster) {
    return (
      <a
        className="rec-movie"
        style={{ textDecoration: "none" }}
        href={`http://localhost:3000/movie/${movie[1]}`}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${poster}`}
          alt="poster"
          className="recommended-posters"
        />
        <h1 className="recommended-title">{movie[0]}</h1>
      </a>
    );
  }
};

const MovieInfo = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [director, setDirector] = useState("");
  const [recommendedMovies, setRecommendedMovies] = useState();
  const [recommendations, setRecommendations] = useState();

  async function getPosters(arr) {
    Promise.all(
      arr.map((id) => {
        return fetch(`http://localhost:5000/movies/findId`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const title = data[0].title;
            const id = data[0].id;
            return [title, id];
          });
      })
    )
      .then((films) => {
        setRecommendations(films);
      })

      .catch((error) => {
        console.error(error);
      });
  }

  async function getRecommendation(movieId) {
    const response = await fetch(
      `http://localhost:5000/movies/recommend?id=${movieId}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setRecommendedMovies(data);
  }

  async function fetchDetails(movieId) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setMovieDetails(data);
  }

  async function getDirector(movieId) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data) {
      const filteredData = data.crew.filter((e) => e.job === "Director");
      filteredData.forEach((e) => setDirector(e.name));
    }
  }

  useEffect(() => {
    getRecommendation(id);
    fetchDetails(id);
    getDirector(id);
    if (recommendedMovies) {
      getPosters(recommendedMovies);
    }
  }, [id, recommendedMovies]);

  if (movieDetails) {
    return (
      <>
        <div className="info-page-container">
          <div className="movie-details-section">
            <div className="movie-info">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                alt="movie-poster"
              />
              <div className="info-text">
                <h2 className="movie-title">
                  {movieDetails.original_title.toUpperCase()}
                </h2>
                <h5 className="movie-genre">
                  {movieDetails.genres.map((g) => ` ${g.name} /`)}
                </h5>
                <h3 className="movie-ow">Overview</h3>
                <p className="movie-ow-text">{movieDetails.overview}</p>
                <h3 className="movie-director">{director}</h3>
                <h4 className="director">Director</h4>
              </div>
            </div>
            <div className="movie-rating">
              <h2 className="rating">Average Rating</h2>
              <div className="rating-bar-full">
                <div
                  className="rating-bar-meter"
                  style={{ width: `${movieDetails.vote_average * 10}%` }}
                ></div>
              </div>
              <h2 className="rating">
                {Math.floor(movieDetails.vote_average)}/10
              </h2>
            </div>
          </div>
          <h1 style={{ color: "white" }}>
            MORE FILMS LIKE {movieDetails.original_title.toUpperCase()}
          </h1>
          <div className="more-films-section">
            {/* <h1>More films like this</h1> */}
            {recommendations &&
              recommendations.map((e) => {
                return <SuggestedMovies movie={e} key={e[1]} />;
              })}
          </div>
        </div>
      </>
    );
  }
};

export default MovieInfo;
