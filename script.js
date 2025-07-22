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