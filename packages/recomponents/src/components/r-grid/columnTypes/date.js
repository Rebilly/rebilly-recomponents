import timezone from '../../../common/helpers/timezone';
import DateTimeFormats from '../../../common/datetime-formats';

/**
 * renderOptions
 *      dateFormat: string that provides the formatting of the date.
 *
 * @param createElement {Function} renderer function
 * @param props {Object} contains value, column, and row data
 * @returns {VNode}
 */
export default ({createElement, props}) => {
    const {renderOptions} = props.column;
    let dateFormat;
    if (renderOptions && renderOptions.dateFormat) {
        if (DateFormats[renderOptions.dateFormat]) {
            dateFormat = DateFormats[renderOptions.dateFormat];
        } else {
            // eslint-disable-next-line prefer-destructuring
            dateFormat = renderOptions.dateFormat;
        }
    } else {
        dateFormat = DateFormats.date;
    }

    return createElement(
        'span',
        {
            attr: {
                title: `Time zone ${timezone.tz()}`,
            },
        },
        timezone.readUTC(props.value).format(dateFormat),
    );
};
