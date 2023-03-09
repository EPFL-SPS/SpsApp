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

/**
 * @param {number} level Harmos level
 * @param {string} lang DE, FR
 * @param {*} level 
 */
function updateLevelInputValue(level, lang){
    // Update level letter for german version
    if (lang == "de") {
        if (level > 8) {
            $('.question_level-val').html(level - 8);
            $('#question_level-letter').html("S")
        } else {
            $('.question_level-val').html(level - 2);
            $('#question_level-letter').html("P")
        }
    } else {    // for "fr" or others, use Harmos level
        $('.question_level-val').html(level);
    }
}

function displayActivitiesCards(activities, footerTextKey) {
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

            card = cardTemplate({
                "title": ed[ACTIVITY_NAME_COLUMN],
                "description": truncateString(ed["Description"], 150),
                "leftText": ed[footerTextKey["left"]],
                "rightText": ed[footerTextKey["right"]], 
                "imgSrc": ed["ImgSrc"],
                "animationDelay": animationDelay
            });
            container.append(card)

            animationDelay += 0.1

            // if (ed[ACTIVITY_NAME_COLUMN] == "Coding club des filles") {
            //     analyseEditions(editions)
            // }
        })
    } else {
        // If no activity is found, display a default card
        card = cardTemplate({
            "title": TRAD("NO_ACTIVITY_CARD_TITLE"),
            "description": TRAD("NO_ACTIVITY_CARD_CONTENT"),
            "animationDelay": animationDelay
        });
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

            card = cardTemplate({
                "title": activity[ACTIVITY_NAME_COLUMN],
                "description": truncateString(activity["Description"], 150),
                "leftText": activity["Lieu"],
                "rightText": activity["Dates"],
                "imgSrc": activity["ImgSrc"],
                "animationDelay": animationDelay
            });
            container.append(card)

            animationDelay += 0.1
        })
    } else {
        // If no activity is found, display a default card
        card = cardTemplate({
            "title": TRAD("NO_ACTIVITY_CARD_TITLE"),
            "description": TRAD("NO_ACTIVITY_CARD_CONTENT"),
            "animationDelay": animationDelay
        });
        container.append(card)
    }
}

function displayLanguagesMenu(currentLanguage) {
    $("#languagesMenu").html(languagesMenu_template(currentLanguage))

    // Add event listener
    $('.btn-langChoice').on('click', function(event) {
        event.preventDefault()

        let lang = $(this).attr('value')

        search_status["lang"]= lang

        updateHash()
    })
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
