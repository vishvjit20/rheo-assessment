import { GET_ALL_MOVIES, GET_MOVIE } from "../constant";

const initialState = {
  movie: [],
  movies: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };
    case GET_ALL_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};
