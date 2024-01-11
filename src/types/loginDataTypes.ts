export type loginStateType = {
  login:{
    isLogin: boolean
    memberEmail: string
  }
}

export type LoginInputs = {
  email:string
  password:string
  remember:boolean
}

export type SignUpInputs = {
  name:string
  phone:string
  email:string
  password:string
  chkPassword:string
}

export type ForgotInputs = {
  email: string
  phone: string
}

export type ChangePwInputs = {
  email: string
  changePassword: string
  changeChkPassword: string
}

export type loginParamType = {
  login: boolean
  email: string
}