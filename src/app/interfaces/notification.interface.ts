import { NotificationType } from '../constants/notification.constant';

export interface INotification {
    type: NotificationType;
    message: string;
    pid?: string;
    sid?: string;
}

