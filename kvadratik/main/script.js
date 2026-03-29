// Переход на главную страницу
const bg = document.querySelector(".bg");
async function back() {
    if (localStorage.getItem("animationOn") != "false")
        await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
}

// Функция для ожидания
function delay(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

// Фон появляется
async function switchOn()
{    
    bg.style.display = "inline-block";
    bg.style.opacity = 0;
    while (bg.style.opacity < 1)
    {
        bg.style.opacity = Number(bg.style.opacity) + 0.01;
        await delay(5);
    }
    return new Promise(resolve => {
        resolve();
    });
}

// Фон исчезает
async function switchOff() {
    if (localStorage.getItem("animationOn") != "false")
    {
        bg.style.opacity = 1;
        while (bg.style.opacity > 0)
        {
            bg.style.opacity -= 0.01;
            await delay(5);
        }
        bg.style.display = "none";
    }
    else
    {
        bg.style.display = "none";
    }
}
if (localStorage.getItem("animationOn") != "false")
    switchOff();
else
    bg.style.display = "none";

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
async function play()
{
    if (localStorage.getItem("animationOn") != "false")
        await switchOn();
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
async function aboutGame()
{
    if (localStorage.getItem("animationOn") != "false")
        await switchOn();
    window.location.href = "/kvadratik/aboutGame/";
}
