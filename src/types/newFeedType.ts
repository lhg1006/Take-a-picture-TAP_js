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
}

export type AddCommentType = {
    postId:number,
    content:string,
    userMail:string
}