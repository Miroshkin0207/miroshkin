import { switchOn, switchSetting, openMenu, exitMenu } from "/main/common.js";

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
document.getElementsByTagName("button")[2].onclick = () => openMenu("#settingsMenu");
document.getElementsByClassName("exit")[0].onclick = () => exitMenu("#settingsMenu");

// Об игре
document.getElementsByTagName("button")[3].onclick = async () =>
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
