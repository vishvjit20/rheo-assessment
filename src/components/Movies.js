import React from "react";
import Movie from "./Movie";
import "./movies.css";
import { movies } from "./getMovies";

const Movies = () => {
  return (
    <div>
      <div className="movies-header">Recommended Movies</div>
      <div className="movies">
        {movies.map((movie) => (
          <Movie
            title={movie.original_title}
            id={movie.id}
            genres={movie.genre_ids}
            language={movie.original_language}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
