import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getFollowList} from "../../api/call/newFeed";

const FollowList = () =>{
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type') as string;
    const email = searchParams.get('email') as string;
    const [followList, setFollowList] = useState<any>([])


    useEffect(()=>{
        const param = { email, type }
        getFollowList(param).then((res)=>{
            setFollowList([... res.data]);
        })
    },[])

    return(
        <div className={"main-wrapper"}>
            {followList != null && followList.map((item: any) => (
                <div key={item.followerAutoNo}>
                    <div>User Email: {item.userEmail}</div>
                    <div>Follower Email: {item.followerEmail}</div>
                    <div>Follow Time: {item.followTime}</div>
                </div>
            ))}
        </div>
    )
}
export default FollowList