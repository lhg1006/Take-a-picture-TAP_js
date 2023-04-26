import React, {useEffect, useState} from "react"
import {getLikeList} from "../../api/call/newFeed";
import {LikeListType} from "../../types/newFeedType";
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {CommonType} from "../../types/commonType";
import {commonAction} from "../../reducers/common";
import {getCookie} from "../../utills";
import {BsFillPersonFill} from "react-icons/bs";

interface CurrentTargetDataset{
    userMail: string
}
const LikeListPage = () => {
    const {state} = useLocation();
    const cookieEmail = getCookie("memberEmail")
    const dispatch = useDispatch()
    const isLoading = useSelector((state: CommonType) => state.common.isLoading)
    const [likeList, setLikeList] = useState<LikeListType[]>([])
    useEffect(() => {
        dispatch(commonAction.setIsLoading(true))
        getLikeList(state).then(async (res) => {
            await setLikeList([...res.data])
            dispatch(commonAction.setIsLoading(false))
        })
    }, [])

    const onFollowButton = (e: React.MouseEvent<HTMLElement>) => {
        const {userMail} = e.currentTarget.dataset as unknown as CurrentTargetDataset
        if (e.currentTarget.classList.contains('btn-primary')) {
            e.currentTarget.classList.remove('btn-primary');
            e.currentTarget.classList.add('btn-secondary');
        } else {
            e.currentTarget.classList.remove('btn-secondary');
            e.currentTarget.classList.add('btn-primary');
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
                                                       src={data.profileImg}
                                                       alt={"프로필이미지"}/>
                                                : <BsFillPersonFill className="profile-img"/>}
                                        </div>
                                        <div className={"p-1"} style={{marginRight: "auto"}}>
                                        <span>
                                            <span className={'d-flex justify-content-start'}>{data.userMail}</span>
                                            <span className={'d-flex justify-content-start'} style={{color: "dimgrey"}}>{data.name}</span>
                                        </span>
                                        </div>
                                        {cookieEmail !== data.userMail &&
                                        <button className="btn btn-primary like-follow-button"
                                                data-user-mail={data.userMail}
                                                onClick={(e)=>onFollowButton(e)}
                                                type="button">
                                            팔로우
                                        </button>}
                                    </div>
                                    <hr/>
                                </div>
                            )
                        })
                    }
                </div>)
                : <div>not found . . .</div>
            }
        </div>
    )
}
export default LikeListPage