// Переход на главную страницу
function back() {
    window.location.href = "/main/"
}

// Ввод текста
let output = document.querySelector(".output")
function inputChar(text) {
    output.innerHTML += text.innerHTML
}

// Расчёт
let result = ""
function printResult() {
    if (output.innerHTML.length > 0) {
        let countSpecChars = 0

        for (let i = 0; i < output.innerHTML.length; i++) {
            let char = output.innerHTML[i]

            switch (char) {
                case "×":
                    result += "*"
                    break
                case "÷":
                    result += "/"
                    break
                case "^":
                    result = "Math.pow(" + result + ", "
                    countSpecChars++
                    break
                case "√":
                    result += "Math.sqrt("
                    countSpecChars++
                    break
                default:
                    result += char
                    break
            }
        }

        while (countSpecChars > 0) {
            result += ")"
            countSpecChars--
        }

        let flag = true
        try {
            result = eval(result)
        }
        catch {
            alert("Ошибка: некорректное выражение")
            flag = false
        }
        finally {
            if (result == "Infinity") {
                alert("На ноль делить нельзя")
                flag = false
            }
            else if (isNaN(result)) {
                alert("Не число")
                flag = false
            }
        }

        if (flag) {
            output.innerHTML = result
        }
        result = ""
    }
}


// Удалить последний символ
function delLastChar() {
    output.innerHTML = output.innerHTML.slice(0, -1)
}

// Очистить
function clearInput() {
    output.innerHTML = ""
    result = ""
}

var messageCopy = document.querySelector(".messageCopy")
function waitFor() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}
function timer() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 15)
    })
}

// Скопировать
async function copy() {   
    navigator.clipboard.writeText(output.innerHTML)
    messageCopy.style.display = "block"
    await waitFor()
    for (messageCopy.style.opacity = 1; messageCopy.style.opacity >= 0; messageCopy.style.opacity -= 0.01) {
        await timer()
    }
    
    messageCopy.style.display = "none"
    messageCopy.style.opacity = 1
}