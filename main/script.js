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
    window.location.href = "/history_of_changes/"
}

function calculator() {
    window.location.href = "/calculator/"
}

function clicker() {
    window.location.href = "/clicker/"
}

function textHandler() {
    window.location.href = "/text_handler/"
}