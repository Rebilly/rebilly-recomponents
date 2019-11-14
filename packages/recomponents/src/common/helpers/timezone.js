import Moment from 'moment-timezone';
import Vue from 'vue';

const {RecomponentsSettings} = Vue;

export class TimezoneHandler {
    /**
     * Returns the timezone string for the current user.
     * @returns {string}
     */
    tz() { // eslint-disable-line
        return RecomponentsSettings.timezone;
    }

    /**
     * Create a Moment instance for the current timezone
     * set to the current time.
     * @returns {*}
     */
    now() {
        return Moment().tz(this.tz());
    }

    /**
     * Create a Moment instance in the user's timezone
     * from an UTC value.
     * @param {string} date
     */
    readUTC(date) {
        return Moment.utc(date).tz(this.tz());
    }

    /**
     * Create a Moment instance in the user's timezone
     * using a specific format.
     * @param date
     * @param format
     * @returns {*}
     */
    readUTCFormat(date, format) {
        return Moment.utc(date, format).tz(this.tz());
    }

    /**
     * Convert UTC time into a Moment.
     * @param time
     * @returns {*}
     */
    readUTCTime(time) {
        return Moment.utc(time, 'HH:mm:ss').tz(this.tz());
    }

    /**
     * Convert time from it's canonical time zone
     * to the user's time zone and return a Moment.
     * @param time
     * @returns {*}
     */
    readTime(time) {
        return Moment(time, 'HH:mm:ssZ').tz(this.tz());
    }

    /**
     * Read a date without time and keep the local
     * time zone without skewing the hours.
     * e.g. 2018-10-10
     * @param {string} date
     * @returns {*}
     */
    readLocalDate(date) {
        return Moment(date, 'YYYY-MM-DD').tz(this.tz(), true);
    }

    /**
     * Get a raw API string from a timezone date
     * converted into UTC.
     * @param {string} date
     * @returns {string}
     */
    getRaw(date) {
        return Moment.tz(date, this.tz()).utc().format();
    }

    /**
     * Get a Moment instance from the date string in the user's preferred time zone.
     * @param {string|Moment} date
     * @returns {*}
     */
    getMoment(date) {
        return Moment.tz(date, this.tz());
    }

    /**
     * Get a Moment UTC instance without the time zone.
     * @return {*}
     */
    // eslint-disable-next-line
    getUTC() {
        return Moment.utc();
    }

    /**
     * Get the integer offset representing the user's timezone.
     * @returns {int}
     */
    offset() {
        return this.now().utcOffset();
    }

    /**
     * Convert a date in the user's current browser time zone,
     * to a Moment instance in the user's profile time zone, all while
     * keeping the same time in both values.
     * @example   2016-01-15T11:58:07-08:00 >> 2016-01-15T11:58:07-05:00
     * @param date {string|Moment}
     * @returns {Moment}
     */
    fromDate(date) {
        return Moment(date).tz(this.tz(), true);
    }
}

export default new TimezoneHandler();
