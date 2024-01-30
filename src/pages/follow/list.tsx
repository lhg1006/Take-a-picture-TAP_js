import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getFollowList} from "../../api/call/newFeed";
import {BsFillPersonFill} from "react-icons/bs";
import {FollowListType} from "../../types/newFeedType";

const FollowList = () =>{
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type') as string;
    const email = searchParams.get('email') as string;
    const [followList, setFollowList] = useState<FollowListType[]>([])
    const photoBasePath = process.env.REACT_APP_PHOTO_URL


    useEffect(()=>{
        const param = { email, type }
        getFollowList(param).then((res)=>{
            setFollowList([... res.data]);
        })
    },[])

    return(
        <div className={"main-wrapper"}>
            <div className='border-bottom mb-1 bg-primary p-2' style={{ color:'white' }}>{ type === 'follow' ? '팔로우' : '팔로워' }</div>
            {followList != null && followList.map((item: any) => (
                <div key={item.followerAutoNo}>
                    <div className="container text-center border-bottom">
                        <div className="row mb-1">
                            <div className="col align-self-center p-1">
                                <div style={{ background: "#BDBDBD", borderRadius: "50%", overflow: "hidden", width: "75px", height: "75px"}}>
                                    {item.profileImg !== null
                                        ? <img className="profile-img" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                               src={photoBasePath + item.profileImg}
                                               alt={"프로필이미지"}/>
                                        : <BsFillPersonFill className="profile-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                </div>
                            </div>
                            <div className="col align-self-center">
                                <div className='fw-bold'>{ type === 'follow' ? item.followerEmail : item.userEmail }</div>
                            </div>
                            <div className="col align-self-center">
                                <div>
                                    <button style={{ padding: "8px 16px", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
                                        팔로우
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default FollowList