const patterns = {
    validMsisdn: /^7?[69]\d{9}$/,
    notDigitsNorPlus: /[^\d+]+/g,
    cleanMsisdnParts: /^(?:\+?7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/,
};

/**
 * Msisdn formats.
 *
 * ALPHA   -> 9161234567
 * BETA    -> 79161234567
 * GAMMA   -> 916 123-4567
 * DELTA   -> (916) 123-4567
 * EPSILON -> +7 (916) 123-4567
 * ZETA    -> +7 (916) 123-45-67
 */
export enum PrettyFormats {
    ALPHA = 'alpha',
    BETA = 'beta',
    GAMMA = 'gamma',
    DELTA = 'delta',
    EPSILON = 'epsilon',
    ZETA = 'zeta',
}

const prettyFormatsRegExp = {
    [PrettyFormats.ALPHA]: '$1$2$3$4',
    [PrettyFormats.BETA]: '7$1$2$3$4',
    [PrettyFormats.GAMMA]: '$1 $2-$3$4',
    [PrettyFormats.DELTA]: '($1) $2-$3$4',
    [PrettyFormats.EPSILON]: '+7 ($1) $2-$3$4',
    [PrettyFormats.ZETA]: '+7 ($1) $2-$3-$4',
};

/**
 * Cleans msisdn.
 *
 * @param {string} msisdn msisdn to clean
 * @param {boolean} [removeLeadingSeven=false] Remove leading 7
 * @returns {?string} cleaned msisdn
 */
export const clean = (msisdn: string, removeLeadingSeven = false): string | null => {
    if (typeof msisdn !== 'string') {
        return null;
    }

    const cleaned = msisdn.replace(patterns.notDigitsNorPlus, '');
    const resultMsisdn = cleaned.replace(
        patterns.cleanMsisdnParts,
        removeLeadingSeven ? prettyFormatsRegExp[PrettyFormats.ALPHA] : prettyFormatsRegExp[PrettyFormats.BETA],
    );

    return patterns.validMsisdn.test(resultMsisdn) ? resultMsisdn : null;
};

/**
 * Makes msisdn pretty.
 *
 * @param {number|string} msisdn msisdn in string or number.
 * @param {PrettyFormats} [format=PrettyFormats.ZETA] format
 * @returns {string} msisdn string in pretty format
 */
export const pretty = (msisdn: string | number, format = PrettyFormats.ZETA): string => {
    let msisdnStr = msisdn;
    if (typeof msisdnStr === 'number') {
        msisdnStr = String(msisdn);
    }

    const cleaned = clean(msisdnStr);
    if (!cleaned) {
        return msisdnStr;
    }

    const safeFormat = format in prettyFormatsRegExp ? format : PrettyFormats.ZETA;

    return cleaned.replace(patterns.cleanMsisdnParts, prettyFormatsRegExp[safeFormat]);
};
