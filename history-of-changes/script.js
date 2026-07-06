// Импорт
import { switchOn, switchOff } from "/main/common.js";

// Переход на главную страницу
document.querySelector("button").onclick = () => back();
async function back() {
    await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
}
