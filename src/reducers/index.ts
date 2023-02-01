/** root reducer */
import { combineReducers } from "redux";
import login from "./login";
import photo from "./photo";
import common from "./common";
import feed from "./feed";

const rootReducer = combineReducers({
  login, photo, common, feed
});

export default rootReducer;