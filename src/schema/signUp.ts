import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required().matches(/\S+@\S+\.\S+/, '이메일 형식을 확인하세요.'),
  password: yup.string().required("비밀번호를 입력하세요.").min(6, "최소 6자리 입력하세요.").max(13, "최대 13자리 입력하세요."),
  chkPassword: yup.string().required("비밀번호를 다시 입력하세요.").min(6, "최소 6자리 입력하세요.").max(13, "최대 13자리 입력하세요.")
}).required()

