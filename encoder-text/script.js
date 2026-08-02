// Импорт
import { back, copyResult } from "/main/common.js";

document.querySelector("#back").onclick = () => back();

// Элементы страницы
const textarea = document.querySelector("textarea");
const finalText = document.querySelector("#finalText");
const copy = document.querySelector("#copy");
const encryptButton = document.querySelector("#encryptButton");
const encrypt = document.querySelector("#encrypt");
const decrypt = document.querySelector("#decrypt");
const dotsDashes = document.querySelector("#dotsDashes");
const zeroOne = document.querySelector("#zeroOne");
const launchEncrypt = () => launch();

// Скрыть/показать информацию о странице
document.querySelector(".hint button").onclick = () => {
    document.querySelector(".info").classList.toggle("infoVisible");
    const root = document.querySelector(":root");
    const rootStyle = getComputedStyle(root);

    const temp1 = rootStyle.getPropertyValue("--triangleBottom");
    root.style.setProperty("--triangleBottom", rootStyle.getPropertyValue("--triangleTop"));
    root.style.setProperty("--triangleTop", temp1);

    const temp2 = rootStyle.getPropertyValue("--triangleBottomHover");
    root.style.setProperty("--triangleBottomHover", rootStyle.getPropertyValue("--triangleTopHover"));
    root.style.setProperty("--triangleTopHover", temp2);
}

// Выбор режима
function toggleCheckbox(checkbox)
{
    if (checkbox.checked)
        checkbox.checked = false;
    else
        checkbox.checked = true;
}

// Переключение интерфейса в зависимости от режима
const encode = () => {
    document.querySelectorAll(".typeEncryptContainer")[1].style.display = "block";
    if (matchMedia("(min-width: 1000px)").matches)
        document.querySelector(".textSettings").style.gridTemplate = "1fr 1fr 0.35fr/ 1fr 3fr"
    else
    {
        document.querySelector("#area1").style.gridColumn = "span 1";
        document.querySelector("#area1").style.width = "100%";
    }
    encryptButton.innerHTML = "Зашифровать";
    textarea.placeholder = "Введите текст, который нужно зашифровать";
}
const decode = () => {
    document.querySelectorAll(".typeEncryptContainer")[1].style.display = "none";
    if (matchMedia("(min-width: 1000px)").matches)
        document.querySelector(".textSettings").style.gridTemplate = "1fr 0.2fr 1fr/ 1fr 3fr"
    else
    {
       document.querySelector("#area1").style.gridColumn = "span 2";
        document.querySelector("#area1").style.width = "50%";
    }
    encryptButton.innerHTML = "Расшифровать";
    textarea.placeholder = "Введите текст, который нужно расшифровать";
}

encrypt.onclick = () => {
    copy.style.display = "none";
    finalText.style.display = "none";
    textarea.removeEventListener("input", launchEncrypt);

    toggleCheckbox(decrypt);

    if (encrypt.checked)
        encode();
    else
        decode();
}
decrypt.onclick = () => {
    copy.style.display = "none";
    finalText.style.display = "none";
    textarea.removeEventListener("input", launchEncrypt);
     
    toggleCheckbox(encrypt);
    
    if (decrypt.checked)
        decode();
    else
        encode();
}

dotsDashes.onclick = () => {
    toggleCheckbox(zeroOne);
    finalText.innerHTML = inverse(finalText.innerHTML);  
}
zeroOne.onclick = () => {
    toggleCheckbox(dotsDashes);
    finalText.innerHTML = inverse(finalText.innerHTML, true);
}

// Словарь символов
const listCharacters = {
    а: "10",
    б: "0111",
    в: "100",
    г: "001",
    д: "011",
    е: "1",
    ё: "1",
    ж: "1110",
    з: "0011",
    и: "11",
    й: "1000",
    к: "010",
    л: "1011",
    м: "00",
    н: "01",
    о: "000",
    п: "1001",
    р: "101",
    с: "111",
    т: "0",
    у: "110",
    ф: "1101",
    х: "1111",
    ц: "0101",
    ч: "0001",
    ш: "0000",
    щ: "0010",
    ъ: "100101",
    ы: "0100",
    ь: "0110",
    э: "11011",
    ю: "1100",
    я: "1010",
    "0": "00000",
    "1": "10000",
    "2": "11000",
    "3": "11100",
    "4": "11110",
    "5": "11111",
    "6": "01111",
    "7": "00111",
    "8": "00011",
    "9": "00001",
    ",": "101010",
    ".": "111111",
    "!": "001100",
    "?": "110011",
    ":": "000111",
    "-": "011110",
    "—": "011110",
    ";": "010101",
    "/": "01101",
    "(": "010010",
    ")": "010010",
    "\'": "100001",
    "\"": "10110"
}

// Функция для инверсии нулей и единиц в точки и тире и наоборот
function inverse(str, toZeroOne = false)
{
    let newStr = "";
    if (toZeroOne)
    {
        for (let i = 0; i < str.length; i++)
        {
            if (str[i] == "-")
                newStr += "0";
            else if (str[i] == "•")
                newStr += "1";
            else
                newStr += str[i];
        }       
    }
    else
    {
        for (let i = 0; i < str.length; i++)
        {
            if (str[i] == "0")
                newStr += "-";
            else if (str[i] == "1")
                newStr += "•";
            else
                newStr += str[i];
        }
    }
    return newStr;
}

// Шифровка текста
function encryptText(str)
{
    str = str.toLowerCase();
    let newStr = "";
    for (let i = 0; i < str.length; i++)
    {
        let char;
        // Если это последний символ, пробел на конце не нужен
        if (str[i] == " ")
            char = i == str.length - 1 ? "/" : "/ ";
        else if (str[i] == "\n")
            char = i == str.length - 1 ? "|" : "| ";
        else if (listCharacters[str[i]] != undefined)
        {
            char = zeroOne.checked ? listCharacters[str[i]] : inverse(listCharacters[str[i]]);
            char += String(i == str.length - 1 ? "" : " ");            
        } 
        newStr += (char == undefined ? "" : char);      
    }
    return newStr;
}

// Расшифровка текста
function decryptText(str)
{
    str = inverse(str, true);
    let newStr = "";
    for (let i = 0; i < str.length; i++)
    {
        let char = "";
        let plusSpace = false;
        let plusEnter = false;
        while (i < str.length && str[i] != " ")
        {    
            if (str[i] == "/")
            {
                plusSpace = true;
                break;
            }
            else if (str[i] == "|")
            {
                plusEnter = true;
                break;
            }
            else
                char += str[i];
            i++;
        }
        // Сопоставляем значение двоичного кода с символом, который он обозначает
        newStr += Object.keys(listCharacters).find((element, index) => char == Object.values(listCharacters)[index]) || "";
        if (plusSpace)
            newStr += " ";  
        else if (plusEnter)
            newStr += " | ";
        if (char == "\n")
            newStr += "\n";      
    }
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}

// Обработчик для кнопки
function launch()
{
    copy.style.display = "block";
    finalText.style.display = "block";
 
    if (encrypt.checked)
        finalText.innerHTML = encryptText(textarea.value);
    else
        finalText.innerHTML = decryptText(textarea.value);

    if (finalText.innerHTML == "")
        copy.style.display = "none";
}

encryptButton.onclick = () => {
    launch();
    textarea.addEventListener("input", launchEncrypt);
}

// Скопировать
copy.onclick = () => copyResult(finalText.innerHTML);