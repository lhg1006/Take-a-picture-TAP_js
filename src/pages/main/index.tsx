import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {commonAction} from "../../reducers/common";
import {commonType} from "../../types/commonType";
import {feedAction} from "../../reducers/feed";
import {getFeedList} from "../../api/call/feed";
import {FeedStateType} from "../../types/feedTypes";
import Card from "../../components/feed/card";

const MainPage = () => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector((state: commonType) => state.common)
  const {list, comment} = useSelector((state: FeedStateType) => state.feed.feedList)

  useEffect(() => {
    dispatch(commonAction.setIsLoading(true))

    getFeedList().then((res) => {
      dispatch(feedAction.setFirstPage(res.data))
      setTimeout(() => {
        dispatch(commonAction.setIsLoading(false))
      }, 2000)
    })

  }, [])

  return (
    <div className={"main-wrapper"}>
      <div className={"content-wrapper"}>
        {list.length > 0 ?
          list.map((data) => {
            const targetComment = comment.filter((co: { postNo: number; }) => co.postNo === data.autoNo)
            return (
              <Card key={data.autoNo} data={data} targetComment={targetComment} />
            )
          }) : <div>not found . . .</div>}

        {isLoading &&
            <h1>
                <FontAwesomeIcon icon={faSpinner} spin/>
            </h1>
        }
      </div>
    </div>
  )
}
export default MainPage