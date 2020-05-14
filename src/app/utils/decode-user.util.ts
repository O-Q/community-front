import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

export function decodeUser(token: string) {
    if (token) {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(token);
        if (!isExpired) {
            const decodedToken: DecodedToken = helper.decodeToken(token);
            const { username, roles, id } = decodedToken;
            return new User(id, username, roles);
        }
    }
}

interface DecodedToken {
    // todo
    roles: any[];
    exp: number;
    iat: number;
    id: string;
    username: string;
}