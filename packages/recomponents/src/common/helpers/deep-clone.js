import deepClone from 'lodash.clonedeep';

export default function (value) {
    return deepClone.apply(this, [value]);
}
