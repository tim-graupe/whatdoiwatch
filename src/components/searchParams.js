import React, { useState, useEffect } from "react";
import { MovieResult } from "./movieResult";

export const SearchParams = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTU1OTI1NzA1ZDU4OTJhYmEyYWRlYzNlZWNiNTU1NiIsInN1YiI6IjY1MjE3ZjgzOTVjMGFmMDEzYjE3MmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8qgzeG675u2Ofgr3OuXt7YNIUnZzvLG8iunBe44B6oo",
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
      <h1>Fetch API Example</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
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
