import React, {useCallback, useRef} from "react"
import {useForm} from "react-hook-form";
import {addComment, getFeedList} from "../../api/call/feed";
import {CommentResultType} from "../../types/feedTypes";
import {toast} from "react-toastify";
import {getCookie} from "../../utills";
import {feedAction} from "../../reducers/feed";
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
    if(textRef.current.value.trim() === ""){
      textRef.current.focus()
      return;
    }
    addComment(data).then( (res) => {
      if(res.data === 1){
        textRef.current.value = ""
        getFeedList().then((res) => {
          dispatch(feedAction.setFirstPage(res.data))
        })
        toast.success("Add Comment Success")
      }else{
        toast.error("Failure . . .")
      }
    })
  }

  const textRef = useRef<any>();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
    method.setValue("comment", textRef.current.value)
  }, []);

  return(
    <>
      <div className={'mt-2 mb-2'}>
        <textarea className={'text-area-container'} cols={10} rows={1} maxLength={300}
                  ref={textRef}
                  onInput={handleResizeHeight}
                  placeholder={" Add comment..."}  />
        <a className={"btn-btn card-comment-icon"}>
          <div onClick={method.handleSubmit(onAddComment)}>
            <span><i className="bi bi-chat-right-text-fill "></i></span>
          </div>
        </a>
      </div>
    </>
  )
}

export default AddComment