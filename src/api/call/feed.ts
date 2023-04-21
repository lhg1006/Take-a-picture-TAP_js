import axios from "axios";
import {CommentResultType} from "../../types/feedTypes";

export const getFeedList = async () => {
  return await axios.get(`/api/feed/getList`)
}

// export const addComment = async (data: CommentResultType) => {
//   return await axios.post(`/api/feed/comment/ins`, data)
// }

export const delComment = async (data: CommentResultType) => {
  return await axios.post(`/api/feed/comment/del`, data)
}

export const addPhotoImg = async (data: any) => {
  return await axios.post(`/api/photo/upload/file`, data)
}

export const preViewImg = async (fileName : string) => {
  return await axios.get(`api/photo/img/view?fileName=${fileName}`)
}