import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type initType = {
  isReload: boolean
  isLoading: boolean
  isCall: boolean
  rememberPostNo: number
}

const initialState: initType = {
  isReload: false,
  isLoading: false,
  isCall: false,
  rememberPostNo:0
};

export const commonReducer = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsLoading: (state, action:PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setCall: (state, action:PayloadAction<number>) => {
      state.rememberPostNo = action.payload

      state.isCall = !state.isCall
    },
    setReLoad:(state, action:PayloadAction<boolean>) => {
      state.isReload = action.payload
    }
  },
  extraReducers: {},
});

const { actions, reducer: common } = commonReducer

export const commonAction = actions

export default common