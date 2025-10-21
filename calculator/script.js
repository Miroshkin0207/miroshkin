function back() {
    window.location.href = "/main/"
}

let output = document.querySelector(".output")

function inputChar(text) {
    output.innerHTML += text.innerHTML
}

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

        if (flag) {
            output.innerHTML = result
        }
        result = ""
    }
}

function delLastChar() {
    output.innerHTML = output.innerHTML.slice(0, -1)
}

function clearInput() {
    output.innerHTML = ""
    result = ""
}

function copy() {
    navigator.clipboard.writeText(output.innerHTML)
}
