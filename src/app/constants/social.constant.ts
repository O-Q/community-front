import { AppItem } from '../interfaces/item.interface';

export const FLAIR_MAX_COUNT = 20;

export const SocialStatus = [
    { value: 'ACTIVE', viewValue: 'فعال' },
    { value: 'INACTIVE', viewValue: 'غیرفعال' }
];

export const SocialUserRole = [
    { value: 'MEMBER', viewValue: 'کاربر' },
    { value: 'CREATOR', viewValue: 'موسس' },
    { value: 'MODERATOR', viewValue: 'مدیر' },
];
export const SocialUserStatus = [
    { value: 'ACTIVE', viewValue: 'فعال' },
    { value: 'BANNED', viewValue: 'بن شده' },
    { value: 'PENDING', viewValue: 'منتظر تایید' },
];
export enum WIDGETS {
    RULES = 'w-rules',
    USER_LIST = 'w-user-list',
    CHAT = 'w-chat',
    FLAIRS = 'w-flairs'
}

export const WidgetNames = [
    { value: 'w-flairs', viewValue: 'موضوعات' },
    { value: 'w-user-list', viewValue: 'لیست کاربران' },
    { value: 'w-rules', viewValue: 'قوانین' },
    { value: 'w-chat', viewValue: 'چت' },
];

export const suggestedFlairs: AppItem[] = [
    { value: 'موبایل', viewValue: 'موبایل' },
    { value: 'نقاشی', viewValue: 'نقاشی' },
    { value: 'رمزارزها', viewValue: 'رمزارزها' },
    { value: 'سلامتی', viewValue: 'سلامتی' }
];
