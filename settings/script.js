// Импорт
import { switchOn, switchOff, switchSetting } from "/main/common.js";
switchOff();
import { openMenu, exitMenu } from "/main/common.js";
import { listExceptionsColor, listExceptionsFontFamily, listExceptionsButton } from "/main/common.js";

// Переход на главную страницу
document.querySelector("button").onclick = () => back();
async function back() {
    await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
}

// Функция для удаления пробелов в строке
function deleteSpaces(str)
{
    let newStr = "";
    for (let i = 0; i < str.length; i++)
    {
        if (str[i] != " ")
            newStr += str[i];
    }
    return newStr;
}

// Создание цветов
const listColors = ["0, 0, 0", "255, 0, 0", "255, 69, 0",
    "255, 255, 0", "0, 255, 0", "0, 255, 255", "0, 128, 255", "209, 33, 203", "0, 0, 255",
    "25, 25, 112", "255, 255, 255", "71, 71, 71", "36, 36, 34", "255, 0, 0", "255, 69, 0", 
    "255, 255, 0", "0, 255, 0", "0, 255, 255", "19, 65, 142", "209, 33, 203", "0, 0, 255",
    "25, 25, 112"
];

// Основные цвета
for (let i = 0; i < listColors.length + 2; i++)
{
    const colorBg = document.createElement("div");
    colorBg.classList.add("colorBg");
    colorBg.classList.add("selectColorBg")
    colorBg.classList.add("borderOff");
    colorBg.style.backgroundColor = localStorage.getItem("bgColor");

    const color = document.createElement("div");
    color.classList.add("color");
    if (i == 0)
        color.style.backgroundColor = "rgb(0, 0, 0)";
    else if (i == 1)
        color.style.backgroundColor = "rgb(36, 36, 34)";
    else
    {
        if (i == 8)
            color.style.backgroundColor = "rgb(19, 65, 142)";
        else if (i == 20)
            color.style.backgroundColor = "rgb(3, 79, 200)";
        else if (i <= 12)
            color.style.backgroundColor = `rgba(${listColors[i - 2]}, 0.9)`;
        else
            color.style.backgroundColor = `rgba(${listColors[i - 2]}, 0.75)`;
    }      

    colorBg.appendChild(color);
    document.querySelector(".colorsContainer").appendChild(colorBg);
}
                                        
// Пользовательские цвета                
let listUserColors = [];                       
if (localStorage.getItem("listColors") != null && localStorage.getItem("listColors") != "")
    listUserColors = localStorage.getItem("listColors").split(" ");

for (let i = 0; i < listUserColors.length; i++)
{
    const colorBg = document.createElement("div");
    colorBg.classList.add("colorBg");
    colorBg.classList.add("borderOff");

    const color = document.createElement("div");
    color.classList.add("color");
    color.style.backgroundColor = listUserColors[i];
      
    colorBg.appendChild(color);
    document.querySelectorAll(".colorsContainer")[1].appendChild(colorBg);
}

// Выбор цвета
let colorChangeElement;
let numColorChange;
let selectedBeforeElement;
const countChangeColor = document.querySelectorAll(".changeColor").length;
for (let i = 0; i < countChangeColor; i++)
{
    document.querySelectorAll(".changeColor")[i].onclick = () => {
        numColorChange = i + 1;
        changeColor(document.querySelectorAll(".changeColor")[i]);
    }
}

function changeColor(colorChange)
{
    colorChangeElement = colorChange;
    openMenu("#changeColorMenu");

    // Если это выбор фона, то подстилка белая
    if (numColorChange == 1)
        document.querySelectorAll(".selectColorBg").forEach(element => element.style.backgroundColor = "white"); 

    // Подсвечиваем выбранным цвет, который был у значка выбора
    for (let i = 0; i < 2; i++)
    {
        for (let j = i == 1 ? 1 : 0; j < document.querySelectorAll(".colorsContainer")[i].children.length; j++)
        {            
            if (document.querySelectorAll(".colorsContainer")[i].children[j].children[0].style.backgroundColor == colorChange.style.backgroundColor)
            {
                selectColor(document.querySelectorAll(".colorsContainer")[i].children[j].children[0], true);
                break;
            }
        }
    }       

    // Подсвечиваем выбранный пользователем цвет
    for (let i = 0; i < 2; i++)
    {
        for (let j = i == 1 ? 1 : 0; j < document.querySelectorAll(".colorsContainer")[i].children.length; j++)
            document.querySelectorAll(".colorsContainer")[i].children[j].onclick = () => selectColor(document.querySelectorAll(".colorsContainer")[i].children[j].children[0]);    
    }
}

