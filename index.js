// Kirjautumisnappi
function clickLogin(){
    window.location.replace("login.html")
}

//Etusivulle
function backToMain(){
    window.location.replace("index.html")
}

// Jätä myynti-ilmoitus -nappi
function createNewListing() {
    window.location.replace("newListing.html")
}

// Myynti-ilmoitusten luonti etusivulle
document.addEventListener("DOMContentLoaded", function () {
    const listingsContainer = document.getElementById("listings");

    // Hae localStoragesta tallennetut ilmoitukset
    const listings = JSON.parse(localStorage.getItem("listings")) || [];

    // Luo HTML-ilmoitukset
    listings.forEach((listing) => {
        const listingElement = document.createElement("div");
        listingElement.className = "listing d-flex flex-column justify-content-center";

        listingElement.innerHTML = `
            <h2 class="h2-listing">${listing.title}</h2>
            <h5 class="h5-listing">${listing.category}</h5>
            <p class="listing-description">${listing.description}</p>
            ${
                listing.isAuction
                    ? `<p class="listing-price">Lähtöhinta: <span class="start-price">${listing.price.toFixed(
                          2
                      )}</span> €</p>
                       <p class="closing-date">Huutokauppa sulkeutuu: <span class="date">${new Date(
                           listing.auctionEnd
                       ).toLocaleString()}</span></p>`
                    : `<p class="listing-price"><span class="price">${listing.price.toFixed(
                          2
                      )}</span> €</p>`
            }
            <div class="btns-listing d-flex justify-content-center pt-3">
                ${
                    listing.isAuction
                        ? `<button class="btn-bid theme1">Tarjoa hintaa</button>`
                        : `<button class="btn-send-message theme1">Lähetä viesti myyjälle</button>`
                }
            </div>
        `;

        listingsContainer.appendChild(listingElement);
    });
});