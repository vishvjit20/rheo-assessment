import { GET_MOVIE } from "../constant";

export const getMovie = (data) => (dispatch) => {
  dispatch({ type: GET_MOVIE, payload: data });
};
