/**
 * Update filters menu according to current search status
 * @param {*} search_status Current search filters
 */
function updateFilterMenu(search_status) {
    if(search_status["lang"]) {
        activateButton("filter_language", search_status["lang"])
    }

    if(search_status["who"]) {
        activateButton("filter_who", search_status["who"])

        // Show or hide filters according to activities kind (scolar or not)
        if (search_status["who"] == "teacher") {
            $('#filter_where-div').hide()
            $('#filter_age-div').hide()
            $('#filter_level-div').show()
            $('#filter_gender-div').hide()
        } else {
            $('#filter_where-div').show()
            $('#filter_age-div').show()
            $('#filter_level-div').hide()
            $('#filter_gender-div').show()
        }

    }

    if(search_status["where"]) {
        activateButton("filter_where", search_status["where"].toUpperCase())
    }

    if(search_status["age"]) {
        // Update age input value according to search status
        $('#filter_age-input').val(search_status["age"])
        $('.filter_age-val').html(search_status["age"]);
    }
    
    if(search_status["level"]) {
        // Update level input value according to search status
        $('#filter_level-input').val(search_status["level"])
        $('.filter_level-val').html(search_status["level"]);
    }

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
    btn.addClass("active");
    btn.attr("aria-pressed", "true");
}

/**
 * Deactivate a button according to its value
 * @param {*} buttonGroupClass 
 * @param {*} value Value of the button to deactivate
 */
function deactivateButton(buttonGroupClass, value) {
    el = $(`.${buttonGroupClass}`)
    btn = el.find(`button[value="${value}"]`)
    btn.removeClass("active");
    btn.attr("aria-pressed", "false");
}

/**
 * Deactivate all buttons of a button group
 * @param {*} buttonGroupClass 
 */
function deactivateAllButtons(buttonGroupClass) {
    el = $(`.${buttonGroupClass}`)
    btn = el.find(`button`)
    btn.removeClass("active");
    btn.attr("aria-pressed", "false");
}

/*
 *   FILTER - LANGUAGE
 */
$('.filter-language-btnChoice').on('click', function(event) {
    event.preventDefault();

    deactivateAllButtons("filter_language")

    language = $(this).attr('value')
    search_status["lang"] = language

    updateHash()
});

/*
 *   FILTER - WHO
 */
$('.filter-who-btnChoice').on('click', function(event) {
    event.preventDefault();

    deactivateAllButtons("filter_who")

    who = $(this).attr('value')
    search_status["who"] = who

    updateHash()
});

/*
 *   FILTER - WHERE
 */
$('.filter-where-btnChoice').on('click', function(event) {
    event.preventDefault();

    deactivateAllButtons("filter_where")

    where = $(this).attr('value')
    search_status["where"] = where

    updateHash()
});


/*
 *   FILTER - AGE
 */
$('#filter_age-input').on('input', function change(e){
    age = $(this).val()
    $('.filter_age-val').html(age);  
    
    search_status["age"] = age

    updateHash()
});


/*
 *   FILTER - LEVEL
 */
$('#filter_level-input').on('input', function change(e){
    level = $(this).val()
    updateLevelInputValue(level, search_status['lang'], ".filter_level-val", "#filter_level-letter")

    search_status["level"] = level

    updateHash()
})

/*
 *   FILTER - GENDER
 */
$('.filter-gender-btnChoice').on('click', function(event) {
    event.preventDefault();

    deactivateAllButtons("filter_gender")

    gender = $(this).attr('value')
    search_status["gender"] = gender

    updateHash()
});