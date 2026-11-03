// Импорт
import { switchOn, openMenu, exitMenu, showCaution } from "/main/common.js";
// Переход на главную страницу
document.querySelector("#back").onclick = async () => 
{
    await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
}

// Загрузка рекорда
let total = document.querySelector("#total");
function getScore() 
{     
    let time = localStorage.getItem("time");
    if (time != null) 
    {
        if (Date.now() > time) 
        {
            localStorage.setItem("score", "0");
            localStorage.setItem("time", Date.now() + 259200000);
            time = localStorage.getItem("time");
        }
    }
    else 
    {
        localStorage.setItem("time", Date.now() + 259200000);
        time = localStorage.getItem("time");
    }
    total.innerHTML = localStorage.getItem("score") || 0   ;
    const days = document.querySelector("#days");
    days.innerHTML = Math.ceil((time - Date.now()) / 86400000);
    document.querySelector("#daysWord").innerHTML = days.innerHTML == 1 ? "день" : "дня";
}
getScore();

var button = document.querySelector("#mainButton");
// Для ПК
button.addEventListener("mousedown", (e) => mouseStart(e), {passive: false});
button.addEventListener("mouseup", () => mouseEnd(), {passive: false});

// Для телефонов
button.addEventListener("touchstart", (e) => touchStart(e));
button.addEventListener("touchend", (e) => touchEnd(e));
button.addEventListener("touchmove", () => touchMove());

// Обработка кликов
function touchStart(e) 
{ 
    e.preventDefault();
    if (e.targetTouches.length <= 2) 
    {
        button.classList.add("buttonClicked");
        total.innerHTML = Number(total.innerHTML) + e.changedTouches.length;
    }
    else 
        return;
}

function touchEnd(e) {
    if (e.targetTouches.length == 0)
        button.classList.remove("buttonClicked");
}

function touchMove() 
{
   button.classList.remove("buttonClicked");
}

function mouseStart(e) 
{
    e.preventDefault();
    document.querySelector("#total").innerHTML++;
    button.classList.add("buttonClicked");
}

function mouseEnd() 
{
    button.classList.remove("buttonClicked");
}

// Замок
var isOpen = true;
document.querySelector("#lock").onclick = () => 
{
    var lockImg = document.querySelector("img");
    if (isOpen == true) {
        lockImg.src = "images/lockClose.png";
        document.body.style.overflow = "hidden";
        isOpen = false;
    }
    else {
        lockImg.src = "images/lockOpen.png";
        document.body.style.overflow = "visible";
        isOpen = true;
    }
}

// Сбросить рекорд
document.querySelector("#showMenuReset").onclick = () => openMenu("#menuReset");
document.querySelector("#exitMenuReset").onclick = () => exitMenu("#menuReset");
document.querySelector("#exitReset").onclick = () => exitMenu("#menuReset");

let isReset = false;
document.querySelector("#reset").onclick = () =>
{
    total.innerHTML = 0;
    isReset = true;
    localStorage.setItem("score", "0");
    localStorage.setItem("time", Date.now() + 259200000);
    exitMenu("#menuReset");
    getScore();
}

// Сохранение
setInterval(() => 
{
    if (total.innerHTML != 0 || isReset)
        localStorage.setItem("score", total.innerHTML);
}, 250);