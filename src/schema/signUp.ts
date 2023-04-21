import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required().matches(/\S+@\S+\.\S+/, '이메일 형식을 확인하세요.'),
  password: yup.string().required().min(6).max(13, "최소 6자리 ~ 최대 13자리 입력"),
  chkPassword: yup.string().required().length(6)
}).required()

