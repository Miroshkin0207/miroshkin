// Переход на главную страницу
function back()
{
    window.location.href = "/main/";
}

// Таблица лидеров
const leaders = [
    
];
leaders.sort((a, b) => b.score - a.score)

for (let i = 0; i < leaders.length; i++)
{
    const line = document.createElement("div");
    line.classList.add("line");

    const name = document.createElement("div");
    name.classList.add("names");
    name.innerHTML = i + 1 + ". " + leaders[i].name;
    line.appendChild(name);

    const score = document.createElement("div");
    score.classList.add("scores");
    score.innerHTML = leaders[i].score;
    line.appendChild(score);

    document.querySelector(".table").appendChild(line);
}

// Рекорд
const score = localStorage.getItem("scoreKvadratik") || 0;
document.querySelector(".playAndScore h4").innerHTML = `Рекорд: ${score}`;

// Запуск игры
function play()
{
    window.location.href = "/kvadratik/game/";
}

// Настройки
function settings()
{
    document.querySelector(".settings").style.display = "inline-block";
    document.querySelector(".overlay").style.display = "inline-block";
}

function exitSettings()
{
    document.querySelector(".settings").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
}

// Включение/отключение обратного отсчёта при старте
if (localStorage.getItem("countdownWithStarting") != "false")
    document.querySelector("select").value = "Включён";
else
    document.querySelector("select").value = "Отключён";

function countdownWithStarting()
{
    if (document.querySelector("select").value == "Включён")
        localStorage.setItem("countdownWithStarting", "true");
    else
        localStorage.setItem("countdownWithStarting", "false");
}

// Включение/отключение музыки в игре
if (localStorage.getItem("music") != "false")
    document.getElementsByTagName("select")[1].value = "Включена";
else
    document.getElementsByTagName("select")[1].value = "Отключена";

function music()
{
    if (document.getElementsByTagName("select")[1].value == "Включена")
        localStorage.setItem("music", "true");
    else
        localStorage.setItem("music", "false");
}

// Меню с информацией
function info()
{
    document.querySelector(".overlay").style.display = "inline-block";
    document.querySelector(".menuInfo").style.display = "inline-block";
}

function exitInfo()
{
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".menuInfo").style.display = "none";
}

// Об игре
function aboutGame()
{
    window.location.href = "/kvadratik/aboutGame/";
}