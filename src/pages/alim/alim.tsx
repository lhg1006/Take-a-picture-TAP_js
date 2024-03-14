import React, {useEffect, useRef, useState} from "react";
import {BsFillPersonFill} from "react-icons/bs";
import {getAlimList} from "../../api/call/alim";
import {getCookie} from "../../utills";
import {AlimTypes} from "../../types/alimTypes";
import {useNavigate} from "react-router-dom";
import NotFound from "../../components/common/notFound";

interface dataSet {
    email : string
}
interface dataSet2{
    userMail : string
    postNo : number
    alimCode : number
}

const AlimList = () => {
    const isLogin = getCookie('isLogin')
    const navigate = useNavigate()
    const [alimList, setAlimList] = useState<AlimTypes[]>([])
    const photoBasePath = process.env.REACT_APP_PHOTO_URL
    const cookieMemberNo = getCookie("memberNo")
    const cookieMemberEmail = getCookie("memberEmail")
    const [pageNo, setPageNo] = useState<number>(0)
    const [stopPaging, setStopPaging] = useState<boolean>(false)
    const observerRef = useRef<null | HTMLDivElement>(null);

    const loadMore = () => {
        const param = {
            memNo: cookieMemberNo,
            pageNo: pageNo
        }
        getAlimList(param).then((res) => {
            setAlimList(prevList => [...prevList, ...res.data.alimList]);
            setStopPaging(res.data.stopPaging);
        })
    };

    useEffect(() => {
        if (pageNo > 0 && !stopPaging) {
            loadMore();
        }
    }, [pageNo]);

    const handleObserver: IntersectionObserverCallback = (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !stopPaging) {
            setPageNo(prevPageNo => prevPageNo + 1);
        }
    };

    useEffect(() => {
        if (!isLogin) {
            window.location.replace("/")
        }else{
            const options: IntersectionObserverInit = {
                root: null,
                rootMargin: "-20px",
                threshold: 0.1
            };
            if (observerRef.current) {
                const observer = new IntersectionObserver(handleObserver, options);
                observer.observe(observerRef.current); // 옵저버 대상 등록
                return () => {
                    observer.disconnect(); // 컴포넌트가 언마운트될 때 옵저버 해제
                };
            }
        }
    }, []);

    const goUserPage = (e: React.MouseEvent<HTMLSpanElement>) => {
        const {email} = e.currentTarget.dataset as unknown as dataSet
        navigate(`/user-page?email=${email}`)
    }

    const goAlimView = (e: React.MouseEvent<HTMLSpanElement>) => {
        const {userMail, postNo, alimCode} = e.currentTarget.dataset as unknown as dataSet2
        const targetPath = alimCode != 3 ? `/single?userMail=${userMail}&postNo=${postNo}` : `/follow/list?type=follower&email=${cookieMemberEmail}`
        navigate(targetPath)
    }

    return (
        <div className={"main-wrapper"}>
            <h2 style={{borderBottom: "1px solid #e5e5e5"}}>Notifications</h2>
            <div className={"alim-cont-wrapper"}>
                {alimList.length === 0 && <NotFound tag={'2'}/>}
                {alimList.map((item: any) => (
                    <div key={item.autoNo} className="container" style={{borderBottom: "1px solid #e5e5e5"}}>
                        <div className="row mb-1 mt-1">
                            <div className="col-2">
                                <div className="profile-img-container"
                                     data-email={item.sendEmail}
                                     style={{
                                         background: "#BDBDBD",
                                         borderRadius: "50%",
                                         overflow: "hidden",
                                         width: "40px",
                                         height: "40px"
                                     }}
                                     onClick={(e) => {
                                         goUserPage(e)
                                     }}>
                                    {item.sendProfileImg !== null
                                        ? <img className="profile-img"
                                               style={{width: "100%", height: "100%", objectFit: "cover"}}
                                               src={photoBasePath + item.sendProfileImg}
                                               alt={"프로필이미지"}/>
                                        : <BsFillPersonFill className="profile-img" style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}/>}
                                </div>
                            </div>
                            <div className="col-10" style={{alignSelf: "center"}}>
                                <div className={"alim-cont-div"}>
                                    <span className={"fw-bold"}
                                          data-email={item.sendEmail}
                                          onClick={(e) => {
                                              goUserPage(e)
                                          }}>{item.sendName}</span>
                                    <span>님이 </span>
                                    <span
                                        data-user-mail={cookieMemberEmail}
                                        data-post-no={item.postNo}
                                        data-alim-code={item.alimCode}
                                        onClick={(e) => {
                                            goAlimView(e)
                                        }}>

                                        {item.alimCodeKor}<span className='font-red fw-bold'>♥</span>

                                        <span className={"time-text"}> {item.insDateKor}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div id={"obRef"} ref={observerRef}></div>
            </div>
        </div>
    )
}
export default AlimList