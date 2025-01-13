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