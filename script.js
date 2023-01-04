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
    displayPage()
});

$(window).on('hashchange',function(){
    displayPage()
});

function displayPage() {
    // Get current search status from URL params if existing
    if (document.location.hash) {
        console.log(document.location.hash)
        search_status = parseParms(document.location.hash)
        console.log("Load status from hash")
        console.log(search_status)
    }

    console.log("Display page " + search_status["page"] + " from current page " + currentPage)
    if (currentPage > search_status["page"]) {
        slideOutPage(currentPage)
    } else if (currentPage < search_status["page"]) {
        slideInPage(search_status["page"])
    }
    currentPage = search_status["page"]

    // Execute page specific code
    console.log("Execute code for page " + currentPage)
    switch(parseInt(currentPage)) {
        case 0:
            // Reset search if on first page
            search_status = {"page": 0}
            break
        // Remove filters from future pages otherwise
        case 1:
            delete search_status['who']
            break
        case 2:
            delete search_status['where']
            break
        case 3:
            delete search_status['age']
            break
        case 4:
            delete search_status['gender']
            break
        case 5:
            // Load results on the last page
            showResults()
            break
    }

    console.log("code executed")

    updateHash()

    // Update preivous button visibility
    if (search_status["page"] > 0) {
        $("#previousButton").css({visibility: "visible"})
    } else {
        $("#previousButton").css({visibility: "hidden"})
    }
}

function incrementPage() {
    if (search_status["page"] == pages.length) {
        return
    }

    search_status["page"]++

    updateHash()
}

function decrementPage() {
    if (search_status["page"] == 0) {
        return
    }

    search_status["page"]--

    updateHash()
}


/**
 * Slide in a page from the right
 * @param {number} pageIndex Page index according to pages global array
*/
function slideInPage(pageIndex) {
    console.log("Slide in page " + pageIndex)

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
    console.log("Slide out page " + pageIndex)
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
    animationDelay = 0.6

    console.log(search_status)

    // TEMP - Convert gender to french - Find a place to adapt keys
    gender = "Mixte"
    if (search_status["gender"] == "boy") {
        gender = "Garçon"
    } else if (search_status["gender"] == "girl") {
        gender = "Fille"
    }

    activities = findActivities("FR", search_status["who"], search_status["where"], search_status["age"], gender)

    console.log("Group same activities")
    activities = groupSameActivities(activities)
    console.log(activities)

    console.log("Unique activities")

    $("#result-row").empty()
    activities.forEach(function(activity) { 
        editions = activity["values"]
        console.log(editions)
        card = cardTemplate(editions[0][ACTIVITY_NAME_COLUMN], truncateString(editions[0]["Description"], 150), editions[0]["ImgSrc"] ? editions[0]["ImgSrc"] + ".jpg" : "default.jpg", animationDelay);
        $("#result-row").append(card)

        animationDelay += 0.1
    })
}


function parseParms(search) {
    result = {}
    search = search.replace('#', '')
    search.split('&').forEach(item => {
        result[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });
    return result
}

function generateHash(params) {
    return $.param(params);
}

function updateHash() {
    if (search_status) {
        hash = generateHash(search_status)
        document.location.hash = hash
    }
}