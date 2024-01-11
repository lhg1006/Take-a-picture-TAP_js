import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginParamType} from "../../types/loginDataTypes";

type stateType = {
  isLogin: boolean
  memberEmail: string
};

const initialState: stateType = {
  isLogin: false,
  memberEmail: ""
};

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLogin: (state, action:PayloadAction<loginParamType>) => {
      state.isLogin = action.payload.login
      state.memberEmail = action.payload.email
    },
  },
  extraReducers: {},
});

const { actions, reducer: login } = loginReducer

export const loginAction = actions

export default login