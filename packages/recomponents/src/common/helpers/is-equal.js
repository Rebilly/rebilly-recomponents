import isEqual from 'lodash.isequal';

export default function (...args) {
    return isEqual.apply(this, args);
}
