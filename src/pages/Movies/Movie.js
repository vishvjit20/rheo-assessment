import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import { genreIds, languages } from "../../components/utils/getMovies";

const Movie = ({ title, id, genres, language }) => {
  return (
    <Card>
      <Link to={`/movie/${id}`} className="movie-link">
        <div className="movie">
          <div>{title}</div>
          <div className="movie-genres">
            {genres.map((genre, idx) => (
              <div key={idx} className="movie-genre">
                {genreIds[genre]}
              </div>
            ))}
          </div>
          <div className="movie-language">Language: {languages[language]}</div>
        </div>
      </Link>
    </Card>
  );
};

export default Movie;
