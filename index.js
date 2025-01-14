document.addEventListener("load", checkLogin())

function clickLogin(){
    window.location.replace("login.html")
}

function backToMain(){
    window.location.replace("index.html")
}

function createNewListing() {
    window.location.replace("newListing.html")
}

function checkLogin(){
    let username = localStorage.getItem("name")
    if(username == null && document.getElementById("btn-new-listing").classList[1] != "invisible"){
        document.getElementById("btn-new-listing").classList.add("invisible")
    }
    else if(username != null && document.getElementById("btn-new-listing").classList[1] == "invisible"){
        document.getElementById("btn-new-listing").classList.remove("invisible")
        document.getElementById("login-button").innerHTML = "Kirjaudu ulos"
    }
}

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
                    ? `<p class="listing-price">Lähtöhinta: <span class="start-price">${listing.price.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> €</p>
                       <p class="closing-date">Huutokauppa sulkeutuu: <span class="date">${new Date(
                           listing.auctionEnd
                       ).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span></p>`
                    : `<p class="listing-price"><span class="price">${listing.price.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> €</p>`
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