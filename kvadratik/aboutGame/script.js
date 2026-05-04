// Импорт
import { switchOff, switchOn } from "/main/common.js";

// Возвращаемся назад к игре
document.querySelector("#back").onclick = () => back();
async function back() {
    await switchOn();
    window.location.href = "/kvadratik/main/";
}
switchOff();