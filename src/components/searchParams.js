import React, { useState, useEffect } from "react";
import { MovieResult } from "./movieResult";
const config = require("./config");
const apiKey = config.apiKey;

export const SearchParams = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };

    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setGenres(jsonData.genres);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedGenres([...selectedGenres, id]);
    } else {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    }
  };

  return (
    <div>
      <h1>Help Me Pick a Movie</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="genre-list">
          {genres.length > 0 ? (
            genres.map((item) => (
              <div className="genre-box" key={item.id}>
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, item.id)}
                  checked={selectedGenres.includes(item.id)}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            ))
          ) : (
            <p>No genres available.</p>
          )}
        </ul>
      )}
      <MovieResult selectedGenres={selectedGenres} />
    </div>
  );
};
