import React, {useState} from "react";
import {SlPaperPlane} from "react-icons/sl";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {commonAction} from "../../reducers/common";
import {getCookie} from "../../utills";
import {IoIosArrowBack} from "react-icons/io";

const  Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const isLogin = getCookie('isLogin')
    const dispatch = useDispatch()
    const [flag, setFlag] = useState<boolean>(true)

    const onLogoClickBind = () =>{
        window.scrollTo(0, 0)
        if(flag){
            setFlag(false)
            dispatch(commonAction.setCall())
            setTimeout(()=>setFlag(true), 2000)
        }
    }
    const onAlimIconClick = () => {
        navigate('/alim')
    }
    const onMessageClick = () => {
        // navigate('/message/list')
    }

    return (
        <>
            {isLogin &&
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <div className="navbar-brand" onClick={onLogoClickBind}>
                            {pathname !== "/main" && <IoIosArrowBack onClick={()=>navigate(-1)}/> }
                            <img src={"/lhg-camera-removebg.png"} style={{transform: "scale(0.7)", width: "48px", height: "48px"}}
                                 alt={"로고"}></img>
                        </div>
                        <div>
                            <span className={"header-alim-icon"} onClick={onAlimIconClick}><i
                                className="bi bi-bell fs20"></i></span>
                            {/*<span className="line"></span>*/}
                            {/*<span className={"header-airplane-icon"} onClick={onMessageClick}><SlPaperPlane className={'fs20'}/></span>*/}
                        </div>
                    </div>
                </nav>
            }
        </>
    )

}

export default Header;