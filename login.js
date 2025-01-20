if (localStorage.getItem("admins") == null){
    localStorage.setItem("admins", JSON.stringify({}))
}
let admins = JSON.parse(localStorage.getItem("admins"))

if (localStorage.getItem("userList") == null){
    localStorage.setItem("userList", JSON.stringify({}))
}
let userList = JSON.parse(localStorage.getItem("userList"))

let normalUsers = {}
let name = ""

let localityList = ["", "Akaa", "Alajärvi", "Alavieska", "Alavus", "Asikkala", "Askola", "Aura", "Brändö", "Eckerö", 
    "Enonkoski", "Enontekiö", "Espoo", "Eura", "Eurajoki", "Evijärvi", "Finström", "Forssa", "Föglö", "Geta", "Haapajärvi", 
    "Haapavesi", "Hailuoto", "Halsua", "Hamina", "Hammarland", "Hankasalmi", "Hanko", "Harjavalta", "Hartola", "Hattula",
    "Hausjärvi", "Heinola", "Heinävesi", "Helsinki", "Hirvensalmi", "Hollola", "Huittinen", "Humppila", "Hyrynsalmi", 
    "Hyvinkää", "Hämeenkyrö", "Hämeenlinna", "Ii", "Iisalmi", "Iitti", "Ikaalinen", "Ilmajoki", "Ilomantsi", "Imatra",
    "Inari", "Inkoo", "Isojoki", "Isokyrö", "Janakkala", "Joensuu", "Jokioinen", "Jomala", "Joroinen", "Joutsa", "Juuka",
    "Juupajoki", "Juva", "Jyväskylä", "Jämijärvi", "Jämsä", "Järvenpää", "Kaarina", "Kaavi", "Kajaani", "Kalajoki", 
    "Kangasala", "Kangasniemi", "Kankaanpää", "Kannonkoski", "Kannus", "Karijoki", "Karkkila", "Karstula", "Karvia", 
    "Kaskinen", "Kauhajoki", "Kauhava", "Kauniainen", "Kaustinen", "Keitele", "Kemi", "Kemijärvi", "Keminmaa", 
    "Kemiönsaari", "Kempele", "Kerava", "Keuruu", "Kihniö", "Kinnula", "Kirkkonummi", "Kitee", "Kittilä", "Kiuruvesi", 
    "Kivijärvi", "Kokemäki", "Kokkola", "Kolari", "Konnevesi", "Kontiolahti", "Korsnäs", "Koski Tl", "Kotka", "Kouvola", 
    "Kristiinankaupunki", "Kruunupyy", "Kuhmo", "Kuhmoinen", "Kumlinge", "Kuopio", "Kuortane", "Kurikka", "Kustavi", 
    "Kuusamo", "Kyyjärvi", "Kärkölä", "Kärsämäki", "Kökar", "Lahti", "Laihia", "Laitila", "Lapinjärvi", "Lapinlahti", 
    "Lappajärvi", "Lappeenranta", "Lapua", "Laukaa", "Lemi", "Lemland", "Lempäälä", "Leppävirta", "Lestijärvi", "Lieksa", 
    "Lieto", "Liminka", "Liperi", "Lohja", "Loimaa", "Loppi", "Loviisa", "Luhanka", "Lumijoki", "Lumparland", "Luoto",
    "Luumäki", "Maalahti", "Maarianhamina", "Marttila", "Masku", "Merijärvi", "Merikarvia", "Miehikkälä", "Mikkeli",
    "Muhos", "Multia", "Muonio", "Mustasaari", "Muurame", "Mynämäki", "Myrskylä", "Mäntsälä", "Mänttä-Vilppula", 
    "Mäntyharju", "Naantali", "Nakkila", "Nivala", "Nokia", "Nousiainen", "Nurmes", "Nurmijärvi", "Närpiö", "Orimattila", 
    "Oripää", "Orivesi", "Oulainen", "Oulu", "Outokumpu", "Padasjoki", "Paimio", "Paltamo", "Parainen", "Parikkala", 
    "Parkano", "Pedersören kunta", "Pelkosenniemi", "Pello", "Perho", "Petäjävesi", "Pieksämäki", "Pielavesi", 
    "Pietarsaari", "Pihtipudas", "Pirkkala", "Polvijärvi", "Pomarkku", "Pori", "Pornainen", "Porvoo", "Posio", 
    "Pudasjärvi", "Pukkila", "Punkalaidun", "Puolanka", "Puumala", "Pyhtää", "Pyhäjoki", "Pyhäjärvi", "Pyhäntä", 
    "Pyhäranta", "Pälkäne", "Pöytyä", "Raahe", "Raasepori", "Raisio", "Rantasalmi", "Ranua", "Rauma", "Rautalampi", 
    "Rautavaara", "Rautjärvi", "Reisjärvi", "Riihimäki", "Ristijärvi", "Rovaniemi", "Ruokolahti", "Ruovesi", "Rusko", 
    "Rääkkylä", "Saarijärvi", "Salla", "Salo", "Saltvik", "Sastamala", "Sauvo", "Savitaipale", "Savonlinna", "Savukoski", 
    "Seinäjoki", "Sievi", "Siikainen", "Siikajoki", "Siikalatva", "Siilinjärvi", "Simo", "Sipoo", "Siuntio", "Sodankylä", 
    "Soini", "Somero", "Sonkajärvi", "Sotkamo", "Sottunga", "Sulkava", "Sund", "Suomussalmi", "Suonenjoki", "Sysmä", 
    "Säkylä", "Taipalsaari", "Taivalkoski", "Taivassalo", "Tammela", "Tampere", "Tervo", "Tervola", "Teuva", "Tohmajärvi", 
    "Toholampi", "Toivakka", "Tornio", "Turku", "Tuusniemi", "Tuusula", "Tyrnävä", "Ulvila", "Urjala", "Utajärvi", 
    "Utsjoki", "Uurainen", "Uusikaarlepyy", "Uusikaupunki", "Vaala", "Vaasa", "Valkeakoski", "Vantaa", "Varkaus", "Vehmaa", 
    "Vesanto", "Vesilahti", "Veteli", "Vieremä", "Vihti", "Viitasaari", "Vimpeli", "Virolahti", "Virrat", "Vårdö", "Vöyri", 
    "Ylitornio", "Ylivieska", "Ylöjärvi", "Ypäjä", "Ähtäri", "Äänekoski"]

