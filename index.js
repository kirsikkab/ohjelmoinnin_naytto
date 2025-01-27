if (localStorage.getItem("admins") == null){
    localStorage.setItem("admins", JSON.stringify({}))
}

if (localStorage.getItem("theme") == null){
    localStorage.setItem("theme", "light")
}

document.addEventListener("load", checkLogin())

// Siirrytäänkö kirjaudu- vai kirjaudu ulos -sivulle klikattaessa
function clickLogin(){
    if(document.getElementById("login-button").innerHTML == "Kirjaudu ulos"){
        localStorage.removeItem("name")
        localStorage.removeItem("locality")
        window.location.replace("logout.html")
    }
    else{
        window.location.replace("login.html")
    }
}

// Takaisin etusivulle
function backToMain(){
    window.location.replace("index.html")
}

// Luo uusi ilmoitus
function createNewListing() {
    window.location.replace("newListing.html")
}

// Tarkastaa, onko joku kirjautunut sisään ja vaihdetaanko sivun ulkomuotoa sen johdosta
function checkLogin(){
    let username = localStorage.getItem("name")
    if (username == null){
        if (document.getElementById("btn-new-listing").classList[1] != "invisible"){
            document.getElementById("btn-new-listing").classList.add("invisible")
        }
        if (document.getElementById("btn-message").classList[2] != "invisible"){
            document.getElementById("btn-message").classList.add("invisible")
        }
    }
    else if (username != null){
        if (document.getElementById("btn-new-listing").classList[1] == "invisible"){
            document.getElementById("btn-new-listing").classList.remove("invisible")
            document.getElementById("btn-message").classList.remove("invisible")
            document.getElementById("login-button").innerHTML = "Kirjaudu ulos"
        }
    }
    modifyButtons()
    }

