function updateFilterMenu(search_status) {
    if(search_status["who"]) {
        activateButton("filters_who", search_status["who"])
    }

    if(search_status["where"]) {
        activateButton("filters_where", search_status["where"].toUpperCase())
    }

    if(search_status["gender"]) {
        activateButton("filters_gender", search_status["gender"])
    }

    if(search_status["age"]) {
        $('#filters_age-input').val(search_status["age"])
        $('.filters_age-val').html(search_status["age"]);
    }
}

function activateButton(buttonGroupClass, value) {
    el = $(`.${buttonGroupClass}`)
    btn = el.find(`button[value="${value}"]`)
    btn.addClass("active");
    btn.attr("aria-pressed", "true");
}

function deactivateButton(buttonGroupClass, value) {
    el = $(`.${buttonGroupClass}`)
    btn = el.find(`button[value="${value}"]`)
    btn.removeClass("active");
    btn.attr("aria-pressed", "false");
}

/*
 *   FILTER - WHO
 */
$('.filters-whoe-btnChoice').on('click', function(event) {
    event.preventDefault();

    // @todo Find a better way to handle this   
    deactivateButton("filters_who", "teacher")
    deactivateButton("filters_who", "parent")

    who = $(this).attr('value')
    search_status["who"] = who

    updateHash()
});

/*
 *   FILTER - WHERE
 */
$('.filters-where-btnChoice').on('click', function(event) {
    event.preventDefault();

    // @todo Find a better way to handle this   
    deactivateButton("filters_where", "VD")
    deactivateButton("filters_where", "GE")
    deactivateButton("filters_where", "FR")
    deactivateButton("filters_where", "NE")
    deactivateButton("filters_where", "JU")
    deactivateButton("filters_where", "VS")
    deactivateButton("filters_where", "BE")

    where = $(this).attr('value')
    search_status["where"] = where

    updateHash()
});

/*
 *   FILTER - WHERE
 */
$('.filters-where-btnChoice').on('click', function(event) {
    event.preventDefault();

    // @todo Find a better way to handle this   
    deactivateButton("filters_where", "VD")
    deactivateButton("filters_where", "GE")
    deactivateButton("filters_where", "FR")
    deactivateButton("filters_where", "NE")
    deactivateButton("filters_where", "JU")
    deactivateButton("filters_where", "VS")
    deactivateButton("filters_where", "BE")

    where = $(this).attr('value')
    search_status["where"] = where

    updateHash()
});


/*
 *   FILTER - AGE
 */
// Update age value during user interraction
$('#filters_age-input').on('input', function change(e){
    age = $(this).val()
    $('.filters_age-val').html(age);  
    search_status["age"] = age

    updateHash()
});

/*
 *   FILTER - GENDER
 */
$('.filters-gender-btnChoice').on('click', function(event) {
    event.preventDefault();

    // @todo Find a better way to handle this   
    deactivateButton("filters_gender", "boy")
    deactivateButton("filters_gender", "girl")

    gender = $(this).attr('value')
    search_status["gender"] = gender

    updateHash()
});