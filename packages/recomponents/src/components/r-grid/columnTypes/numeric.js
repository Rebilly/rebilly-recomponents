import approximateNumber from 'approximate-number';
import moment from 'moment';

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
export default ({ createElement, props }) => {
  const {
    value,
    column: {
      renderOptions: {
        approximate,
        currency,
        currencyDigits,
        percentage,
        digits,
        internationalFormat,
        duration,
      } = {},
    },
  } = props;
  let displayValue;
  let hasDigits = false;

  if (value || !isNaN(value)) {
    if (digits !== undefined && !isNaN(digits)) {
      hasDigits = true;
    }

    if (approximate) {
      displayValue = approximateNumber(value);
    } else if (internationalFormat) {
      displayValue = typeof Intl !== 'undefined' ? new Intl.NumberFormat().format(value) : value;
    } else if (currency) {
      const options = { style: 'currency', currency };

      if ((currencyDigits || currencyDigits === 0) && !isNaN(currencyDigits)) {
        options.minimumFractionDigits = currencyDigits;
        options.maximumFractionDigits = currencyDigits;
      }

      displayValue = typeof Intl !== 'undefined'
        ? new Intl.NumberFormat(undefined, options).format(value)
        : `${currencyDigits ? (+value).toFixed(currencyDigits) : value} ${currency}`;
    } else if (percentage) {
      if (percentage === true) {
        if (hasDigits) {
          displayValue = `${value.toFixed(digits)}%`;
        } else {
          displayValue = `${value}%`;
        }
      } else {
        const calculatedPercentage = (value / percentage) * 100;
        displayValue = `${calculatedPercentage.toFixed(hasDigits ? digits : 2)}%`;
      }
    } else if (duration) {
      const unit = duration === true ? 'seconds' : duration;
      displayValue = moment.duration(value, unit).humanize();
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
