import axiosLib from 'axios'
const photoUrl = process.env.REACT_APP_PHOTO_URL
export const axiosFile = axiosLib.create({
    baseURL: photoUrl,
})

