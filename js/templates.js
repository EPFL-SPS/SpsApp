function cardTemplate (args = {}) {

    defaultValues = {
        "title": "Titre",
        "description": "Lorem ipsum",
        "leftText": "",
        "rightText": "",
        "imgSrc": "default",
        "animationDelay": 0,
        "buttonText": "Détails",
        "buttonLink": "https://sps.epfl.ch/"
    }

    v = {}

    Object.entries(defaultValues).forEach(([key, value]) => {
        if (args[key] != undefined) {
            v[key] = args[key]
        } else {
            v[key] = value
        }
    });

    if (!v["imgSrc"]) {
        v["imgSrc"] = defaultValues["imgSrc"]
    } else {
        v["imgSrc"] += ".jpg"
    }
    
    return `
<div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 d-flex animate slide" style=\"animation-delay: ${v['animationDelay']}s;\">
    <div class="card border-light mb-4 shadow" style="width: 100%">
        <div class="card-header p-0" style="height: 150px">
            <img class="bd-placeholder-img card-img-top img-fluid" style="height: 100%; object-fit: cover" src="assets/thumbs/${v['imgSrc']}"></img>
        </div>

        <div class="card-body">
            <h1 class="card-h1">${v['title']}</h1>
            <p class="card-text">${v['description']}</p>
        </div>
         <div class="card-footer text-muted">
                <div class="d-flex justify-content-between">
                    <!--<div class="btn-group">
                        <a href="${v['buttonLink']}" target="_blank"><button type="button" class="btn btn-sm btn-dark">${v['buttonText']}</button></a>
                    </div>-->
                    <small class="text-muted">${v['leftText']}</small>
                    <small class="text-muted">${v['rightText']}</small>
                </div>  
            </div>
    </div>
</div>
`;
}

var publicTitle = "<div class=\"public-title animate slide\" style=\"margin-top: 25px;\"><h1 class=\"results-h1\">Activités grand public</h1></div>"
