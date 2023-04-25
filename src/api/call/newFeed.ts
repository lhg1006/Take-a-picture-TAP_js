import axios from "axios";
import {AddCommentType, ListParamType} from "../../types/newFeedType";
import {AddPostInputType} from "../../schema/addPost";

export const getNewFeedList = async (data : ListParamType) => {
    return await axios.get(`/api/newFeed/list?userMail=${data.userMail}`)
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
export const likeIns = async (data : {postNo:number, userMail:string}) => {
    return await axios.post(`api/newFeed/likeIns`, data)
}
export const likeDel = async (data : {postNo:number, userMail:string}) => {
    return await axios.post(`api/newFeed/likeDel`, data)
}