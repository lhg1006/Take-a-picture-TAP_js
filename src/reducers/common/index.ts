import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type initType = {
  isLoading: boolean
}

const initialState: initType = {
  isLoading: false
};

export const commonReducer = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsLoading: (state, action:PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: {},
});

const { actions, reducer: common } = commonReducer

export const commonAction = actions

export default common