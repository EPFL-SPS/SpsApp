var cardTemplate = (title, description, imgSrc, animationDelay) => `
<div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch animate slide" style=\"animation-delay: ${animationDelay}s;\">
    <div class="card mb-4 box-shadow">
        <img class="bd-placeholder-img card-img-top img-fluid" width="100%" height="160" src="src/thumbs/${imgSrc}"></img>

        <div class="card-body">
            <h1 class="card-h1">${title}</h1>
            <p class="card-text">${description}</p>
        </div>
         <div class="card-footer text-muted">
                <div class="d-flex justify-content-between">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-dark">Plus d'informations</button>
                    </div>
                    <small class="text-muted">Lausanne</small>
                </div>  
            </div>
    </div>
</div>
`;

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