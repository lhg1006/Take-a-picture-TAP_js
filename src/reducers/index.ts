/** root reducer */
import { combineReducers } from "redux";
import login from "./login";
import photo from "./photo";
import common from "./common";
import feed from "./feed";
import newFeed from "./newFeed";

const rootReducer = combineReducers({
  login, photo, common, feed, newFeed
});

export default rootReducer;