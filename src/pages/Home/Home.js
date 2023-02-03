import React, { useEffect } from "react";
import "./home.css";
import Movies from "../Movies/Movies";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../../redux/action/movieAction";
import { movies } from "../../components/utils/getMovies";

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

  return <Movies />;
};

export default Home;
