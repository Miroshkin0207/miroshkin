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

function generate() {
    const minimum = Number(document.querySelector("#first").value)
    const maximum = Number(document.querySelector("#second").value)

    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!?"
    password = ""
    
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

function copy() {
    navigator.clipboard.writeText(password)
}