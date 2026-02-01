// Переход на главную страницу
function back() {
    window.location.href = "/main/";
}

// Снег
const select = document.querySelector("select")
if (localStorage.getItem("snowOff") == "true")
{
    document.querySelector("#off").selected = true;
}

function selectSnow()
{
    if (select.value == "Отключить")
    {
        localStorage.setItem("snowOff", "true");        
    }
    else
    {
        localStorage.setItem("snowOff", "false");
    }
    document.querySelector("#message").innerHTML = "Вернитесь на главную или перезагрузите страницу, чтобы изменения вступили в силу"
}

