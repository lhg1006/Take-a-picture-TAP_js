import * as yup from "yup";
export type AddPostInputType = {
  title: string,
  userMail: string,
  content: string,
  imagePath: string
}
export const addPostSchema = yup.object().shape({
  title: yup.string(),
  userMail: yup.string(),
  content: yup.string(),
  imagePath: yup.string()
}).required()

export const addPostDefault: AddPostInputType = {
  title:'',
  userMail:'',
  content: '',
  imagePath: ''
}