import React from "react";
import Movie from "./Movie";
import "./movies.css";
import { useSelector } from "react-redux";
import CenterContent from "../../components/CenterContent/CenterContent";

const Movies = () => {
  const { movies } = useSelector((state) => state.movies);
  return (
    <div>
      <CenterContent className="movies-header">
        Recommended Movies
      </CenterContent>
      <div className="movies">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
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
