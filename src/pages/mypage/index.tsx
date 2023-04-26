import React, {useEffect} from "react";
import {getCookie} from "../../utills";
import DropdownBox from "../../components/common/dropdown";
import AddProfilePhoto from "../../components/profile/addProfilePhoto";

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
            <div>
              드롭다운박스
              <DropdownBox />
            </div>
              <div>
                프로필사진등록하기
                <AddProfilePhoto />
              </div>
              
          </div>
      }
    </>
  )
}
export default MyPage