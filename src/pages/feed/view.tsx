import React, {useEffect, useState} from "react"
import NewCard from "../../components/newFeed/newCard";
import {useLocation} from "react-router-dom";
import { getTargetFeedList } from "../../api/call/newFeed";
import {commonAction} from "../../reducers/common";
import {useDispatch, useSelector} from "react-redux";
import {CommonTypes} from "../../types/commonTypes";
import {FeedListType} from "../../types/newFeedType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";


const FeedView = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email') as string;
    const [list, setList] = useState<FeedListType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const param = {
            userMail: email
        }
        getTargetFeedList(param).then((res) => {
            setList([...res.data.postList])
            setIsLoading(false)
        })
    }, [])


    return(
        <div className='main-wrapper'>
            {isLoading ? <h1 style={{position:"relative", top:"340px"}}><FontAwesomeIcon icon={faSpinner} spin/></h1> : list.length > 0
                ? list.map((item) => <NewCard key={item.id} data={item}/>)
                : <div>not found . . .</div>
            }
        </div>
    )
}

export default FeedView