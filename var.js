var cardTemplate = (title, description, more, imgSrc, animationDelay) => `
<div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch animate slide" style=\"animation-delay: ${animationDelay}s;\">
    <div class="card border-light mb-4 shadow">
        <div class="card-header p-0">
            <img class="bd-placeholder-img card-img-top img-fluid" width="100%" height="160" src="assets/thumbs/${imgSrc}"></img>

        </div>

        <div class="card-body">
            <h1 class="card-h1">${title}</h1>
            <p class="card-text">${description}</p>
        </div>
         <div class="card-footer text-muted">
                <div class="d-flex justify-content-between">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-dark">Plus d'informations</button>
                    </div>
                    <small class="text-muted">${more}</small>
                </div>  
            </div>
    </div>
</div>
`;
