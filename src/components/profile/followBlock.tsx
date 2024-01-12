import React, {useEffect, useState} from "react";
import {addFollow, delFollow, isFollowed} from "../../api/call/newFeed";
import {getCookie} from "../../utills";

const FollowBlock = ({followerEmail, followMemNo} : {followerEmail:string; followMemNo: string}) => {
    const [isFollowing, setIsFollowing] = useState(false);
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
                    setIsFollowing(true);
                }
            })
        } else {
            delFollow(param).then((res)=>{
                if(res.data === 1){
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
        <div className="follow-block">
            <button
                className={isFollowing ? "unfollow-button" : "follow-button common-button"}
                onClick={(e)=> toggleFollow(e)}
            >
                {isFollowing ? "팔로우 취소" : "팔로우"}
            </button>
            <button className="contact-button common-button" onClick={handleContact}>
                연락하기
            </button>
        </div>

    );
};

export default FollowBlock;
