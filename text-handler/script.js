function back() {
    window.location.href = "/main/"
}

function textInput() {
    let chars = document.querySelectorAll("h2")[0]
    let words = document.querySelectorAll("h2")[1]
    let text = document.querySelector("textarea").value

    let countChars = 0
    let countWords = 0
    let countSpaces = 0
    for (let i = 0; i < text.length; i++) {
        countChars++      
    }

    text = text.trim()
    for (let i = 0; i < text.length; i++) {       
        if (text[i] == " ") {
            countSpaces++
        }
        countWords = countSpaces + 1
    }

    chars.innerHTML = `Количество символов: ${countChars}`

    if (text[text.length - 1] != " ") {
        words.innerHTML = `Количество слов: ${countWords}`
    }
    else {
            words.innerHTML = `Количество слов: ${countWords - 1}`               
    }
}