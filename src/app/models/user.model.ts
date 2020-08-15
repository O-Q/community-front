import { INotification } from '../interfaces/notification.interface';

enum Role {
  SUPERUSER = 'superuser',
  USER = 'user'
}

export class User {
  constructor(
    public id?: string,
    public username?: string,
    public roles?: Role[]
  ) { }
}


export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  banner: string;
  description: string;
  socials: {
    writeAccess: boolean;
    status: string; // TODO: type
    role: string; // TODO: type
    social: { name: string, flairs: string[], type: SocialType, _id: string };
    notifications: INotification[];
  }[];
  roles: UserRole[];
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  privacy: any;
  isFollowing?: boolean;
}

export enum SocialType {
  FORUM = 'FORUM',
  BLOG = 'BLOG'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  CONFIRM_PENDING = 'CONFIRM_PENDING',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
}
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
