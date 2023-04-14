// Change here default language
const DEFAULT_LANGUAGE = "fr"

const SUPPORTED_LANGUAGES = {
    "fr": "🇫🇷",
    "de": "🇩🇪"
}

var currentLanguage = DEFAULT_LANGUAGE

const CH_CANTONS = {
    "fr": {
        "AG": "Argovie",
        "AI": "Appenzell Rhodes-Intérieures",
        "AR": "Appenzell Rhodes-Extérieures",
        "BE": "Berne",
        "BL": "Bâle-Campagne",
        "BS": "Bâle-Ville",
        "FR": "Fribourg",
        "GE": "Genève",
        "GL": "Glaris",
        "GR": "Grisons",
        "JU": "Jura",
        "LU": "Lucerne",
        "NE": "Neuchâtel",
        "NW": "Nidwald",
        "OW": "Obwald",
        "SG": "Saint-Gall",
        "SH": "Schaffhouse",
        "SO": "Soleure",
        "SZ": "Schwytz",
        "TG": "Thurgovie",
        "TI": "Tessin",
        "UR": "Uri",
        "VD": "Vaud",
        "VS": "Valais",
        "ZG": "Zoug",
        "ZH": "Zurich"
    }, 
    "de": {
        "AG": "Aargau",
        "AI": "Appenzell Innerrhoden",
        "AR": "Appenzell Ausserrhoden",
        "BE": "Bern",
        "BL": "Basel-Landschaft",
        "BS": "Basel-Stadt",
        "FR": "Freiburg",
        "GE": "Genf",
        "GL": "Glarus",
        "GR": "Graubünden",
        "JU": "Jura",
        "LU": "Luzern",
        "NE": "Neuenburg",
        "NW": "Nidwalden",
        "OW": "Obwalden",
        "SG": "St. Gallen",
        "SH": "Schaffhausen",
        "SO": "Solothurn",
        "SZ": "Schwyz",
        "TG": "Thurgau",
        "TI": "Tessin",
        "UR": "Uri",
        "VD": "Waadt",
        "VS": "Wallis",
        "ZG": "Zug",
        "ZH": "Zürich"
    },
    "it": {
        "AG": "Argovia",
        "AI": "Appenzello Interno",
        "AR": "Appenzello Esterno",
        "BE": "Berna",
        "BL": "Basilea Campagna",
        "BS": "Basilea Città",
        "FR": "Friburgo",
        "GE": "Ginevra",
        "GL": "Glarona",
        "GR": "Grisons",
        "JU": "Giura",
        "LU": "Lucerna",
        "NE": "Neuchâtel",
        "NW": "Nidvaldo",
        "OW": "Obvaldo",
        "SG": "San Gallo",
        "SH": "Sciaffusa",
        "SO": "Soletta",
        "SZ": "Sciazzino",
        "TG": "Turgovia",
        "TI": "Ticino",
        "UR": "Uri",
        "VD": "Vaud",
        "VS": "Vallese",
        "ZG": "Zugo",
        "ZH": "Zurigo"
    }
}

const LANG_DICT = { 
    "fr": {
        "NO_ACTIVITY_CARD_TITLE": "Aucune activité trouvée pour ces filtres",
        "NO_ACTIVITY_CARD_CONTENT": "Visitez le site du SPS pour voir toutes les activités",
        "PUBLIC_ACTIVITIES_TITLE": "Activités grand public"
    },
    "de": {
        "NO_ACTIVITY_CARD_TITLE": "Keine Aktivitäten für diese Filter gefunden",
        "NO_ACTIVITY_CARD_CONTENT": "Besuchen Sie die SPS Website, um alle Aktivitäten zu sehen",
        "PUBLIC_ACTIVITIES_TITLE": "Aktivitäten für das breite Publikum"
    }
}

function TRAD(key, language) {
    if (language == undefined) {
        language = currentLanguage
    }

    if(LANG_DICT[language].hasOwnProperty(key)) {
        return LANG_DICT[language][key]
    } else if(LANG_DICT[DEFAULT_LANGUAGE].hasOwnProperty(key)) {
        return LANG_DICT[DEFAULT_LANGUAGE][key]
    } else {
        return ""
    }
}

function updateLanguage(requiredLanguage) {
    currentLanguage = DEFAULT_LANGUAGE
    if (SUPPORTED_LANGUAGES.hasOwnProperty(requiredLanguage)) {
        currentLanguage = requiredLanguage
    }

    setLangStyles(currentLanguage);

    return currentLanguage
}

function setStyles(styles) {
    var elementId = '__lang_styles';
    var element = document.getElementById(elementId);
    if (element) {
        element.remove();
    }
    
    let style = document.createElement('style');
    style.id = elementId;
    style.type = 'text/css';
    
    if (style.styleSheet) {
        style.styleSheet.cssText = styles;
    } else {
        style.appendChild(document.createTextNode(styles));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
}

function setLangStyles(lang) {
    document.documentElement.setAttribute("lang", lang);

    let styles = 
    Object.keys(SUPPORTED_LANGUAGES).filter(function (l) {
        return l != lang;
    }).map(function (l) {
        return ':lang('+ l +') { display: none; }';
    }).join(' ');

    setStyles(styles);
}