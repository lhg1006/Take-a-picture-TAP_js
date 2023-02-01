import React, {Dispatch, SetStateAction} from "react"
import {useForm} from "react-hook-form";
import {addComment, getFeedList} from "../../api/call/feed";
import {CommentResultType} from "../../types/feedTypes";
import {toast} from "react-toastify";
import {getCookie} from "../../utills";
import {feedAction} from "../../reducers/feed";
import {commonAction} from "../../reducers/common";
import {useDispatch} from "react-redux";

const AddComment = ({postNo} : {postNo:number}) =>{
  const dispatch = useDispatch()
  const rmemberEmail = getCookie("memberEmail")

  const method = useForm<CommentResultType>({
    defaultValues: {
      postNo,
      rmemberEmail,
      comment: ""
    }
  })
  const onAddComment = (data: CommentResultType) => {
    addComment(data).then( (res) => {
      if(res.data === 1){
        method.reset()
        getFeedList().then((res) => {
          dispatch(feedAction.setFirstPage(res.data))
        })
        toast.success("Add Comment Success")
      }else{
        toast.error("Failure . . .")
      }
    })
  }

  return(
    <>
      <div style={{marginTop:"10px", marginBottom:"7px"}}>
        <textarea style={{width: "85%", resize: "none"}} cols={10} rows={1} maxLength={300}
                  placeholder={"Add comment..."} {...method.register("comment", {required:"입력하세요."})} />
        <a className={"btn-btn"}
           style={{position: "relative", top: "-2px", float: "right", marginRight: "10px"}}>
          <div onClick={method.handleSubmit(onAddComment)}>
            <span><i className="bi bi-chat-right-text-fill" style={{fontSize: "1.5rem", color: "black"}}></i></span>
          </div>
        </a>
      </div>
    </>
  )
}

export default AddComment