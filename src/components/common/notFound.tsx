import React from "react";
import "../../css/pages/notFound/notFound.css"
import {useNavigate} from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className={"not-found-container"}>
                <span className={"not-found-icon"}>
                    <i className="bi bi-exclamation-triangle"></i>
                </span>
                <span className={"not-found-text"}>
                    삭제되었거나 존재하지 않는 게시물입니다.
                </span>
                <button className={"not-found-btn"} onClick={()=>navigate(-1)}>
                    이전으로
                </button>
            </div>
        </>
    )
}

export default NotFound