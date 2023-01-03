let transisionDuration = 650;
let filters = {}

// Pages (div) to load, order has meaning
const pages = ["page0", "page1", "page2", "page3", "page4", "results"]
// Current page (div) loaded 
let currentIndex = 5

/**
 * Slide in a page from the right
 */
function slideInPage(pageIndex) {
    pageId = "#" + pages[pageIndex]

    $(pageId).css({display: "block", marginLeft : "100%"})

    $(pageId).animate({
        marginLeft: "0%"
    }, transisionDuration);
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
}

/**
 * Slide the first page when document is loaded 
 */
$(document).ready(function() {
    slideInPage(currentIndex)
    showResults()
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
    console.log(filters)

    slideNextPage()
});

/*
 *   QUESTION - WHERE
 */
$('.where-btnChoice').on('click', function(event) {
    event.preventDefault();

    where = $(this).attr('value')
    filters["where"] = where
    console.log(filters)

    slideNextPage()
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
    filters["age"] = age
    console.log(filters)

    slideNextPage()
});

/*
 *   QUESTION - GENDER
 */
$('.gender-btnChoice').on('click', function(event) {
    gender = $(this).attr('value')
    filters["gender"] = gender
    console.log(filters)

    slideNextPage()
    showResults()
});

/*
 *   RESULTS
 */
function showResults() {
    animationDelay = 0.6

    console.log(filters)

    // TEMP - Test
    filters = {
        "who": "parent",
        "where": "VD",
        "age": "13",
        "gender": "girl"
      }

    // TEMP - Convert gender to french - Find a place to adapt keys
    gender = "Mixte"
    if (filters["gender"] == "boy") {
        gender = "Garçon"
    } else if (filters["gender"] == "girl") {
        gender = "Fille"
    }

    activities = findActivities("FR", filters["who"], filters["where"], filters["age"], gender)
    console.log(activities)

    // console.log("Filter duplicates")
    // activities = filterDuplicatedActivities(activities)

    activities.forEach(function(activity) { 
        card = cardTemplate(activity["Activité"], activity["Description"], activity["ImgSrc"] ? activity["ImgSrc"] + ".jpg" : "default.jpg", animationDelay);
        $("#result-row").append(card)
        console.log(card)
        animationDelay += 0.1
    })

    // console.log(searchResults)
    // searchResults["results"].forEach(function(activity) { 
    //     card = cardTemplate(activity["title"], activity["description"], activity["imgSrc"], animationDelay);
    //     $("#result-row").append(card)
    //     animationDelay += 0.1
    // })
}
