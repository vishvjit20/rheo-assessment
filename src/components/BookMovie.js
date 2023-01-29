import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../redux/action/movieAction";
import "./bookMovie.css";
import NavigationBar from "./NavigationBar";
import Button from "./Button";
import { genreIds, languages } from "./getMovies";
import CenterContent from "./CenterContent";
import store from "../store";

const BookMovie = (props) => {
  const { id } = props.match.params;
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const selectedMovie = useMemo(
    () => movies?.filter((movie) => movie.id === +id),
    [id, movies]
  );

  console.log("e", store.getState());

  const {
    original_title,
    backdrop_path,
    genre_ids,
    overview,
    original_language,
  } = (selectedMovie && selectedMovie[0]) ?? {};

  useEffect(() => {
    dispatch(getMovie({ ...selectedMovie[0] }));
  }, [dispatch, selectedMovie]);

  return (
    <div>
      <NavigationBar />
      <div className="book-movie-title">
        {original_title} - {languages[original_language]}
      </div>
      <div className="book-movie-img">
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={original_title}
        />
      </div>
      <div className="movie-genres">
        {genre_ids?.map((genre, idx) => (
          <div
            key={idx}
            className="movie-genre"
            style={{ padding: "8px 20px", borderRadius: "4px" }}
          >
            {genreIds[genre]}
          </div>
        ))}
      </div>
      <CenterContent>{overview}</CenterContent>
      <div className="book-movie">
        <Link to={`/movie/${id}/rows`}>
          <Button text="Book Ticket" />
        </Link>
        <Link to={`/movie/${id}/customize-rows`}>
          <Button text="Customize Row" />
        </Link>
      </div>
    </div>
  );
};

export default BookMovie;
