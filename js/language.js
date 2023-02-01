const SUPPORTED_LANGUAGES = {
    "fr": "🇫🇷",
    "de": "🇩🇪"
}

const DEFAULT_LANGUAGE = "fr"

var currentLanguage = DEFAULT_LANGUAGE

function TRAD(key) {
    if(LANG_DICT[currentLanguage].hasOwnProperty(key)) {
        return LANG_DICT[currentLanguage][key]
    } else if(LANG_DICT[DEFAULT_LANGUAGE].hasOwnProperty(key)) {
        return LANG_DICT[DEFAULT_LANGUAGE][key]
    } else {
        return ""
    }
}

const LANG_DICT = { 
    "fr": {
        "NO_ACTIVITY_CARD_TITLE": "Aucune activité trouvée pour ces filtres",
        "NO_ACTIVITY_CARD_CONTENT": "Visitez le site du SPS pour voir toutes les activités"
    },
    "de": {
        "NO_ACTIVITY_CARD_TITLE": "Keine Aktivitäten für diese Filter gefunden",
        "NO_ACTIVITY_CARD_CONTENT": "Besuchen Sie die SPS Website, um alle Aktivitäten zu sehen"
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