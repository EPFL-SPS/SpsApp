// Define here column name used in the Google Sheets 
const SHEET_HEADERS = {
    "NAME": "Activité",
    "MIN_AGE": "Age min",
    "MAX_AGE": "Age max",
    "MIN_LEVEL": "H min",
    "MAX_LEVEL": "H max",
    "GENDER": "Genre",
    "CANTON": "Canton",
    "LANGUAGE": "Langue",
    "PERIOD": "Période",
    "DATES": "Dates",
    "STATUS": "Statut",
    "FORMAT": "Format",
    "IMG_SRC": "ImgSrc",
    "DESCR": "Description",
    "NOTES": "Remarques",
    "LOCATION": "Lieu"
}

const SHEET_VALUES = {
    "AVAILABLE": "Disponible",
    "BOTH_GENDER": "Mixte",
    "BOY": "Garçon",
    "GIRL": "Fille",
}

/**
 * Complete an edition array with details from the parent activity by matching
 * its activity name
 * @param {array[{SHEET_HEADERS["NAME"]: name, ...}]} editions List of editions 
 * @param {array[{SHEET_HEADERS["NAME"]: name, ...}]} activities List of parent activity
 * @returns {array[{SHEET_HEADERS["NAME"]: name, ...}]} with all parents keys containing details on the activity
 */
function addDetailsToEditions(editions, activities) {
    // Go through all the editions
    for (let i = 0; i < editions.length; i++) {
        // Get the name of the edition 
        let keyToMatchValue = editions[i][SHEET_HEADERS["NAME"]];
        // Now go through all the activities
        for (let j = 0; j < activities.length; j++) {
            // Find the corresponding parent activity for the edition
            if (activities[j][SHEET_HEADERS["NAME"]] === keyToMatchValue) {
                // Add details from the parent activity to the edition array
                for (let newKey in activities[j]) {
                    if (!editions[i].hasOwnProperty(newKey) || editions[i][newKey] === null) {
                        editions[i][newKey] = activities[j][newKey];
                    }
                }
            }
        }
    }
    // Return editions array with details
    return editions;
}

/**
 * Filter a JSON according to multiple filters. Used to filter activities
 * with a specific value for a set of given keys
 * @param {[...]} jsonArray containing all the activities
 * @param {{"key": value}} filters 
 * @returns {[...]} Only activity that correspond to the filters
 */
function filterActivities(jsonArray, filters) {
    return jsonArray.filter(function(item) {
        let match = true;
        for (let key in filters) {
            // If the filter is undefined or null, skip it
            if (!filters[key]) {
                return true
            }

            if (item[key] !== filters[key]) {
                match = false;
                break;
            }
        }
        return match;
    })
}

/**
 * Filter activities for a given age
 * @param {[...]} jsonArray containing all the activities
 * @param {number} age Age to filter
 * @returns {[...]} Only activity that correspond to that age
 */
function filterActivities_age(jsonArray, age) {
    return filterActivities_range(jsonArray, age, SHEET_HEADERS["MIN_AGE"], SHEET_HEADERS["MAX_AGE"])
}

/**
 * Filter activities for a given harmos level
 * @param {[...]} jsonArray containing all the activities
 * @param {number} level Harmos level to filter
 * @returns {[...]} Only activity that correspond to that level
 */
function filterActivities_level(jsonArray, level) {
    return filterActivities_range(jsonArray, level, SHEET_HEADERS["MIN_LEVEL"], SHEET_HEADERS["MAX_LEVEL"])
}

/**
 * Filter activities in a given range
 * @param {[...]} jsonArray containing all the activities
 * @param {number} value Value to filter
 * @param {str} minKey Key of the entry for the min value
 * @param {str} maxKey Key of the entry for the max value
 * @returns {[...]} Only activity that correspond to that age
 */
function filterActivities_range(jsonArray, value, minKey, maxKey) {
    if (!value) {
        return jsonArray
    }

    return jsonArray.filter(function(entry) {
        min = parseInt(entry[minKey])
        max = parseInt(entry[maxKey])
        ret =  min <= value && max >= value ;
        return ret;
    })
}

/**
 * Filter activities for a given gender
 * @param {[...]} jsonArray containing all the activities
 * @param {str} gender Gender to filter ("Garçon", "Fille", "Mixte")
 * @returns {[...]} Only activity that correspond to that gender
 */
function filterActivities_gender(jsonArray, gender) {
    if (!gender || gender == SHEET_VALUES["BOTH_GENDER"]) {
        return jsonArray
    }

    return jsonArray.filter(function(entry) {
        return entry[SHEET_HEADERS["GENDER"]] == SHEET_VALUES["BOTH_GENDER"] || entry[SHEET_HEADERS["GENDER"]] == gender;
    })
}


