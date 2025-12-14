// переход на главную страницу
function back() {
    window.location.href = "/main/"
}

// Загрузка рекорда
let total = document.querySelector("#total")
async function getScore() {
    const response = await fetch("/api/get-score.js")
    const score = await response.text()
    total.innerHTML = score
}
getScore()

var button = document.querySelector("#mainButton")
// Для ПК
button.addEventListener("mousedown", (e) => mouseStart(e), {passive: false})
button.addEventListener("mouseup", () => mouseEnd(), {passive: false})

// Для телефонов
button.addEventListener("touchstart", (e) => touchStart(e))
button.addEventListener("touchend", (e) => touchEnd(e))
button.addEventListener("touchmove", () => touchMove())

// Обработка кликов
function touchStart(e) { 
    e.preventDefault()
    if (e.targetTouches.length <= 2) {
        button.classList.add("buttonClicked")
        total.innerHTML = Number(total.innerHTML) + e.changedTouches.length
    }
    else {
        return
    }
}

function touchEnd(e) {
    if (e.targetTouches.length == 0) {
        button.classList.remove("buttonClicked")
    }
}

function touchMove() {
   button.classList.remove("buttonClicked")
}

function mouseStart(e) {
    e.preventDefault()
    document.querySelector("#total").innerHTML++
    button.classList.add("buttonClicked")
}

function mouseEnd() {
    button.classList.remove("buttonClicked")
}

const table = [
    {name: "Сигма Влдмр", score: 666},
    {name: "Левин", score: 200},
    {name: "Козёл в очках с бородкой", score: 5000},
    {name: "Пряничный раб Козла в очках", score: 1760},
    {name: "TON-618", score: 2500}
]
table.sort((a, b) => b.score - a.score)

for (let i = 0; i < table.length; i++) {
    let line = document.createElement("div")
    line.classList.add("line")

    let name = document.createElement("div")
    name.classList.add("names")
    name.innerHTML = i + 1 + ". " + table[i].name
    line.appendChild(name)

    let score = document.createElement("div")
    score.classList.add("scores")
    score.innerHTML = table[i].score
    line.appendChild(score)

    document.querySelector(".table").appendChild(line)
}

// Замок
var isOpen = true
function lock() {
    var lockImg = document.querySelector("img")
    if (isOpen == true) {
        lockImg.src = "images/lockClose.png"
        document.body.style.overflow = "hidden"
        isOpen = false
    }
    else {
        lockImg.src = "images/lockOpen.png"
        document.body.style.overflow = "visible"
        isOpen = true
    }
}

// Открыть меню
function info() {
    document.querySelector(".menuInfo").style.display = "block"
    document.querySelector(".overlay").style.display = "block"
}

// Закрыть меню
function exit() {
    document.querySelector(".menuInfo").style.display = "none"
    document.querySelector(".overlay").style.display = "none"
}

// Меню сброса рекорда
function showMenuReset() {
    document.querySelector(".overlay").style.display = "block"
    document.querySelector(".menuReset").style.display = "block"
}


// Выйти из меню сброса рекорда
function exitReset() {
    document.querySelector(".menuReset").style.display = "none"
    document.querySelector(".overlay").style.display = "none"
}

// Сбросить рекорд
let isReset = false
function reset() {
    total.innerHTML = 0
    isReset = true
    exitReset()
}

// Сохранение
setInterval(() => {
    if (total.innerHTML != 0 || isReset) {
        fetch("/api/score.js", {
            method: "POST",
            body: total.innerHTML,
            credentials: "include"
        })
    }
}, 3000)