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
 *   QUESTION - AGE
 */
// Update age value during user interraction
$('#question_age-input').on('input', function change(e){
    age = $(this).val()
    $('.question_age-val').html(age);
})

// Save age value and go to the next question
$('.age-btnNext').on('click', function(event) {
    age = $('#question_age-input').val()  
    search_status["age"] = age

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