export function substitute({ str, substitutions }) {
    let result = str;
    const keys = Object.keys(substitutions).sort();
    for (const key of keys) {
        const regex = new RegExp(key, 'g');
        result = result.replace(regex, substitutions[key]);
    }
    return result;
}
