import getDateTodayString from '@/app/getdatestring';

describe('Get Date Time as a String when ', function () {
    it('Day less than 10 and month less than 10', () => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01 11:00'));

        expect(getDateTodayString()).toBe('01/01/2020');
    });

    it('Day more than 10 and month more than 10', () => {
        jest.useFakeTimers().setSystemTime(new Date('2020-12-12 11:00'));

        expect(getDateTodayString()).toBe('12/12/2020');
    });
});
