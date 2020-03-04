import approximateNumber from 'approximate-number';

/**
 * renderOptions:
 *      approximate: Boolean - If true will approximate value.
 *      currency: String - Will display value as currency. Using string as currency code.
 *      percentage: Boolean|Number - If true will display as a percentage.
 *                                   If number will calculate percentage
 *      digits: Number - The number of digits to appear after the decimal point;
 *                       number may be a value between 0 and 20, inclusive.
 * @param createElement {Function} renderer function.
 * @param props {Object} contains value, column, and row.
 * @returns {VNode}
 */
export default ({createElement, props}) => {
    const {
        value,
        column: {
            renderOptions: {
                approximate,
                currency,
                percentage,
                digits,
                internationalFormat,
            } = {},
        },
    } = props;
    let displayValue;
    let hasDigits = false;

    if (value || !isNaN(value)) {
        if (digits && !isNaN(digits)) {
            hasDigits = true;
        }

        if (approximate) {
            displayValue = approximateNumber(value);
        } else if (internationalFormat) {
            displayValue = typeof Intl === 'undefined' ? value : new Intl.NumberFormat().format(value);
        } else if (currency) {
            displayValue = typeof Intl === 'undefined'
                ? `${value} ${currency}`
                : new Intl.NumberFormat(undefined, {style: 'currency', currency}).format(value);
        } else if (percentage) {
            if (percentage === true) {
                if (hasDigits) {
                    displayValue = `${value.toFixed(digits)}%`;
                } else {
                    displayValue = `${value}%`;
                }
            } else {
                const calculatedPercentage = (value / percentage) * 100;
                if (hasDigits) {
                    displayValue = `${calculatedPercentage.toFixed(digits)}%`;
                } else {
                    displayValue = `${calculatedPercentage}%`;
                }
            }
        } else if (value < 0) {
            if (hasDigits) {
                displayValue = `-${Math.abs(value).toFixed(digits)}`;
            } else {
                displayValue = `-${Math.abs(value)}`;
            }
        } else if (hasDigits) {
            displayValue = Math.abs(value).toFixed(digits);
        } else {
            displayValue = Math.abs(value);
        }
    }

    return createElement(
        'span',
        {},
        displayValue || value,
    );
};
