function displayActivitiesCards(activities) {
    // Generate cards from results
    let animationDelay = 0.6

    container = $("#activities-div")
    container.empty()
    if (activities.length > 0) {
        activities.forEach(function(activity) { 
            editions = activity["values"]
            ed = editions[0]
            
            // console.log("Activity " + ed[ACTIVITY_NAME_COLUMN] + " has following editions")
            // console.log(editions)

            card = cardTemplate(ed[ACTIVITY_NAME_COLUMN], truncateString(ed["Description"], 150), ed["Format"], ed["ImgSrc"] ? ed["ImgSrc"] + ".jpg" : "default.jpg", animationDelay);
            container.append(card)

            animationDelay += 0.1

            // if (ed[ACTIVITY_NAME_COLUMN] == "Coding club des filles") {
            //     analyseEditions(editions)
            // }
        })
    } else {
        // If no activity is found, display a default card
        // @todo Handle language
        card = cardTemplate("Aucune activité extrascolaire trouvée pour ces filtres", "Visitez le site du SPS pour voir toutes les activités", "", "default.jpg", animationDelay, "Voir le site");
        container.append(card)
    }

    return animationDelay
}

function displayPublicActivitiesCards(activities, animationDelay) {
    // Remove public title if it already exists. And insert it again one time
    $(".public-title").remove()
    $(publicTitle).insertAfter("#activities-container");

    // Generate cards from public activities
    container = $("#public-activities-div")
    container.empty()
    if (activities.length > 0) {
        activities.forEach(function(activity) { 

            card = cardTemplate(activity[ACTIVITY_NAME_COLUMN], truncateString(activity["Description"], 150), activity["Lieu"], activity["ImgSrc"] ? activity["ImgSrc"] + ".jpg" : "default.jpg", animationDelay);
            container.append(card)

            animationDelay += 0.1
        })
    } else {
        // If no activity is found, display a default card
        // @todo Handle language
        card = cardTemplate("Aucune activité publique trouvée pour ces filtres", "Visitez le site du SPS pour voir toutes les activités", "", "default.jpg", animationDelay, "Voir le site");
        container.append(card)
    }

}

function hideLoader() {
    // Hide element with jquery
    $("#loader").fadeOut('slow');
}