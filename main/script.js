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
    "Бороться и искать, найти и не сдаваться." 
];

// Получение случайного числа
function getRandom(min, max) 
{
    return min + Math.floor(Math.random() * max - min + 1);
}

// Отображение текста и проверка повторной цитаты
let before = -1;
function mainClick() 
{
    let n = getRandom(0, quotes.length - 1);
    while (n == before) {
        n = getRandom(0, quotes.length - 1);
    }
    before = n;

    quote.innerHTML = "「 " + quotes[n] + "  」";
    const mainButton = document.querySelector("#mainButton");
    mainButton.innerHTML = "Повторить";
    mainButton.style.backgroundColor = "black";
    mainButton.style.color = "rgb(19, 65, 142)";
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

// Ссылки
function thanks() 
{
    window.location.href = "/thanks/";
}

function settings()
{
    window.location.href = "/settings/";
}

function history() 
{
    window.location.href = "/history-of-changes/";
}

function calculator() 
{
    window.location.href = "/calculator/";
}

function clicker() 
{
    window.location.href = "/clicker/";
}

function textHandler() 
{
    window.location.href = "/text-handler/";
}

function passwordGenerator() 
{
    window.location.href = "/password-generator/";
}

function randomizer() 
{
    window.location.href = "/randomizer/";
}

function kvadratik()
{
    window.location.href = "/kvadratik/main/";
}
