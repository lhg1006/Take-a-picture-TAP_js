import React, {useState} from "react";
import {CommentResultType, FeedResultType} from "../../types/feedTypes";
import AddComment from "../../pages/addComment";
import {TfiMore} from 'react-icons/tfi';
import {TiDeleteOutline} from "react-icons/ti"
import {Modal} from "../common/modal";
import {getCookie} from "../../utills";
import {delComment, getFeedList} from "../../api/call/feed";
import {toast} from "react-toastify";
import {feedAction} from "../../reducers/feed";
import {useDispatch} from "react-redux";

const Card = ({data, targetComment}: { data: FeedResultType; targetComment: CommentResultType[] }) => {
  const dispatch = useDispatch()
  const [likeList, setLikeList] = useState<string[]>([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])
  const cookieMemberEmail = getCookie("memberEmail")

  const onLike = (e: any) => {
    const data = e.currentTarget.dataset.url
    if (likeList.includes(data)) {
      setLikeList(likeList.filter(li => li !== data))
    } else {
      setLikeList([...likeList, data])
    }
  }

  const onBookmark = (e: any) => {
    const data = e.currentTarget.dataset.url
    if (bookmarkList.includes(data)) {
      setBookmarkList(bookmarkList.filter(li => li !== data))
    } else {
      setBookmarkList([...bookmarkList, data])
    }
  }

  const onDeleteComment = (data:CommentResultType) => {
    delComment(data).then((res)=>{
      if(res.data == 1){
        getFeedList().then((res) => {
          dispatch(feedAction.setFirstPage(res.data))
        })
        toast.success("Delete success")
      }else{
        toast.error("Delete fail ...")
      }
    })
  }

  const onMoreComment = () => {
    setModalOpen(true)
  }
  //모달 이벤트
  const modalClose = () => {
    setModalOpen(false);
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="card border-dark mb-3" style={{width: "25rem"}}>
        <div className="card-header fw-bold"><i className="bi bi-instagram"></i> {data.memberEmail}</div>
        <img src={data.photoUrl} className="card-img-top" alt="..."/>
        <div className={"card-header"} style={{borderTop: "0.1rem solid"}}>
          <i className={likeList.includes(data.photoUrl) ? "bi-heart-fill" : "bi-heart"} data-url={data.photoUrl}
             style={{fontSize: "1.5rem", color: "red", cursor: "pointer", float: "left", marginLeft: "10px"}}
             onClick={(e) => onLike(e)}></i>
          <i className="bi bi-chat"
             style={{fontSize: "1.5rem", color: "black", cursor: "pointer", float: "left", marginLeft: "25px"}}></i>
          <i className="bi bi-send"
             style={{fontSize: "1.5rem", color: "black", cursor: "pointer", float: "left", marginLeft: "20px"}}></i>
          <i className={bookmarkList.includes(data.photoUrl) ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
             data-url={data.photoUrl}
             style={{fontSize: "1.5rem", color: "black", cursor: "pointer", float: "right"}}
             onClick={(e) => onBookmark(e)}></i>
        </div>

        <div className="card-body">
          <div>
            <div style={{fontWeight: 'bold', marginRight: "10px", marginBottom: "10px"}}>
              {data.contents}
            </div>
            {targetComment.map((data, idx) => {
              return (
                <div key={idx}>
                  {idx < 3 &&
                      <div>
                          <span>{data.rmemberEmail} </span>
                          <span>{data.comment}</span>
                        {data.rmemberEmail === cookieMemberEmail &&
                            <div style={{float: "right"}}
                                 onClick={()=>{onDeleteComment(data)}} >
                                <TiDeleteOutline/>
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
                    <span>{data.rmemberEmail} </span>
                    <span>{data.comment}</span>
                    {data.rmemberEmail === cookieMemberEmail &&
                        <div style={{float: "right", marginRight: "10px"}}
                             onClick={()=>{onDeleteComment(data)}}>
                            <TiDeleteOutline/>
                        </div>
                    }
                    <br/>
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