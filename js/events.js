/**
 * Logo click
 */
$("#EPFL_logo").on('click', function(event) {
    event.preventDefault()
    search_status = {
        'lang': search_status['lang']
    }
    updateHash()
    window.location.reload();
})

/**
 * Previous button action
 */
$("#previousButton").on('click', function(event) {
    event.preventDefault()
    decrementPage()
})

/*
 *  INTRO
 */
$('.intro-btn').on('click', function(event) {
    event.preventDefault()
    incrementPage()
})

/*
 *   QUESTION - WHO
 */
$('.who-btnChoice').on('click', function(event) {
    event.preventDefault()

    who = $(this).attr('value')
    search_status["who"] = who

    incrementPage()
})

/*
 *   QUESTION - WHERE
 */
$('.where-btnChoice').on('click', function(event) {
    event.preventDefault()

    where = $(this).attr('value')
    search_status["where"] = where

    incrementPage()
})

/*
 *   QUESTION - LEVEL/AGE
 */
// Update age value during user interraction
$('#question_age-input').on('input', function change(e){
    age = $(this).val()
    $('.question_age-val').html(age);
})

// Update level value during user interraction
$('#question_level-input').on('input', function change(e){
    level = $(this).val()
    updateLevelInputValue(level, search_status['lang'])
})

// Save age or level value and go to the next question
$('.age-btnNext').on('click', function(event) {
    // Save level if user is a teacher, otherwise save age for parents
    if (search_status['who'] == "teacher") {
        level = $('#question_level-input').val()  
        search_status["level"] = level
    } else if (search_status['who'] == "parent") {
        age = $('#question_age-input').val()  
        search_status["age"] = age
    }

    incrementPage()
})

/*
 *   QUESTION - GENDER
 */
$('.gender-btnChoice').on('click', function(event) {
    gender = $(this).attr('value')
    search_status["gender"] = gender

    incrementPage()
})