/**
 * Groups activites that have the same name and keep an array of all the editions
 * @param {*} jsonArray Activities array
 * @returns 
 */
function groupSameActivities(jsonArray) {
    let result = [];
    jsonArray.forEach(function(entry) {
        let value = entry[SHEET_HEADERS["NAME"]];
        let found = false;
        result.forEach(function(group) {
            if (group[SHEET_HEADERS["NAME"]] === value) {
                group.values.push(entry)
                found = true;
            }
        })

        if (!found) {
            var obj = {};
            obj[SHEET_HEADERS["NAME"]] = value;
            obj["values"] = [entry];
            result.push(obj)
        }
    })
    return result;
}

/**
 * Filter an array to keep only useful keys
 * @param {*} jsonArray 
 * @param {array} keysToKeep 
 * @returns jsonArray with only the required keys 
 */
function filterKeys(jsonArray, keysToKeep) {
    return jsonArray.map(function(item) {
        let filteredItem = {};
        for (let i = 0; i < keysToKeep.length; i++) {
            if (item.hasOwnProperty(keysToKeep[i])) {
                filteredItem[keysToKeep[i]] = item[keysToKeep[i]];
            }
        }
        return filteredItem;
    })
}

/**
 * Find non-scolar activities according to filters
 * @param {str} list Activities list
 * @param {str} language "FR", "DE", "IT"
 * @param {str} where Canton abreviation
 * @param {number} age Child age 
 * @param {str} gender "Garçon", "Fille"
 * @returns 
 */
function filterNonScolarActivities(list, language, where, age, gender) {
    console.log("Filter non-scolar activities")
    console.log(list)

    // Filter activities by language and canton
    if (language) {
       language = language.toUpperCase()
    }

    if (where) {
        where = where.toUpperCase()
    }

    filter = {}
    filter[SHEET_HEADERS["LANGUAGE"]] = language
    filter[SHEET_HEADERS["CANTON"]] = where
    filter[SHEET_HEADERS["STATUS"]] = SHEET_VALUES["AVAILABLE"]

    console.log(filter)

    let filtered_activities = filterActivities(list, filter)

    console.log("\tFor language and canton: " + language + " " + where)
    console.log(filtered_activities)

    // Filter age
    filtered_activities = filterActivities_age(filtered_activities, age)
    console.log("\tFor age: " + age)
    console.log(filtered_activities)

    // Filter gender
    filtered_activities = filterActivities_gender(filtered_activities, gender)
    console.log("\tFor gender: " + gender)
    console.log(filtered_activities)

    return filtered_activities
}

/**
 * Find scolar activities according to filters
 * @param {str} list Activities list
 * @param {str} language "FR", "DE", "IT"
 * @param {number} level Harmos level 
 * @returns 
 */
function filterScolarActivities(list, language, level) {
    console.log("Filter scolar activities")
    console.log(list)

    // Filter activities by language
    filter = {}
    filter[SHEET_HEADERS["LANGUAGE"]] = language.toUpperCase()
    filter[SHEET_HEADERS["STATUS"]] = SHEET_VALUES["AVAILABLE"]

    let filtered_activities = filterActivities(list, filter)

    console.log("\tFor language: " + language)
    console.log(filtered_activities)

    // Filter level
    filtered_activities = filterActivities_level(filtered_activities, level)
    console.log("\tFor level: " + level)
    console.log(filtered_activities)

    return filtered_activities
}

/**
 * Find public activities according to filters
 * @param {str} language "FR", "DE"
 * @returns 
 */
function filterPublicActivities(list, language) {
    console.log("Filter public activities")
    console.log(list)

    // Filter activities by language
    filter = {}
    filter[SHEET_HEADERS["LANGUAGE"]] = language.toUpperCase()
    filter[SHEET_HEADERS["STATUS"]] = SHEET_VALUES["AVAILABLE"]

    filtered_activities = filterActivities(list, filter)

    console.log("\tFor language " + language)
    console.log(filtered_activities)

    return filtered_activities
}

/**
 * Extract cantons list from activities for each language
 * @param {*} nonScolarActivities List of activities, required to have "Langue" and "Canton" keys
 * @returns Dict for each language with an array of cantons
 */
function cantonsList(nonScolarActivities) {
    let cantons = {}

    nonScolarActivities.forEach(function(activity) {
        lang = activity[SHEET_HEADERS["LANGUAGE"]].toUpperCase()

        if (cantons[lang] == undefined) {
            cantons[lang] = new Set()
        }

        cantons[lang].add(activity[SHEET_HEADERS["CANTON"]])
    })

    // Convert set to array
    for (const lang in cantons) {
        cantons[lang] = Array.from(cantons[lang])
    }

    return cantons
}