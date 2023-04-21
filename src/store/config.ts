import { configureStore } from "@reduxjs/toolkit";
import login from "../reducers/login";
import photo from "../reducers/photo";
import common from "../reducers/common";
import feed from "../reducers/feed";
import newFeed from "../reducers/newFeed";


const store = configureStore({
  reducer: {
    login: login,
    common: common,
    photo: photo,
    feed: feed,
    newFeed: newFeed,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>