// Переход на главную страницу
function back() {
    window.location.href = "/main/"
}

// Получение случайного числа
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Показ/скрытие галочки
var check = document.querySelector(".check")
var eventNameInput = document.querySelector("#eventNameInput")

function showCheck() { 
    if (eventNameInput.value != "") {
        check.hidden = false
    }
    else {
        check.hidden = true
    }
}
showCheck()

// Отображение имени события
var isEventEdit = false
var eventNameText = document.createElement("h2")
function showEventName() {
    var checkImg = document.querySelector("img")
    var eventTitle = document.getElementsByTagName("label")[1]
    if (!isEventEdit) {     
        eventTitle.style.display = "none"
       
        eventNameText.innerHTML = eventNameInput.value
        eventNameText.id = "eventNameText"

        eventNameInput.replaceWith(eventNameText)      

        checkImg.src = "images/edit.png"
        check.classList.remove("check")
        check.classList.add("edit")
        if (eventNameText.innerHTML.length > 43) {
            document.querySelector(".event").classList.add("forButton")
        }
        else {
            document.querySelector(".event").classList.remove("forButton")
        }      
        isEventEdit = true
    }
    else {
        eventTitle.style.display = "inline-block"

        eventNameText.replaceWith(eventNameInput)      
        eventNameInput.value = eventNameText.innerHTML

        check.classList.remove("edit")
        check.classList.add("check")
        checkImg.src = "images/check.png"
        isEventEdit = false
    }
}

// Добавление нового исхода
var menuNewExodus = document.querySelector(".menuNewExodus")
var noExoduses = document.querySelector("#noExoduses")

function newExodus() {
    noExoduses.style.display = "none"
    menuNewExodus.style.display = "inline-block"
   
    var add = document.getElementById("add")
    if (menuNewExodus.childElementCount > 5) {
        exodusNameInput = menuNewExodus.children[2]
    }
    else {
        var exodusNameInput = document.createElement("input")
        exodusNameInput.placeholder = "Введите имя"
    }
    menuNewExodus.insertBefore(exodusNameInput, add)
    add.onclick = () => {
        addExodus(exodusNameInput)
        exodusNameInput.remove()
    }
    document.querySelector("#exit").onclick = () => {
            exit(exodusNameInput)
    }
}

var listExoduses = document.querySelector(".listExoduses")
function addExodus(exodusNameInput) {
    if (exodusNameInput.value != "") {
        var exodus = document.createElement("div")
        var isEditExd = true
        var exodusNameText = document.createElement("h3") 

        // Кнопки "удалить" и "изменить"
        var editExd = document.createElement("button")
        editExd.id = "editExodus"
        var editImg = document.createElement("img")
        editImg.src = "images/edit.png"
        editImg.id = "editImg"
        editExd.appendChild(editImg)
        var delExd = document.createElement("button")
        delExd.id = "delExodus"
        var delImg = document.createElement("img")
        delImg.src = "images/del.png"
        delImg.id = "delImg"  
        delExd.appendChild(delImg)
        editExd.classList.add("exodusButtons")
        delExd.classList.add("exodusButtons")
        exodus.appendChild(editExd)
        exodus.appendChild(delExd)

        exodusNameText.innerHTML = exodusNameInput.value
        exodus.appendChild(exodusNameText)

        menuNewExodus.style.display = "none"
                
        exodus.classList.add("exodus")
        if (exodusNameText.innerHTML.length > 43) {
            exodus.classList.add("forButtonsExd")
        }
        
        listExoduses.appendChild(exodus)

        editExd.onclick = () => {
            isEditExd = editExodus(exodus, exodusNameInput, exodusNameText, isEditExd, editExd, editImg)
        }
        delExd.onclick = () => {
            deleteExodus(exodus)
        }
    }
    else {
        menuNewExodus.style.display = "none"
        if (listExoduses.childElementCount == 0) {
            noExoduses.style.display = "inline-block"
        }
    }
}

// Выход из меню нового исхода
function exit(exodusNameInput) {
    menuNewExodus.style.display = "none"
    if (listExoduses.childElementCount == 0 && menuNewExodus.style.display == "none") {
        noExoduses.style.display = "inline-block"
        exodusNameInput.remove()
    }
}

