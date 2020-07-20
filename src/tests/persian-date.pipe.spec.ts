import { PersianDatePipe } from '../app/pipes/persian-date.pipe';

describe('Persian Date Pipe', () => {
    let persianDatePipe: PersianDatePipe;
    beforeAll(() => {
        persianDatePipe = new PersianDatePipe();
    });
    it('should convert 1997/07/27 to ۱۳۷۶/۵/۵', () => {
        const date = '1997/07/27';
        const resultMustBe = '۱۳۷۶/۵/۵';
        const result = persianDatePipe.transform(date);
        expect(result).toBe(resultMustBe);
    });
    it('should convert 2002/05/15 to ۱۳۸۱/۲/۲۵', () => {
        const date = '2002/05/15';
        const resultMustBe = '۱۳۸۱/۲/۲۵';
        const result = persianDatePipe.transform(date);
        expect(result).toBe(resultMustBe);
    });
});
