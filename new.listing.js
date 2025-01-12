

document.addEventListener("DOMContentLoaded", function () {
    // Oikean hinnoitteluvaihtoehdon näkyminen käyttäjälle
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

    // Ei voi valita mennyttä aikaa huutokaupan sulkeutumiseen
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
    
});
