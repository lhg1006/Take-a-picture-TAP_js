import React, {useEffect, useState} from "react";
import {getCookie} from "../../utills";
import DropdownBox from "../../components/common/dropdown";
import AddProfilePhoto from "../../components/profile/addProfilePhoto";
import {userPageData} from "../../api/call/member";
import {MemberSelectType} from "../../types/memberTypes";
import {useLocation, useNavigate} from 'react-router-dom';
import FollowBlock from "../../components/profile/followBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import "../../css/pages/userpage/userpage.css"

const UserPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email') as string;
    const isLogin = getCookie('isLogin')
    const cookieEmail = getCookie("memberEmail")
    const [memData, setMemData] = useState<MemberSelectType>()
    const photoUrl: any = process.env.REACT_APP_PHOTO_URL;
    const [isMine, setIsMine] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [flwCnt, setFlwCnt] = useState<number>(0)
    const navigator = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            window.location.replace("/")
            return;
        } else {
            if (email != null) {
                userPageData(email).then((res) => {
                    setIsMine(cookieEmail === email)
                    setMemData(res.data)
                    setFlwCnt(res.data.followerCnt)
                    setIsLoading(false)
                })
            }
        }
    }, [])

    return (
        <>
            {isLogin &&
                (<div className={"main-wrapper"}>
                    {isLoading ?
                        <h1 style={{position: "relative", top: "340px"}}><FontAwesomeIcon icon={faSpinner} spin/></h1> :
                        (
                            <>
                                <div className="info-container">
                                    <div className="row">
                                        <div className="col user-image">
                                            <div className={"my-profile-img-box mt-2"}>
                                                <AddProfilePhoto
                                                    url={memData?.profile.profileImg !== null ? photoUrl + memData?.profile.profileImg : ''}
                                                />
                                            </div>
                                            <div className={"user-info-name"}>{memData?.profile.name}</div>
                                        </div>

                                        <div className="row col-7 align-self-center">
                                            <div className="container">
                                                <div className="row user-info">
                                                    <div className={"col"}>
                                                        <div className="user-info-mail">{memData?.profile.email}</div>
                                                    </div>
                                                </div>
                                                <div className={"d-flex follow-info"}>
                                                    <div className={"col border-end"}
                                                         onClick={() => navigator(`/follow/list?type=follower&email=${memData?.profile.email}`)}>
                                                        <div className={"follow-info-text mb-1"}>게시물</div>
                                                        <div className={'follow-info-cnt'}>{memData?.followerCnt}</div>
                                                    </div>
                                                    <div className={"col border-end"}
                                                         onClick={() => navigator(`/follow/list?type=follower&email=${memData?.profile.email}`)}>
                                                        <div className={"follow-info-text mb-1"}>팔로워</div>
                                                        <div className={'follow-info-cnt'}>{flwCnt}</div>
                                                    </div>
                                                    <div className={"col"}
                                                         onClick={() => navigator(`/follow/list?type=follow&email=${memData?.profile.email}`)}>
                                                        <div className="follow-info-text mb-1 ms-3">팔로우</div>
                                                        <div className={'follow-info-cnt'}>{memData?.followCnt}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <DropdownBox/>
                                        </div>
                                    </div>
                                </div>
                                {!isMine &&
                                    <FollowBlock
                                        flwCnt={flwCnt}
                                        setFlwCnt={setFlwCnt}
                                        followerEmail={email}
                                        followMemNo={memData?.profile.memberNo as string}
                                    />}
                                <div className="container text-center">
                                    <div className="row row-cols-3 justify-content-start">
                                        {memData?.posts.map((data) => {
                                            return (
                                                <div className="col my-img-field" key={data.id}
                                                     onClick={() => navigator(`/feed/view?email=${data.userMail}`)}>
                                                    <div data-user-mail={data.userMail} data-post-no={data.id}>
                                                        <img className={"my-feed-img"} src={photoUrl + data.imagePath}
                                                             alt={"게시물"}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>)
            }
        </>
    )
}
export default UserPage