import React, {useEffect} from "react";
import {getCookie} from "../../utills";
import DropdownBox from "../../components/common/dropdown";

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
              <DropdownBox />
          </div>
      }
    </>
  )
}
export default MyPage