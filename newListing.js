document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-leave-new-listing");

    // Oikean hinnoitteluvaihtoehdon näkyminen käyttäjälle
    auctionOrNot();

    // Ei voi valita mennyttä aikaa huutokaupan sulkeutumiseen
    dateControl();

    // Jätä ilmoitus -napin klikkaaminen
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Kerää lomaketiedot
        const radioAuction = document.getElementById("radio-auction");

        const title = document.getElementById("listing-name").value;
        const category = document.getElementById("listing-category").value;
        const description = document.getElementById("listing-text").value;
        const isAuction = radioAuction.checked;
        const price = isAuction
            ? document.getElementById("starting-price").value
            : document.getElementById("set-price").value;
        const auctionEnd = document.getElementById("auction-end").value;
        
        // Hae sessionStoragesta tallennettu paikkakunta
        const userLocality = sessionStorage.getItem('locality');
        const isHighestBidVisible = false;

        // Jos kaikki kentät täytetty, tallennetaan ilmon tiedot ja palataan etusivulle
        if (title == "" || category == "" || description == "" || price == "" || (isAuction && auctionEnd == "")) {
            showAlert('alert-new-listing', 'Täytäthän kaikki kentät!', 'danger');
        } else {
            // Luo ilmoitusobjekti
            const newListing = {
                title,
                category,
                userLocality,
                description,
                isAuction,
                price: parseFloat(price),
                highestBid: parseFloat(price),
                auctionEnd,
                isHighestBidVisible
            };

            // Tallenna ilmoitus localStorageen
            const listings = JSON.parse(localStorage.getItem("listings")) || [];
            listings.push(newListing);
            localStorage.setItem("listings", JSON.stringify(listings));

            // Palaa etusivulle
            window.location.replace("index.html");
        }
    });
    
});

// näkyykö käyttäjälle kiinteän hinnan vai huutokaupan syöttö
function auctionOrNot() {
    const radioSetPrice = document.getElementById("radio-set-price");
    const radioAuction = document.getElementById("radio-auction");
    const giveSetPrice = document.getElementById("give-set-price");
    const auctionInfo = document.getElementById("auction-info");

    togglePriceInputs();

    radioSetPrice.addEventListener("change", togglePriceInputs);
    radioAuction.addEventListener("change", togglePriceInputs);

    function togglePriceInputs() {
        if (radioSetPrice.checked) {
            giveSetPrice.classList.remove("invisible");
            auctionInfo.classList.add("invisible");
        } else if (radioAuction.checked) {
            giveSetPrice.classList.add("invisible");
            auctionInfo.classList.remove("invisible");
        }
    }
}

// Huutokaupan sulkeutumisjakasi ei voi valita mennyttä aikaa
function dateControl() {
    const auctionEndInput = document.getElementById("auction-end");

    auctionEndInput.addEventListener("input", function () {
        const now = new Date();
        const selectedDate = new Date(auctionEndInput.value);

        // Jos valittu päivä on tänään, tarkistetaan myös kellonaika
        if (selectedDate.toDateString() === now.toDateString() && selectedDate.getTime() < now.getTime()) {
            showAlert('alert-new-listing', 'Valitse tulevaisuuteen sijoittuva kellonaika!', 'danger');
            auctionEndInput.value = ""; // Tyhjennä kenttä
        }
    });

    // Aseta pvm minimiarvo sivun latauksen yhteydessä
    setMinDateTime();

    function setMinDateTime() {
        const now = new Date();
        const isoString = now.toISOString().slice(0, 16);
        auctionEndInput.min = isoString;
    }
}