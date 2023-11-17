import React, {useEffect, useState} from "react";
import {addFollow, delFollow, isFollowed} from "../../api/call/newFeed";
import {getCookie} from "../../utills";

const FollowBlock = ({followerEmail} : {followerEmail:string}) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const cookieEmail = getCookie("memberEmail")

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
            followerEmail : followerEmail
        }

        if (target.classList.contains('follow-button')) {
            addFollow(param).then((res)=>{
                if(res.data === 1){
                    setIsFollowing(true);
                }
            })
        } else {
            setIsFollowing(false);
            // delFollow(param).then((res)=>{
            //     if(res.data === 1){
            //         target.classList.remove('btn-secondary');
            //         target.classList.add('btn-primary');
            //     }
            // })
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
