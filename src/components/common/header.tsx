import React, {useState} from "react";
import {SlPaperPlane} from "react-icons/sl";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {commonAction} from "../../reducers/common";
import {getCookie} from "../../utills";
import {IoIosArrowBack} from "react-icons/io";


const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const isLogin = getCookie('isLogin')
    const dispatch = useDispatch()
    const [flag, setFlag] = useState<boolean>(true)

    const onLogoClick = () =>{
        window.scrollTo({top:0, behavior:"smooth"})

        if(flag){
            setFlag(false)
            dispatch(commonAction.setCall())
            setTimeout(()=>setFlag(true), 2000)
        }
    }
    const onAlimIconClick = () => {
        navigate('/alim')
    }

    return (
        <>
            {isLogin &&
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container navbar-container-warp">
                        <div className="navbar-brand" onClick={onLogoClick}>
                            {pathname !== "/new-feed" && <IoIosArrowBack onClick={()=>navigate(-1)}/> }
                            <img src={"/img/icons8-instagram-48.png"} style={{transform: "scale(0.7)"}}
                                 alt={"인스타아이콘"}></img>
                        </div>
                        <div>
                            <span className={"header-alim-icon"} onClick={onAlimIconClick}><i
                                className="bi bi-bell fs20"></i></span>
                            <span className="line"></span>
                            <span className={"header-airplane-icon"}><SlPaperPlane className={'fs20'}/></span>
                        </div>
                    </div>
                </nav>
            }
        </>
    )

}

export default Header;