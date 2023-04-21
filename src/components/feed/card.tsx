import React, {useState} from "react";
import {CommentResultType, FeedResultType} from "../../types/feedTypes";
import AddComment from "../addComment";
import {TfiMore} from 'react-icons/tfi';
import {TiDeleteOutline} from "react-icons/ti"
import {Modal} from "../common/modal";
import {getCookie} from "../../utills";
import {delComment, getFeedList} from "../../api/call/feed";
import {toast} from "react-toastify";
import {feedAction} from "../../reducers/feed";
import {useDispatch} from "react-redux";
import {CustomConfirm} from "../common/customConfirm";

const Card = ({data, targetComment}: { data: FeedResultType; targetComment: CommentResultType[] }) => {
  const dispatch = useDispatch()
  const cookieMemberEmail = getCookie("memberEmail")
  const [isMoreView, setIsMoreView] = useState<boolean>(false)

  const [likeList, setLikeList] = useState<string[]>([])
  const onLike = (e: any) => {
    const data = e.currentTarget.dataset.url
    if (likeList.includes(data)) {
      setLikeList(likeList.filter(li => li !== data))
    } else {
      setLikeList([...likeList, data])
    }
  }

  const [bookmarkList, setBookmarkList] = useState<string[]>([])
  const onBookmark = (e: any) => {
    const data = e.currentTarget.dataset.url
    if (bookmarkList.includes(data)) {
      setBookmarkList(bookmarkList.filter(li => li !== data))
    } else {
      setBookmarkList([...bookmarkList, data])
    }
  }

  const onDeleteComment = (data: CommentResultType) => {
    CustomConfirm(
      {
        title: "Delete Comment?",
        onConfirm: () => {
          delComment(data).then((res) => {
            if (res.data == 1) {
              getFeedList().then((res) => {
                dispatch(feedAction.setFirstPage(res.data))
              })
              toast.success("Delete success")
            } else {
              toast.error("Delete fail ...")
            }
          })
        }
      })
  }

  const [modalOpen, setModalOpen] = useState(false);
  const onMoreComment = () => {
    setModalOpen(true)
  }
  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="main-page-card card border-dark mb-3 wd-25r">
        <div className="card-header fw-bold"><i className="bi bi-instagram"></i> {data.memberEmail}</div>
        <img src={data.photoUrl} className="card-img-top" alt="..."/>
        <div className={"card-header"} style={{borderTop: "0.1rem solid"}}>
          <i className={`card-heart-icon ${likeList.includes(data.photoUrl) ? "bi-heart-fill" : "bi-heart"}`}
             data-url={data.photoUrl}
             onClick={(e) => onLike(e)}></i>
          <i className="bi bi-chat card-chat-icon" onClick={onMoreComment}></i>
          <i className="bi bi-send card-send-icon"></i>
          <i
            className={`card-bookmark-icon ${bookmarkList.includes(data.photoUrl) ? "bi bi-bookmark-fill" : "bi bi-bookmark"}`}
            data-url={data.photoUrl}
            onClick={(e) => onBookmark(e)}></i>
        </div>

        <div className="card-body">
          <div>
            <div className={'card-header-text'}>
              {data.contents}
            </div>
            {targetComment.map((data, idx) => {
              return (
                <div key={idx}>
                  {idx < 3 &&
                      <div className={'d-flex'}>
                          <span className={'p-1'}>{data.rmemberEmail} </span>
                          <span className={`p-1 ${isMoreView ? "text-limit-none" : "text-limit"}`}
                                onClick={() => setIsMoreView(!isMoreView)}>
                            {data.comment}
                          </span>
                        {data.rmemberEmail === cookieMemberEmail &&
                            <div className={'p-1 comment-del-icon'}>
                                <TiDeleteOutline className={'cursor'} onClick={() => {
                                  onDeleteComment(data)
                                }}/>
                            </div>
                        }
                          <br/>
                      </div>
                  }
                </div>
              )
            })}
            {targetComment.length > 3 &&
                <div onClick={onMoreComment} style={{marginLeft: "3px", cursor: "pointer"}}>
                    <TfiMore/>
                </div>
            }
            <Modal open={modalOpen} close={modalClose} header="More Comments">
              {targetComment.map((data, idx) => {
                return (
                  <div key={idx}>
                    <div className={'d-flex'}>
                      <span className={'p-1'}>{data.rmemberEmail} </span>
                      <span className={`p-1 text-limit-none`}>{data.comment}</span>
                      {data.rmemberEmail === cookieMemberEmail &&
                          <div className={'p-1 comment-del-icon-modal'}>
                              <TiDeleteOutline className={'cursor'} onClick={() => {
                                onDeleteComment(data)
                              }}/>
                          </div>
                      }
                      <br/>
                    </div>
                  </div>
                )
              })}
              <AddComment postNo={data.autoNo}/>
            </Modal>
          </div>
        </div>
        <AddComment postNo={data.autoNo}/>
      </div>
    </>
  )
}

export default Card