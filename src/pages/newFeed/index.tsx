import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {commonAction} from "../../reducers/common";
import {CommonTypes} from "../../types/commonTypes";
import {getCookie} from "../../utills";
import NewCard from "../../components/newFeed/newCard";
import {getNewFeedList} from "../../api/call/newFeed";
import {FeedListType} from "../../types/newFeedType";

const NewFeed = () => {
    const dispatch = useDispatch()
    const isLogin = getCookie('isLogin')
    const cookieMemberEmail = getCookie("memberEmail")
    const {isLoading, isCall} = useSelector((state: CommonTypes) => state.common)
    const [list, setList] = useState<FeedListType[]>([])

    useEffect(() => {
        if (!isLogin) {
            window.location.replace("/")
        } else {
            dispatch(commonAction.setIsLoading(true))
        }
    }, [])

    useEffect(() => {
        const param = {
            userMail: cookieMemberEmail
        }
        getNewFeedList(param).then((res) => {
            setList([...res.data.postList])
            setTimeout(() => dispatch(commonAction.setIsLoading(false)), 500);
        })
    }, [isCall])

    return (
        <div className={"main-wrapper"}>
            {isLoading ? <h1 style={{position:"relative", top:"340px"}}><FontAwesomeIcon icon={faSpinner} spin/></h1> : list.length > 0
                ? list.map((item) => <NewCard key={item.id} data={item}/>)
                : <div>not found . . .</div>
            }
        </div>
    )
}
export default NewFeed;