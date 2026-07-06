// Импорт
import { switchOn, switchOff, switchSetting } from "/main/common.js";

// Переход на главную страницу
document.querySelector("#back").onclick = () => back();
async function back() {
    await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
}

// Таблица лидеров
const leaders = [
    {name: "Вантус 🪠", score: 275}
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
document.getElementsByTagName("button")[1].onclick = () => play();
async function play()
{
    if (localStorage.getItem("animationOn") != "false")
        await switchOn();
    window.location.href = "/kvadratik/game/";
}

// Настройки
document.getElementsByTagName("button")[2].onclick = () => settings();
function settings()
{
    document.querySelector("#settingsMenu").style.display = "inline-block";
    document.querySelector(".overlay").style.display = "inline-block";
}

document.getElementsByClassName("exit")[1].onclick = () => exitSettings();
function exitSettings()
{
    document.querySelector("#settingsMenu").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
}

// Меню с информацией
document.querySelector("#info").onclick = () => info();
function info()
{
    document.querySelector(".overlay").style.display = "inline-block";
    document.querySelector("#menuInfo").style.display = "inline-block";
}

document.querySelector(".exit").onclick = () => exitInfo();
document.querySelector("#ponyatno").onclick = () => exitInfo();
function exitInfo()
{
    document.querySelector(".overlay").style.display = "none";
    document.querySelector("#menuInfo").style.display = "none";
}

// Об игре
document.getElementsByTagName("button")[3].onclick = () => aboutGame();
async function aboutGame()
{
    if (localStorage.getItem("animationOn") != "false")
        await switchOn();
    window.location.href = "/kvadratik/aboutGame/";
}

document.querySelectorAll(".switches")[0].onclick = () => 
    switchSetting(document.querySelectorAll(".switches")[0], document.querySelectorAll(".circles")[0], "countdownWithStarting");
document.querySelectorAll(".switches")[1].onclick = () => 
    switchSetting(document.querySelectorAll(".switches")[1], document.querySelectorAll(".circles")[1], "music");

// Установка переключателей
if (localStorage.getItem("countdownWithStarting") == "false")
{    
    document.querySelectorAll(".switches")[0].classList.add("switchOff");
    document.querySelectorAll(".circles")[0].classList.add("circleOff");
}

if (localStorage.getItem("music") == "false")
{    
    document.querySelectorAll(".switches")[1].classList.add("switchOff");
    document.querySelectorAll(".circles")[1].classList.add("circleOff");
}
