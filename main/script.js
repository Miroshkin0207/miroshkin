function mainClick() {
    if (document.querySelector("#text").innerHTML === "") {
        document.querySelector("#text").innerHTML = "Молодец!"
        document.querySelector("#mainButton").innerHTML = "Вернуть"
    }
    else {
        document.querySelector("#text").innerHTML = ""
        document.querySelector("#mainButton").innerHTML = "Нажми"
    }
}

function history() {
    window.location.href = "/history-of-changes/"
}

function calculator() {
    window.location.href = "/calculator/"
}

function clicker() {
    window.location.href = "/clicker/"
}

function textHandler() {
    window.location.href = "/text-handler/"
}

function passwordGenerator() {
    window.location.href = "/password-generator/"
}

function random() {
    window.location.href = "/randomizer/"
}