import axios from "axios";

export const memberSelect = async (data : string) => {
    return await axios.get(`/api/member/select/profile?email=${data}`)
}
export const profilePhotoUpd = async (data : any) => {
    return await axios.post(`/api/member/profile/photoIns`, data)
}
export const myPageData = async (data: string) =>{
    return await axios.get(`/api/member/select/myPage?email=${data}`)
}