import React, {useCallback, useRef} from "react"
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getCookie} from "../../utills";
import {useDispatch} from "react-redux";
import {addComment} from "../../api/call/newFeed";
import {AddCommentType} from "../../types/newFeedType";
import {commonAction} from "../../reducers/common";

const AddComment = ({ postNo, postMemNo } : { postNo:number; postMemNo:string }) =>{
  const dispatch = useDispatch()
  const cookieEmail = getCookie("memberEmail")
  const cookieNo = getCookie("memberNo")

  const method = useForm<AddCommentType>({
    defaultValues: {
      sendMemNo : cookieNo,
      receiveMemNo : postMemNo,
      postId : postNo,
      userMail : cookieEmail,
      content: ""
    }
  })
  const onAddComment = (data: AddCommentType) => {
    if(textRef.current.value.trim() === ""){
      textRef.current.focus()
      return;
    }
    addComment(data).then( (res) => {
      if(res.data === 1){
        textRef.current.value = ""
        dispatch(commonAction.setCall())
      }else{
        toast.error("Failure . . .")
      }
    })
  }

  const textRef = useRef<any>();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
    method.setValue("content", textRef.current.value)
  }, []);

  return(
    <>
      <div className={'mt-2 mb-2'}>
        <textarea className={'text-area-container'} cols={10} rows={1} maxLength={300}
                  ref={textRef}
                  onInput={handleResizeHeight}
                  style={{marginLeft:"10px"}}
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