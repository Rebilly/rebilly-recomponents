import kebabCase from 'lodash.kebabcase';

export default function (value) {
    return kebabCase.apply(this, [value]);
}
