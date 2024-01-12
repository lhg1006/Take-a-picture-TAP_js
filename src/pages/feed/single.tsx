import React, {useEffect, useState} from "react"
import NewCard from "../../components/newFeed/newCard";
import {getSingleView} from "../../api/call/newFeed";
import {FeedListType} from "../../types/newFeedType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {AxiosResponse} from "axios";
import {getCookie} from "../../utills";
import {useLocation} from "react-router-dom";


const SingView = () => {
    const cookieEmail = getCookie("memberEmail")
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const postNo = searchParams.get('postNo') as string;
    const [post, setPost] = useState<FeedListType>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const param = {
            userMail: cookieEmail,
            postNo: postNo
        }
        getSingleView(param).then((res : AxiosResponse<FeedListType>) => {
            setPost(res.data)
            setIsLoading(false)
        })
    }, [])


    return(
        <div className='main-wrapper'>
            {isLoading ? <h1 style={{position:"relative", top:"340px"}}><FontAwesomeIcon icon={faSpinner} spin/></h1> : post != null
                ?  <NewCard data={post}/>
                : <div>not found . . .</div>
            }
        </div>
    )
}

export default SingView