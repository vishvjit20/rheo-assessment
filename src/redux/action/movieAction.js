import { GET_ALL_MOVIES, GET_MOVIE } from "../constant";

export const getMovie = (data) => (dispatch) => {
  dispatch({ type: GET_MOVIE, payload: data });
};

export const getAllMovies = (data) => (dispatch) => {
  dispatch({ type: GET_ALL_MOVIES, payload: data });
};
