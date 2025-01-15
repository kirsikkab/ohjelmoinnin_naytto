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

// Lisää uuden käyttäjän
function addUser(){
    let error = false
    name = document.getElementById("new-name").value
    let password = document.getElementById("new-password").value
    let email = document.getElementById("new-email").value
    let locality = document.getElementById("new-locality").value

    errors(name, password, email, locality)

    // Tarkastaa, onko userList tyhjä, ja onko nimi jo rekisteröity
    if (Object.keys(userList).length == 0){
        error = false
    }
    else{
        for (x in userList){
            if (name == x){
                alert("Käyttäjänimi on jo käytössä")
                error = true
            }
        }
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
            window.location.replace("index.html")
        }
    }
    else{
        alert("Käyttäjänimeä ei löytynyt")
    }
}

// Poistaa sanakirjojen ja localStorange tiedot
function clearStorage(){
    userList = {}
    admins = {}
    normalUsers = {}
    localStorage.clear()
}