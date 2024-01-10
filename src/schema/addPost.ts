import * as yup from "yup";
export type AddPostInputType = {
  userNo: string,
  userMail: string,
  content: string,
  imagePath: string
}
export const addPostSchema = yup.object().shape({
  userNo: yup.string(),
  userMail: yup.string(),
  content: yup.string(),
  imagePath: yup.string()
}).required()

export const addPostDefault: AddPostInputType = {
  userNo: '',
  userMail:'',
  content: '',
  imagePath: ''
}