document.addEventListener("load", generateLocalityList())

// Lisää uuden käyttäjän
function addUser(){
    let error = false
    name = document.getElementById("new-name").value
    let password = document.getElementById("new-password").value
    let email = document.getElementById("new-email").value
    let locality = document.getElementById("new-locality").value

    errors(name, password, email, locality)

    // Tarkastaa, onko userList tyhjä, ja onko nimi ja sähköposti jo rekisteröity
    if (Object.keys(userList).length == 0){
        error = false
    }
    else{
        for (x in userList){
            if (name == x){
                alert("Käyttäjänimi on jo käytössä")
                error = true
            }
            if (email == userList[x][1]){
                alert("Sähköposti on jo käytössä")
                error = true
            }
        }
    }

    // Tarkistaa onko sähköposti oikeanmuotoinen
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    
    if (regex.test(email) == false && email != ""){
        alert("Anna oikeanmuotoinen sähköposti")
        error = true
    }

    regex = /(?=.*\d)/

    // Tarkistaa sisältääkö salasana tarvittavat merkit ja onko se tarpeeksi pitkä
    if (password.length < 6 || regex.test(password) == false){
        alert("Salasanassa tulee olla vähintään kuusi merkkiä, yksi numero, yksi iso ja pieni kirjain ja ei välilyöntejä")
        error = true
    }

    // Lisää käyttäjän userListiin ja tavalliset käyttäjät/ylläpitäjät -listaan
    if (error == false && name != "" && password != "" && email != "" && locality != ""){
        if (document.getElementById("normal-user").checked){
            normalUsers[name] = [password, email, locality]
            localStorage.setItem("normalUsers", JSON.stringify(normalUsers))
        }
        else{
            admins[name] = [password, email, locality]
            localStorage.setItem("admins", JSON.stringify(admins))
        }
        userList[name] = [password, email, locality]
        localStorage.setItem("userList", JSON.stringify(userList))
        document.getElementById("new-name").value = ""
        document.getElementById("new-password").value = ""
        document.getElementById("new-email").value = ""
        document.getElementById("new-locality").value = ""
    }
}

// Näyttää virheet, jos kentissä ei ole mitään
function errors(name, password, email, locality){
    if (name == "" || password == "" || email == "" || locality == ""){
        let errorMsg = []
        if (name == ""){
            errorMsg.push("käyttäjänimi")
        }
        if (password == ""){
            errorMsg.push(" salasana")
        }
        if (email == ""){
            errorMsg.push(" sähköposti")
        }
        if (locality == ""){
            errorMsg.push(" paikkakunta")
        }
        alert("Anna " + errorMsg)
    }
}

// Tarkistaa onko käyttäjänimen salasana oikein
function checkInfo(){
    name = document.getElementById("registered-username").value
    let password = document.getElementById("registered-password").value

    errors(name, password)

    if (name in userList && Object.keys(userList).length != 0){
        if (password != userList[name][0]){
            alert("Väärä salasana, yritä uudelleen")
        }
        else{
            window.localStorage.setItem("admins", JSON.stringify(admins))
            window.localStorage.setItem('name', name)
            window.localStorage.setItem("locality", userList[name][2])
            window.location.replace("index.html")
        }
    }
    else{
        alert("Käyttäjänimeä ei löytynyt")
    }
}


// Näyttää salasanan nappia painettaessa
function showPassword(){
    let passwordField
    let passwordButton = event.target.id
    if (passwordButton == "show-password-register"){
        passwordField = document.getElementById("new-password")
    }
    else{
        passwordField = document.getElementById("registered-password")
    }

    if (passwordField.type === "password"){
        passwordField.type="text"
    }
    else{
        passwordField.type="password"
    }
}

// Kirjautumistieto sessionStorageen 
document.getElementById('login').addEventListener('click', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('registered-username').value;
    const password = document.getElementById('registered-password').value;
    
    const userList = JSON.parse(localStorage.getItem('userList'));
    if (userList[username] && userList[username][0] === password) {
        sessionStorage.setItem('loggedInUser', username);
        sessionStorage.setItem('locality', userList[username][2]);
    } 
});

// Luo kuntalistan
function generateLocalityList(){
    for (i=0; i<309; i++){
        let newOption = document.createElement("option")
        newOption.value = localityList[i]
        newOption.text = localityList[i]
        document.getElementById("new-locality").add(newOption)
    }
}

// Poistaa sanakirjojen ja localStoragen tiedot
function clearStorage(){
    userList = {}
    admins = {}
    normalUsers = {}
    localStorage.clear()
}