import React, {useEffect, useState} from "react";
import "../../css/pages/notFound/notFound.css"
import {useNavigate} from "react-router-dom";


const NotFound = ({tag} : {tag:string}) => {
    const navigate = useNavigate()
    const [nFT, setNFT] = useState<string>('')
    const textCase = () => {
        switch (tag){
            case '1' : setNFT('삭제되었거나 존재하지 않는 게시물입니다.')
                break;
            case '2' : setNFT('받은 알림 내역이 없습니다.')
                break;
        }
    }

    useEffect(()=>{
        textCase()
    },[tag])

    return (
        <>
            <div className={"not-found-container"}>
                <span className={"not-found-icon"}>
                    <i className="bi bi-exclamation-triangle"></i>
                </span>
                <span className={"not-found-text"}>
                    {nFT}
                </span>
                <button className={"not-found-btn"} onClick={()=>navigate(-1)}>
                    이전으로
                </button>
            </div>
        </>
    )
}

export default NotFound