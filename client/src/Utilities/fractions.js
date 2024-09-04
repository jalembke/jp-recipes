export const toFrac = (val) => {
    const conversionLookup = {
        0.333333333333333: { n: 1, d: 3},
        0.333333333333334: { n: 1, d: 3},
        0.666666666666666: { n: 2, d: 3},
        0.666666666666667: { n: 2, d: 3},
        0.166666666666666: { n: 1, d: 6},
        0.166666666666667: { n: 1, d: 6},
        0.833333333333333: { n: 5, d: 6},
        0.833333333333334: { n: 5, d: 6},
    };

    const gcd = function (a, b) {
        if (b < 0.0000001) return a;
        return gcd(b, Math.floor(a % b));
    };

    const whole = Math.floor(val);
    const frac = val - whole;

    const conversionFound = Object.keys(conversionLookup).find(entry => (
        Math.abs(frac - entry) < (2*Number.EPSILON)
    ));

    let fracString = '';
    if(conversionFound !== undefined) {
        fracString = `${conversionLookup[conversionFound].n}/${conversionLookup[conversionFound].d}`;
    } else {
        const len = frac.toString().length - 2;
        const denominator = Math.pow(10, len);
        const numerator = frac * denominator;
        const divisor = gcd(numerator, denominator);
        fracString = numerator > 0 ? `${Math.floor(numerator / divisor)}/${Math.floor(denominator / divisor)}` : '';
    }

    return whole > 0 ? `${whole} ${fracString}` : fracString;
};

export const toFloat = (val) => {
    // Check for a number with no fraction
    const match1 = val.match(/^([1-9][0-9]*)$/);
    if(match1) {
        return parseInt(match1[1]);
    }
    // Check for just a fraction
    const match2 = val.match(/^([1-9][0-9]*)\/([1-9][0-9]*)$/);
    if(match2) {
        return parseInt(match2[1]) / parseInt(match2[2]);
    }
    // Check for number and fraction
    const match3 = val.match(/^([1-9][0-9]*) ([1-9][0-9]*)\/([1-9][0-9]*)$/)
    if(match3) {
        return parseInt(match3[1]) + parseInt(match3[2]) / parseInt(match3[3]);
    }
}