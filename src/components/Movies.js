import React from "react";
import Movie from "./Movie";
import "./movies.css";

const Movies = () => {
  return (
    <div>
      <div className="movies-header">Recommended Movies</div>
      <div className="movies">
        <Movie title="Shawshank Redemption" id="1" />
        <Movie title="Avengers : End Game" id="2" />
        <Movie title="3 Idiots" id="3" />
        <Movie title="KGF: Chapter 1(Cinepolis)" id="4" />
        <Movie title="Bahubali: The beginning(INOX)" id="5" />
        <Movie title="Master" id="6" />
      </div>
    </div>
  );
};

export default Movies;
