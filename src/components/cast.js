import React from "react";
import "../styles/cast.css";
export const Cast = ({ props }) => {
  return (
    <ul className="cast-ul">
      {props.map((member) => (
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
  );
};
