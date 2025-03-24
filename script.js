function najatie() {
    let nadpis = document.getElementById("nadpis")
    let knopka = document.getElementById("knopka")
    if (nadpis.innerHTML==="") {
    knopka.innerHTML="Вернуть"
    nadpis.innerHTML="Молодец!"
    }else if (nadpis.innerHTML==="Молодец!") {
    knopka.innerHTML="Нажми"
    nadpis.innerHTML=""
    }
}
function history() {
    window.location.href="https://miroshkin0207.github.io/history/"
}
function kalkulator() {
    window.location.location="https://miroshkin0207/github.io/kalkulator/"
}