import axios, {AxiosResponse} from "axios";
import {AlimParamTypes} from "../../types/alimTypes";

export const getAlimList = async (data : AlimParamTypes) => {
    return await axios.get(`/api/alim/list?myMemNo=${data.memNo}&pageNo=${data.pageNo}`)
}