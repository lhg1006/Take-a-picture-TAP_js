import axios from "axios";

export const profilePhotoUpd = async (data : any) => {
    return await axios.post(`api/member/profile/photoIns`, data)
}