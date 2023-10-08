import React, { useState, useEffect } from "react";
import "../App.css";
export const MovieResult = ({ selectedGenres }) => {
  // Create a new array where selectedGenres are joined with "%"
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTU1OTI1NzA1ZDU4OTJhYmEyYWRlYzNlZWNiNTU1NiIsInN1YiI6IjY1MjE3ZjgzOTVjMGFmMDEzYjE3MmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8qgzeG675u2Ofgr3OuXt7YNIUnZzvLG8iunBe44B6oo",
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
      <button onClick={getMovie}>Click</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="fade-in">
          <h1>{results.original_title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`}
            alt="movie poster"
          />
          <p>{results.overview}</p>
          <ul>
            {cast.map((member) => (
              <div className="cast-box" key={member.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                  alt="(actor portrait unavailable)"
                  className="actor-portrait"
                />
                <p>
                  {member.name} as {member.character}
                </p>
              </div>
            ))}
          </ul>
          <p>Directed by {director.name}</p>
        </div>
      )}
    </div>
  );
};
