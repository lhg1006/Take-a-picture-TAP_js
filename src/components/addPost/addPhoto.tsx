import React, {useEffect, useState} from "react"
import {toast} from "react-toastify";
import {useFormContext} from "react-hook-form";
import {PrevImgList} from "../../types/feedTypes";
import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {BiAddToQueue} from "react-icons/bi";
import {imageUpload} from "../../api/call/photo";

const AddPhoto = () => {
    const photoBaseUrl = process.env.REACT_APP_PHOTO_URL
    const methods = useFormContext()
    const [prevList, setPrevList] = useState<PrevImgList>()

    const handleChangeFile = (e: any) => {
        // if(prevList.length > 4){
        //   toast.warning("파일 개수는 다섯 개를 초과할 수 없습니다.")
        //   return;
        // }

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
            const result = {
                imagePath: res.data.imageData[0].imagePath,
                imageUrl: photoBaseUrl + res.data.imageData[0].imageUrl,
                fileName: res.data.imageData[0].imageName
            }
            setPrevList(result)

        }).catch((error) => {
            toast.error(
                () =>
                    <div>{error}<br/>서버와의 통신이<br/>원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.</div>
            )
        })

        // addPhotoImg(fd).then((res) => {
        //   setPrevList([...prevList, res.data.imageData[0]])
        // }).catch((error) => {
        //   toast.error(
        //     () =>
        //       <div>{error}<br/>서버와의 통신이<br/>원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.</div>
        //   )
        // })
    }

    useEffect(() => {
        // let imageList : string = ""
        methods.setValue("imagePath", prevList?.imagePath)
        // prevList.map(data=>{
        //     imageList = data.imagePath
        //
        // })
        console.log(prevList)
    }, [prevList])


    return (
        <div style={{maxWidth: "24.4rem", padding: "5px"}}>
            <label className="input-file-button" htmlFor="input-file">
                <span style={{fontSize: "20px"}}>Add Photo </span>
                <BiAddToQueue/>
            </label>
            <input className={"mb-3"}
                   type="file"
                   accept="image/jpeg, image/png"
                   id="input-file"
                   name="uploadFile"
                   style={{display: "none"}}
                   onChange={(e) => handleChangeFile(e)}
            />

            <Swiper className={'prev-photo'}
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{clickable: true}}
                    scrollbar={{draggable: true}}
            >
                <div>
                    <SwiperSlide style={{marginRight: "150px"}}>
                        <img className={'prev-photo'}
                             src={prevList?.imageUrl}
                             alt={prevList?.fileName}
                        />
                    </SwiperSlide>
                </div>
                {/*{prevList?.map((data: { imagePath: string | undefined; imageUrl: string | undefined; fileName: string | undefined; }) => {*/}
                {/*  return (*/}
                {/*    <div>*/}
                {/*      <SwiperSlide style={{marginRight:"150px"}}>*/}
                {/*        <img key={prevList.length} className={'prev-photo'}*/}
                {/*             src={data.imageUrl}*/}
                {/*             alt={data.fileName}*/}
                {/*        />*/}
                {/*      </SwiperSlide>*/}
                {/*    </div>*/}
                {/*  )*/}
                {/*})}*/}
            </Swiper>
        </div>
    )
}
export default AddPhoto