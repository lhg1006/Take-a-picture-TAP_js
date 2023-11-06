import React, {useEffect, useState} from "react";
import {getCookie} from "../../utills";
import DropdownBox from "../../components/common/dropdown";
import AddProfilePhoto from "../../components/profile/addProfilePhoto";
import {userPageData} from "../../api/call/member";
import {MemberSelectType} from "../../types/member";
import {BsFillPersonFill} from "react-icons/bs";
import {useLocation} from 'react-router-dom';
import FollowBlock from "../../components/profile/followBlock";

const UserPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const isLogin = getCookie('isLogin')
    const cookieEmail = getCookie("memberEmail")
    const [memData, setMemData] = useState<MemberSelectType>()
    const photoUrl: any = process.env.REACT_APP_PHOTO_URL;
    const [isMine, setIsMine] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        if (!isLogin) {
            window.location.replace("/")
            return;
        } else {
            if (email != null) {
                userPageData(email).then((res) => {
                    setIsMine(cookieEmail === email)
                    setMemData(res.data)
                    setLoading(false)
                })
            }
        }
    }, [])

    const profilePhotoClick = () =>{

    }

    return (
        <>
            {!loading && isLogin &&
                (<div className={"main-wrapper"}>
                    <div className={'d-flex align-items-center '}>
                        <div className={"my-profile-img-box flex-grow-0 m-3"}>
                            <AddProfilePhoto
                                url={memData?.profile.profileImg !== null  ? photoUrl + memData?.profile.profileImg : ''}
                            />
                        </div>

                        <div className={"flex-grow-2"}>
                            <div className="container text-center">
                                <div className="row row-cols-2 fw-bold">
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
                    {!isMine && <FollowBlock/>}
                    <div className="container text-center">
                        <div className="row row-cols-3 justify-content-start">
                            {memData?.posts.map((data) => {
                                return (
                                    <div className="col my-img-field" key={data.id}>
                                        <div data-user-mail={data.userMail} data-post-no={data.id}>
                                            <img className={"my-feed-img"} src={photoUrl + data.imagePath}
                                                 alt={"게시물"}/>
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
export default UserPage