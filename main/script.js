// Заставка вначале
params = new URLSearchParams(window.location.search);
const mir = document.querySelector(".mir");
const miroshkin = document.querySelector(".miroshkin");
const bg = document.querySelector(".bg");
let animation;
if (params.get("dontNeedAnimation") != "true" && localStorage.getItem("mainAnimation") != "false")
{ 
    mir.style.display = "inline-block"; 
    const start = setTimeout(() => {       
        miroshkin.style.opacity = 0;
        miroshkin.style.display = "inline-block";
        while (miroshkin.style.opacity < 1)
        {
            miroshkin.style.opacity += 0.01;
            await delay(3);
        }

        var leftBorder = mir.offsetLeft - miroshkin.clientWidth / 2;

        mir.style.left = mir.offsetLeft + "px";
        miroshkin.style.left = mir.offsetLeft + "px";
        const rightBorder = leftBorder + mir.clientWidth;
        animation = setInterval(() => {
            if (Number(mir.style.left.slice(0, -2)) >= leftBorder)
                mir.style.left = mir.offsetLeft - 1 + "px";
            if (Number(miroshkin.style.left.slice(0, -2)) <= rightBorder)
                miroshkin.style.left = miroshkin.offsetLeft + 1 + "px";
        }, 1);
    }, 750);
}
else
{
    mir.remove();
    miroshkin.remove();
    if (localStorage.getItem("animationOn") != "false")
    {
        switchOff();
    }
    else
        bg.style.display = "none";
}

// Функция для ожидания
function delay(time)
{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

// Конец анимации
if (params.get("dontNeedAnimation") != "true" && localStorage.getItem("mainAnimation") != "false")
{ 
    setTimeout(async () => {
        clearInterval(animation);
        mir.style.opacity = 1; 
        miroshkin.style.opacity = 1;
        while (mir.style.opacity > 0 || miroshkin.style.opacity > 0)
        {
            mir.style.opacity -= 0.01;
            miroshkin.style.opacity -= 0.01;
            await delay(5);
        }
        mir.remove();
        miroshkin.remove();
        await delay(500);
        bg.style.opacity = 1;
        while (bg.style.opacity > 0)
        {
            bg.style.opacity -= 0.01;
            await delay(5);
        }
        bg.style.display = "none";
        document.body.style.overflowY = "visible";
    }, 2000);
}

// Фон исчезает
async function switchOff() {
    bg.style.opacity = 1;
    while (bg.style.opacity > 0)
    {
        bg.style.opacity -= 0.01;
        await delay(5);
    }
    bg.style.display = "none";
}

// Цитаты
var quote = document.createElement("p");
quote.id = "quote";
document.querySelector(".quoteContainer").appendChild(quote);

const quotes = [
    "Ненависть порождает ненависть.",
    "Не ошибается только тот, кто ничего не делает.",
    "Глупо бояться того, что ещё предстоит увидеть и узнать.",
    "Жизнь человека определяется тем, что он считает истинным и правильным. Это и формирует нашу реальность. Вот только что такое истина? Всего лишь понятие, реальность может оказаться миражом. А быть может, люди живут в мире собственных иллюзий?",
    "Те, кто способны простить себя и принять свою натуру, поистине сильны.",
    "Знание не есть ум.",
    "Кто хочет делать — ищет способ, кто не хочет — ищет причину.",
    "Не бывает безвыходных ситуаций. Бывают ситуации, выход из которых тебя не устраивает.",
    "Надо любить жизнь больше, чем смысл жизни.",
    "Понимание — начало согласия.",
    "Бороться и искать, найти и не сдаваться.",
    "Время лечит все раны.",
    "Если быть — так быть лучшим!"
];

// Получение случайного числа
function getRandom(min, max) 
{
    return min + Math.floor(Math.random() * (max - min + 1));
}

// Отображение текста и проверка повторной цитаты
let before = -1;
function mainClick() 
{
    let n;
    do
    {
        n = getRandom(0, quotes.length - 1);
    } while (n == before)
    
    before = n;

    quote.innerHTML = "「 " + quotes[n] + "  」";
    const mainButton = document.querySelector("#mainButton");
    mainButton.innerHTML = "Повторить";
}

// Выпадающие списки
function showList(tab) 
{
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "inline";
    let ul;
    if (tab.innerHTML == "Инструменты")
    {
        ul = document.querySelector("ul");
    }
    else
    {
        ul = document.getElementsByTagName("ul")[1];
    }

    ul.style.display = "flex";
    ul.style.width = tab.clientWidth + "px";
    ul.style.left = tab.offsetLeft + "px";
    ul.style.top = tab.offsetTop + tab.clientHeight + "px"

    if (matchMedia("(max-width: 999px)").matches)
        document.querySelector("header").style.zIndex = 1;

    overlay.addEventListener("click", () => {
        ul.style.display = "none";
        overlay.style.display = "none";
        document.querySelector("header").style.zIndex = 2;
    });
}

// Фон появляется
async function switchOn()
{
    if (localStorage.getItem("animationOn") != "false")
    {
        bg.style.display = "inline-block";
        bg.style.opacity = 0;
        while (bg.style.opacity < 1)
        {
            bg.style.opacity = Number(bg.style.opacity) + 0.01;
            await delay(5);
        }     
    }
    return new Promise(resolve => {
        resolve();
    });
}

// Ссылки
async function thanks() 
{
    await switchOn();
    window.location.href = "/thanks/";
}

async function settings()
{
    await switchOn();
    window.location.href = "/settings/";
}

async function history() 
{
    await switchOn();
    window.location.href = "/history-of-changes/";
}

async function calculator() 
{
    await switchOn();
    window.location.href = "/calculator/";
}

async function clicker() 
{
    await switchOn();
    window.location.href = "/clicker/";
}

async function textHandler() 
{
    await switchOn();
    window.location.href = "/text-handler/";
}

async function passwordGenerator() 
{
    await switchOn();
    window.location.href = "/password-generator/";
}

async function randomizer() 
{
    await switchOn();
    window.location.href = "/randomizer/";
}

async function kvadratik()
{
    await switchOn();
    window.location.href = "/kvadratik/main/";
}
