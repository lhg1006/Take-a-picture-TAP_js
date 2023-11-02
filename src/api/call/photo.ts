import { axiosFile } from "../index"

export const imageUpload = async (formData: any) => {
    return await axiosFile.post<ImageReturnType>('/api/photo/upload/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export type ImageReturnType = {
    imageData: {
        imageName: string;
        imagePath: string;
        imageUrl: string;
    }[];
}