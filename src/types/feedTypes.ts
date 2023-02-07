export type FeedStateType = {
  feed:{
    feedList:{
      list: FeedResultType[]
      comment: CommentResultType[]
    }
  }
}

export type FeedResponseType = {
  feedList: FeedResultType[]
  commentList: CommentResultType[]
}

export type FeedResultType = {
  autoNo: number
  memberEmail: string
  photoUrl: string
  contents: string
}

export type CommentResultType = {
  autoNo: number
  postNo: number
  rmemberEmail:string
  comment: string
}

export type PrevImgList = {
  imageUrl: string
  fileName: string
}

export type PrevPayload = {
  imageData: {
    imageUrl: string
    fileName: string
  }
}