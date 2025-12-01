var quote = document.createElement("p")
quote.id = "quote"
document.querySelector("body").insertBefore(quote, document.querySelector("nav"))
var footer = document.querySelector("footer")

function mainClick() {
    quote.innerHTML = "Молодец!"   
    if (window.matchMedia("(min-width: 1000px") && quote.offsetHeight > window.innerHeight * 0.4){
        footer.style = "position: relative"
    }
    document.querySelector("#mainButton").innerHTML = "Повторить"
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

function randomizer() {
    window.location.href = "/randomizer/"
}
