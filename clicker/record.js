import { openMenu, exitMenu, showCaution } from "/main/common.js"
const title = document.querySelector("title").innerHTML;
let gameTitle;
switch (title)
{
    case "Кликер":
        gameTitle = "clicker";
        break;
    case "Квадратик":
        gameTitle = "kvadratik";
        break;
}

// Открытие и закрытие различных меню
document.querySelector("#add").onclick = () => openMenu("#menuScore");
document.querySelector("#exitMenuScore").onclick = () => exitMenu("#menuScore");

document.querySelector("#showMenuCreateRecord").onclick = () => 
{
    exitMenu("#menuScore");
    openMenu("#menuCreateRecord");
};
document.querySelector("#exitMenuCreateRecord").onclick = () => exitMenu("#menuCreateRecord");

document.querySelector("#showMenuEditRecord").onclick = () => {
    exitMenu("#menuScore");
    openMenu("#menuEditRecord");
};
document.querySelector("#exitMenuEditRecord").onclick = () => exitMenu("#menuEditRecord");

document.querySelector("#showMenuEditData").onclick = () => 
{
    exitMenu("#menuScore");
    openMenu("#menuEditData");
};
document.querySelector("#exitMenuEditData").onclick = () => exitMenu("#menuEditData");

// Таблица лидеров
async function getTable()
{
    const answer = await fetch(`https://miroshkin.vercel.app/api/getTable/${gameTitle}`, {
        method: "GET"
    });
    const table = await answer.json();
    document.querySelector("#loading").style.display = "none";
    table.sort((a, b) => b.score - a.score);

    const tableElement = document.querySelector(".table");
    while (tableElement.children.length > 2)
        tableElement.removeChild(tableElement.children[2]);

    for (let i = 0; i < table.length; i++) 
    {
        let line = document.createElement("div");
        line.classList.add("line");

        let name = document.createElement("div");
        name.classList.add("names");
        name.innerHTML = i + 1 + ". " + table[i].name;
        line.appendChild(name);

        let score = document.createElement("div");
        score.classList.add("scores");
        score.innerHTML = table[i].score;
        line.appendChild(score);

        tableElement.appendChild(line);
    }
}
getTable();

// Точки при ожидании результата запроса к базе данных
function points(number)
{
    const pointsText = document.querySelectorAll(".points")[number - 1];
    if (pointsText.innerHTML.length == 3)
        pointsText.innerHTML = "";
    else
        pointsText.innerHTML += ".";
}

// Создание рекорда
const createRecordButton = document.querySelector("#createRecord");
createRecordButton.onclick = async () =>
{
    const recordName = document.querySelector("#recordName");
    const recordPassword = document.querySelector("#recordPassword");

    if (recordName.value == "" || recordPassword.value == "")
    {
        await showCaution("Заполните все поля");
        return;
    }

    const pointsInterval = setInterval(() => points(1), 250);
    createRecordButton.disabled = true;
    createRecordButton.style.opacity = 0.5;
    const answer = await fetch(`https://miroshkin.vercel.app/api/createRecord/${gameTitle}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: recordName.value,
            password: recordPassword.value,
            score: gameTitle == "clicker" ? Number(localStorage.getItem("score")) || 0 : Number(localStorage.getItem("scoreKvadratik")) || 0
        })
    });
    clearInterval(pointsInterval);
    document.querySelector(".points").innerHTML = "";
    createRecordButton.disabled = false;
    createRecordButton.style.opacity = 1;

    getTable();

    const text = await answer.text();
    if (answer.status == 201)
    {
        exitMenu("#menuCreateRecord");
        await showCaution(text, true);           
    }
    else
        await showCaution(text);  
};

// Изменение рекорда
const editRecordButton = document.querySelector("#editRecord");
editRecordButton.onclick = async () =>
{
    const recordName = document.querySelector("#editRecordName");
    const recordPassword = document.querySelector("#editRecordPassword");

    if (recordName.value == "" || recordPassword.value == "")
    {
        await showCaution("Заполните все поля");
        return;
    }

    const pointsInterval = setInterval(() => points(2), 250);
    editRecordButton.disabled = true;
    editRecordButton.style.opacity = 0.5;
    const answer = await fetch(`https://miroshkin.vercel.app/api/editRecord/${gameTitle}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: recordName.value,
            password: recordPassword.value,
            newScore: gameTitle == "clicker" ? Number(localStorage.getItem("score")) || 0 : Number(localStorage.getItem("scoreKvadratik")) || 0
        })
    });
    clearInterval(pointsInterval);
    document.querySelectorAll(".points")[1].innerHTML = "";
    editRecordButton.disabled = false;
    editRecordButton.style.opacity = 1;

    getTable();

    const text = await answer.text();
    if (answer.status == 200)
    {
        exitMenu("#menuEditRecord");
        await showCaution(text, true);           
    }
    else
        await showCaution(text);
};

// Изменение данных рекорда
const oldRecordName = document.querySelector("#oldRecordName");
const oldRecordPassword = document.querySelector("#oldRecordPassword");
const newRecordName = document.querySelector("#newRecordName");
const newRecordPassword = document.querySelector("#newRecordPassword");
let fieldChange = false;

oldRecordName.oninput = () => 
{
    if (!fieldChange) 
        newRecordName.value = oldRecordName.value;
}
oldRecordPassword.oninput = () => 
{
    if (!fieldChange)
        newRecordPassword.value = oldRecordPassword.value;
}
newRecordName.oninput = () => fieldChange = true;
newRecordPassword.oninput = () => fieldChange = true;

const editDataButton = document.querySelector("#editData");
const deleteRecord = document.querySelector("#deleteRecord");
async function editData(deleteMode = false)
{
    // Не пусты ли поля
    let hasEmptyField = false;
    document.querySelectorAll("#menuEditData input").forEach(async input => {
        if (input.value == "")
        {
            hasEmptyField = true;
            await showCaution("Заполните все поля");           
        }        
    });   
    if (hasEmptyField)
        return;

    const pointsInterval = setInterval(() => points(3), 250);
    editDataButton.disabled = true;
    editDataButton.style.opacity = 0.5;
    deleteRecord.disabled = true;
    deleteRecord.style.opacity = 0.5;
    let answer;
    if (!deleteMode)
    {
        answer = await fetch(`https://miroshkin.vercel.app/api/editData/${gameTitle}`, {
           method: "PATCH",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
            name: oldRecordName.value,
            password: oldRecordPassword.value,
            newName: newRecordName.value,
            newPassword: newRecordPassword.value
           })
        });
    }
    else
    {
        answer = await fetch(`https://miroshkin.vercel.app/api/deleteRecord/${gameTitle}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: oldRecordName.value,
                password: oldRecordPassword.value
            })
        });
    }
    clearInterval(pointsInterval);
    document.querySelectorAll(".points")[2].innerHTML = "";
    editDataButton.disabled = false;
    editDataButton.style.opacity = 1;
    deleteRecord.disabled = false;
    deleteRecord.style.opacity = 1;

    getTable();

    const text = await answer.text();
    if (answer.status == 200 || answer.status == 204)
    {
        exitMenu("#menuEditData");
        await showCaution(text, true);     
    }
    else
        await showCaution(text);
};

editDataButton.onclick = async () => editData();
deleteRecord.onclick = async () => editData(true);
