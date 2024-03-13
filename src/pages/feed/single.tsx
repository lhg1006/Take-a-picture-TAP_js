import React, {useEffect, useState} from "react"
import NewCard from "../../components/newFeed/newCard";
import {getSingleView} from "../../api/call/newFeed";
import {FeedListType} from "../../types/newFeedType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {AxiosResponse} from "axios";
import {getCookie} from "../../utills";
import {useLocation} from "react-router-dom";
import NotFound from "../../components/common/notFound";
import {useSelector} from "react-redux";
import {CommonTypes} from "../../types/commonTypes";


const SingView = () => {
    const cookieEmail = getCookie("memberEmail")
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const postNo = searchParams.get('postNo') as string;
    const [post, setPost] = useState<FeedListType | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {isCall} = useSelector((state: CommonTypes) => state.common)

    useEffect(() => {
        const param = {
            userMail: cookieEmail,
            postNo: +postNo
        }
        getSingleView(param).then((res : AxiosResponse<FeedListType>) => {
            if (res.data.postState !== -99) {
                setPost(res.data);
            }
            setIsLoading(false)
        })
    }, [isCall])


    return(
        <div className='main-wrapper'>
            {isLoading ? <h1 style={{position:"relative", top:"340px"}}><FontAwesomeIcon icon={faSpinner} spin/></h1> : post != undefined
                ?  <NewCard data={post}/>
                :  <NotFound tag={'1'}/>
            }
        </div>
    )
}

export default SingView