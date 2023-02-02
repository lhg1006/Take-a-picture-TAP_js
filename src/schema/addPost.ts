import * as yup from "yup";
type addPostInputType = {
  email: string
}
export const addPostSchema = yup.object().shape({
  email: yup.string().required("")
}).required()

export const addPostDefault: addPostInputType = {
  email:'',
}