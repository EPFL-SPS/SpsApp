// Define here column name used in the Google Sheets 
const ACTIVITY_NAME_COLUMN = "Activité"

// Get all editions and append details from the corresponding activity
allNonScolarActivities = addDetailsToEditions(nonScolarEditions, nonScolarActivities)

// Simplified the list with only useful keys
allNonScolarActivities = filterKeys(allNonScolarActivities, ["ID", ACTIVITY_NAME_COLUMN, "Age max", "Age min", "Canton", "Genre", "Langue", "Lieu", "Dates", "Description", "ImgSrc", "Inscription", "Remarques"])


/**
 * Complete an edition array with details from the parent activity by matching
 * its activity name
 * @param {array[{ACTIVITY_NAME_COLUMN: name, ...}]} editions List of editions 
 * @param {array[{ACTIVITY_NAME_COLUMN: name, ...}]} activities List of parent activity
 * @returns {array[{ACTIVITY_NAME_COLUMN: name, ...}]} with all parents keys containing details on the activity
 */
function addDetailsToEditions(editions, activities) {
  // Go through all the editions
  for (let i = 0; i < editions.length; i++) {
    // Get the name of the edition 
    let keyToMatchValue = editions[i][ACTIVITY_NAME_COLUMN];
    // Now go through all the activities
    for (let j = 0; j < activities.length; j++) {
      // Find the corresponding parent activity for the edition
      if (activities[j][ACTIVITY_NAME_COLUMN] === keyToMatchValue) {
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
  });
}

/**
 * Filter activities for a given age
 * @param {[...]} jsonArray containing all the activities
 * @param {number} age Age to filter
 * @returns {[...]} Only activity that correspond to that age
 */
function filterActivities_age(jsonArray, age) {
  if (!age) {
    return jsonArray
  }

  return jsonArray.filter(function(entry) {
    return entry["Age min"] <= age && entry["Age max"] >= age ;
  });
}

/**
 * Filter activities for a given gender
 * @param {[...]} jsonArray containing all the activities
 * @param {str} gender Gender to filter ("Garçon", "Fille", "Mixte")
 * @returns {[...]} Only activity that correspond to that gender
 */
function filterActivities_gender(jsonArray, gender) {
  if (!gender || gender == "Mixte") {
    return jsonArray
  }

  return jsonArray.filter(function(entry) {
    return entry["Genre"] == "Mixte" || entry["Genre"] == gender;
  });
}


/**
 * Groups activites that have the same name and keep an array of all the editions
 * @param {*} jsonArray Activities array
 * @returns 
 */
function groupSameActivities(jsonArray) {
  let result = [];
  jsonArray.forEach(function(entry) {
    let value = entry[ACTIVITY_NAME_COLUMN];
    let found = false;
    result.forEach(function(group) {
      if (group[ACTIVITY_NAME_COLUMN] === value) {
        group.values.push(entry);
        found = true;
      }
    });
    console.log(ACTIVITY_NAME_COLUMN)
    if (!found) {
      var obj = {};
      obj[ACTIVITY_NAME_COLUMN] = value;
      obj["values"] = [entry];
      result.push(obj);
    }
  });
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
  });
}

/**
 * Find activities according to filters
 * @param {str} language "FR", "DE", "IT"
 * @param {str} who "parent", "teacher"
 * @param {str} where canton abreviation
 * @param {number} age Child age 
 * @param {str} gender "Garçon", "Fille"
 * @returns 
 */
function findActivities(language, who, where, age, gender) {

  if (who =="parent") {
    list = allNonScolarActivities
  } else {
    list = allNonScolarActivities // TODO: change to allScolarActivities
  }

  console.log("All activities")
  console.log(list)

  // Filter activities by language and canton
  filtered_activities = filterActivities(list, {
    "Langue": language, "Canton": where
  })

  console.log("For language and canton: " + language + " " + where)
  console.log(filtered_activities)

  // Filter age
  filtered_activities = filterActivities_age(filtered_activities, age)
  console.log("For age: " + age)
  console.log(filtered_activities)

  // Filter gender
  filtered_activities = filterActivities_gender(filtered_activities, gender)
  console.log("For gender: " + gender)
  console.log(filtered_activities)

  return filtered_activities
}