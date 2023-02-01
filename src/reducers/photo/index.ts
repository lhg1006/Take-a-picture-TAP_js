import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PhotoListType} from "../../types/listTypes";

type stateType = {
  photoList: PhotoListType[]
};

const initialState: stateType = {
  photoList: []
};

export const loginReducer = createSlice({
  name: "photo",
  initialState,
  reducers: {
    getPhotoList: (state, action:PayloadAction<PhotoListType[]>) => {
      state.photoList = action.payload
    },
  },
  extraReducers: {},
});

const { actions, reducer: photo } = loginReducer

export const photoAction = actions

export default photo