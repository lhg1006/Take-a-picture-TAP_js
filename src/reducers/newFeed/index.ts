import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FeedListType, NewFeedListType} from "../../types/newFeedType";

type stateType = {
    feedList: {
        list: FeedListType[]
    }
};

const initialState: stateType = {
    feedList: {
        list:[],
    }
};

export const newFeedReducer = createSlice({
    name: "newFeed",
    initialState,
    reducers: {
        setFirstPage:(state,action:PayloadAction<NewFeedListType>) =>{
            state.feedList.list = action.payload.list
        },
    },
    extraReducers: {},
});

const { actions, reducer: newFeed } = newFeedReducer

export const newFeedAction = actions

export default newFeed;