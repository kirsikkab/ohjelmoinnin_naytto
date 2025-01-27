let theme2 = document.getElementsByClassName("theme2")
let modal = document.getElementsByClassName("modal")

document.addEventListener("load", checkTheme())

// Tarkastaa, onko vaalea vai tumma teema
function checkTheme(){
    let theme = localStorage.getItem("theme")
    if (theme == "light"){
        for (let i = 0; i < theme2.length; i++){
            theme2[i].style.background = "#DADEEA"
            theme2[i].style.color = "#414757"
        }
        document.getElementById("btn-change-theme").innerHTML = "Vaihda tummaan tilaan"
    }
    else if (theme == "dark"){
        for (let i = 0; i < theme2.length; i++){
            theme2[i].style.background = "#414757"
            theme2[i].style.color = "#DADEEA"
        }
        for (let i = 0; i < modal.length; i++){
            modal[i].style.color = "#414757"
        }
        document.getElementById("btn-change-theme").innerHTML = "Vaihda vaaleaan tilaan"
    }
}

// Vaihtaa teeman nappia painettaessa
function changeThemes(){
    if (document.getElementById("btn-change-theme").innerHTML == "Vaihda tummaan tilaan"){
        for (let i = 0; i < theme2.length; i++){
            theme2[i].style.background = "#414757"
            theme2[i].style.color = "#DADEEA"
        }
        for (let i = 0; i < modal.length; i++){
            modal[i].style.color = "#414757"
        }
        document.getElementById("btn-change-theme").innerHTML = "Vaihda vaaleaan tilaan"
        let mode = "dark"
        localStorage.setItem("theme", mode)
        }
    else {
        for (let i = 0; i < theme2.length; i++){
            theme2[i].style.background = "#DADEEA"
            theme2[i].style.color = "#414757"
        }
        document.getElementById("btn-change-theme").innerHTML = "Vaihda tummaan tilaan"
        let mode = "light"
        localStorage.setItem("theme", mode)
    }
}