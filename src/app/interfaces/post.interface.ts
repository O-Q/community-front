import { SocialType } from '../models/user.model';

export interface Post {
    _id: string;
    title: string;
    subtitle: string;
    text: string;
    social: string | any;
    author: string;
    reaction: number;
    liked?: boolean;
    replyTo: string;
    views: number;
    comment: number;
    comments: any[];
    flairs: string[];
    createdAt: string;
    updatedAt: string;
    socialType: SocialType.BLOG | SocialType.FORUM;
}


export interface PostDetailed extends Post {
    comments: Post[];
}
