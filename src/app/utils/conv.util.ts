import { SocialType } from '../models/user.model';

export function socialTypeToPersian(socialType: SocialType) {
    return socialType === SocialType.BLOG ? 'بلاگ' : 'انجمن';
}
export function imageTypeToPersian(imageType: 'avatar' | 'banner') {
    return imageType === 'avatar' ? 'آواتار' : 'بنر';
}

