function addDetailsToEditions(editions, activities_list, keyToMatch) {
  // Pour chaque élément du tableau de dictionnaires
  for (let i = 0; i < editions.length; i++) {
    // Récupération de la valeur de la clé à associer
    let keyToMatchValue = editions[i][keyToMatch];
    // Pour chaque élément du tableau des éditions avec le détail de clés
    for (let j = 0; j < activities_list.length; j++) {
      // Si la clé à associer correspond à la valeur de la clé du tableau des éditions avec le détail
      if (activities_list[j][keyToMatch] === keyToMatchValue) {
        // Pour chaque clé du tableau des éditions avec le détail
        for (let newKey in activities_list[j]) {
          // Si la clé n'existe pas dans l'ancien tableau ou qu'elle a la valeur null
          if (!editions[i].hasOwnProperty(newKey) || editions[i][newKey] === null) {
            // Ajout de la clé/valeur à l'élément de l'ancien tableau
            editions[i][newKey] = activities_list[j][newKey];
          }
        }
      }
    }
  }
  // Renvoi de l'ancien tableau avec les nouvelles clés ajoutées
  return editions;
}

function filterActivities(jsonArray, filters) {
  // Utilisation de la méthode filter() de l'objet Array
  // pour retourner un nouveau tableau contenant uniquement les éléments
  // qui respectent tous les filtres spécifiés dans le dictionnaire
  return jsonArray.filter(function(item) {
    // Initialisation de la variable de contrôle à true
    let match = true;
    // Pour chaque clé/valeur du dictionnaire de filtres
    for (let key in filters) {
      // Si la valeur de l'élément ne correspond pas à la valeur du filtre
      if (item[key] !== filters[key]) {
        // Mise à false de la variable de contrôle
        match = false;
        // Sortie de la boucle
        break;
      }
    }
    // Renvoi de la variable de contrôle
    return match;
  });
}

function filterActivities_age(jsonArray, age) {
  return jsonArray.filter(function(entry) {
    return entry["Age min"] <= age && entry["Age max"] >= age ;
  });
}

function filterActivities_gender(jsonArray, gender) {
  return jsonArray.filter(function(entry) {
    return entry["Genre"] == "Mixte" || entry["Genre"] == gender;
  });
}


// Fonction de filtrage des clés d'un tableau de dictionnaires
function filterKeys(jsonArray, keysToKeep) {
  // Utilisation de la méthode map() de l'objet Array
  // pour créer un nouveau tableau avec les éléments filtrés
  return jsonArray.map(function(item) {
    // Création d'un nouveau dictionnaire vide
    let filteredItem = {};
    // Pour chaque clé spécifiée à conserver
    for (let i = 0; i < keysToKeep.length; i++) {
      // Si la clé existe dans l'élément du tableau
      if (item.hasOwnProperty(keysToKeep[i])) {
        // Ajout de la clé/valeur au dictionnaire filtré
        filteredItem[keysToKeep[i]] = item[keysToKeep[i]];
      }
    }
    // Renvoi du dictionnaire filtré
    return filteredItem;
  });
}

function mergeActivities(jsonArray, key) {
  let result = {};
  jsonArray.forEach(function(entry) {
    let value = entry[key];
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(entry);
  });
  return result;
}

function mergeByKey(jsonArray, key) {
  let result = [];
  jsonArray.forEach(function(entry) {
    let value = entry[key];
    let found = false;
    result.forEach(function(group) {
      if (group.key === value) {
        group.values.push(entry);
        found = true;
      }
    });
    if (!found) {
      result.push({key: value, values: [entry]});
    }
  });
  return result;
}

// Filter an array of objects to avoid duplicates based on a key and store other non-duplicated values in the same object by keeping their key
function filterDuplicatedActivities(jsonArray, key) {
  // Create a new array
  let result = [];
  // For each element of the array
  jsonArray.forEach(function(entry) {
    // Get the value of the key
    let value = entry[key];
    // Initialisation of the variable to check if the value already exists
    let found = false;
    // For each element of the new array
    result.forEach(function(group) {
      // If the value already exists
      if (group.key === value) {
        // For each key of the element of the array
        for (let key in entry) {
          // If the key doesn't exist in the new array
          if (!group.values.hasOwnProperty(key)) {
            // print type of var
            print(typeof group.values[key])
            // Add the key/value to the new array
            group.values[key] = entry[key];
          }
        }
        // Set the variable to true to stop the loop
        found = true;
      }
    });
    // If the value doesn't exist
    if (!found) {
      // Add the element to the new array
      result.push({key: value, values: entry});
    }
  });
  // Return the new array
  return result;
}


// Get all editions and append details from the corresponding activity
allNonScolarActivities = addDetailsToEditions(nonScolarEditions, nonScolarActivities, "Activité")

console.log(allNonScolarActivities)

// Simplified the list with only usefull keys
allNonScolarActivities = filterKeys(allNonScolarActivities, ["ID", "Activité", "Age max", "Age min", "Canton", "Genre", "Langue", "Lieu", "Dates", "Description", "ImgSrc", "Inscription", "Remarques"])

console.log(allNonScolarActivities)


function findActivities(language, who, where, age, gender) {

  if (who =="parent") {
    list = allNonScolarActivities
  } else {
    list = []
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