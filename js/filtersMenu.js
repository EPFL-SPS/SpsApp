/**
 * Update filters menu according to current search status
 * @param {*} search_status Current search filters
 */
function updateFilterMenu(search_status) {
    deactivateAllButtons("filter_language")
    if(search_status["lang"]) {
        activateButton("filter_language", search_status["lang"])
    }

    // Update who buttons according to search status
    deactivateAllButtons("filter_who")
    if(search_status["who"]) {
        activateButton("filter_who", search_status["who"])
    }
    // Show or hide filters according to activities kind (scolar or not)
    setFilterMenuDisplayMode(search_status["who"])

    // Update where buttons according to search status
    deactivateAllButtons("filter_where")
    if(search_status["where"]) {
        activateButton("filter_where", search_status["where"])
    }

    // Update age input value according to search status
    if(search_status["age"]) {
        $('#filter_age-input').val(search_status["age"])
        $('.filter_age-val').html(search_status["age"])
        // Show cross to remove age filter
        $('#filter_age-x').show()
    } else {
        $('#filter_age-input').val(0)
        $('.filter_age-val').html("-")
        // Hide cross to remove age filter
        $('#filter_age-x').hide()
    }
    
    // Update level input value according to search status
    if(search_status["level"]) {
        $('#filter_level-input').val(search_status["level"])
        updateLevelInputValue(search_status["level"], search_status['lang'], ".filter_level-val", "#filter_level-letter")
        // Show cross to remove level filter
        $('#filter_level-x').show()
    } else {
        $('#filter_level-input').val(0)
        $('.filter_level-val').html("-")
        // Hide cross to remove level filter
        $('#filter_level-x').hide()
    }

    // Update gender buttons according to search status
    deactivateAllButtons("filter_gender")
    if(search_status["gender"]) {
        activateButton("filter_gender", search_status["gender"])
    }
}

/**
 * Activate a button according to its value
 * @param {*} buttonGroupClass 
 * @param {*} value Value of the button to activate
 */
function activateButton(buttonGroupClass, value) {
    el = $(`.${buttonGroupClass}`)
    btn = el.find(`button[value="${value}"]`)
    btn.addClass("active")
    btn.attr("aria-pressed", "true")
}

/**
 * Deactivate a button according to its value
 * @param {*} buttonGroupClass 
 * @param {*} value Value of the button to deactivate
 */
function deactivateButton(buttonGroupClass, value) {
    el = $(`.${buttonGroupClass}`)
    btn = el.find(`button[value="${value}"]`)
    //btn.removeClass("active")
    btn.attr("aria-pressed", "false")
}

/**
 * Deactivate all buttons of a button group
 * @param {*} buttonGroupClass 
 */
function deactivateAllButtons(buttonGroupClass) {
    el = $(`.${buttonGroupClass}`)
    btn = el.find(`button`)
    btn.removeClass("active")
    btn.attr("aria-pressed", "false")
}

/**
 * Display filter menu according to "who" value
 * @param {*} mode  "teacher", "parent" or undefined
 */
function setFilterMenuDisplayMode(mode) {
    if(mode == "teacher") {
        $('#filter_where-div').hide()
        $('#filter_age-div').hide()
        $('#filter_level-div').show()
        $('#filter_gender-div').hide()
    } else if(mode == "parent") {
        $('#filter_where-div').show()
        $('#filter_age-div').show()
        $('#filter_level-div').hide()
        $('#filter_gender-div').show()
    } else {    // undefined : hide all options
        $('#filter_where-div').hide()
        $('#filter_age-div').hide()
        $('#filter_level-div').hide()
        $('#filter_gender-div').hide()
    }
}

/*
 *   FILTER - LANGUAGE
 */
$('.filter-language-btnChoice').on('click', function(event) {
    event.preventDefault()

    language = $(this).attr('value')
    search_status["lang"] = language

    // Delete current where value because canton depends on language
    delete search_status["where"]

    updateHash()
})

/*
 *   FILTER - WHO
 */
$('.filter-who-btnChoice').on('click', function(event) {
    event.preventDefault()

    if($(this).attr('aria-pressed') == "true") {
        who = $(this).attr('value')

        // Remove filters that do not apply to the selected activity kind
        if (who == "parent") {
            delete search_status["level"]
        } else if (who == "teacher") {
            delete search_status["age"]
        }

        search_status["who"] = who


    } else {
        delete search_status["who"]
    }

    updateHash()
})

/*
 *   FILTER - WHERE
 */
$('.filter-where-btnChoice').on('click', function(event) {
    event.preventDefault()

    if($(this).attr('aria-pressed') == "true") {
        where = $(this).attr('value')
        search_status["where"] = where
    } else {
        delete search_status["where"]
    }

    updateHash()
})


/*
 *   FILTER - AGE
 */
$('#filter_age-input').on('input', function change(e){
    age = $(this).val()
    $('.filter_age-val').html(age)  

    search_status["age"] = age

    updateHash()
})

// Cross to remove age filter
$('#filter_age-x').on('click', function(event) {
    event.preventDefault()
    delete search_status["age"]
    updateHash()
})


/*
 *   FILTER - LEVEL
 */
$('#filter_level-input').on('input', function change(e){
    level = $(this).val()
    updateLevelInputValue(level, search_status['lang'], ".filter_level-val", "#filter_level-letter")

    search_status["level"] = level

    updateHash()
})

// Cross to remove level filter
$('#filter_level-x').on('click', function(event) {
    event.preventDefault()
    delete search_status["level"]
    updateHash()
})

/*
 *   FILTER - GENDER
 */
$('.filter-gender-btnChoice').on('click', function(event) {
    event.preventDefault()

    if($(this).attr('aria-pressed') == "true") {
        gender = $(this).attr('value')
        search_status["gender"] = gender
    } else {
        delete search_status["gender"]
    }

    updateHash()
})