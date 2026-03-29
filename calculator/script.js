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

// Ввод текста
let output = document.querySelector(".output");
function inputChar(text) {
    output.innerHTML += text.innerHTML;
}

// Расчёт
let result = "";
function printResult() {
    if (output.innerHTML.length > 0) {
        let countSpecChars = 0;

        for (let i = 0; i < output.innerHTML.length; i++) {
            let char = output.innerHTML[i];

            switch (char) {
                case "×":
                    result += "*";
                    break;
                case "÷":
                    result += "/";
                    break;
                case "^":
                    result = "Math.pow(" + result + ", ";
                    countSpecChars++;
                    break;
                case "√":
                    result += "Math.sqrt(";
                    countSpecChars++;
                    break;
                default:
                    result += char;
                    break;
            }
        }

        while (countSpecChars > 0) {
            result += ")";
            countSpecChars--;
        }

        try {
            result = eval(result);
        }
        catch {
            alert("Ошибка: некорректное выражение");
            return;
        }
        finally {
            if (result == "Infinity") {
                alert("Бесконечность или очень большое число");
                return;
            }
            else if (isNaN(result)) {
                alert("Не число");
                return;
            }
        }

        output.innerHTML = result;
        result = "";
    }
}


// Удалить последний символ
function delLastChar() {
    output.innerHTML = output.innerHTML.slice(0, -1);
}

// Очистить
function clearInput() {
    output.innerHTML = "";
    result = "";
}

var messageCopy = document.querySelector(".messageCopy");
function waitFor() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 750);
    })
}

// Скопировать
let isCopying = false;
async function copyResult() {  
    navigator.clipboard.writeText(output.innerHTML);
    if (!isCopying) 
    {
        isCopying = true;    
        messageCopy.style.display = "inline-block";
        await waitFor();
        for (messageCopy.style.opacity = 1; messageCopy.style.opacity >= 0; messageCopy.style.opacity -= 0.01) {
            await delay(15);
        }

        messageCopy.style.display = "none";
        messageCopy.style.opacity = 1;
        isCopying = false;
    }
}