// Переход на главную страницу
function back() {
    window.location.href = "/main/"
}

// Показ/скрытие галочки
var check = document.querySelector("#check")
var eventName = document.querySelector("#eventName")
if (eventName.value != "") {
    check.hidden = false
}
else {
    check.hidden = true
}
function showCheck() {    
    
    if (eventName.value != "") {
        check.hidden = false
    }
    else {
        check.hidden = true
    }
}

// Отображение имени события
var edit = false
function showEventName() {
    var checkImg = document.querySelector("img")
    if (!edit) {
        let eventNameText = document.createElement("h2")
        eventNameText.innerHTML = eventName.value
        eventName.replaceWith(eventNameText)
        eventNameText.id = "eventName"
        
        checkImg.src = "images/edit.png"
        edit = true
    }
    else {
        let eventNameInput = document.createElement("input")
        eventNameText.replaceWith(eventNameInput)
        eventNameInput.placeholder = "Введите событие"
        checkImg.src = "images/check.png"
        edit = false
    }
}