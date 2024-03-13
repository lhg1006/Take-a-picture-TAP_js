export type NewFeedListType = {
    list : FeedListType[]
}

export type FeedListType = {
    postState: number,
    id: number,
    postUserNo: string,
    postContent: string,
    postUserMail: string,
    postCreatedAt: string,
    imagePath: string,
    comments: string,
    commentsList: CommentType[],
    commentCount: number,
    likeCount: number,
    isLiked: number,
    profileImg: string
}

export type ListParamType = {
    userMail: string
    pageNo: number
}

export type singleParamType = {
    userMail: string
    postNo: number
}

export type PostType = {
    id: number,
    title: string,
    postContent: string,
    createdAt: string
}

export type CommentType = {
    id: number,
    content: string,
    user_mail: string,
    created_at: string,
    profile_img: string,
    insDateKor: string
}

export type AddCommentType = {
    sendMemNo:string,
    receiveMemNo: string,
    postId:number,
    content:string,
    userMail:string
}

export type LikeListType = {
    id: number,
    postId: number
    userMail: string,
    createdAt: string,
    profileImg: string,
    name: string,
}

export type FollowListType = {
    profileImg:string
    userEmail:string
    followerEmail:string
    followTime:string
}