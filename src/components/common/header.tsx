import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {logout} from "../../api/call/auth";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {loginAction} from "../../reducers/login";
import DropdownBox from "./dropdown";
import {getCookie} from "../../utills";
import {FcLinux} from "react-icons/fc";

const Header = () => {
  const isLogin = getCookie("isLogin")
  const navigator = useNavigate()
  const dispatch = useDispatch()

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/main'}>
          _ _ _  <FcLinux className={'fs30'}/>
        </Link>
        <DropdownBox />
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            {!isLogin ?
              (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/sign-in'}>
                            Login
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={'/sign-up'}>
                            Sign up
                        </Link>
                    </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link" to={'/main'}>
                      home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/my-page'}>
                      MyPage
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a type={"button"} className="nav-link" onClick={() => {
                      logout().then((res) => {
                        if (res.data === 1) {
                          const param = {
                            login:false,
                            email:""
                          }
                          dispatch(loginAction.setIsLogin(param))
                          toast.success("logout")
                          navigator("/")
                        }
                      })
                    }}>
                      Logout
                    </a>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  )

}

export default Header;