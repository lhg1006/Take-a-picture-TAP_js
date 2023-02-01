import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {logout} from "../../api/call/auth";
import {loginAction} from "../../reducers/login";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../../utills";

const DropdownBox = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const isLogin = getCookie("isLogin")
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {!isLogin ? (
          <>
        <Dropdown.Item href="/sign-in"><i className="bi bi-door-open"></i> Login</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/sign-up"><i className="bi bi-door-open-fill"></i> Sign up</Dropdown.Item>
        </>) : (<>
        <Dropdown.Item href="/main"><i className="bi bi-house"></i> home</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/mypage"><i className="bi bi-house-gear-fill"></i> MyPage</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={()=>{
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
        }} ><i className="bi bi-box-arrow-in-left"></i> Logout</Dropdown.Item>
        </>)}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownBox;