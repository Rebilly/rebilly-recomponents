import moment from 'moment-timezone';
import DateTimeFormats from '../datetime-formats';

export default (value, format = DateTimeFormats.date) => {
    if (!value) {
        return '-';
    }
    if (!value.format) {
        value = moment(value);
    }

    return value.format(DateTimeFormats[format] || format);
};
