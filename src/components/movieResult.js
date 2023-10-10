import React, { useState, useEffect } from "react";
import { Cast } from "./cast";
import "../App.css";
import { Details } from "./details";
const config = require("./config");
const apiKey = config.apiKey;

export const MovieResult = ({ selectedGenres }) => {
  const formattedGenres = selectedGenres.join("%2C");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  useEffect(() => {}, [formattedGenres]);

  const getMovie = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };
    fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=${formattedGenres}&include_video=true`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const randomIndex = Math.floor(Math.random() * response.results.length);
        const randomMovie = response.results[randomIndex];
        const movieId = randomMovie.id;
        setResults(randomMovie);

        return fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          options
        );
      })

      .then((creditsResponse) => creditsResponse.json())
      .then((creditsData) => {
        const cast = creditsData.cast.slice(0, 10);
        const director = creditsData.crew.find(
          (crewMember) => crewMember.job === "Director"
        );

        setCast(cast);
        setDirector(director);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <button onClick={getMovie}>Find me a movie</button>
      {loading ? (
        <p>Pick one or more genres above to find a movie!</p>
      ) : (
        <div className="fade-in">
          <Details props={results} />
          <Cast props={cast} />
          {/* <p>Directed by {director.name}</p> */}
        </div>
      )}
    </div>
  );
};
