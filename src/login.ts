import {getCookie} from "./utills";

const IsLogin = () =>{
  if(!getCookie('isLogin')){
    alert("로그인이 필요한 페이지입니다.")
    window.location.replace("/")
  }
}

export default IsLogin