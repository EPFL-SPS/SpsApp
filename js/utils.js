/**
 * Troncate a given string to a given length by ensuing to end on a word, and add "..." at the end
 * @param {string} str Strinf to truncate
 * @param {number} num Number of characters to keep
 */
function truncateString(str, num) {
    if (str) {
        if (str.length > num) {
        let truncatedString = str.slice(0, num);
        let lastSpaceIndex = truncatedString.lastIndexOf(" ");
        truncatedString = truncatedString.slice(0, lastSpaceIndex);
        return truncatedString + "...";
        } else {
        return str;
        }
    }
    return ""
}

/**
 * Convert params string to dict 
 * @param {str} search 
 * @returns Dict with all the parameters
 */
function parseParms(search) {
    result = {}
    search = search.replace('#', '')
    search.split('&').forEach(item => {
        result[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });
    return result
}


/**
 * Update the hash in the URL with the current search status
 */
function updateHash() {
    if (search_status) {
        console.log("Update hash")
        console.log(search_status)
        hash = $.param(search_status)
        document.location.hash = hash
    }
}