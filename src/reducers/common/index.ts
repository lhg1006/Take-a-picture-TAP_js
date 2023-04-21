import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type initType = {
  isLoading: boolean
  isCall: boolean
}

const initialState: initType = {
  isLoading: false,
  isCall: false
};

export const commonReducer = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsLoading: (state, action:PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setCall: (state) => {
      state.isCall = !state.isCall
    },
  },
  extraReducers: {},
});

const { actions, reducer: common } = commonReducer

export const commonAction = actions

export default common