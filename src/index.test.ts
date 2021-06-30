import { clean, pretty, PrettyFormats } from './index';

describe('msisdn formatter', () => {
    describe('pretty correct cases', () => {
        const testMsisdns = [
            '89161 23 45-67',
            '+7 916 123-4567',
            '79161234567',
            '9161234567',
            '916 123-4567',
            '(916) 123-4567',
            '+7 (916) 123-4567',
            89161234567,
            79161234567,
            9161234567
        ];

        type TestCase = [string | number, PrettyFormats | string | undefined, string];
        const testTable: TestCase[] = [
            ...testMsisdns.map((t): TestCase => [t, PrettyFormats.ALPHA, '9161234567']),
            ...testMsisdns.map((t): TestCase => [t, PrettyFormats.BETA, '79161234567']),
            ...testMsisdns.map((t): TestCase => [t, PrettyFormats.GAMMA, '916 123-4567']),
            ...testMsisdns.map((t): TestCase => [t, PrettyFormats.DELTA, '(916) 123-4567']),
            ...testMsisdns.map((t): TestCase => [t, PrettyFormats.EPSILON, '+7 (916) 123-4567']),
            ...testMsisdns.map((t): TestCase => [t, PrettyFormats.ZETA, '+7 (916) 123-45-67']),
            ...testMsisdns.map((t): TestCase => [t, PrettyFormats.ETA, '+7 916 123-45-67']),
            ...testMsisdns.map((t): TestCase => [t, undefined, '+7 (916) 123-45-67']),
            ...testMsisdns.map((t): TestCase => [t, 'alpha', '9161234567']),
            ...testMsisdns.map((t): TestCase => [t, 'unknown-format', '+7 (916) 123-45-67']),
        ];

        it.concurrent.each(testTable)('pretty(%s, %p) should return %s',
            (msisdn, format, expected) => {
                expect(pretty(msisdn, format)).toEqual(expected);
            }
        );
    });

    describe('pretty incorrect cases', () => {
        const invalidMsisdns = [
            true,
            {},
            { number: 79060523777 },
        ];

        type TestCase = [any, any];
        const testTable: TestCase[] = invalidMsisdns.map((t): TestCase => ([t, t]));

        it.concurrent.each(testTable)('pretty(%s) should return %s',
            (msisdn, expected) => {
                expect(pretty(msisdn)).toEqual(expected);
            }
        );
    });

    describe('clean correct cases', () => {
        const testMsisdns = [
            '89161 23 45-67',
            '+7 916 123-4567',
            '79161234567',
            '9161234567',
            '916 123-4567',
            '(916) 123-4567',
            '+7 (916) 123-4567',
        ];

        type TestCase = [string, boolean | undefined, string];
        const testTable: TestCase[] = [
            ...testMsisdns.map((t): TestCase => [t, undefined, '79161234567']),
            ...testMsisdns.map((t): TestCase => [t, false, '79161234567']),
            ...testMsisdns.map((t): TestCase => [t, true, '9161234567']),
        ];

        it.concurrent.each(testTable)('clean(%p, %p) should return %s',
            (msisdn, removeLeadingSeven, expected) => {
                expect(clean(msisdn, removeLeadingSeven)).toEqual(expected);
            }
        );
    });

    describe('clean incorrect cases', () => {
        const invalidMsisdns = [
            89060523777,
            79060523777,
            9060523777,
            {},
            true,
        ];

        type TestCase = [any, boolean | undefined, null];
        const testTable: TestCase[] = [
            ...invalidMsisdns.map((t): TestCase => [t, undefined, null]),
            ...invalidMsisdns.map((t): TestCase => [t, false, null]),
            ...invalidMsisdns.map((t): TestCase => [t, true, null]),
        ];

        it.concurrent.each(testTable)('clean(%s, %p) should return %s',
            (msisdn, removeLeadingSeven, expected) => {
                expect(clean(msisdn, removeLeadingSeven)).toEqual(expected);
            }
        );
    });
});
