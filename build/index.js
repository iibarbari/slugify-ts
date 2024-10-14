// Custom substitutions for strings
var customSubstitutions = {};
// Custom rune substitutions for individual characters
var customRuneSubstitutions = {};
// Max length of slug (0 means no limit)
var maxLength = 0;
// If true, truncates intelligently
var enableSmartTruncate = true;
// If true, converts slug to lowercase 
var lowercase = true;
// If true, appends a timestamp to the slug
var appendTimestamp = false;
/**
 * Returns the current timestamp as a string.
 * @returns - Timestamp as string (in seconds)
 */
function getTimestamp() {
    return Math.floor(Date.now() / 1000).toString();
}
