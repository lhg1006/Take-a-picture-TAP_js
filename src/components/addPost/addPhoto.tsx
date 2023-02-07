import React, {useState} from "react"
import {addPhotoImg} from "../../api/call/feed";
import {toast} from "react-toastify";
import {useFormContext} from "react-hook-form";
import {PrevImgList} from "../../types/feedTypes";
import { Navigation, Pagination } from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {BiAddToQueue} from "react-icons/bi";

const AddPhoto = () => {
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

    addPhotoImg(fd).then((res) => {
      setPrevList([...prevList, res.data.imageData[0]])
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

      <Swiper  className={'prev-photo'}
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {prevList?.map((data: { imageUrl: string | undefined; fileName: string | undefined; }, idx: React.Key | null | undefined) => {
          return (
            <>
              <SwiperSlide key={idx} style={{marginRight:"150px"}}>
                <img className={'prev-photo'}
                     src={data.imageUrl}
                     alt={data.fileName}
                />
              </SwiperSlide>
            </>
          )
        })}

      </Swiper>
    </>

  )
}
export default AddPhoto