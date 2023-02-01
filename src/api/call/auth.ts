import axios from 'axios'
import {ChangePwInputs, ForgotInputs, LoginInputs, SignUpInputs} from "../../types/loginDataType";

export const login = async (data: LoginInputs) => {
  return await axios.get(`/api/login/auth`, {params: data})
}

export const confirmEmailDuplication = async (data: string) =>{
  return await axios.get(`/api/email/duplication?email=${data}`)
}

export const signUp = async (data: SignUpInputs) => {
  return await axios.post(`/api/signup/memberIns`, data)
}

export const forgotPassword = async (data:ForgotInputs) =>{
  return await axios.get(`/api/forgot/password?email=${data.email}&phone=${data.phone}`)
}

export const changePassword = async (data:{email: string, password: string}) =>{
  return await axios.post(`/api/change/password`, data)
}

export const logout = async () => {
  return await axios.post(`/api/logout`)
}