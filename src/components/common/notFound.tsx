import React, {useEffect, useState} from "react";
import "../../css/pages/notFound/notFound.css"
import {useNavigate} from "react-router-dom";


const NotFound = ({tag} : {tag:string}) => {
    const navigate = useNavigate()
    const [text, setText] = useState<string>('')
    const textCase = () => {
        switch (tag){
            case '0' : setText('새로운 피드가 없습니다\n먼저 피드를 게시해 보세요');
                break;
            case '1' : setText('삭제되었거나 존재하지 않는 게시물입니다.')
                break;
            case '2' : setText('받은 알림 내역이 없습니다.')
                break;
        }
    }

    useEffect(()=>{
        textCase()
    },[tag])

    const notFoundButton = () => {
        if(tag === '0'){
            navigate('/add-post')
        }else{
            navigate(-1)
        }
    }

    return (
        <>
            <div className={"not-found-container"}>
                <span className={"not-found-icon"}>
                    <i className="bi bi-exclamation-triangle"></i>
                </span>
                <span className={"not-found-text"}>
                    {text.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </span>
                <button className={"not-found-btn"} onClick={notFoundButton}>
                    {tag === '0' ? '게시물 올리기' : '이전으로'}
                </button>
            </div>
        </>
    )
}

export default NotFound