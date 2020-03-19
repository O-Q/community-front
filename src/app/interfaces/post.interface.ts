export interface Post {
    _id: string;
    title: string;
    subtitle: string;
    text: string;
    social: string | any;
    author: string;
    likedByCount: number;
    dislikedByCount: number;
    replyTo: string;
    views: number;
    comment: number;
    flairs: string[];
    createdAt: string;
    updatedAt: string;
}


export interface PostDetailed extends Post {
    comments: Post[];
}
