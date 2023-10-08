import React from "react";
import "../styles/details.css";
export const Details = ({ props }) => {
  return (
    <div className="movie-content-container">
      <section
        className="movie-content-container-children"
        id="title-and-poster-container"
      >
        <h1>{props.original_title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
          alt="movie poster"
        />
      </section>

      <section
        className="movie-content-container-children"
        id="description-container"
      >
        <p>{props.overview}</p>
        <p>{props.release_date}</p>
        <p>
          {props.vote_average} / 10{" "}
          <span class="material-symbols-outlined">star</span>{" "}
        </p>
      </section>
    </div>
  );
};