function selectColor(colorElement, isFirst = false)
{
    if (canSelect)
    {
        if (selectedBeforeElement != null)
            selectedBeforeElement.classList.remove("colorSelected");
        selectedBeforeElement = colorElement.parentElement; 
        colorElement.parentElement.classList.add("colorSelected");

        colorChangeElement.style.backgroundColor = colorElement.style.backgroundColor; 

        // Думаем, цвет чего менять   
        if (!isFirst) 
        {
            switch (numColorChange)
            {
                case 1:
                    document.querySelector("body").style.backgroundColor = colorElement.style.backgroundColor;
                    localStorage.setItem("bgColor", colorElement.style.backgroundColor);
                    break;
                case 2:
                    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label").forEach(element => {
                        let isException = false;
                        for (let i = 0; i < listExceptionsColor.length; i++)
                        {
                            if (element == listExceptionsColor[i])
                                isException = true;     
                        }
                        if (!isException)
                            element.style.color = colorElement.style.backgroundColor;       
                    });
                    localStorage.setItem("fontColor", colorElement.style.backgroundColor);
                    break;
                case 3:
                    document.querySelectorAll("button").forEach(element => {
                        let isException = false;
                        for (let i = 0; i < listExceptionsButton.length; i++)
                        {
                            if (element == listExceptionsButton[i])
                                isException = true;     
                        }
                        if (!isException)
                            element.style.backgroundColor = colorElement.style.backgroundColor;     
                    });
                    document.querySelectorAll(".changeColor")[5].style.backgroundColor = colorElement.style.backgroundColor;
                    document.querySelector(":root").style.setProperty("--buttonHoverColor", colorElement.style.backgroundColor);
                    localStorage.setItem("buttonHoverColor", colorElement.style.backgroundColor);
                    localStorage.setItem("buttonBg", colorElement.style.backgroundColor);
                    break;
                case 4:
                    document.querySelectorAll("button").forEach(element => {  
                        let isException = false;                 
                        for (let i = 0; i < listExceptionsButton.length; i++)
                        {
                            if (element == listExceptionsButton[i])
                                isException = true;     
                        }
                        if (!isException)
                            element.style.color = colorElement.style.backgroundColor;     
                    });

                    document.querySelectorAll(".changeColor")[4].style.backgroundColor = colorElement.style.backgroundColor;
                    document.querySelector(":root").style.setProperty("--buttonHoverBg", colorElement.style.backgroundColor);
                    localStorage.setItem("buttonHoverBg", colorElement.style.backgroundColor);
                    localStorage.setItem("buttonColor", colorElement.style.backgroundColor);
                    selectFontFamilyTextChange();
                    break;
                case 5:
                    document.querySelector(":root").style.setProperty("--buttonHoverBg", colorElement.style.backgroundColor);
                    localStorage.setItem("buttonHoverBg", colorElement.style.backgroundColor);
                    break;
                case 6:
                    document.querySelector(":root").style.setProperty("--buttonHoverColor", colorElement.style.backgroundColor);
                    localStorage.setItem("buttonHoverColor", colorElement.style.backgroundColor);
                    break;
                case 7:
                    document.querySelectorAll(".menus").forEach(element => {
                        element.style.backgroundColor = colorElement.style.backgroundColor;
                    });
                    localStorage.setItem("menusBg", colorElement.style.backgroundColor);
                    break;
                case 8:
                    document.querySelectorAll(".menusLabel").forEach(element => {
                        element.style.color = colorElement.style.backgroundColor;
                    });
                    localStorage.setItem("menusLabelColor", colorElement.style.backgroundColor);
                    break;
                case 9:
                    document.querySelector("a").style.color = colorElement.style.backgroundColor;
                    localStorage.setItem("linkColor", colorElement.style.backgroundColor);
                    break;
                case 10:
                    document.querySelector(":root").style.setProperty("--linkHoverColor", colorElement.style.backgroundColor);
                    localStorage.setItem("linkHoverColor", colorElement.style.backgroundColor);
                    break;
            }    
        }  
    }  
}

