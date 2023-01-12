baseScriptUrl = 'https://script.google.com/macros/s/AKfycby-GWb1gXv4KzwI0r_zt7kGHxtkTtdd13tUkw3Wn4nk3G00RkHeBeNjJMgm0-yqNv49Jw/exec'

function parseApiResponse(response) {
    if (response.status_code == 200) {
        return response.data
    } else {
        console.error("Error while fetching data from Google Sheets: " + response.status_code + " - " + response.data)
        return undefined
    }
}

async function fetchData(range) {
    return await jQuery.ajax({
        crossDomain: true,
        url: baseScriptUrl + "?range=" + range,
        method: "GET",
        dataType: "jsonp",
        error: function(response){
            alert("Impossible de récupérer les activités du SPS - Réessayez plus tard");
            console.log(response)
            return undefined
        }
    })
}

nonScolarActivities_promise = fetchData("Extra-scolaire - Activités!A1:J101")
nonScolarEditions_promise = fetchData("Extra-scolaire - Éditions!A1:I201")

function completeEditionsWithDetails(promises_values) {
    // Get received data
    nonScolarActivities = parseApiResponse(promises_values[0])
    nonScolarEditions = parseApiResponse(promises_values[1])

    if(nonScolarActivities != undefined && nonScolarEditions != undefined) {
        // Get all editions and append details from the corresponding activity
        allNonScolarActivities = addDetailsToEditions(nonScolarEditions, nonScolarActivities)

        // Simplified the list with only useful keys
        allNonScolarActivities = filterKeys(allNonScolarActivities, ["ID", ACTIVITY_NAME_COLUMN, "Age max", "Age min", "Format", "Canton", "Genre", "Langue", "Lieu", "Dates", "Description", "ImgSrc", "Inscriptions", "Remarques"])

        console.log("Activités récupérées via l'API")
        console.log(allNonScolarActivities)
    } else {
        console.error("Error with API response")
        console.log(values)
    }
}
