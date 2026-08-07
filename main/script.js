// Импорт
import { switchOn, switchOff, delay } from "./common.js";

// Заставка вначале
const params = new URLSearchParams(window.location.search);
const mir = document.querySelector(".mir");
const miroshkin = document.querySelector(".miroshkin");
let animation;
const bg = document.querySelector(".bg");

if (params.get("dontNeedAnimation") != "true" && localStorage.getItem("mainAnimation") != "false")
{ 
    mir.style.display = "inline-block"; 
    
    setTimeout(async () => {       
        miroshkin.style.display = "inline-block";

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
        while (miroshkin.style.opacity < 1)
        {
            miroshkin.style.opacity = Number(miroshkin.style.opacity) + 0.01;
            await delay(7);
        }
    }, 750);
}
else
{
    document.body.style.overflowY = "visible";
    mir.remove();
    miroshkin.remove();
    switchOff();   
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
        switchOff();
        setTimeout(() => document.body.style.overflowY = "visible", 750);   
    }, 2000);
}

// Цитаты
const quote = document.createElement("p");
const author = document.createElement("p");
quote.id = "quote";
author.id = "author";
document.querySelector(".quoteContainer").appendChild(quote);
document.querySelector(".quoteContainer").appendChild(author);

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
    "Если быть — так быть лучшим!",
    "Книги — корабли мысли, странствующие по волнам времени и бережно несущие свой драгоценный груз от поколения к поколению.",
    "Забыть друзей не значит повзрослеть.",
    "Тяжело в учении, легко в бою.",
    "Истина — это иллюзия, о которой забыли, что она иллюзия.",
    "Лидеры — торговцы надеждами.",
    "Отсутствие сна — не проблема. Проблема, когда ты не знаешь, ради чего просыпаешься по утрам.",
    "Всё, что мы слышим, — это мнение, а не факт. Всё, что мы видим, — это точка зрения, а не истина.",
    "Я мыслю, следовательно, я существую.",
    "Когда кажется, что весь мир настроен против тебя, помни, что самолёт взлетает против ветра!",
    "\"Невозможно\" — это слово из словаря глупцов.",
    "Бойся не того, кто изучает десять тысяч различных ударов. Бойся того, кто изучает один удар десять тысяч раз.",
    "Неважно, как медленно ты идёшь, пока не останавливаешься.",
    "Иногда люди не хотят слышать правду, потому что не желают разрушать свои иллюзии.",
    "То, что мы знаем, — это капля, а то, что не знаем, — океан.",
    "Никто тебе не друг, никто тебе не враг, но всякий человек тебе учитель.",
    "Любите врагов ваших.",
    "Человек видит мир таким, каков он сам.",
    "Логика может привести вас от пункта А к пункту Б, а воображение — куда угодно.",
    "Сложнее всего начать действовать, всё остальное зависит только от упорства.",
    "Всегда выбирайте самый трудный путь: на нём вы не встретите конкурентов.",
    "Успевает всё тот, кто никуда не торопится."
];

const authors = [
    "Нагато",
    "Альберт Эйнштейн",
    "Итачи",
    "Итачи",
    "Итачи",
    "Сократ",
    "Сократ",
    "Шикамару Нара",
    "Фёдор Михайлович Достоевский", 
    "Бенедикт Спиноза",  
    "Кровавая клятва дружбы из романа Вениамина Каверина «Два капитана»",   
    "Менандр",
    "Чкалов из книги Вениамина Каверина «Два капитана»",
    "Фрэнсис Бэкон",
    "Сайт <a href=\"https://jutsu.ru\">Jutsu.ru</a>",
    "Александр Васильевич Суворов",
    "Фридрих Ницше",
    "Наполеон Бонапарт",  
    "Альберт Эйнштейн",
    "Марк Аврелий",
    "Декарт",
    "Генри Форд",
    "Наполеон Бонапарт",
    "Брюс Ли",
    "Конфуций",
    "Фридрих Ницше",
    "Исаак Ньютон",
    "Сократ",
    "Иисус Христос",
    "Иоганн Вольфганг Гёте",
    "Альберт Эйнштейн",
    "Амелия Эрхарт",
    "Шарль де Голль",
    "Профессор Преображенский из повести Михаила Булгакова «Собачье сердце»"
];

// Получение случайного числа
function getRandom(min, max) 
{
    return min + Math.floor(Math.random() * (max - min + 1));
}

// Отображение текста и проверка повторной цитаты
let before = -1;
document.querySelector("#mainButton").onclick = async () => {
    let n;
    do
    {
        n = getRandom(0, quotes.length - 1);
    } while (n == before)  
    before = n;

    quote.innerHTML = "「 " + quotes[n] + "」";
    author.innerHTML = "— " + authors[n];

    const mainButton = document.querySelector("#mainButton");
    mainButton.innerHTML = "Повторить";
}

// Выпадающие списки
document.querySelector(".tabs").onclick = async () => showList(document.querySelector(".tabs"));
document.getElementsByClassName("tabs")[1].onclick = async () => showList(document.getElementsByClassName("tabs")[1]);
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

/* Ссылки */
document.getElementsByClassName("tabs")[2].onclick = async () => {
    await switchOn();
    window.location.href = "/thanks/";
}

document.getElementsByClassName("tabs")[3].onclick = async () => {
    await switchOn();
    window.location.href = "/settings/";
}

document.getElementsByTagName("button")[5].onclick = async () => {
    await switchOn();
    window.location.href = "/history-of-changes/";
}

document.getElementsByTagName("button")[6].onclick = async () => {
    await switchOn();
    window.location.href = "/list-quotes/";
}

// Инструменты
document.querySelector("#tools").children[0].onclick = async () => {
    await switchOn();
    window.location.href = "/calculator/";
}

document.querySelector("#tools").children[1].onclick = async () => {
    await switchOn();
    window.location.href = "/text-handler/";
}

document.querySelector("#tools").children[2].onclick = async () => {
    await switchOn();
    window.location.href = "/password-generator/";
}

document.querySelector("#tools").children[3].onclick = async () => {
    await switchOn();
    window.location.href = "/randomizer/";
}

document.querySelector("#tools").children[4].onclick = async () => {
    await switchOn();
    window.location.href = "/encoder-text/";
}


// Игры
document.querySelector("#games").children[0].onclick = async () => {
    await switchOn();
    window.location.href = "/clicker/";
}

document.querySelector("#games").children[1].onclick = async () => {
    await switchOn();
    window.location.href = "/kvadratik/main/";
}
