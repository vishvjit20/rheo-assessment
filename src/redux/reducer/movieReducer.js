import { GET_MOVIE } from "../constant";

const initialState = {
  movie: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };

    default:
      return state;
  }
};
