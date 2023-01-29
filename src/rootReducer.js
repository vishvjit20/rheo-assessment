import { combineReducers } from "redux";
import { movieReducer } from "./redux/reducer/movieReducer";

export default combineReducers({
  movie: movieReducer,
});
