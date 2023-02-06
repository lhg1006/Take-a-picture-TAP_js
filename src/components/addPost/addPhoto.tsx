import React, {useEffect, useState} from "react"
import {addPhotoImg} from "../../api/call/feed";
import {toast} from "react-toastify";
import {useFormContext} from "react-hook-form";

const AddPhoto = () => {
  const methods = useFormContext()
  const [file, setFile] = useState<any>(null);
  const [imgList, setImgList] = useState<any[]>([]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);
  }

  const onPhotoUpload = () => {
    const fd = new FormData();

    Object.values(file).forEach((file: any) => fd.append("file", file));

    addPhotoImg(fd).then((res) => {
      setImgList([...imgList, res.data])
      methods.setValue("file", fd)
    }).catch((error) => {
      toast.error(
        () =>
          <div>{error}<br/>서버와의 통신이<br/>원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.</div>
      )
    })
  }

  useEffect(() => {
    if (file) {
      onPhotoUpload()
    }
    console.log(imgList)
  }, [file])

  return (
    <>
      <input className={"mb-3"} type="file" accept="image/jpeg, image/png" name="uploadFile" multiple
             onChange={(e) => handleChangeFile(e)}/>
      {imgList.length > 0 &&imgList.map((data, idx) =>
          <div>
            <img key={idx} src={data.fileData.filepath+data.fileData.fileName} alt={data.fileName}/>
          </div>
      )}
    </>
  )
}
export default AddPhoto