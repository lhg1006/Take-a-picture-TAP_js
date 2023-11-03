import React, {useEffect, useState} from "react";
import {getCookie} from "../../utills";
import DropdownBox from "../../components/common/dropdown";
import AddProfilePhoto from "../../components/profile/addProfilePhoto";
import {myPageData} from "../../api/call/member";
import {MemberSelectType} from "../../types/member";
import {BsFillPersonFill} from "react-icons/bs";

const MyPage = () => {
    const isLogin = getCookie('isLogin')
    const cookieEmail = getCookie("memberEmail")
    const [memData, setMemData] = useState<MemberSelectType>()
    const photoUrl : any = process.env.REACT_APP_PHOTO_URL;


    useEffect(() => {
        if (!isLogin) {
            window.location.replace("/")
            return;
        } else {
            myPageData(cookieEmail).then((res) => {
                console.log(res)
                setMemData(res.data)
            })
        }
    }, [])

    return (
        <>
            {isLogin &&
                (<div className={"main-wrapper"}>
                    <div className={'d-flex align-items-center'}>
                        <div className={"my-profile-img-box flex-grow-0 m-3"}>
                            {memData?.profile.profileImg !== null
                                ? <img className="my-profile-img"
                                       src={photoUrl + memData?.profile.profileImg}
                                       alt={"프로필이미지"}/>
                                : <BsFillPersonFill className="comment-profile-img"/>}
                        </div>

                        <div className={"flex-grow-2"}>
                            <div className="container text-center">
                                <div className="row row-cols-2">
                                    <div className={"col"}>
                                        <div>{memData?.profile.email}</div>
                                        <div>{memData?.profile.name}</div>
                                    </div>
                                    <div className={"col"}>
                                        <div>follower</div>
                                        <div>follow</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"flex-grow-1"}>
                            <DropdownBox/>
                        </div>

                    </div>
                    <AddProfilePhoto/>
                    <div className="container text-center" style={{marginLeft:'4px'}}>
                        <div className="row row-cols-3 justify-content-start">
                            {memData?.posts.map((data) => {
                                return (
                                        <div className="col my-img-field" key={data.id}>
                                            <div data-user-mail={data.userMail} data-post-no={data.id}>
                                                <img className={"my-feed-img"} src={photoUrl+data.imagePath} alt={"게시물"}/>
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}
export default MyPage