// Script of the App Script API that provides activities data
baseScriptUrl = 'https://script.google.com/macros/s/AKfycbyRl1vZHOTxK-tR92IC-hp-zneOBx93WR39d1lmcgRD8sc17j7-4c5JpCRK3Y0xceBnGA/exec'

/**
 * Fetch data from Apps Script API
 * @param {*} range Google Sheet range to get data from
 * @returns Promise
 */
async function fetchData(range) {
    return await jQuery.ajax({
        crossDomain: true,
        url: baseScriptUrl + "?range=" + range,
        method: "GET",
        dataType: "jsonp",
        // @todo Better error handling
        error: function(response){
            errorMessage = "Erreur inconue"
            if (response.status == "404") {
                
                if(detectBrowser() == "firefox") {
                    errorMessage = "Votre navigateur ne supporte pas cette application. Google Chrome, Edge ou Safari sont recommandés."
                } else {
                    errorMessage = "Veuillez réessayer plus tard"
                }

                console.error("Vérifiez l'url du script App Script et que celui-ci est correctement déployé")

            } else if (response.status == 500) {
                error = "Erreur interne du serveur"
            }

            alert("Impossible de récupérer les activités du SPS - " + errorMessage)

            return undefined
        }
    })
}

/**
 * Parse API response once data has been fetched
 * @param {*} response 
 * @returns 
 */
function parseApiResponse(response) {
    if (response.status_code == 200) {
        return response.data
    } else {
        console.error("Error while fetching data from Google Sheets: " + response.status_code + " - " + response.data)
        return undefined
    }
}

// Create promises for API calls
nonScolarActivities_promise = fetchData("Extra-scolaire - Activités!A1:J101")
nonScolarEditions_promise = fetchData("Extra-scolaire - Éditions!A1:F201")
scolarActivities_promise = fetchData("Scolaire - Activités!A1:J101")
publicActivities_promise = fetchData("Grand public - Activités!A1:H51")

function fetchPromisesData(promises_values) {
    // Get received data
    nonScolarActivities = parseApiResponse(promises_values[0])
    nonScolarEditions = parseApiResponse(promises_values[1])
    scolarActivities = parseApiResponse(promises_values[2])
    publicActivities = parseApiResponse(promises_values[3])

    // Complete each editions with details form its corresponding activity
    if(nonScolarActivities != undefined && nonScolarEditions != undefined) {
        nonScolarEditionsDetailed = addDetailsToEditions(nonScolarEditions, nonScolarActivities)

        // Simplified the list with only useful keys
        nonScolarEditionsDetailed = filterKeys(nonScolarEditionsDetailed,
            ["ID", SHEET_HEADERS["NAME"], SHEET_HEADERS["STATUS"], SHEET_HEADERS["CANTON"], SHEET_HEADERS["PERIOD"],
            SHEET_HEADERS["GENDER"], SHEET_HEADERS["LANGUAGE"], SHEET_HEADERS["MIN_AGE"], SHEET_HEADERS["MAX_AGE"],
            SHEET_HEADERS["FORMAT"], SHEET_HEADERS["IMG_SRC"], SHEET_HEADERS["DESCR"], SHEET_HEADERS["NOTES"]])
        
        // @todo We can get all cantons by language. Has to be used to dynamically generate cantons buttons for page 2 and filter menu
        // allCantons = cantonsList(nonScolarEditionsDetailed)

        console.log("Non-scolar activities get from API")
        console.log(nonScolarEditionsDetailed)
    } else {
        nonScolarEditionsDetailed = []
        console.error("Error with API response for non-scolar activities")
        console.log(promises_values)
    }

    // Check scolar activities data
    if(scolarActivities != undefined) {
        console.log("Scolar activities get from API")
        console.log(scolarActivities)
    } else {
        scolarActivities = []
        console.error("Error with API response for scolar activities")
        console.log(promises_values)
    }

    // Check public activities data
    if(publicActivities != undefined) {
        console.log("Public activities get from API")
        console.log(publicActivities)
    } else {
        publicActivities = []
        console.error("Error with API response for pulic activities")
        console.log(promises_values)
    }

    return {
        "nonScolar": nonScolarEditionsDetailed,
        "scolar": scolarActivities,
        "public": publicActivities
    }

}
