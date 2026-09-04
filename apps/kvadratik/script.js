// Импорт
import { switchOn, switchOff } from "/main/common.js";

// Переход на главную страницу
document.querySelector("button").onclick = async () => {
    await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
};

// Скачивание файла
document.querySelector(".download button").onclick = () =>
{
    switch (document.querySelector("select").value)
    {
        case "Windows":

            break;
        case "Linux":

            break;
        case "MacOS":

            break;
        case "Android":
            
            break;
    }
};