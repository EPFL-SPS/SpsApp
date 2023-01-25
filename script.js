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
        // Ensure previous page is displayed before sliding 
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
    Promise.all([nonScolarActivities_promise, nonScolarEditions_promise, publicActivities_promise]).then((values) => {
        // Complete each editions with details form its corresponding activity
        activities = fetchPromisesData(values)

        // TEMP - Convert gender to french - Find a place to adapt keys
        gender = "Mixte"
        if (search_status["gender"] == "boy") {
            gender = "Garçon"
        } else if (search_status["gender"] == "girl") {
            gender = "Fille"
        }

        // Find activities corresponding to search criteria
        console.log("Find activities with the following filters")
        console.log(search_status)

        if (search_status["who"] =="parent") {
            filtered_activities = filterNonScolartActivities(
                activities["nonScolar"], 
                "FR", search_status["where"], search_status["age"], gender)
        } else {
            alert("Teacher not supported")
        }

        // Group same activities
        console.log("Group same activities")
        unique_activities = groupSameActivities(filtered_activities)
        console.log(unique_activities)

        // Public activities processing
        public_activities = filterPublicActivities(activities["public"], "FR")

        // Display results
        hideLoader()
        displayActivitiesCards(unique_activities)
        displayPublicActivitiesCards(public_activities)
    })
}

// function analyseEditions(editions) {
//     console.log("Analyse editions")
//     console.log(editions)

//     ret = {
//         activity: {
//             name: editions[0][ACTIVITY_NAME_COLUMN],
//             description: editions[0]["Description"],
//             age_max: editions[0]["Age max"],
//             age_min: editions[0]["Age min"],
//             gender: editions[0]["Genre"],
//             language: editions[0]["Langue"],
//         }
//     }

//     editions.forEach(function(ed) {
//         ret[ed["ID"]] = {}

//         Object.keys(ed).forEach(key => {
//             ret[ed["ID"]]["Lieu"] = ed["Lieu"]
//             ret[ed["ID"]]["Canton"] = ed["Canton"]
//             ret[ed["ID"]]["Dates"] = ed["Dates"]
//         })

//     })

//     console.log(ret)
// }
