import React from "react";
import { Link } from "react-router-dom";

const BookMovie = (props) => {
  const { id } = props.match.params;
  return (
    <div>
      <Link to={`/movie/${id}/rows`}>Customize Row </Link>
    </div>
  );
};

export default BookMovie;
