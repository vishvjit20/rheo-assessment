import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../redux/action/movieAction";
import "./bookMovie.css";
import Button from "../../components/Button/Button";
import { genreIds, languages } from "../../components/utils/getMovies";
import CenterContent from "../../components/CenterContent/CenterContent";

const BookMovie = (props) => {
  const { id } = props.match.params;
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const selectedMovie = useMemo(
    () => movies?.filter((movie) => movie.id === +id),
    [id, movies]
  );

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
      <CenterContent className="book-movie-title">
        {original_title} - {languages[original_language]}
      </CenterContent>
      <CenterContent className="book-movie-img">
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={original_title}
        />
      </CenterContent>
      <CenterContent>
        {genre_ids?.map((genre, idx) => (
          <div
            key={idx}
            className="movie-genre"
            style={{ padding: "8px 20px", borderRadius: "4px" }}
          >
            {genreIds[genre]}
          </div>
        ))}
      </CenterContent>
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
