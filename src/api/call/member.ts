import axios from "axios";

export const memberSelect = async (data : string) => {
    return await axios.get(`/api/member/select/profile?email=${data}`)
}
export const profilePhotoUpd = async (data : any) => {
    return await axios.post(`/api/member/profile/photoIns`, data)
}
export const userPageData = async (data: string) =>{
    return await axios.get(`/api/member/select/userPage?email=${data}`)
}