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

function random(min, max)
{
    return min + Math.floor(Math.random() * (max - min + 1));
}

const button = document.querySelector("#generator");
function checkButtonDisabled() {
    const minimum = Number(document.querySelector("#first").value);
    const maximum = Number(document.querySelector("#second").value);
    if (minimum != "" && maximum != "") {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }

    if (button.disabled) {
        button.classList.add("buttonDisabled");
    }
    else {
        button.classList.remove("buttonDisabled");
    };
}
checkButtonDisabled();

var password = "";
function generate() {
    password = "";
    const minimum = Number(document.querySelector("#first").value);
    const maximum = Number(document.querySelector("#second").value);

    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!?";
    
    let error = false;
    if (!(minimum <= maximum)) {
        alert("Минимум должен быть меньше максимума или равен ему");
        error = true;
    }

    if (!error) {
        let lengthPassword = random(minimum, maximum);
        
        while (password.length < lengthPassword)
        {
            password += chars[random(0, chars.length - 1)];
        }
        document.querySelector(".password").innerHTML = password;
    }
}

var messageCopy = document.querySelector(".messageCopy");
function waitFor() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

// Скопировать
async function copy() {   
    navigator.clipboard.writeText(password);
    messageCopy.style.display = "block";
    await waitFor();
    for (messageCopy.style.opacity = 1; messageCopy.style.opacity >= 0; messageCopy.style.opacity -= 0.01) {
        await delay(15);
    }
    
    messageCopy.style.display = "none";
    messageCopy.style.opacity = 1;
}
