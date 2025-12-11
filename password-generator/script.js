function back() {
    window.location.href = "/main/"
}

function random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const button = document.querySelector("#generator")
function checkButtonDisabled() {
    const minimum = Number(document.querySelector("#first").value)
    const maximum = Number(document.querySelector("#second").value)
    if (minimum != "" && maximum != "") {
        button.disabled = false
    }
    else {
        button.disabled = true
    }

    if (button.disabled) {
        button.classList.add("buttonDisabled")
    }
    else {
        button.classList.remove("buttonDisabled")
    }
}
checkButtonDisabled()

var password = ""
function generate() {
    password = ""
    const minimum = Number(document.querySelector("#first").value)
    const maximum = Number(document.querySelector("#second").value)

    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!?"
    
    let error = false
    if (!(minimum <= maximum)) {
        alert("Минимум должен быть меньше или равен максимуму")
        error = true
    }

    if (!error) {
        let lengthPassword = random(minimum, maximum)
        
        while (password.length < lengthPassword)
        {
            password += chars[random(0, chars.length - 1)]
        }
        document.querySelector(".password").innerHTML = password
    }
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
    navigator.clipboard.writeText(password.innerHTML)
    messageCopy.style.display = "block"
    await waitFor()
    for (messageCopy.style.opacity = 1; messageCopy.style.opacity >= 0; messageCopy.style.opacity -= 0.01) {
        await timer()
    }
    
    messageCopy.style.display = "none"
    messageCopy.style.opacity = 1
}