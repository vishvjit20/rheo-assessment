import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Movie = ({ title, id }) => {
  return (
    <Card>
      <Link to={`/movie/${id}`}>
        <div className="movie">{title}</div>
      </Link>
    </Card>
  );
};

export default Movie;
