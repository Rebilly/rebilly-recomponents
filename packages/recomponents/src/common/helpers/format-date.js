import moment from 'moment-timezone';
import DateTimeFormats from '../datetime-formats';

export default (value, format = DateTimeFormats.date, timezone = 'UTC') => {
  if (!value) {
    return '-';
  }
  if (!value.format) {
    value = moment(value);
  }
  if (timezone) {
    value = value.tz(timezone);
  }

  return value.format(DateTimeFormats[format] || format);
};
