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

    errors(name, password)

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
    if (error == false && name != "" && password != ""){
        if (document.getElementById("normal-user").checked){
            normalUsers[name] = password
            localStorage.setItem("normalUsers", JSON.stringify(normalUsers))
        }
        else{
            admins[name] = password
            localStorage.setItem("admins", JSON.stringify(admins))
        }
        userList[name] = password 
        localStorage.setItem("userList", JSON.stringify(userList))
    }
}

// Näyttää virheet, jos käyttäjänimi- ja/tai salasanakentässä ei ole mitään
function errors(name, password){
    if (name == "" || password == ""){
        if (name == "" && password == ""){
            alert("Anna käyttäjänimi ja salasana")
        }
        else if (name == ""){
            alert("Anna käyttäjänimi")
        }
        else if (password == ""){
            alert("Anna salasana")
        }
        //userList = {}
        //admins = {}
        //normalUsers = {}
    }
}

// Tarkistaa onko käyttäjänimen salasana oikein
function checkInfo(){
    name = document.getElementById("registered-username").value
    let password = document.getElementById("registered-password").value

    errors(name, password)

    if (name in userList && Object.keys(userList).length != 0){
        if (password != userList[name]){
            alert("Väärä salasana, yritä uudelleen")
        }
        else{
            window.localStorage.setItem("admins", JSON.stringify(admins))
            localStorage.setItem("name", name)
            window.location.replace("index.html")
        }
    }
    else{
        alert("Käyttäjänimeä ei löytynyt")
    }
}