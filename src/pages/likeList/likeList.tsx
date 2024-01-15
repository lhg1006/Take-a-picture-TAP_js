import React, {useEffect, useState} from "react"
import {addFollow, delFollow, getFollowList, getLikeList} from "../../api/call/newFeed";
import {FollowListType, LikeListType} from "../../types/newFeedType";
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {CommonTypes} from "../../types/commonTypes";
import {commonAction} from "../../reducers/common";
import {getCookie} from "../../utills";
import {BsFillPersonFill} from "react-icons/bs";
import NoList from "../../components/common/noList";

interface CurrentTargetDataset{
    userMail: string
}
const LikeListPage = () => {
    const {state} = useLocation();
    const cookieEmail = getCookie("memberEmail")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [likeList, setLikeList] = useState<LikeListType[]>([])
    // const dispatch = useDispatch()
    // const isLoading = useSelector((state: CommonTypes) => state.common.isLoading)
    // const [followList, setFollowList] = useState<FollowListType[]>([])
    useEffect(() => {
        // dispatch(commonAction.setIsLoading(true))
        getLikeList(state).then((res) => {
            setLikeList([...res.data])
            setIsLoading(false);
        })
        // getFollowList(cookieEmail).then((res)=>{
        //     setFollowList([...res.data])
        // })
        // dispatch(commonAction.setIsLoading(false))
    }, [])

    const onFollowButton = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget
        const {userMail} = target.dataset as unknown as CurrentTargetDataset

        const param = {
            followerEmail : cookieEmail,
            followingEmail : userMail
        }

        if (target.classList.contains('btn-primary')) {
            addFollow(param).then((res)=>{
                if(res.data === 1){
                    target.classList.remove('btn-primary');
                    target.classList.add('btn-secondary');
                }
            })
        } else {
            delFollow(param).then((res)=>{
                if(res.data === 1){
                    target.classList.remove('btn-secondary');
                    target.classList.add('btn-primary');
                }
            })
        }

    }


    return (
        <div className={"main-wrapper"}>
            {isLoading ? <h1 style={{position: "relative", top: "340px"}}><FontAwesomeIcon icon={faSpinner} spin/>
            </h1> : likeList.length > 0
                ? (<div>
                    <div className={"pulse-text2 fs15 mt-3 mb-3 fw-bold"}>{likeList.length}명이 좋아함</div>
                    <hr/>
                    {likeList.length > 0 &&
                        likeList.map((data) => {
                            return (
                                <div style={{maxHeight: "100px"}} key={data.id}>
                                    <div className={"d-flex justify-content-center p-1"}>
                                        <div className="profile-img-box" style={{background: "#BDBDBD"}}>
                                            {data.profileImg !== null
                                                ? <img className="profile-img"
                                                       src={process.env.REACT_APP_PHOTO_URL + data.profileImg}
                                                       alt={"프로필이미지"}/>
                                                : <BsFillPersonFill className="profile-img"/>}
                                        </div>
                                        <div className={"p-1"} style={{marginRight: "auto"}}>
                                        <span>
                                            <span className={'d-flex justify-content-start'}>{data.userMail}</span>
                                            <span className={'d-flex justify-content-start'} style={{color: "dimgrey"}}>{data.name}</span>
                                        </span>
                                        </div>
                                        {cookieEmail !== data.userMail && <button>팔로우</button>
                                        /*<button className={`btn ${followList.some( fo => fo.followingEmail === data.userMail) ? 'btn-secondary' : 'btn-primary' } like-follow-button`}
                                                data-user-mail={data.userMail}
                                                onClick={(e)=>onFollowButton(e)}
                                                type="button">
                                            팔로우
                                        </button>*/}
                                    </div>
                                    <hr/>
                                </div>
                            )
                        })
                    }
                </div>)
                : <NoList />
            }
        </div>
    )
}
export default LikeListPage