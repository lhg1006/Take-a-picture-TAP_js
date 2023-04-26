import {useFormContext} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {PrevImgList} from "../../types/feedTypes";
import {toast} from "react-toastify";
import {addPhotoImg} from "../../api/call/feed";
import {BiAddToQueue} from "react-icons/bi";
import {profilePhotoUpd} from "../../api/call/member";
import {getCookie} from "../../utills";
import {imageUpload} from "../../api/call/photo";

const AddProfilePhoto = () => {
    const methods = useFormContext()
    const [prevList, setPrevList] = useState<PrevImgList[]>([])

    const handleChangeFile = (e: any) => {
        if(prevList.length > 4){
            toast.warning("파일 개수는 다섯 개를 초과할 수 없습니다.")
            return;
        }

        if (e.target.files.length > 0) {
            for (let i = 0; i < e.target.files.length; i++) {
                onPhotoUpload(e.target.files[i])
            }
        }
    }

    const onPhotoUpload = (file: any) => {
        const fd = new FormData();

        fd.append("file", file)

        imageUpload(fd).then((res)=> {
            const param = {
                userMail : getCookie("memberEmail"),
                imagePath : res.data.pathUrl
            }
            profilePhotoUpd(param).then((res)=>{
                if(res.data === 1) {
                    toast.success("변경 성공")
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

    useEffect(() => {
        let imageList : string = ""
        prevList.map(data=>{
            imageList = data.imagePath
            methods.setValue("imagePath",imageList)
        })
    },[prevList])


    return (
        <div style={{maxWidth:"24.4rem",padding: "5px"}}>
            <label className="input-file-button" htmlFor="input-file">
                <span style={{fontSize:"20px"}}>Add Photo </span>
                <BiAddToQueue />
            </label>
            <input className={"mb-3"}
                   type="file"
                   accept="image/jpeg, image/png"
                   id="input-file"
                   name="uploadFile"
                   style={{display: "none"}}
                   onChange={(e) => handleChangeFile(e)}
            />
        </div>
    )
}
export default AddProfilePhoto