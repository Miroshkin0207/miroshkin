function back() {
    window.location.href = "/main/"
}

var button = document.querySelector("#mainButton")

// Для ПК
button.addEventListener("mousedown", mouseStart)
button.addEventListener("mouseup", mouseEnd)

// Для телефонов
button.addEventListener("touchstart", (e) => touchStart(e))
button.addEventListener("touchend", (e) => touchEnd(e))
button.addEventListener("touchmove", () => touchMove())

function touchStart(e) {
    if (e.targetTouches.length <= 2) {
        document.querySelector("#total").innerHTML = Number(document.querySelector("#total").innerHTML) + e.changedTouches.length
        button.classList.add("buttonClicked")
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

function mouseStart() {
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

const help = document.querySelector(".help")
document.querySelector(".rect").removeChild(help)
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

    document.querySelector(".rect").appendChild(line)
}

document.querySelector(".rect").appendChild(help)
