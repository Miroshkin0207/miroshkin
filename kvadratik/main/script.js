// Переход на главную страницу
function back()
{
    window.location.href = "/main/";
}

// Таблица лидеров
const leaders = [
    
];
leaders.sort((a, b) => b.score - a.score)

for (let i = 0; i < leaders.length; i++)
{
    const line = document.createElement("div");
    line.classList.add("line");

    const name = document.createElement("div");
    name.classList.add("names");
    name.innerHTML = i + 1 + ". " + leaders[i].name;
    line.appendChild(name);

    const score = document.createElement("div");
    score.classList.add("scores");
    score.innerHTML = leaders[i].score;
    line.appendChild(score);

    document.querySelector(".table").appendChild(line);
}

// Меню с информацией
function info()
{
    document.querySelector(".overlay").style.display = "inline-block";
    document.querySelector(".menuInfo").style.display = "inline-block";
}

function exit()
{
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".menuInfo").style.display = "none";
}