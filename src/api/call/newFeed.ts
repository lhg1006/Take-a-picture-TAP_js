import axios from "axios";
import {AddCommentType} from "../../types/newFeedType";
import {AddPostInputType} from "../../schema/addPost";

export const getNewFeedList = async () => {
    return await axios.get(`/api/newFeed/list`)
}
export const addComment = async (data : AddCommentType) => {
    return await axios.post(`/api/newFeed/addComment`, data)
}
export const delComment = async (data : {id:number; userMail:string}) =>{
    return await axios.post(`/api/newFeed/delComment`, data);
}
export const addPost = async (data : AddPostInputType) => {
    return await axios.post(`api/newFeed/addPost`, data);
}
export const delPost = async (data : {postNo:number, userMail:string}) => {
    return await axios.post(`api/newFeed/delPost`, data)
}