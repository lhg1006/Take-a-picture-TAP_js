import React, {useEffect, useState} from "react";
import {addFollow, delFollow, isFollowed} from "../../api/call/newFeed";
import {getCookie} from "../../utills";
import {useNavigate} from "react-router-dom";
import "../../css/component/followBlock.css"
interface FollowBlockType {
    flwCnt:number;
    setFlwCnt: React.Dispatch<React.SetStateAction<number>>;
    followerEmail:string;
    followMemNo: string
}
const FollowBlock = ({flwCnt, setFlwCnt, followerEmail, followMemNo}: FollowBlockType) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const navigator = useNavigate()
    const cookieEmail = getCookie("memberEmail")
    const cookieMemNo = getCookie("memberNo")

    useEffect(()=>{
        const param = {
            userEmail : cookieEmail,
            followerEmail : followerEmail
        }

        isFollowed(param).then((res)=>{
            if(res.data === 1){
                setIsFollowing(true)

            }
        })
    },[])

    const toggleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget

        const param = {
            userEmail : cookieEmail,
            userMemNo : cookieMemNo,
            followerEmail : followerEmail,
            followMemNo: followMemNo
        }

        if (target.classList.contains('follow-button')) {
            addFollow(param).then((res)=>{
                if(res.data === 1){
                    setFlwCnt(flwCnt+1)
                    setIsFollowing(true);
                }
            })
        } else {
            delFollow(param).then((res)=>{
                if(res.data === 1){
                    setFlwCnt(flwCnt-1)
                    setIsFollowing(false);
                }
            })
        }
    };

    const onFollowButton = (e: React.MouseEvent<HTMLElement>) => {


    }

    const handleContact = () => {

    }

    return (
        <div className="follow-block-container">
            <div className={'follow-block-btn-area'}>
                <button
                    className={isFollowing ? "unfollow-button" : "follow-button common-button"}
                    onClick={(e)=> toggleFollow(e)}
                >
                    {isFollowing ? "팔로우" : "팔로우"}
                </button>
                <button className="contact-button common-button" onClick={handleContact}>
                    메시지
                </button>
            </div>
        </div>
    );
};

export default FollowBlock;
