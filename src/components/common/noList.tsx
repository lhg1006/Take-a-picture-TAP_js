import React from "react";
import "../../css/pages/notFound/notFound.css"
import {useNavigate} from "react-router-dom";


const NoList = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className={"not-found-container"}>
                <span className={"not-found-icon"}>
                    <i className="bi bi-box2-heart"></i>
                </span>
                <span className={"not-found-text"}>
                    아직 받은 좋아요가 없습니다.
                </span>
                <button className={"not-found-btn"} onClick={()=>navigate(-1)}>
                    이전으로
                </button>
            </div>
        </>
    )
}

export default NoList