import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SearchPage/searchpage.css";

const SearchPage = () => {
  const [title, setTitle] = useState("");
  const [movieData, setMovieData] = useState();
  const [movies, setMovies] = useState();
  const [suggestions, setSuggestion] = useState([]);

  const navigate = useNavigate();

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 3) {
      matches = movies.filter((mov) => {
        const reg = new RegExp("^" + title, "i");
        return mov.match(reg);
      });
    }

    console.log(matches);
    setSuggestion(matches);
    setTitle(text);
  };

  async function getDetails(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (data) {
      setMovieData(data);
    }
  }

  useEffect(() => {
    if (movieData) {
      navigate(`/movie/${movieData.id}`);
    }
  }, [navigate, movieData]);

  async function findMovie() {
    const response = await fetch(`http://localhost:5000/movies/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    const data = await response.json();
    const id = await data[0].id;
    if (id) {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
      getDetails(url);
    }
  }

  useEffect(() => {
    async function getAllTitles() {
      const response = await fetch("http://localhost:5000/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        const movieData = data.map((e) => e.title);
        setMovies(movieData);
      }
    }

    getAllTitles();
  }, [movies]);

  return (
    <>
      <div className="container">
        <div className="search-movie">
          <input
            type="text"
            placeholder="Search for a film"
            onChange={(e) => onChangeHandler(e.target.value)}
            value={title}
            onBlur={() => {
              setTimeout(() => {
                setSuggestion([]);
              }, 100);
            }}
            className="search-box"
          />
          {suggestions &&
            suggestions.map((sug, i) => (
              <div
                className="suggestions"
                key={i}
                onClick={() => setTitle(sug)}
              >
                {sug}
              </div>
            ))}
          <input
            type="submit"
            value="SEARCH"
            onClick={findMovie}
            className="searchBtn"
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