document.addEventListener("DOMContentLoaded", function () {
    const listingsContainer = document.getElementById("listings");

    // Haetaan localStoragesta tallennetut ilmoitukset
    const listings = JSON.parse(localStorage.getItem("listings")) || [];
     
    // Luo HTML-ilmoitukset
    listings.forEach((listing) => {
        const listingElement = document.createElement("div");
        listingElement.className = "listing d-flex flex-column justify-content-center";

        listingElement.innerHTML = `
            <h2 class="h2-listing">${listing.title}</h2>
            <h5 class="h5-listing">${listing.category}</h5>
            <h5 class="location">${listing.userLocality}</h5>
            <p class="listing-description">${listing.description}</p>
            ${
                listing.isAuction
                    ? `<p class="listing-price">Lähtöhinta: <span class="start-price">${listing.price.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> €</p>
                       <p class="closing-date">Huutokauppa sulkeutuu: <span class="date">${new Date(
                           listing.auctionEnd
                       ).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span></p>
                       <p class="highest-bid m-0 ${listing.isHighestBidVisible ? '' : 'invisible'}">Korkein tarjous: <span class="bid">${listing.highestBid.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> €</p>`
                    : `<p class="listing-price"><span class="price">${listing.price.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> €</p>`
            }
            <div class="btns-listing d-flex flex-column justify-content-center pt-3">
                <div class="d-flex justify-content-center">
                    ${
                        listing.isAuction
                            ? `<button class="btn-bid theme1" data-bs-toggle="modal" data-bs-target="#bidModal" data-bs-whatever="${listing.title}" data-title="${listing.title}" onclick="biddingInfo(this)">Tarjoa hintaa</button>`
                            : `<button class="btn-send-message theme1" data-bs-toggle="modal" data-bs-target="#messageModal" data-bs-whatever="${listing.title}">Lähetä viesti myyjälle</button>`
                    }
                </div>
                <div class="d-flex justify-content-center">
                        <button class="delete-listing theme1" data-title="${listing.title}" onclick="deleteListing(this)">Poista ilmoitus</button>
                </div>
            </div>
        `;

        listingsContainer.appendChild(listingElement);

        modifyButtons()
    });
});

// Aktiivinen ilmoitus
let activeListingElement = null; 

// Viestin lähetys ja tarjouksen teko -modaleihin myyntikohteen tiedot
document.addEventListener('DOMContentLoaded', function () {

    const modals = ['messageModal', 'bidModal'];

    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);

        modal.addEventListener('show.bs.modal', function (event) {
            const btn = event.relatedTarget; 
            const itemName = btn.getAttribute('data-bs-whatever'); 
            const pModal = modal.querySelector('.p-modal'); 

            if (modalId === 'messageModal') {
                pModal.textContent = `Viesti koskien kohdetta: ${itemName}`;
            } else if (modalId === 'bidModal') {
                pModal.textContent = `Tee tarjous kohteeseen: ${itemName}`;
                activeListingElement = btn.closest('.listing');
            }
        });
    });
});

// Piilottaa/näyttää eri nappeja riippuen siitä, onko kirjauduttu
function modifyButtons(){
    let sendButtons = document.getElementsByClassName("btn-send-message")
    let offerButtons = document.getElementsByClassName("btn-bid")
    let removeButtons = document.getElementsByClassName("delete-listing")
    username = localStorage.getItem("name")
    for (let i = 0; i < sendButtons.length; i++){
        if (username == null){
            sendButtons[i].style.display = "none"
        }
        else if (username != null){
            sendButtons[i].style.display = ""
        }
    }
    for (let i = 0; i < offerButtons.length; i++){
        if (username == null){
            offerButtons[i].style.display = "none"
        }
        else if (username != null){
            offerButtons[i].style.display = ""
        }
    }

    if (localStorage.getItem("admins") != "{}"){
        let admins = JSON.parse(localStorage.getItem("admins"))
        for (let i = 0; i < Object.keys(admins).length; i++){
            if (username != Object.keys(admins)[i]){
                for (let i = 0; i < removeButtons.length; i++){
                    removeButtons[i].style.display = "none"
                }
            }
            else if (username == Object.keys(admins)[i]){
                for (let i = 0; i < removeButtons.length; i++){
                    removeButtons[i].style.display = ""
                }
                for (let i = 0; i < sendButtons.length; i++){
                    sendButtons[i].style.display = "none"
                }
                for (let i = 0; i < offerButtons.length; i++){
                    offerButtons[i].style.display = "none"
                }
            }
        }
    }
    else {
        for (let i = 0; i < removeButtons.length; i++){
            removeButtons[i].style.display = "none"
        }
    }
}

// Alert-ilmoitukset
function showAlert(divID, message, color) {
    const alertContainer = document.getElementById(`${divID}`);
    alertContainer.innerHTML = `
        <div class="alert alert-${color} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertContainer.style.display = 'block';

    // Piilota ilmoitus 5 sekunnin kuluttua
    setTimeout(() => {
        alertContainer.style.display = 'none';
        alertContainer.innerHTML = ''; // Tyhjennetään sisältö
    }, 5000);
}

// Viestin lähetykseen liittyvät alertit
const sendMessageButton = document.getElementById("btn-modal-send-msg");
sendMessageButton.addEventListener('click', function () {

    // Hae viestikentän sisältö
    const messageTextArea = document.getElementById('message-text');
    const messageText = messageTextArea.value.trim();

    // Onko viestikenttä tyhjä?
    if (messageText === "") {
        // Näytetään virheilmoitus
        showAlert('alert-msg', 'Kirjoitathan viestin viestikenttään!', 'danger');
        return; 
    }

    // Näytetään ilmoitus viestin lähetyksestä
    showAlert('alert-msg', 'Kiitos, viestisi on nyt lähetetty!', 'success');

    // Tyhjennetään modalin tekstikenttä
    messageTextArea.value = "";

    // Piilotetaan modal
    const messageModal = document.getElementById('messageModal');
    const modal = bootstrap.Modal.getInstance(messageModal);
    modal.hide(); 
});

const makeBidButton = document.getElementById("btn-modal-make-bid");

// Haetaan ilmoituksen otsikko Tarjoa hintaa -napista
let currentTitle;
function biddingInfo(button) {
    currentTitle = button.getAttribute("data-title"); 
}

// Tarjouksen teko
makeBidButton.addEventListener("click", function () {
    makeBid(currentTitle); // Välitä otsikko funktiolle
});

function makeBid(listingTitle) {
    //ilmoitukset localStoragesta
    const listings = JSON.parse(localStorage.getItem("listings")) || [];
    currentListing = listings.find(item => item.title === listingTitle)

    // Tarjouskentän sisältö
    const bidAmount = document.getElementById("bid-amount");
    const bidValue = parseFloat(bidAmount.value);

    // Korkein tarjous aktiivisesta ilmoituksesta
    const highestBidValue = currentListing.highestBid;
    
    const highestBidElement = activeListingElement.querySelector('.highest-bid');
    const highestBidShown = activeListingElement.querySelector('.bid');
    
    // Jos uusi tarjous korkeampi kuin aiempi korkein tarjous
    if (bidValue > highestBidValue) {
        currentListing.highestBid = bidValue; //Ilmoituksen korkeimmalle tarjoukselle uusi arvo
        currentListing.isHighestBidVisible = true; // Korkein tarjous -kenttä näytetään

        // Päivitetään localStorage
        localStorage.setItem("listings", JSON.stringify(listings));

        highestBidShown.textContent = bidValue.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (highestBidElement.classList.contains('invisible')) {
            highestBidElement.classList.remove('invisible'); // Näytetään korkein tarjous
        }
        
        // Tyhjennetään tarjouskenttä
        bidAmount.value = '';

        // Piilotetaan modal
        const bidModal = document.getElementById('bidModal');
        const modal = bootstrap.Modal.getInstance(bidModal);
        modal.hide();

        // Näytetään onnistumisilmoitus
        showAlert('alert-msg', 'Kiitos, tarjouksesi on vastaanotettu!', 'success');

    } else {
        showAlert('alert-msg', 'Tarjouksen täytyy olla korkeampi kuin nykyinen korkein tarjous!', 'danger');

        // Tyhjennetään tarjouskenttä
        bidAmount.value = '';
    }

}

// Aalto-vaasista tarjoaminen
function bidForVase(){

    const highestBidSpanElementVase = document.getElementById('highest-bid-vase');
    const highestBidVase = parseFloat(highestBidSpanElementVase.innerText.replace(',', '.')); // Nykyinen korkein tarjous
    const bidAmountVase = document.getElementById('bid-amount-vase');
    const bidAmountVaseNum = parseFloat(document.getElementById('bid-amount-vase').value); // Käyttäjän tarjous
    const highestBidElementVase = document.getElementById('highest-bid-element-vase');

    if (bidAmountVaseNum > highestBidVase) {
        highestBidSpanElementVase.textContent = bidAmountVaseNum.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (highestBidElementVase.classList.contains('invisible')) {
            highestBidElementVase.classList.remove('invisible'); // Näytetään korkein tarjous
        }

        // Tyhjennetään tarjouskenttä
        bidAmountVase.value = '';

        // Piilotetaan modal
        const bidModalVase = document.getElementById('bidModalVase');
        const modal = bootstrap.Modal.getInstance(bidModalVase);
        modal.hide();

        showAlert('alert-msg', 'Kiitos, tarjouksesi on vastaanotettu!', 'success');
    } else {
        showAlert('alert-msg', 'Tarjouksen täytyy olla korkeampi kuin nykyinen korkein tarjous!', 'danger');

        // Tyhjennetään tarjouskenttä
        bidAmountVase.value = '';
    }
}

// Ilmoituksen poisto (Ylläpitäjä)

let listingToDelete = null; // Aktiivinen poistettava ilmoitus

function deleteListing(button) {
    // poistettavan ilmoituksen elementti ja otsikko
    listingToDelete = {
        element: button.closest(".listing"),
        title: button.getAttribute("data-title")
    };

    // Avataan vahvistusmodaali
    const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmationModal.show();
}

// Kuunnellaan modalin "Poista"-painiketta
document.getElementById("confirmDeleteButton").addEventListener("click", function () {
    if (!listingToDelete) return;

    // Hae ilmoitukset localStoragesta
    const listings = JSON.parse(localStorage.getItem("listings")) || [];

    // Suodata pois poistettava ilmoitus
    const updatedListings = listings.filter(listing => listing.title !== listingToDelete.title);

    // Päivitä localStorage
    localStorage.setItem("listings", JSON.stringify(updatedListings));

    // Poista ilmoitus DOM:sta
    listingToDelete.element.remove();

    // Näytä onnistumisilmoitus
    showAlert("alert-msg", "Ilmoitus on poistettu onnistuneesti!", "success");

    // Tyhjennä aktiivinen poistettava ilmoitus
    listingToDelete = null;

    // Sulje modaali
    const confirmationModal = bootstrap.Modal.getInstance(document.getElementById("confirmationModal"));
    confirmationModal.hide();
});



