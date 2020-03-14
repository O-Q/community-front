export interface Post {
    title: string;
    text: string;
    group: string;
    author: string;
    likedByCount: number;
    dislikedByCount: number;
    replyTo: string;
}


export interface PostDetailed extends Post {
    comments: Post[];
}