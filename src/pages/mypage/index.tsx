import React, {useEffect} from "react";
import {getCookie} from "../../utills";

const MyPage = () => {
  const isLogin = getCookie('isLogin')
  useEffect(()=>{
    if(!isLogin){
      window.location.replace("/")
      return;
    }
  })
  return(
    <>
      {isLogin &&
          <div className={"main-wrapper"} >
              <div>My Page</div>
          </div>
      }
    </>
  )
}
export default MyPage