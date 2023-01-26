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
            alert("Impossible de récupérer les activités du SPS - Votre navigateur ne supporte pas cette application. Google Chrome, Edge ou Safari sont recommandés.");
            console.log(response)
            return undefined
        }
    })
}

nonScolarActivities_promise = fetchData("Extra-scolaire - Activités!A1:J101")
nonScolarEditions_promise = fetchData("Extra-scolaire - Éditions!A1:I201")
publicActivities_promise = fetchData("Grand public - Activités!A1:H51")

function fetchPromisesData(promises_values) {
    // Get received data
    nonScolarActivities = parseApiResponse(promises_values[0])
    nonScolarEditions = parseApiResponse(promises_values[1])
    publicActivities = parseApiResponse(promises_values[2])

    // @todo TEMP
    scolarActivities = []

    // Complete each editions with details form its corresponding activity
    if(nonScolarActivities != undefined && nonScolarEditions != undefined) {
        nonScolarEditionsDetailed = addDetailsToEditions(nonScolarEditions, nonScolarActivities)

        // Simplified the list with only useful keys
        nonScolarEditionsDetailed = filterKeys(nonScolarEditionsDetailed, ["ID", ACTIVITY_NAME_COLUMN, "Statut", "Age max", "Age min", "Format", "Canton", "Genre", "Langue", "Lieu", "Dates", "Description", "ImgSrc", "Inscriptions", "Remarques"])

        console.log("Non-scolar activities get from API")
        console.log(nonScolarEditionsDetailed)
    } else {
        nonScolairActivities = []
        console.error("Error with API response for non-scolar activities")
        console.log(values)
    }

    // Check public activities data
    if(publicActivities != undefined) {
        console.log("Public activities get from API")
        console.log(publicActivities)
    } else {
        publicActivities = []
        console.error("Error with API response for pulic activities")
        console.log(values)
    }

    return {
        "scolar": scolarActivities,
        "nonScolar": nonScolarEditionsDetailed,
        "public": publicActivities
    }

}
