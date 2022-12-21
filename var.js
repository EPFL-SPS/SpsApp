var cardTemplate = (title, description, imgSrc, animationDelay) => `
<div class="col-md-4 col-sm-6 col-lg-3 d-flex align-items-stretch animate slide" style=\"animation-delay: ${animationDelay}s;\">
    <div class="card mb-4 box-shadow">
        <img class="bd-placeholder-img card-img-top" width="100%" height="160" src="src/thumbs/${imgSrc}"></img>

        <div class="card-body">
            <h1 class="card-h1">${title}</h1>
            <p class="card-text">${description}</p>
        </div>
         <div class="card-footer text-muted">
                <div class="d-flex justify-content-between">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-dark">Plus d'informations</button>
                    </div>
                    <small class="text-muted">Lausanne</small>
                </div>  
            </div>
    </div>
</div>
`;

searchResults = {
  "results":[
    {"title":"Ateliers semestriels MINT", "description":"Les ateliers -ou cours- de mathématiques, informatique et sciences techniques pour les jeunes filles et garçons curieux.", "imgSrc": "mint.jpg"},
    {"title":"Ateliers polythèmes", "description":"Ateliers d’expériences scientifiques proposés aux jeunes de 7 à 15 ans.", "imgSrc": "polythemes.jpg"},
    {"title":"Championnat de sciences", "description":"Tournoi scientifique pour les jeunes de 8 à 15 ans à réaliser en équipe", "imgSrc": "championnat.jpg"},
    {"title":"Le Coding club des filles", "description":"Un club gratuit de programmation pour les filles de 11 à 16 ans", "imgSrc": "codingClub.jpg"},
    {"title":"FIRST LEGO League Challenge", "description":"Championnat de robotique par équipes – jeunes de 6 à 16 ans", "imgSrc": "FLL.jpg"},
  ]
}