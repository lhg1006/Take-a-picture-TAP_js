import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required().matches(/\S+@\S+\.\S+/, '이메일 형식을 확인하세요.'),
  password: yup.string().required().length(6, "6자리 이상 입력하세요"),
  chkPassword: yup.string().required().length(6)
}).required()