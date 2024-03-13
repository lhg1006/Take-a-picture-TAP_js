import React, {useEffect, useRef, useState} from "react"
import NewCard from "../../components/newFeed/newCard";
import {useLocation} from "react-router-dom";
import { getTargetFeedList } from "../../api/call/newFeed";
import {FeedListType} from "../../types/newFeedType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import NotFound from "../../components/common/notFound";


const FeedView = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email') as string;
    const postNo = searchParams.get('postNo') as string;
    const [list, setList] = useState<FeedListType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageNo, setPageNo] = useState<number>(1);
    const postRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const param = {
            userMail: email,
            pageNo:pageNo,
        }
        getTargetFeedList(param).then((res) => {
            setList([...res.data.postList])
            setIsLoading(false)
        })
    }, [])


    useEffect(() => {
        if(postNo != null || postNo != undefined){
            if (postNo && postRef.current) {
                window.scrollTo({
                    top: postRef.current.offsetTop,
                    behavior:"auto"
                });
            }
        }
    }, [postNo,postRef.current]);


    return(
        <div className='main-wrapper'>
            {isLoading ? <h1 style={{position:"relative", top:"340px"}}><FontAwesomeIcon icon={faSpinner} spin/></h1> : list.length > 0
                ? list.map((item) => (
                    <div key={item.id} ref={item.id === +postNo ? postRef : null} data-post-no={item.id}>
                        <NewCard key={item.id} data={item}/>
                    </div>
                ))
                : <NotFound tag={'1'}/>
            }
        </div>
    )
}

export default FeedView