var quote = document.createElement("p")
quote.id = "quote"
document.querySelector(".quoteContainer").appendChild(quote)
var footer = document.querySelector("footer")
const quotes = [
    "Ненависть порождает ненависть.",
    "Не ошибается только тот, кто ничего не делает.",
    "Боль — это боль, как её ни назови. Разве она станет слабее от мысли, что она нереальна?",
    "Жизнь человека определяется тем, что он считает истинным и правильным. Это и формирует нашу реальность. Вот только что такое истина? Всего лишь понятие, реальность может оказаться миражом. А быть может, люди живут в мире собственных иллюзий?",
    "Те, кто способны простить себя и принять свою натуру, поистине сильны.",
    "Знание не есть ум.",
    "Кто хочет делать — ищет способ, кто не хочет — ищет причину.",
    "Не бывает безвыходных ситуаций. Бывают ситуации, выход из которых тебя не устраивает.",
    "Надо любить жизнь больше, чем смысл жизни.",
    "Понимание — начало согласия."   
]

function getRandom(min, max) {
    return min + Math.floor(Math.random() * max - min + 1)
}

let before = -1
let n = -2
function mainClick() {
    footer.classList.remove("relativeFooter")
    n = getRandom(0, quotes.length - 1)
    if (n == before) {
        const half = Math.floor(quotes.length / 2)
        n = (n >= half) ? getRandom(0, half - 1) : getRandom(half, quotes.length - 1)
    }
    before = n
    quote.innerHTML = quotes[n]  
    if (window.matchMedia("min-width: 1000px") && quote.offsetHeight > window.innerHeight) {
        footer.classList.add("relativeFooter")
    }
    else if (window.matchMedia("max-width: 999px") && quote.offsetHeight > window.innerHeight * 0.07) {
        footer.classList.add("relativeFooter")
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
