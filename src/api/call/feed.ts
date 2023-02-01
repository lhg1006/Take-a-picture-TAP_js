import axios from "axios";
import {CommentResultType} from "../../types/feedTypes";

export const getFeedList = async () => {
  return await axios.get(`/api/feed/getList`)
}

export const addComment = async (data: CommentResultType) => {
  return await axios.post(`/api/feed/comment/ins`, data)
}