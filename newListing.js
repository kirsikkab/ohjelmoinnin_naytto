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
        const title = document.getElementById("listing-name").value;
        const category = document.getElementById("listing-category").value;
        const description = document.getElementById("listing-text").value;
        const isAuction = radioAuction.checked;
        const price = isAuction
            ? document.getElementById("starting-price").value
            : document.getElementById("set-price").value;
        const auctionEnd = isAuction ? auctionEndInput.value : null;

        // Luo ilmoitusobjekti
        const newListing = {
            title,
            category,
            description,
            isAuction,
            price: parseFloat(price),
            auctionEnd,
        };

        // Tallenna ilmoitus localStorageen
        const listings = JSON.parse(localStorage.getItem("listings")) || [];
        listings.push(newListing);
        localStorage.setItem("listings", JSON.stringify(listings));

        // Palaa etusivulle
        window.location.replace("index.html");
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
        if (
            selectedDate.toDateString() === now.toDateString() &&
            selectedDate.getTime() < now.getTime()
        ) {
            alert("Valitse tulevaisuuteen sijoittuva kellonaika.");
            auctionEndInput.value = ""; // Tyhjennä kenttä
        }
    });

    // Aseta minimiarvo sivun latauksen yhteydessä
    setMinDateTime();

    function setMinDateTime() {
        const now = new Date();
        const isoString = now.toISOString().slice(0, 16);
        auctionEndInput.min = isoString;
    }
}