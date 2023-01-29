import React, { useEffect } from "react";
import "./home.css";
import Movies from "./Movies";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../redux/action/movieAction";
import { movies } from "./getMovies";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localMoviesObject = localStorage.getItem("ticket-booking");
    const { movies: mv } = JSON.parse(localMoviesObject) || {};
    const { movies: storedMovies } = mv ?? {};
    if (storedMovies && !!storedMovies?.length)
      dispatch(getAllMovies(storedMovies));
    else dispatch(getAllMovies(movies));
  }, [dispatch]);

  return (
    <div>
      <Movies />
    </div>
  );
};

export default Home;
