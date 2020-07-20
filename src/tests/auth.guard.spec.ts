import { AuthGuard } from '../app/guards/auth.guard';
import { ACCESS_TOKEN_KEY } from '../app/constants/local-storage.constant';
// tslint:disable-next-line: max-line-length
const dummyJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTE4MjM4NTgsImV4cCI6MTYyMzM1OTg1OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.-BeXHDEYR9cLNh3Oa6oeJrld8MPcBolGWZ-Yab-8q_A';
class MockRouter {
    navigateByUrl(path) { }
}
describe('AuthGuard', () => {
    describe('canActive', () => {
        let authGuard: AuthGuard;
        let router: any;
        beforeEach(() => {
            router = new MockRouter();
            authGuard = new AuthGuard(router);
            localStorage.setItem(ACCESS_TOKEN_KEY, dummyJWT);
        });
        it('should return true for a logged in user', () => {
            expect(authGuard.canActivate(undefined, undefined)).toEqual(true);
        });

        it('should navigate to 404 for a logged out user', () => {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            spyOn(router, 'navigateByUrl');
            expect(authGuard.canActivate(undefined, undefined)).toEqual(false);
            expect(router.navigateByUrl).toHaveBeenCalledWith('/error/404');
            localStorage.setItem(ACCESS_TOKEN_KEY, dummyJWT);
        });
    });
});
