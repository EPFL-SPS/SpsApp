
var search_status = {}
var currentPage = 0

var transisionDuration = 650

// Pages (div) to load, order has meaning
const pages = ["page0", "page1", "page2", "page3", "page4", "results"]

/**
 * Correct page is displayed on load and when hash changes
 */
$(document).ready(function() {
    updatePage()
})

$(window).on('hashchange',function(){
    updatePage()
})

/**
 * Generate and display page according to hash
 */
function updatePage() {
    // Get current search status from URL params if existing
    if (document.location.hash) {
        search_status = parseParms(document.location.hash)
        console.log("Load status from hash")
        console.log(document.location.hash)

    }

    // Set language (return default language if undefined)
    lang = updateLanguage(search_status['lang'])
    search_status['lang'] = lang
    displayLanguagesMenu(lang)

    // Display current page
    console.log("Display page " + search_status["page"] + " from current page " + currentPage)
    if (currentPage > search_status["page"]) {
        // Ensure previous page is displayed before sliding 
        slideOutPage(currentPage)
    } else if (currentPage < search_status["page"]) {
        slideInPage(search_status["page"])
    } else if (search_status["page"] == undefined) {
        search_status["page"] = 0
    }
    currentPage = search_status["page"]

    // Execute page specific code
    console.log("Execute page specific code for page " + currentPage)
    switch(parseInt(currentPage)) {
        case 0:
            // Reset search if on first page
            search_status = {"lang": search_status['lang'], "page": 0}
            break
        // Remove filters from future pages otherwise
        case 1: // Who
            delete search_status['who']
            break
        case 2: // Where

            if (search_status['where']) {   // "where" is defined, we are coming back from page 3
                delete search_status['where']

                // @todo Bug - Handle that we are supposed to show page 1 if teacher 

            } else {    // "where" is not defined, we are coming from page 1 (who)
                // If user is a teacher, we don't need to ask location
                // language will be used as a filter
                if (search_status['who'] == "teacher") {
                    incrementPage()
                }
            }
            
            break
        case 3: // Age/Harmos level
            delete search_status['age']

            // Update age according to slider
            age = $("#question_age-input").val()
            $('.question_age-val').html(age)

            // Update level according to slider
            level = $("#question_level-input").val()
            updateLevelInputValue(level, search_status['lang'], ".question_level-val", "#question_level-letter")

            // Show corresponding form depending on who is the user
            if (search_status['who'] == "parent") {
                $('#question_age-div').show()
                $('#question_level-div').hide()
            } else if (search_status['who'] == "teacher") {
                $('#question_age-div').hide()
                $('#question_level-div').show()
            }

            break
        case 4: // Gender
            if (search_status['gender']) {   // gender is defined, we are coming back from page 5
                delete search_status['gender']

                // @todo Bug - Handle that we are supposed to show page 3 if teacher 

            } else {    // gender is not defined, we are coming from page 3 (level)
                // If user is a teacher, we don't need to ask gender
                if (search_status['who'] == "teacher") {
                    incrementPage()
                }
            }

            break
        case 5: // Results
            // Load results on the last page
            showResults()
            updateFilterMenu(search_status)
            break
    }

    // Update hash in url according to search_status
    updateHash()

    // Update previous button visibility
    if (search_status["page"] > 0) {
        showPreviousButton()
    } else {
        hidePreviousButton()
    }

    // Update filters button visibility
    if (search_status["page"] == 5) {
        showFiltersButton()
    } else {
        hideFiltersButton()
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

/*
 *   RESULTS
 */
function showResults() {
    Promise.all([
        nonScolarActivities_promise, 
        nonScolarEditions_promise, 
        scolarActivities_promise,
        publicActivities_promise
    ]).then((values) => {
        // Complete each editions with details form its corresponding activity
        activities = fetchPromisesData(values)

        // Convert gender to values used in the Google Sheet (in our case French)
        gender = SHEET_VALUES["BOTH_GENDER"]
        if (search_status["gender"] == "boy") {
            gender = SHEET_VALUES["BOY"]
        } else if (search_status["gender"] == "girl") {
            gender = SHEET_VALUES["GIRL"]
        }

        // Find activities corresponding to search criteria
        console.log("Looking for activities for the following filters")
        console.log(search_status)

        footerTextKey = {
            "left": "",
            "right": ""
        }

        if (search_status["who"] =="parent") {
            filtered_activities = filterNonScolarActivities(
                activities["nonScolar"], 
                search_status["lang"],
                search_status["where"],
                search_status["age"],
                gender)
            // For extra scolar activities, display format and time period
            footerTextKey["left"] = SHEET_HEADERS["FORMAT"]
            footerTextKey["right"] = SHEET_HEADERS["PERIOD"]

        } else if (search_status["who"] =="teacher") {
            filtered_activities = filterScolarActivities(
                activities["scolar"], 
                search_status["lang"],
                search_status["level"])
            // For scolar activities, display format and location
            footerTextKey["left"] = SHEET_HEADERS["FORMAT"]
            footerTextKey["right"] = SHEET_HEADERS["LOCATION"]
        } else {
            filtered_activities = []
        }

        // Group same activities
        console.log("Group same activities")
        unique_activities = groupSameActivities(filtered_activities)
        console.log(unique_activities)

        // Public activities processing
        public_activities = filterPublicActivities(activities["public"], search_status["lang"])

        // Display results
        hideLoader()
        displayActivitiesCards(unique_activities, footerTextKey)
        displayPublicActivitiesCards(public_activities)
    })
}
