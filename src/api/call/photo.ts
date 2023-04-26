import { axiosFile } from "../index"

export const imageUpload = async (formData: any) => {
    return await axiosFile.post<ImageReturnType>('/file/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export type ImageReturnType = {
    fileName: string
    pathUrl: string
}