// Заставка вначале
const bg = document.querySelector(".bg");

// Функция для ожидания
export function delay(time)
{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

// Фон исчезает
export async function switchOff() {
    document.body.style.overflowY = "hidden";
    if (localStorage.getItem("animationOn") != "false")
    {
        bg.style.opacity = 1;
        while (bg.style.opacity > 0)
        {
            bg.style.opacity -= 0.02;
            await delay(4);
        }
        bg.style.display = "none";
    }
    else
        bg.style.display = "none";
    document.body.style.overflowY = "visible";
}

if (document.querySelector("title").innerHTML != "Сайт Мирошкин")
    switchOff();

// Фон появляется
export async function switchOn()
{
    document.body.style.overflowY = "hidden";
    if (localStorage.getItem("animationOn") != "false")
    {
        bg.style.display = "inline-block";
        bg.style.opacity = 0;
        while (bg.style.opacity < 1)
        {
            bg.style.opacity = Number(bg.style.opacity) + 0.02;
            await delay(4);
        }     
    }
    return new Promise(resolve => {
        resolve();
    });
}

// Переход на главную
export async function back()
{
    await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
}

// Переключатели в настройках
export async function switchSetting(switchElement, circle, item)
{
    const indent = 15;
    // Отключение
    if (circle.offsetLeft > 0)
    {
        localStorage.setItem(item, "false");
        
        // Закрепляем цвета, чтобы они не сбросились при присваивании новой анимации       
        switchElement.style.animation = "backgroundOff 750ms forwards";
        circle.style.animation = "circleOff 750ms forwards";
        setTimeout(() => {
            switchElement.style.backgroundColor = "white";
            circle.style.backgroundColor = "white";
            circle.style.border = "rgba(25, 0, 255, 0.9) solid 5px";
            switchElement.style.animation = "";
            circle.style.animation = "";
        }, 750);
        
        while (circle.style.left != -indent + "px")
        {
            circle.style.left = circle.offsetLeft - 1 + "px";
            await delay(5);
        }    
    }
    // Включение
    else
    {
        localStorage.setItem(item, "true");
        
        switchElement.style.animation = "backgroundOn 750ms forwards";
        circle.style.animation = "circleOn 750ms forwards";
        setTimeout(() => {
            switchElement.style.backgroundColor = "rgba(25, 0, 255, 0.9)";
            circle.style.backgroundColor = "rgb(25, 0, 255)";
            circle.style.border = "white solid 5px";
            switchElement.style.animation = "";
            circle.style.animation = "";
        }, 750);
        while (circle.style.left != circle.clientWidth + indent + "px")
        {
            circle.style.left = circle.offsetLeft + 1 + "px";
            await delay(5);
        }
    }
}

// Открыть меню
export function openMenu(menu, display = "inline-block")
{
    document.querySelector(".overlay").style.display = "inline-block";
    document.querySelector(menu).style.display = display;
}

// Закрыть меню
export function exitMenu(menu)
{
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(menu).style.display = "none";
}

/* Фон, цвета, шрифт... */
// Списки исключений
export const listExceptionsColor = document.querySelectorAll("#selectFontFamilyText, .menusLabel, .countdown p");
export const listExceptionsFontFamily = document.querySelectorAll("#TimesNewRoman, #Calibri, #Arial, #Monospace, #MiamaNueva");
export const listExceptionsButton = document.querySelectorAll(".exit, #help, #start, .gamepad button");

document.body.style.backgroundColor = localStorage.getItem("bgColor");

// Цвет текста
document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label").forEach(element => {
    let isException = false;
    for (let i = 0; i < listExceptionsColor.length; i++)
    {
        if (element == listExceptionsColor[i])
            isException = true;     
    }
    if (!isException)
        element.style.color = localStorage.getItem("fontColor");
});

// Шрифт
document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label, button").forEach(element => {
    let isException = false;
    for (let i = 0; i < listExceptionsFontFamily.length; i++)
    {
        if (element == listExceptionsFontFamily[i])
            isException = true;     
    }
    if (!isException)
        element.style.fontFamily = localStorage.getItem("fontFamily");
});

// Цвет фона и текста кнопок
document.querySelectorAll("button, header").forEach(element => {
    let isException = false;
    for (let i = 0; i < listExceptionsButton.length; i++)
    {
        if (element == listExceptionsButton[i])
            isException = true;     
    }
    if (!isException)
    {
        element.style.backgroundColor = localStorage.getItem("buttonBg");
        element.style.color = localStorage.getItem("buttonColor"); 
    }    
});
document.querySelector(":root").style.setProperty("--buttonColor", localStorage.getItem("buttonColor"));
document.querySelector(":root").style.setProperty("--buttonHoverBg", localStorage.getItem("buttonHoverBg"));
document.querySelector(":root").style.setProperty("--buttonHoverColor", localStorage.getItem("buttonHoverColor"));    

// Фон и цвет текста меню
document.querySelectorAll(".menus").forEach(element => {
    element.style.backgroundColor = localStorage.getItem("menusBg");
});
document.querySelectorAll(".menusLabel").forEach(element => {
    element.style.color = localStorage.getItem("menusLabelColor");
});

// Ссылки
document.querySelectorAll("a").forEach(element => element.style.color = localStorage.getItem("linkColor"));
document.querySelector(":root").style.setProperty("--linkHoverColor", localStorage.getItem("linkHoverColor"));

// Скопировать
let isCopying = false;
export async function copyResult(result) {     
    const messageCopy = document.querySelector(".messageCopy");
    navigator.clipboard.writeText(result);
    if (!isCopying) 
    {
        isCopying = true;    
        messageCopy.style.display = "inline-block";
        await delay(750);
        for (messageCopy.style.opacity = 1; messageCopy.style.opacity >= 0; messageCopy.style.opacity -= 0.01) 
            await delay(15);

        messageCopy.style.display = "none";
        messageCopy.style.opacity = 1;
        isCopying = false;
    }
}