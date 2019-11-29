/**
 * see https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
 * detect IEEdge
 * returns version of IE/Edge or false, if browser is not a Microsoft browser
 */
function detectIEEdge() {
    if (typeof window === 'undefined') {
        return false;
    }

    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        const rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

if (detectIEEdge()) {
    // eslint-disable-next-line global-require
    require('intersection-observer');
    // eslint-disable-next-line global-require
    const {default: cssVars} = require('css-vars-ponyfill');
    cssVars({});
}
