import axios, {AxiosResponse} from "axios";
import {AddCommentType, ListParamType} from "../../types/newFeedType";
import {AddPostInputType} from "../../schema/addPost";
import {FollowListType} from "../../types/commonType";

export const getNewFeedList = async (data : ListParamType) => {
    return await axios.get(`/api/newFeed/list?userMail=${data.userMail}`)
}

export const getTargetFeedList = async (data : ListParamType) => {
    return await axios.get(`/api/newFeed/list/target?userMail=${data.userMail}`)
}

export const addComment = async (data : AddCommentType) => {
    return await axios.post(`/api/newFeed/addComment`, data)
}
export const delComment = async (data : {id:number; userMail:string}) =>{
    return await axios.post(`/api/newFeed/delComment`, data);
}
export const addPost = async (data : AddPostInputType) => {
    return await axios.post(`/api/newFeed/addPost`, data);
}
export const delPost = async (data : {postNo:number, userMail:string}) => {
    return await axios.post(`/api/newFeed/delPost`, data)
}
export const likeIns = async (data : {postNo:number, userMail:string}) => {
    return await axios.post(`/api/newFeed/likeIns`, data)
}
export const likeDel = async (data : {postNo:number, userMail:string}) => {
    return await axios.post(`/api/newFeed/likeDel`, data)
}
export const getLikeList = async (data : {postNo:number}) => {
    return await axios.get(`/api/newFeed/getLikeList?postNo=${data.postNo}`)
}
export const getFollowList = async (param : {email:string; type:string}) :  Promise<AxiosResponse<FollowListType[]>> =>{
    return await axios.get(`/api/newFeed/getFollowList?email=${param.email}&type=${param.type}`);
}
export const addFollow = async (data: any) => {
    return await axios.post(`/api/newFeed/followIns`, data)
}
export const delFollow = async (data: any) => {
    return await axios.post(`/api/newFeed/followDel`, data)
}
export const isFollowed = async (param : {userEmail:string; followerEmail:string}) => {
    return await axios.get(`/api/newFeed/isFollowed`,{params: param})
}