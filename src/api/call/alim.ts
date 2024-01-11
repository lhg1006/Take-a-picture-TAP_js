import axios, {AxiosResponse} from "axios";

export const getAlimList = async (data : string) => {
    return await axios.get(`/api/alim/list?myMemNo=${data}`)
}