// Выход из меню выбора цвета
document.querySelector(".exit").onclick = () => {
    exitMenu("#changeColorMenu");

    // Возвращаем подстилки под цвет фона
    if (numColorChange == 1)
        document.querySelectorAll(".selectColorBg").forEach(element => element.style.backgroundColor = localStorage.getItem("bgColor"));
}

// Создание пользовательского цвета
document.querySelector("#plus").onclick = () => userColor();
function userColor()
{
    const inputColor = document.querySelector("#inputColor");
    inputColor.click();
    inputColor.onchange = () => {
        const colorBg = document.createElement("div");
        colorBg.classList.add("colorBg");
        colorBg.classList.add("borderOff");

        const newColor = document.createElement("div");
        newColor.classList.add("color");
        newColor.style.backgroundColor = inputColor.value;
        colorBg.appendChild(newColor);
        document.querySelectorAll(".colorsContainer")[1].appendChild(colorBg);

        selectColor(newColor);        

        if (localStorage.getItem("listColors") != null && localStorage.getItem("listColors") != "")
        {
            let colors = localStorage.getItem("listColors") + " ";
            colors += inputColor.value;
            localStorage.setItem("listColors", colors);
        }
        else
            localStorage.setItem("listColors", inputColor.value);
    }
}

// Удаление пользовательского цвета
let canSelect = true;
let selectColorMode = true;
document.querySelector("#delete").onclick = () => deleteColor();
function deleteColor()
{
    // Выбираем цвета
    const colorsContainer = document.querySelectorAll(".colorsContainer")[1];
    if (colorsContainer.children.length <= 1) 
        return;
    if (selectColorMode)
    {
        canSelect = false;
        for (let i = 1; i < colorsContainer.children.length; i++)
        {
            const check = document.createElement("input");
            check.type = "checkbox";
            check.classList.add("checkColor");
            colorsContainer.children[i].appendChild(check);
        }   
        selectColorMode = false;     
    }
    // Удаляем цвета
    else
    {
        canSelect = true;
        for (let i = 1; i < colorsContainer.children.length;)
        {
            const checkColor = colorsContainer.children[i].children[1];
            if (checkColor.checked)
                colorsContainer.removeChild(colorsContainer.children[i]);
            else
            {
                // Удаляем элемент
                colorsContainer.children[i].removeChild(checkColor);
                i++;
            }            
        }
        // Перезаписываем список цветов в локальном хранилище
        let newItem = "";
        let end = " ";
        for (let i = 1; i < colorsContainer.children.length; i++)
        {
            if (i == colorsContainer.children.length - 1)
                end = "";
            newItem += deleteSpaces(colorsContainer.children[i].children[0].style.backgroundColor) + end;
        }
        localStorage.setItem("listColors", newItem);

        selectColorMode = true;
    }
}

// Меню выбора шрифта
document.querySelector("#selectFontFamily").onclick = () => openMenu("#selectFontFamilyMenu", "flex");
document.querySelectorAll(".exit")[1].onclick = () => exitMenu("#selectFontFamilyMenu");

// Выбор шрифта
for (let i = 2; i < document.querySelector("#selectFontFamilyMenu").children.length; i++)
    document.querySelector("#selectFontFamilyMenu").children[i].onclick = () => selectFontFamily(document.querySelector("#selectFontFamilyMenu").children[i]);
function selectFontFamily(font)
{
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label, button").forEach(element => {
        let isException = false;
        for (let i = 0; i < listExceptionsFontFamily.length; i++)
        {
            if (element == listExceptionsFontFamily[i])
                isException = true;
        }
        if (!isException)
            element.style.fontFamily = getComputedStyle(font).fontFamily;
            
        localStorage.setItem("fontFamily", getComputedStyle(font).fontFamily);    
    });
    
    let familyText = getComputedStyle(font).fontFamily[0] == "\"" ? getComputedStyle(font).fontFamily.slice(1, -1) : getComputedStyle(font).fontFamily;
    document.querySelector("#selectFontFamilyText").innerText = familyText.charAt(0).toUpperCase() + familyText.slice(1);
}

