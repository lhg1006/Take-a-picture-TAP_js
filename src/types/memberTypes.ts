
export type MemberSelectType = {
    profile: ProfileType,
    posts: PostsType[],
    follows: FollowType[],
    followCnt : number,
    followerCnt : number,
    postCnt : number
}

export type ProfileType = {
    memberNo: string,
    email: string,
    name: string,
    profileImg: string
}

export type PostsType = {
    id: number,
    content: string,
    createdAt:string,
    imagePath:string,
    userMail:string,
}

export type FollowType = {
    followerEmail:string,
    followingEmail:string,
    followDate:string
}