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
            document.querySelector("a").click();
            break;
        case "Linux":
            document.querySelectorAll("a")[1].click();
            break;
        case "MacOS (Intel, старая)":
            document.querySelectorAll("a")[2].click();
            break;
        case "MacOS (Apple Silicon, новая)":
            document.querySelectorAll("a")[3].click();
            break;
        case "Android":
            document.querySelectorAll("a")[4].click();
            break;
    }
};