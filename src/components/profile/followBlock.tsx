import React, { useState } from "react";

const FollowBlock = () => {
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const handleContact = () => {

    }

    return (
        <div className="follow-block">
            <button
                className={isFollowing ? "unfollow-button" : "follow-button common-button"}
                onClick={toggleFollow}
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