// Переключатели
document.querySelectorAll(".switches")[0].onclick = () => 
    switchSetting(document.querySelectorAll(".switches")[0], document.querySelectorAll(".circles")[0], "mainAnimation");
document.querySelectorAll(".switches")[1].onclick = () => 
    switchSetting(document.querySelectorAll(".switches")[1], document.querySelectorAll(".circles")[1], "animationOn");

// Установка переключателей
if (localStorage.getItem("mainAnimation") == "false")
{    
    document.querySelectorAll(".switches")[0].classList.add("switchOff");
    document.querySelectorAll(".circles")[0].classList.add("circleOff");
}

if (localStorage.getItem("animationOn") == "false")
{    
    document.querySelectorAll(".switches")[1].classList.add("switchOff");
    document.querySelectorAll(".circles")[1].classList.add("circleOff");
}


/* Устанавливаем другие настройки */
// Элементы выбора цвета
for (let i = 0; i < document.querySelectorAll(".changeColor").length; i++)
{
    let bg;
    switch (i + 1)
    {
        case 1:
            bg = localStorage.getItem("bgColor") || "rgb(255, 255, 255)";
            break;
        case 2:
            bg = localStorage.getItem("fontColor") || "rgb(0, 0, 0)";
            break;
        case 6:
        case 3:
            if (i + 1 == 6 && localStorage.getItem("buttonHoverColor") != null)
                bg = localStorage.getItem("buttonHoverColor");
            else
                bg = localStorage.getItem("buttonBg") || "rgb(0, 0, 0)";
            break;
        case 5:
        case 4:
            if (i + 1 == 5 && localStorage.getItem("buttonHoverBg") != null)
                bg = localStorage.getItem("buttonHoverBg");
            else
                bg = localStorage.getItem("buttonColor") || "rgb(19, 65, 142)"; 
            break;   
        case 7:
            bg = localStorage.getItem("menusBg") || "rgb(36, 34, 34)";
            break;
        case 8:
            bg = localStorage.getItem("menusLabelColor") || "white";
            break;   
        case 9:
            bg = localStorage.getItem("linkColor") ||  "rgb(3, 79, 200)";
            break;       
        case 10:
            bg = localStorage.getItem("linkHoverColor") ||  "rgb(255, 0, 0)";
            break;    
    }
    document.querySelectorAll(".changeColor")[i].style.backgroundColor = bg;
}

// Установка названия шрифта для кнопки выбора шрифта
function selectFontFamilyTextChange()
{
    if (localStorage.getItem("fontFamily") != null)
    {
        let familyText = localStorage.getItem("fontFamily")[0] == "\"" ? localStorage.getItem("fontFamily").slice(1, -1) : localStorage.getItem("fontFamily");
        let selectFontFamilyText = document.querySelector("#selectFontFamilyText");
        selectFontFamilyText.innerText = familyText.charAt(0).toUpperCase() + familyText.slice(1);
        selectFontFamilyText.style.color = localStorage.getItem("buttonColor") || "rgb(19, 65, 142)";
        document.querySelector("#triangle").style.borderTop = getComputedStyle(document.querySelector("#triangle")).borderTop.split(" ")[0] + " solid " + (localStorage.getItem("buttonColor" || "rgb(19, 65, 142)"));
    }
}
selectFontFamilyTextChange();

// Сброс настроек
document.querySelector("#reset").onclick = () => openMenu("#resetMenu");
document.querySelectorAll(".exit")[2].onclick = () => exitMenu("#resetMenu");
document.querySelector("#no").onclick = () => exitMenu("#resetMenu");
document.querySelector("#yes").onclick = () => reset();
function reset()
{
    localStorage.removeItem("mainAnimation");
    localStorage.removeItem("animationOn");
    localStorage.removeItem("bgColor");
    localStorage.removeItem("fontColor");
    localStorage.removeItem("fontFamily");
    localStorage.removeItem("buttonBg");
    localStorage.removeItem("buttonColor");
    localStorage.removeItem("buttonHoverBg");
    localStorage.removeItem("buttonHoverColor");
    localStorage.removeItem("menusBg");
    localStorage.removeItem("menusLabelColor");
    localStorage.removeItem("linkColor");
    localStorage.removeItem("linkHoverColor");
    window.location.reload();
}
