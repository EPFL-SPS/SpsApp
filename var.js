var cardTemplate = (title, description, more, imgSrc, animationDelay) => `
<div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 d-flex animate slide" style=\"animation-delay: ${animationDelay}s;\">
    <div class="card border-light mb-4 shadow" style="width: 100%">
        <div class="card-header p-0" style="height: 150px">
            <img class="bd-placeholder-img card-img-top img-fluid" style="height: 100%; object-fit: cover" src="assets/thumbs/${imgSrc}"></img>
        </div>

        <div class="card-body">
            <h1 class="card-h1">${title}</h1>
            <p class="card-text">${description}</p>
        </div>
         <div class="card-footer text-muted">
                <div class="d-flex justify-content-between">
                    <div class="btn-group">
                    <!-- Add link that will open in a new tab -->
                        <a href="https://sps.epfl.ch/" target="_blank"><button type="button" class="btn btn-sm btn-dark">Plus d'informations</button></a>
                    </div>
                    <small class="text-muted">${more}</small>
                </div>  
            </div>
    </div>
</div>
`;
