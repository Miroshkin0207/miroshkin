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
    window.location.href = "/История-изменений/"
}

function calculator() {
    window.location.href = "/Калькулятор/"
}

function clicker() {
    window.location.href = "/Кликер/"
}

function textHandler() {
    window.location.href = "/Обработчик текста/"
}