// Импорт
import { switchOn, switchOff, delay, copyResult } from "/main/common.js";

// Переход на главную страницу
document.querySelector("button").onclick = async () => {
    await switchOn();
    window.location.href = "/main/?dontNeedAnimation=true";
}

// Ввод текста
let output = document.querySelector(".output");
const countButtons = 22;
for (let i = 2; i <= countButtons; i++)
    document.getElementsByTagName("button")[i].onclick = () => inputChar(document.getElementsByTagName("button")[i]);
function inputChar(text) {
    output.innerHTML += text.innerHTML;
}

// Расчёт
let result = "";
document.querySelector("#equal").onclick = () => printResult(this);
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
document.querySelector("#delLastChar").onclick = () => delLastChar();
function delLastChar() {
    output.innerHTML = output.innerHTML.slice(0, -1);
}

// Очистить
document.getElementsByTagName("button")[2].onclick = () => clearInput();
function clearInput() {
    output.innerHTML = "";
    result = "";
}

// Скопировать
document.querySelector("#copy").onclick = () => copyResult(output.innerHTML);