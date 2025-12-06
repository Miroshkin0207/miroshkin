function back() {
    window.location.href = "/main/"
}

var button = document.querySelector("#mainButton")

// Для ПК
button.addEventListener("mousedown", (e) => mouseStart(e), {passive: false})
button.addEventListener("mouseup", () => mouseEnd(), {passive: false})

// Для телефонов
button.addEventListener("touchstart", (e) => touchStart(e))
button.addEventListener("touchend", (e) => touchEnd(e))
button.addEventListener("touchmove", () => touchMove())

let total = document.querySelector("#total")
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
    {name: "Пряничный раб Козла в очках", score: 1760}
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

function info() {
    document.querySelector(".menuInfo").style.display = "block"
    document.querySelector(".overlay").style.display = "block"
}

function exit() {
    document.querySelector(".menuInfo").style.display = "none"
    document.querySelector(".overlay").style.display = "none"
}