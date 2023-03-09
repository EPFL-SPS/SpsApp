function cardTemplate (args = {}) {

    defaultValues = {
        "title": "Titre",
        "description": "Lorem ipsum",
        "leftText": "",
        "rightText": "",
        "imgSrc": "",
        "animationDelay": 0,
    }

    v = {}

    // Get values from args, or use default values
    Object.entries(defaultValues).forEach(([key, value]) => {
        if (args[key] != undefined) {
            v[key] = args[key]
        } else {
            v[key] = value
        }
    });

    localThumbPath = "assets/thumbs/"

    // Add extension to image name to find the correct file
    if (v["imgSrc"]) {
        // if imgSrc is a link
        if (v["imgSrc"].includes("http")) {
            // If it's a link, picture is stored online. Don't add extension
        } else {
            // If not, picture is stored locally. Add extension and path
            v["imgSrc"] = localThumbPath + v["imgSrc"] + ".jpg"
        }
    } else {
        // Default picture if picture not specified
        v["imgSrc"] = localThumbPath + "default.jpg"
    }

    footer = ""
    // If there is at least a left or right text, display the footer
    if (v["leftText"] + v["rightText"]) {
        footer = 
`<div class="card-footer text-muted">
    <div class="d-flex justify-content-between">
        <small class="text-muted">${v['leftText']}</small>
        <small class="text-muted">${v['rightText']}</small>
    </div>  
</div>`
    }

    return `
<div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 d-flex animate slide" style=\"animation-delay: ${v['animationDelay']}s;\">
    <div class="card border-light mb-4 shadow" style="width: 100%">
        <div class="card-header p-0" style="height: 150px">
            <img class="bd-placeholder-img card-img-top img-fluid" style="height: 100%; object-fit: cover" src="${v['imgSrc']}"></img>
        </div>

        <div class="card-body">
            <h1 class="card-h1">${v['title']}</h1>
            <p class="card-text">${v['description']}</p>
        </div>
        ${footer}
    </div>
</div>
`;
}

var publicTitle = `
<div class="public-title animate slide" style="margin-top: 25px;">
    <h1 class="results-h1" lang="fr">Activités grand public</h1>
    <h1 class="results-h1" lang="de">Aktivitäten für das breite Publikum</h1>
</div>`

/**
 * 
 * @param {*} currentLang Current lang abreviation
 * @returns 
 */
function languagesMenu_template(currentLang){
    li = ""

    Object.entries(SUPPORTED_LANGUAGES).forEach(([abrev, icon]) => {
        if (abrev != currentLang) {
            li += languagesMenuLi_template(abrev, icon)
        }
    })

    return `
<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    ${SUPPORTED_LANGUAGES[currentLang]}
</button>
<ul class="dropdown-menu" style="min-width: auto;">
    ${li}
</ul>
`
}

var languagesMenuLi_template = (value, icon) => `
<li><button class="dropdown-item btn-langChoice" value="${value}" type="button">${icon}</button></li>
`;

