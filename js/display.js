/**
 * Toggle page visibility to show it
 */
function displayPage(pageIndex, marginLeft="0%") {
    pageId = "#" + pages[pageIndex]
    $(pageId).css({display: "block", marginLeft : marginLeft})
}

/**
 * Toggle page visibility to hide it
 */
function hidePage(pageIndex) {
    pageId = "#" + pages[pageIndex]
    $(pageId).css({display: "none"})
}

/**
 * Slide in a page from the right
 * @param {number} pageIndex Page index according to pages global array
*/
function slideInPage(pageIndex) {
    $(window).scrollTop(0)
    
    // console.log("Slide in page " + pageIndex)

    // Ensure page is visible outside of viewport to slide it in
    displayPage(pageIndex, "100%")

    // Slide in page
    pageId = "#" + pages[pageIndex]
    $(pageId).animate({
        marginLeft: "0%"
    }, transisionDuration);

    // Hide previous pages once slided in
    setTimeout(function() {
        for(let i = search_status["page"] - 1; i >= 0; i--) {
            hidePage(i)
        }
    }, transisionDuration)
}

/**
 * Slide out a page to the right
 * @param {number} pageIndex Page index according to pages global array
 */
function slideOutPage(pageIndex) {
    $(window).scrollTop(0)

    // console.log("Slide out page " + pageIndex)

    // Ensure previous page is visible in order to see it after sliding out
    if (pageIndex > 0) {
        displayPage(pageIndex - 1, "0%")
    }

    // Ensure curent page is visible inside of viewport to slide it out
    displayPage(pageIndex, "0%")

    // Slide out page
    pageId = "#" + pages[pageIndex]
    $(pageId).animate({
        marginLeft: "100%"
    }, transisionDuration);

    // Hide page once slided out
    setTimeout(function() {
        hidePage(pageIndex)
    }, transisionDuration)
}

function displayActivitiesCards(activities) {
    // Generate cards from results
    let animationDelay = 0.6

    container = $("#activities-div")
    container.empty()
    if (activities.length > 0) {
        activities.forEach(function(activity) { 
            editions = activity["values"]
            ed = editions[0]
            
            // console.log("Activity " + ed[ACTIVITY_NAME_COLUMN] + " has following editions")
            // console.log(editions)

            card = cardTemplate(
                title=ed[ACTIVITY_NAME_COLUMN],
                description=truncateString(ed["Description"], 150), leftText=ed["Format"],
                rightText="", 
                imgSrc=ed["ImgSrc"] ? ed["ImgSrc"] + ".jpg" : "default.jpg",
                animationDelay=animationDelay);
            container.append(card)

            animationDelay += 0.1

            // if (ed[ACTIVITY_NAME_COLUMN] == "Coding club des filles") {
            //     analyseEditions(editions)
            // }
        })
    } else {
        // If no activity is found, display a default card
        // @todo Handle language
        card = cardTemplate(
            title="Aucune activité extrascolaire trouvée pour ces filtres",
            description="Visitez le site du SPS pour voir toutes les activités", 
            animationDelay=animationDelay);
        container.append(card)
    }

    return animationDelay
}

function displayPublicActivitiesCards(activities, animationDelay) {
    // Remove public title if it already exists. And insert it again one time
    $(".public-title").remove()
    $(publicTitle).insertAfter("#activities-container");

    // Generate cards from public activities
    container = $("#public-activities-div")
    container.empty()
    if (activities.length > 0) {
        activities.forEach(function(activity) { 

            card = cardTemplate(
                title=activity[ACTIVITY_NAME_COLUMN],
                description=truncateString(activity["Description"], 150),
                rightText=activity["Lieu"],
                leftText=activity["Date"],
                imgSrc=activity["ImgSrc"] ? activity["ImgSrc"] + ".jpg" : "default.jpg",
                animationDelay=animationDelay);
            container.append(card)

            animationDelay += 0.1
        })
    } else {
        // If no activity is found, display a default card
        // @todo Handle language
        card = cardTemplate(
            title="Aucune activité publique trouvée pour ces filtres",
            description="Visitez le site du SPS pour voir toutes les activités",
            animationDelay=animationDelay);
        container.append(card)
    }

}

function hideLoader() {
    // Hide element with jquery
    $("#loader").fadeOut('slow');
}

function showPreviousButton() {
    $("#previousButton").fadeIn('slow');
}


function hidePreviousButton() {
    $("#previousButton").fadeOut('slow');
}

function showFiltersButton() {
    $("#filtersButton").fadeIn('slow');
}


function hideFiltersButton() {
    $("#filtersButton").fadeOut('slow');
}
