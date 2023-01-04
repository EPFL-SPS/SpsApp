let transisionDuration = 650;

currentPage = 0

let search_status = {
    "page": 0
}

// Pages (div) to load, order has meaning
const pages = ["page0", "page1", "page2", "page3", "page4", "results"]

/**
 * Correct page is displayed on load and when hash changes
 */
$(document).ready(function() {
    updatePage()
});

$(window).on('hashchange',function(){
    updatePage()
});

/**
 * Generate and display page according to hash
 */
function updatePage() {
    // Get current search status from URL params if existing
    if (document.location.hash) {
        search_status = parseParms(document.location.hash)
        console.log("Load status from hash")
        console.log(document.location.hash)
        console.log(search_status)
    }

    console.log("Display page " + search_status["page"] + " from current page " + currentPage)
    if (currentPage > search_status["page"]) {
        if (currentPage > 0) {
            displayPage(currentPage - 1)
        }
        slideOutPage(currentPage)
    } else if (currentPage < search_status["page"]) {
        slideInPage(search_status["page"])
    }
    currentPage = search_status["page"]

    // Execute page specific code
    switch(parseInt(currentPage)) {
        case 0:
            // Reset search if on first page
            search_status = {"page": 0}
            break
        // Remove filters from future pages otherwise
        case 1: // Who
            delete search_status['who']
            break
        case 2: // Where
            delete search_status['where']
            break
        case 3: // Age
            delete search_status['age']

            age = $("#question_age-val").val()
            $('#age-val').html(age);

            break
        case 4: // Gender
            delete search_status['gender']
            break
        case 5: // Results
            // Load results on the last page
            showResults()
            break
    }

    updateHash()

    // Update preivous button visibility
    if (search_status["page"] > 0) {
        $("#previousButton").css({visibility: "visible"})
    } else {
        $("#previousButton").css({visibility: "hidden"})
    }
}

/**
 * Increment page in status and update hash
 */
function incrementPage() {
    if (search_status["page"] == pages.length) {
        return
    }

    search_status["page"]++

    updateHash()
}

/**
 * Decrement page in status and update hash
 */
function decrementPage() {
    if (search_status["page"] == 0) {
        return
    }

    search_status["page"]--

    updateHash()
}

function displayPage(pageIndex) {
    pageId = "#" + pages[pageIndex]
    $(pageId).css({display: "block", marginLeft : "0%"})
}

/**
 * Slide in a page from the right
 * @param {number} pageIndex Page index according to pages global array
*/
function slideInPage(pageIndex) {
    // console.log("Slide in page " + pageIndex)

    pageId = "#" + pages[pageIndex]

    $(pageId).css({display: "block", marginLeft : "100%"})

    $(pageId).animate({
        marginLeft: "0%"
    }, transisionDuration);
}

/**
 * Slide out a page to the right
 * @param {number} pageIndex Page index according to pages global array
 */
function slideOutPage(pageIndex) {
    // console.log("Slide out page " + pageIndex)
    
    pageId = "#" + pages[pageIndex]

    $(pageId).css({display: "block", marginLeft : "0%"})

    $(pageId).animate({
        marginLeft: "100%"
    }, transisionDuration);

    setTimeout(function() {
        $(pageId).css({display: "none"})
    }, transisionDuration)
}

/**
 * Previous button action
 */
$("#previousButton").on('click', function(event) {
    decrementPage()
})

/*
 *  INTRO
 */
$('.intro-btn').on('click', function(event) {
    event.preventDefault();
    incrementPage()
});

/*
 *   QUESTION - WHO
 */
$('.who-btnChoice').on('click', function(event) {
    event.preventDefault();

    who = $(this).attr('value')
    search_status["who"] = who

    incrementPage()
});

/*
 *   QUESTION - WHERE
 */
$('.where-btnChoice').on('click', function(event) {
    event.preventDefault();

    where = $(this).attr('value')
    search_status["where"] = where

    incrementPage()
});

/*
 *   QUESTION - AGE
 */
// Update age value during user interraction
$('#question_age-val').on('input', function change(e){
    age = $(this).val()
    $('#age-val').html(age);
}); 

// Save age value and go to the next question
$('#question_age-next').on('click', function(event) {
    age = $('#question_age-val').val()  
    search_status["age"] = age

    incrementPage()
});

/*
 *   QUESTION - GENDER
 */
$('.gender-btnChoice').on('click', function(event) {
    gender = $(this).attr('value')
    search_status["gender"] = gender

    incrementPage()
});

/*
 *   RESULTS
 */
function showResults() {

    console.log(search_status)

    // TEMP - Convert gender to french - Find a place to adapt keys
    gender = "Mixte"
    if (search_status["gender"] == "boy") {
        gender = "Garçon"
    } else if (search_status["gender"] == "girl") {
        gender = "Fille"
    }

    // Find activities corresponding to search criteria
    activities = findActivities("FR", search_status["who"], search_status["where"], search_status["age"], gender)

    // Group same activities
    console.log("Group same activities")
    activities = groupSameActivities(activities)
    console.log(activities)

    
    // Generate cards from results
    let animationDelay = 0.6
    
    $("#result-row").empty()
    if (activities.length > 0) {
        console.log("Unique activities")
        activities.forEach(function(activity) { 
            editions = activity["values"]

            console.log(editions)

            ed = editions[0]

            card = cardTemplate(ed[ACTIVITY_NAME_COLUMN], truncateString(ed["Description"], 150), "", ed["ImgSrc"] ? ed["ImgSrc"] + ".jpg" : "default.jpg", animationDelay);
            $("#result-row").append(card)

            animationDelay += 0.1
        })
    } else {
        // If not activity is found, display a default card
        card = cardTemplate("Aucune activité trouvée pour ces filtres", "Visitez le site du SPS pour plus voir toutes les activités", "", "default.jpg", animationDelay);
        $("#result-row").append(card)
    }
}
