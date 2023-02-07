import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentResultType, FeedResponseType, FeedResultType, PrevImgList} from "../../types/feedTypes";

type stateType = {
  feedList: {
    list: FeedResultType[]
    comment: CommentResultType[]
  }
};

const initialState: stateType = {
  feedList: {
    list:[],
    comment:[],
  }
};

export const feedReducer = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFirstPage:(state, action:PayloadAction<FeedResponseType>) =>{
      state.feedList.list = action.payload.feedList;
      state.feedList.comment = action.payload.commentList
    },
  },
  extraReducers: {},
});

const { actions, reducer: feed } = feedReducer

export const feedAction = actions

export default feed