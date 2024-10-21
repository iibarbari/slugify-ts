export function smartTruncate(str, maxLength) {
    // If the string length is already within the maxLength, no truncation is needed
    if (str.length <= maxLength) {
        return str;
    }
    // Look for the last space or dash within the maxLength to break at a natural point
    for (let i = maxLength; i >= 0; i--) {
        if (str[i] === ' ' || str[i] === '-') {
            // Return the substring ending at the last natural break
            return str.substring(0, i);
        }
    }
    // If no natural break is found, return the string truncated at maxLength
    return str.substring(0, maxLength);
}
