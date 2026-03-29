// Переход на главную страницу
const bg = document.querySelector(".bg");
async function back() {
    if (localStorage.getItem("animationOn") != "false")
        await switchOn();

    if (document.querySelector("textarea").value == "Anikill")
    {
        window.location.href = "https://anikill.vercel.app";
    }
    else if (document.querySelector("textarea").value == "Metanit")
    {
         window.location.href = "https://metanit.com";
    }
    else 
    {
        window.location.href = "/main/?dontNeedAnimation=true";
    }
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

function textInput() {
    let chars = document.querySelectorAll("h2")[0]
    let words = document.querySelectorAll("h2")[1]
    let text = document.querySelector("textarea").value

    let countChars = 0
    let countWords = 0
    let countSpaces = 0
    for (let i = 0; i < text.length; i++) {
        countChars++      
    }

    text = text.trim()
    for (let i = 0; i < text.length; i++) {       
        if (text[i] == " ") {
            countSpaces++
        }
        countWords = countSpaces + 1
    }

    chars.innerHTML = `Количество символов: ${countChars}`

    if (text[text.length - 1] != " ") {
        words.innerHTML = `Количество слов: ${countWords}`
    }
    else {
            words.innerHTML = `Количество слов: ${countWords - 1}`               
    }
}