// Изменение имени исхода
function editExodus(exodus, exodusNameInput, exodusNameText, isEditExd, editExd, editImg) {      
    exodus.classList.remove("forButtonsExd")
    if (isEditExd) {
        exodusNameInput.value = exodusNameText.innerHTML
        exodusNameText.replaceWith(exodusNameInput)
        exodusNameInput.style = "position: relative; right: 25px"      
        editImg.src = "images/check.png"
        editExd.style.backgroundColor = "white"
        editExd.classList.toggle("checkExodus")
        isEditExd = false
    }
    else {
        exodusNameText.innerHTML = exodusNameInput.value
        exodusNameInput.replaceWith(exodusNameText)
        if (exodusNameText.innerHTML.length > 43) {
            exodus.classList.add("forButtonsExd")
        }
        if (exodusNameText.innerHTML.length < 43) {
            exodus.classList.remove("forButtonsExd")
        }
        
        editImg.src = "images/edit.png"
        editExd.style.backgroundColor = "transparent"
        editExd.classList.toggle("checkExodus")
        isEditExd = true
    }
    return isEditExd
}

// Удаление исхода
function deleteExodus(exodus) {
    exodus.remove()
    if (listExoduses.childElementCount == 0 && menuNewExodus.style.display == "none") {
        noExoduses.style.display = "inline-block"
    }
}

// Выбор случайного исхода
function nextExodus(n) {
    return new Promise(resolve => {       
        setTimeout(() => { 
            listExoduses.children[n].style.border = "solid"
            resolve()
        }, 150)
    })  
}

// Вызов функции получения нового исхода
document.querySelector("#start").onclick = () => {
    if (listExoduses.childElementCount >= 2) {
        start()
    }
    else {
        alert("Для запуска должно быть как минимум 2 исхода")
    }
}

var titleExoduses = document.querySelector("#titleExoduses")
var title = document.querySelector(".result")
var selectElement = null
async function start() {
    var exdCount = listExoduses.childElementCount
    let animation = document.querySelector("#animation")

    if (title.childElementCount > 2) {
        title.style.display = "none"
        title.children[1].remove()
    }
    if (selectElement != null) {
        selectElement.style.border = "none"
        if (listExoduses.lastChild != selectElement) {
            selectElement.style.borderBottom = "solid black"
        }
    }

    select = document.createElement("h2")
    // С анимацией
    if (animation.checked) {
        var count = 0
        if (exdCount <= 15) {
            var n = getRandom(15, 25)
        }
        else {
            var n = getRandom(15, exdCount)
        }
        
        for (let i = 0; count < n; i++) {
            await nextExodus(i)
            if (i != 0) {
                listExoduses.children[i - 1].style.border = "none"
                listExoduses.children[i - 1].style.borderBottom = "solid black"
            }
            else {
                listExoduses.children[exdCount - 1].style.border = "none"
                listExoduses.children[exdCount - 1].style.borderBottom = "solid black"
            }         
            if (i == exdCount - 1) {
                i = -1
            }                  
            count++
        }
    }

    // Без анимации
    else {
        const n = getRandom(0, exdCount - 1)
        selectElement = listExoduses.children[n]
        selectElement.style.border = "solid"
        select.innerHTML = selectElement.innerText
    }

    // Получаем выбранный исход
    if (animation.checked) {       
        for (let i = 0; i < listExoduses.childElementCount; i++) {
            if (listExoduses.children[i].style.border == "solid") {
                selectElement = listExoduses.children[i]
                select.innerHTML = selectElement.innerText
                break
            }
        }
    }

    // Вывод результата
    await waitForResult()
    titleExoduses.replaceWith(title)
    title.insertBefore(select, document.querySelector("#ok"))
    title.children[1].style.fontSize = 0 
    title.style.display = "inline-block"
    for (let i = 1; i <= 25; i++) {
        await fontSizeUp()
        title.children[1].style.fontSize = `${i}px`
    }
}

function waitForResult() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 500)
    })
}

function afterResult() {
    title.removeChild(select)
    title.replaceWith(titleExoduses)
    selectElement.style.border = "none"
    if (listExoduses.lastChild != selectElement) {
        selectElement.style.borderBottom = "solid black"
    }
}

function fontSizeUp() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 10)
    })
}