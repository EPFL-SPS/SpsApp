let transisionDuration = 650;
let filters = {}

// Pages (div) to load, order has meaning
const pages = ["page0", "page1", "page2", "page3", "page4", "results"]
// Current page (div) loaded 
let currentIndex = 0

/**
 * Slide in a page from the right
 */
function slideInPage(pageIndex) {
    pageId = "#" + pages[pageIndex]

    $(pageId).css({display: "block", marginLeft : "100%"})

    $(pageId).animate({
        marginLeft: "0%"
    }, transisionDuration);

    console.log(pageId + " slided in")
}

/**
 * Slide out a page to the right
 */
function slideOutPage(pageIndex) {
    pageId = "#" + pages[pageIndex]

    $(pageId).css({display: "block", marginLeft : "0%"})

    $(pageId).animate({
        marginLeft: "100%"
    }, transisionDuration);

    setTimeout(function() {
        $(pageId).css({display: "none"})
    }, transisionDuration)    

    console.log(pageId + " slided out")
}

/**
 * According to the global page array,
 * slide in the next page
 */
function slideNextPage() {
    if (currentIndex == pages.length) {
        return
    }

    slideInPage(currentIndex + 1)
    currentIndex += 1
    console.log("Current index is now " + currentIndex)

    if (currentIndex > 0) {
        $("#previousButton").css({visibility: "visible"})
    } else {
        $("#previousButton").css({visibility: "hidden"})
    }
}

/**
 * According to the global page array, slide
 * out current page to reveal the previous one
 */
function slidePreviousPage() {
    if (currentIndex == 0) {
        return
    }

    slideOutPage(currentIndex)
    currentIndex -= 1

    console.log("Current index is now " + currentIndex)

}

/**
 * Slide the first page when document is loaded 
 */
$(document).ready(function() {
    // slideInPage(currentIndex)
    // showResults()
});

/**
 * Previous button action
 */
$("#previousButton").on('click', function(event) {
    slidePreviousPage()
})

/*
 *  INTRO
 */
$('.intro-btn').on('click', function(event) {
    event.preventDefault();
    slideNextPage()
});

/*
 *   QUESTION - WHO
 */
$('.who-btnChoice').on('click', function(event) {
    event.preventDefault();

    who = $(this).attr('value')
    filters["who"] = who

    slideNextPage()
});

/*
 *   QUESTION - WHERE
 */
$('.where-btnChoice').on('click', function(event) {
    event.preventDefault();

    where = $(this).attr('value')
    filters["where"] = where

    slideNextPage()
});

/*
 *   QUESTION - AGE
 */
// Update age value during user interraction
$('#question_age-val').on('input', function change(e){
    age = $(this).val()

    $('#age-val').html(age);

    filters["age"] = age
}); 

// Go to the next question
$('#question_age-next').on('click', function(event) {
    slideNextPage()
});

/*
 *   QUESTION - GENDER
 */
$('.gender-btnChoice').on('click', function(event) {
    gender = $(this).attr('value')
    filters["gender"] = gender

    slideNextPage()
    showResults()
});

/*
 *   RESULTS
 */
function showResults() {
    animationDelay = 0.6
    searchResults["results"].forEach(function(activity) { 
        card = cardTemplate(activity["title"], activity["description"], activity["imgSrc"], animationDelay);
        $("#result-row").append(card)
        animationDelay += 0.1
    })

    console.log("Results loaded")
    console.log(searchResults)
}
