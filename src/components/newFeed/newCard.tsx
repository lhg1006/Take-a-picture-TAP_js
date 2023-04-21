import React, {useState} from "react";
import {FeedListType} from "../../types/newFeedType";
import {FcImageFile} from "react-icons/fc";
import {getCookie} from "../../utills";
import {TiDeleteOutline} from "react-icons/ti";
import moment from "moment";
import {TfiMore} from "react-icons/tfi";
import {BsArrowReturnRight} from "react-icons/bs";
import {RiDeleteBack2Line} from "react-icons/ri";
import {Modal} from "../common/modal";
import AddComment from "../addComment";
import {CustomConfirm} from "../common/customConfirm";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {delComment, delPost} from "../../api/call/newFeed";
import {commonAction} from "../../reducers/common";
interface CurrentTargetDataset {
    postNo: number;
    userMail: string;
}
const NewCard = ({data}: { data: FeedListType }) => {
    const dispatch = useDispatch()

    const cookieMemberEmail = getCookie("memberEmail")

    const [modalOpen, setModalOpen] = useState(false);

    const onMoreComment = () => {
        document.body.style.overflow = 'hidden';
        setModalOpen(true)
    }
    const modalClose = () => {
        document.body.style.overflow = 'auto';
        setModalOpen(false);
    };

    const onDeleteComment = (data: {id: number, userMail: string}) => {
        CustomConfirm(
            {
                title: "Delete Comment?",
                onConfirm: () => {
                    delComment(data).then((res) => {
                        if (res.data == 1) {
                            dispatch(commonAction.setCall())
                            toast.success("Delete success")
                        } else {
                            toast.error("Delete fail ...")
                        }
                    })
                }
            })
    }
    const postDelete = (e:React.MouseEvent<HTMLSpanElement>) => {
        const {postNo, userMail} = e.currentTarget.dataset as unknown as CurrentTargetDataset
        if(userMail === cookieMemberEmail){
            CustomConfirm(
                {
                    title: "게시물을 삭제하시겠습니까?",
                    onConfirm: () => {
                        delPost({postNo, userMail}).then((res)=>{
                            if(res.data === 1){
                                dispatch(commonAction.setCall())
                                toast.success("삭제되었습니다.")
                            }else{
                                toast.error("System Error")
                            }
                        })
                    }
                })
        }else{
            toast.error("System Error . . .")
            return;
        }
    }

    return (
        <div>
            <div className="main-page-card card border-dark mb-3 wd-25r">
                <div className="card-header fw-bold"><i className="bi bi-instagram"></i> {data.postUserMail}
                    {cookieMemberEmail === data.postUserMail &&
                    <span className={'delete-post-button'}
                          data-post-no={data.id}
                          data-user-mail={data.postUserMail}
                          onClick={(e)=>{postDelete(e)}}>
                        <RiDeleteBack2Line />
                    </span>
                    }
                </div>
                {data.imagePath === ""
                    ? <h1 style={{marginTop: "100px", marginBottom: "100px", textAlign: "center"}}>
                        <FcImageFile
                            style={{fontSize: "4em"}}/></h1>
                    : <img src={data.imagePath} className="card-img-top" alt="..."/>
                }
                <div className={"card-header"} style={{borderTop: "0.1rem solid"}}>
                    <i className={`card-heart-icon bi-heart`} data-url={""}></i>
                    <i className="bi bi-chat card-chat-icon"></i>
                    <i className="bi bi-send card-send-icon"></i>
                    <i className={`card-bookmark-icon bi bi-bookmark`} data-url={""}></i>
                </div>

                <div className="card-body">
                    <div>
                        <div className={'card-header-text'}>
                            {data.postContent}
                        </div>
                        <div className={'commentWrap'}>
                            {data.commentsList != null && data.commentsList.map((item, idx) => {
                                    const dateObject = moment(item.created_at);
                                    const formattedDate = dateObject.format("YY.MM.DD HH:mm");
                                    return (
                                        idx < 3 && (
                                        <div key={item.id}>
                                            <div className={'d-flex'}>
                                                <span className={'p-1'}>{item.user_mail}</span>
                                                <span className={`p-1 text-limit comment-filed`}>{item.content}</span>
                                                <span className={'post-date-time'}>{formattedDate}</span>
                                                {item.user_mail === cookieMemberEmail &&
                                                    <div className={'p-1 comment-del-icon'}>
                                                        <TiDeleteOutline className={'cursor'}/>
                                                    </div>
                                                } <br/>
                                            </div>
                                        </div>
                                        )
                                    )
                                }
                            )}
                            {data.commentCount > 3 &&
                            <div onClick={onMoreComment} style={{marginLeft: "6px", cursor: "pointer", position:"relative", top:"-6px"}}>
                                <TfiMore/>
                            </div>}
                            <Modal open={modalOpen} close={modalClose} header="More Comments">
                                {data.commentsList != null && data.commentsList.map((data, idx) => {
                                    const dateObject = moment(data.created_at);
                                    const formattedDate = dateObject.format("YY.MM.DD HH:mm");
                                    return (
                                        <div key={idx}>
                                            <div className={'d-flex'}>
                                                <span className={'p-1'}>{data.user_mail} <br/>
                                                <span className={'modal-post-date-time'}><BsArrowReturnRight/>{formattedDate}</span>
                                                </span>
                                                <span className={`p-1 text-limit-none comment-filed`}>{data.content}</span>
                                                {data.user_mail === cookieMemberEmail &&
                                                    <div className={'p-1 comment-del-icon-modal'}>
                                                        <TiDeleteOutline className={'cursor'} onClick={() => {
                                                            onDeleteComment({id:data.id,userMail:cookieMemberEmail})
                                                        }}/>
                                                    </div>
                                                }
                                                <br/>
                                            </div>
                                        </div>
                                    )
                                })}
                                <AddComment postNo={data.id}/>
                            </Modal>
                        </div>
                        <AddComment postNo={data.id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCard;