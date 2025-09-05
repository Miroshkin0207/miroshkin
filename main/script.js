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
    window.location.href = "/miroshkin/history_of_changes/"
}

function calculator() {
    window.location.href = "/miroshkin/calculator/"
}

function clicker() {
    window.location.href = "/miroshkin/clicker/"
}

function textHandler() {
    window.location.href = "/miroshkin/text_handler/"
}