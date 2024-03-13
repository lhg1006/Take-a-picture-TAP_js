import React, {SyntheticEvent, useState} from "react";
import {FeedListType} from "../../types/newFeedType";
import {FcImageFile} from "react-icons/fc";
import {getCookie} from "../../utills";
import {TiDeleteOutline} from "react-icons/ti";
import moment from "moment";
import {TfiCommentsSmiley} from "react-icons/tfi";
import {BsArrowReturnRight, BsFillPersonFill} from "react-icons/bs";
import {RiDeleteBack2Line} from "react-icons/ri";
import {Modal} from "../common/modal";
import AddComment from "../addComment";
import {CustomConfirm} from "../common/customConfirm";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {delComment, delPost, likeDel, likeIns} from "../../api/call/newFeed";
import {commonAction} from "../../reducers/common";
import {useLocation, useNavigate} from "react-router-dom";

interface CurrentTargetDataset {
    postNo: number;
    postUserNo: number;
    userMail: string;
}

interface CurrentTargetDataset2 {
    postNo: number;
    postUserNo: string;
    isLiked: number;
}

const NewCard = ({data}: { data: FeedListType }) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const cookieMemberEmail = getCookie("memberEmail")

    const cookieMemberNo = getCookie("memberNo")

    const [modalOpen, setModalOpen] = useState(false);

    const [likeCnt, setLikeCnt] = useState(data.likeCount)

    const [clickFlag, setClickFlag] = useState<boolean>(false)

    const photoBaseUrl = process.env.REACT_APP_PHOTO_URL

    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    const newPath = '/' + pathSegments.join('/');

    const onMoreComment = () => {
        document.body.style.overflow = "hidden";
        setModalOpen(true);
    };

    const modalClose = () => {
        document.body.style.overflow = "auto";
        setModalOpen(false);
    };

    const onDeleteComment = (data: { id: number, userMail: string }) => {
        CustomConfirm(
            {
                title: "Delete Comment?",
                onConfirm: () => {
                    delComment(data).then((res) => {
                        if (res.data == 1) {
                            dispatch(commonAction.setCall(data.id))
                            toast.success("Delete success")
                        } else {
                            toast.error("Delete fail ...")
                        }
                    })
                }
            })
    }
    const postDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
        const {postNo, userMail} = e.currentTarget.dataset as unknown as CurrentTargetDataset
        if (userMail === cookieMemberEmail) {
            CustomConfirm(
                {
                    title: "게시물을 삭제하시겠습니까?",
                    onConfirm: () => {
                        delPost({postNo, userMail}).then((res) => {
                            if (res.data === 1) {
                                if(newPath === '/feed/view'){
                                    navigate(-1)
                                }else{
                                    dispatch(commonAction.setCall(0))
                                }
                                toast.success("삭제되었습니다.")
                            } else {
                                toast.error("System Error")
                            }
                        })
                    }
                })
        } else {
            toast.error("System Error . . .")
            return;
        }
    }
    const likeHandler = async (e: React.MouseEvent<HTMLElement>) => {
        if (!clickFlag) {
            setClickFlag(true)

            const target = e.currentTarget
            const dataset = target.dataset as unknown as CurrentTargetDataset2

            const param = {
                postNo: dataset.postNo,
                postMemNo: dataset.postUserNo,
                userMail: cookieMemberEmail,
                myMemNo: cookieMemberNo,
            }

            if (+dataset.isLiked === 1) {
                const res = await likeDel(param);
                if (res.data === 1) {
                    target.classList.replace('bi-heart-fill', 'bi-heart');
                    dataset.isLiked = 0;
                    setLikeCnt(prev => prev - 1);
                } else {
                    toast.error('System Error . . .');
                }
            } else {
                const res = await likeIns(param);
                if (res.data === 1) {
                    target.classList.replace('bi-heart', 'bi-heart-fill');
                    dataset.isLiked = 1;
                    setLikeCnt(prev => prev + 1);
                } else {
                    toast.error('System Error . . .');
                }
            }
            setClickFlag(false);
        }
    }
    const onLikeCntClick = async (e: React.MouseEvent<HTMLElement>) => {
        const {postNo, postUserNo} = e.currentTarget.dataset as unknown as CurrentTargetDataset
        navigate('/likeList', {state: {postNo, postUserNo}});
    }

    const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "/img/xbox.png";
    };

    return (
        <div className="main-page-card card wd-25r">
            <div className={"card-header-st fs14"}>
                <a>
                    {data.profileImg !== ''
                        ? <img
                            className={'card-header-profile'}
                            src={photoBaseUrl + data.profileImg}
                            onError={addDefaultImg}
                            alt={"프로필사진"}/>
                        : <BsFillPersonFill className={'card-header-profile'}/>}

                </a>
                <span className="fw-bold card-header-txt" onClick={()=> navigate(`/user-page?email=${data.postUserMail}`)}>{data.postUserMail}</span>
                {cookieMemberEmail === data.postUserMail &&
                    <span className={'delete-post-button'}
                          data-post-no={data.id}
                          data-user-mail={data.postUserMail}
                          onClick={(e) => {
                              postDelete(e)
                          }}>
                        <RiDeleteBack2Line/>
                    </span>
                }
            </div>
            {data.imagePath === ""
                ? <h1 style={{marginTop: "100px", marginBottom: "100px", textAlign: "center"}}>
                    <FcImageFile
                        style={{fontSize: "4em"}}/></h1>
                : <img src={photoBaseUrl+data.imagePath} className="card-img-top" alt="..."/>
            }
            <div className={"card-header"}>
                <i className={`card-heart-icon ${data.isLiked === 1 ? "bi-heart-fill" : "bi-heart"}`}
                   data-post-no={data.id}
                   data-is-liked={data.isLiked}
                   data-post-user-no={data.postUserNo}
                   onClick={(e) => likeHandler(e)}
                ></i>
                <i className="bi bi-chat card-chat-icon" onClick={onMoreComment}></i>
                <i className="bi bi-send card-send-icon"></i>
                {/*<i className={`card-bookmark-icon bi bi-bookmark`} data-url={""}></i>*/}
            </div>

            <div className="card-body">
                <div className={"d-flex"}>
                    <span className={"blush-text pulse-text2"}
                          style={{fontSize: "small", position: "relative", bottom: "10px", fontWeight: "bold"}}
                          data-post-no={data.id}
                          data-post-user-no={data.postUserNo}
                          onClick={(e) => onLikeCntClick(e)}>
                            Likes {likeCnt}
                    </span>
                    <span style={{marginLeft: "auto", fontSize: "small", position: "relative", bottom: "10px"}}>
                        {data.postCreatedAt}
                    </span>
                </div>
                <div>
                    <div className={'card-body-wrap'}>
                        <div className={'card-header-text content-text-limit fs15'} onClick={onMoreComment}>
                            {data.postContent}
                        </div>
                        <div className={'commentWrap'}>
                            {data.commentCount > 2 &&
                                <div className={'fs14 position-relative'} onClick={onMoreComment}
                                      style={{color: "#a9a9a9", bottom: "12px"}}>댓글 {data.commentCount}개 모두 보기</div>}
                            {data.commentsList != null ?
                                data.commentsList.map((item, idx) => {
                                        // const dateObject = moment(item.created_at);
                                        // const formattedDate = dateObject.format("YY.MM.DD HH:mm");
                                        return (
                                            idx < 2 && (
                                                <div key={item.id}>
                                                    <div className={'d-flex'} style={{alignItems: "center"}}>
                                                        <div className={'flex-grow-0'}>
                                                            <div className="comment-profile-img-box"
                                                                 style={{background: "#BDBDBD"}}>
                                                                {item.profile_img !== ''
                                                                    ? <img className="comment-profile-img"
                                                                           src={photoBaseUrl+item.profile_img}
                                                                           alt={"프로필이미지"}/>
                                                                    : <BsFillPersonFill className="comment-profile-img"/>}
                                                            </div>
                                                        </div>
                                                        <div className={'flex-grow-5 w-100'}>
                                                            <div className={'fw-bold fs14 comment-wrap-2'}>
                                                                <div className={'comment-user-img'} onClick={()=> navigate(`/user-page?email=${item.user_mail}`)}>{item.user_mail}</div>
                                                                <div className={'fw-normal post-date-time'} style={{float:"right"}}>{item.insDateKor}</div>
                                                                <br/>
                                                                <div className={`fw-normal text-limit comment-filed fs14`}
                                                                     onClick={onMoreComment}>{item.content}</div>
                                                            </div>
                                                        </div>
                                                        <div className={'flex-grow-1'}>
                                                            {item.user_mail === cookieMemberEmail &&
                                                                <div className={'p-1 comment-del-icon'}>
                                                                    <TiDeleteOutline className={'cursor'} onClick={() => {
                                                                        onDeleteComment({
                                                                            id: item.id,
                                                                            userMail: cookieMemberEmail
                                                                        })
                                                                    }}/>
                                                                </div>
                                                            } <br/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                ) :
                                (<span
                                    style={{marginLeft: "106px", position: "relative", top: "32px", color: "dimgray"}}>no comments . . .
                                    <span
                                        style={{fontSize: "2rem", position: "relative", top: "-9px", color: "dimgray"}}><TfiCommentsSmiley/></span>
                                </span>)
                            }
                            <Modal open={modalOpen} close={modalClose}
                                   header={data.postUserMail + " : " + data.postContent}>
                                {data.commentsList != null && data.commentsList.map((data, idx) => {
                                    const dateObject = moment(data.created_at);
                                    const formattedDate = dateObject.format("YY.MM.DD HH:mm");
                                    return (
                                        <div key={idx}>
                                            <div className={'d-flex'}>
                                                    <span className={'p-1'}>{data.user_mail} <br/>
                                                    <span
                                                        className={'modal-post-date-time'}><BsArrowReturnRight/>{formattedDate}</span>
                                                    </span>
                                                <span
                                                    className={`p-1 text-limit-none comment-filed`}>{data.content}</span>
                                                {data.user_mail === cookieMemberEmail &&
                                                    <div className={'p-1 comment-del-icon-modal'}>
                                                        <TiDeleteOutline className={'cursor'} onClick={() => {
                                                            onDeleteComment({id: data.id, userMail: cookieMemberEmail})
                                                        }}/>
                                                    </div>
                                                }
                                                <br/>
                                            </div>
                                        </div>
                                    )
                                })}
                                <AddComment postNo={data.id} postMemNo={data.postUserNo}/>
                            </Modal>
                        </div>
                        <AddComment postNo={data.id} postMemNo={data.postUserNo}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCard;