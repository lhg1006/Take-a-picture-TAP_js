import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {profilePhotoUpd} from "../../api/call/member";
import {getCookie} from "../../utills";
import {imageUpload} from "../../api/call/photo";
import {BsFillPersonFill} from "react-icons/bs";

const AddProfilePhoto = ({url, isMine}: { url: string, isMine: boolean }) => {
    const basePhotoUrl: any = process.env.REACT_APP_PHOTO_URL;
    const [photoUrl, setPhotoUrl] = useState<string>(url)

    useEffect(() => {
        setPhotoUrl(url);
    }, [url]);

    const handleChangeFile = (e: any) => {
        if (e.target.files.length > 0) {
            for (let i = 0; i < e.target.files.length; i++) {
                onPhotoUpload(e.target.files[i])
            }
        }
    }

    const onPhotoUpload = (file: any) => {
        const fd = new FormData();

        fd.append("file", file)

        imageUpload(fd).then((res) => {
            const param = {
                userMail: getCookie("memberEmail"),
                imagePath: res.data.imageData[0].imagePath
            }
            profilePhotoUpd(param).then((res) => {
                if (res.data === 1) {
                    toast.success("변경 성공")
                    setPhotoUrl(basePhotoUrl + param.imagePath)
                } else {
                    toast.error("System ERROR . . .")
                }
            })
        }).catch((error) => {
            toast.error(
                () =>
                    <div>{error}<br/>서버와의 통신이<br/>원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.</div>
            )
        })
    }


    return (
        <>
            <label className="input-file-button" htmlFor="input-file">
                {photoUrl != ''
                    ? <img className="my-profile-img"
                           src={photoUrl}
                           alt={"프로필이미지"}/>
                    : <BsFillPersonFill className="comment-profile-img"/>}
            </label>
            {isMine &&
                <input className={"mb-3"}
                       type="file"
                       accept="image/jpeg, image/png"
                       id="input-file"
                       name="uploadFile"
                       style={{display: "none"}}
                       onChange={(e) => handleChangeFile(e)}
                />
            }
        </>
    )
}
export default AddProfilePhoto