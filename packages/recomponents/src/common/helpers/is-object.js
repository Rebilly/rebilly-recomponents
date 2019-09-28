export default function isObject(value = null) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
