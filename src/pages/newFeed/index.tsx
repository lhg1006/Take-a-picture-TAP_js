import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {getCookie} from "../../utills";
import NewCard from "../../components/newFeed/newCard";
import {getNewFeedList, getSingleView, getTargetFeedList} from "../../api/call/newFeed";
import {FeedListType} from "../../types/newFeedType";
import NotFound from "../../components/common/notFound";
import {useSelector} from "react-redux";
import {CommonTypes} from "../../types/commonTypes";

const NewFeed = () => {
    const isLogin = getCookie('isLogin')
    const cookieMemberEmail = getCookie("memberEmail")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [list, setList] = useState<FeedListType[]>([])
    const [pageNo, setPageNo] = useState<number>(0)
    const [stopPaging, setStopPaging] = useState<boolean>(false)
    const {isCall, rememberPostNo } = useSelector((state: CommonTypes) => state.common)

    const observerRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (!isLogin) {
            window.location.replace("/");
        } else {
            setIsLoading(false);
        }
    }, []);

    const loadMore = () => {
        const param = {
            userMail: cookieMemberEmail,
            pageNo: pageNo
        };
        getNewFeedList(param).then((res) => {
            setList(prevList => [...prevList, ...res.data.postList]);
            setStopPaging( res.data.stopPaging )
        });
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

    useEffect(() => {
        if (pageNo > 0) {
            const param = {
                userMail: cookieMemberEmail,
                postNo: rememberPostNo
            }
            getSingleView(param).then((res) => {
                setList(prevList => {
                    const newItem = res.data;
                    return prevList.map(item => {
                        if (item.id === newItem.id) {
                            return newItem;
                        }
                        return item;
                    });
                });
            })
        }
    }, [isCall]);


    return (
        <div className={"main-wrapper"}>
            {isLoading ? <h1 style={{position:"relative", top:"340px"}}><FontAwesomeIcon icon={faSpinner} spin/></h1> : list.length > 0
                ? list.map((item) => <NewCard key={item.id} data={item}/>)
                : <NotFound tag={'0'}/>
            }
            <div ref={observerRef}></div>
        </div>
    )
}
export default NewFeed;