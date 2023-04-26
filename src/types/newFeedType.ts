export type NewFeedListType = {
    list : FeedListType[]
}

export type FeedListType = {
    id: number,
    title: string,
    postContent: string,
    postUserMail: string,
    postCreatedAt: string,
    imagePath: string,
    comments: string,
    commentsList: CommentType[],
    commentCount: number,
    likeCount: number,
    isLiked: number,
}

export type ListParamType = {
    userMail: string
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
}

export type AddCommentType = {
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