// Отключение музыки:(
if (localStorage.getItem("music") == "false")
    document.querySelector("audio").remove();

// Обратный отсчёт
function startCountdown()
{
    const countdownElement = document.querySelector(".countdown");
    countdownElement.style = "display: flex; opacity: 1;";
    const countdownP = document.querySelector(".countdown p");
    countdownP.innerHTML = "3";
    document.querySelector(".overlay").style.display = "inline-block";
    if (matchMedia("(min-width: 1000px)").matches)
    {
        const hint = document.querySelector("#hint");
        hint.style = "display: inline-block; opacity: 1;";
    }
    
    let countdown = setInterval(async () => {
        if (countdownP.innerHTML - 1 > 0)
            countdownP.innerHTML = countdownP.innerHTML - 1;
        else if (countdownP.innerHTML - 1 == 0)
            countdownP.innerHTML = "Вперёд!";
        else
        {
            document.querySelector(".overlay").style.display = "none";
            clearInterval(countdown);
            for (countdownElement.style.opacity = 1, hint.style.opacity = 1; countdownElement.style.opacity > 0; countdownElement.style.opacity -= 0.01, hint.style.opacity -= 0.01)
                await delay(3);
            countdownElement.style.display = "none";
            if (matchMedia("(min-width: 1000px)").matches)
                hint.style.display = "none";
            play();
        } 
    }, 1000);
}

// Основное
let kvadratik = document.querySelector("#kvadratik");
let kvadratikSize = 50;
let countApples = 0;
let pointsPerApple = 1;
let score = document.querySelector("#score");
let grayCubes = [];
let numberListId = 0;
let kvadratikBorder = null;
let hasKillKvadratik = false;
let oldRecord = localStorage.getItem("scoreKvadratik") || 0;
const field = document.querySelector(".field");
let fieldSize = 630;
let isGameover = false;

if (matchMedia("(min-width: 1000px)").matches)
{
    var k = 1;
    var fieldBorder = 15;
    var safeZone = 15;
    var timeUpdateKvadratikPosition = 5;
    var timeUpdateGrayCubePosition = 7;
}
else
{
    fieldSize = window.screen.width * 0.95;
    var k = fieldSize / 630;
    kvadratikSize = 50 * fieldSize / 630;
    var fieldBorder = 7;
    var safeZone = 7;
    var timeUpdateKvadratikPosition = 9;
    var timeUpdateGrayCubePosition = 11;
}

// Установка null сетТаймаутам и интервалам
let waitForActivationBomb;
let slowlyDelBomb;
let waitForActivationGrayCube;
let kvadratikGiveObject;
let slowlyDelOtherObjects;
let doubleTimer;
let spawnApples;
let spawnBombs;
let spawnGains;
let moveKvadratik;
let waitForDelPlus;
let doubleIsActive;
let slowlyDelGrayCube;
let grayCubeBomb;

// Функция для получения случайного числа
function getRandom(min, max)
{
    return min + Math.floor(Math.random() * (max - min + 1));
}

// Функция для удаления элемента массива по индексу
function del(array, index)
{
    let newArray = [];
    for (let i = 0; i < array.length - 1; i++)
    {
        if (i < index)
            newArray[i] = array[i];
        else
            newArray[i] = array[i + 1];
    }
    return newArray;
}

// Функция для ожидания
function delay(time)
{
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
}

// Класс предметов
class Objects
{   
    constructor(image, width, height) 
    {     
        this.hasGet = false;      
        this.width = width * k;
        this.height = height * k;
        this.needToDel = false;
        const element = document.createElement("img");
        element.src = image;
        field.appendChild(element);
        element.classList.add("fieldElements");
        element.style.width = this.width + "px";
        element.style.height = this.height + "px";
        element.style.left = getRandom(safeZone, fieldSize - this.width - safeZone) + "px";
        element.style.top = getRandom(safeZone, fieldSize - this.height - safeZone) + "px";
        this.element = element;      
        this.borderRight = this.element.offsetLeft + this.width;
        this.borderLeft = this.element.offsetLeft;
        this.borderTop = this.element.offsetTop;
        this.borderBottom = this.element.offsetTop + this.height;
        this.listTimeouts = [];
        this.listIntervals = [];

        if (image == "images/apple.png")
            var appleActive = true;
        else if (image == "images/warning.png")
            var bombActive = true;
        else if (image == "images/grayCube.png")
        {
            this.grayCube = {
                right: this.borderRight,
                left: this.borderLeft,
                top: this.borderTop,
                bottom: this.borderBottom,
                listId: numberListId,
                isAlive: true,
                isActive: false,
                element: element,
                updatePosition: setInterval(() => {
                    for (let i = 0; i < grayCubes.length; i++)
                    {
                        if (grayCubes[i].listId == this.grayCube.listId && grayCubes[i])
                        {
                            grayCubes[i].left = this.element.offsetLeft;
                            grayCubes[i].right = this.element.offsetLeft + kvadratikSize;
                            grayCubes[i].top = this.element.offsetTop;
                            grayCubes[i].bottom = this.element.offsetTop + kvadratikSize;
                        }
                    }
                }, 5)
            };
        }    

        // Уникальная функция предмета при появлении
        switch (image)
        {
            case "images/apple.png":
                countApples++;
                break;

            case "images/warning.png":
                waitForActivationBomb = setTimeout(async () => {
                    try
                    {
                        for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                            await delay(5);

                        this.element.src = "images/bomb.png";
                        this.element.style.zIndex = 2;
                        image = "images/bomb.png";
                        this.element.style.opacity = 1;
                        this.element.style.width = 35 * k + "px";
                        this.element.width = 35 * k;
                        this.borderRight = this.element.offsetLeft + this.width;

                        // Серый Куб врезается в бомбу (туда его)
                        let grayCubeBomb = setInterval(async () => {
                            if (bombActive)
                            {
                                for (let i = 0; i < grayCubes.length; i++)
                                {
                                    if (((this.borderLeft <= grayCubes[i].right && grayCubes[i].right <= this.borderRight) 
                                        || (grayCubes[i].left <= this.borderRight && this.borderRight <= grayCubes[i].right))
                                        && ((this.borderTop < grayCubes[i].bottom && grayCubes[i].bottom <= this.borderBottom)
                                        || (grayCubes[i].top <= this.borderBottom && this.borderBottom <= grayCubes[i].bottom)))
                                    {
                                        grayCubes[i].element.src = "images/grayCubeKilled.png";
                                        this.hasGet = true;
                                        grayCubes[i].isAlive = false;
                                        
                                        slowlyDelBomb = setTimeout(async () => {
                                            try
                                            {
                                                for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                                                    await delay(5);  
                                            }
                                            catch
                                            {
                                            
                                            }
                                            this.needToDel = true;                          
                                        }, 1500);
                                        clearInterval(grayCubes[i].updatePosition); 
                                                  
                                        await delay(55);
                                        this.element.src = "images/exploison.png";
                                        image = "images/exploison.png";
                                        this.element.style.width = 45 * k + "px";

                                        clearInterval(grayCubeBomb);                            
                                    }
                                }
                            }
                        }, 5);     
                        this.listIntervals.push(grayCubeBomb);  
                    }
                    catch
                    {
                        // По каким-то причинам тут может быть ошибка ._.
                    }      
                }, 2500);
                this.listTimeouts.push(waitForActivationBomb);
                break;

            case "images/grayCube.png":
                this.element.style.zIndex = 3;
                numberListId++;
                waitForActivationGrayCube = setTimeout(() => {
                    // Путь Серого Куба к Квадратику
                    let directionGrayCube = "horizontally";
                    let grayCubeMove = setInterval(async () => {
                        if (this.grayCube.isAlive && !hasKillKvadratik)
                        {
                            // Обновление значений
                            kvadratikBorder = {
                                right: kvadratik.offsetLeft + kvadratikSize,
                                left: kvadratik.offsetLeft,
                                top: kvadratik.offsetTop,
                                bottom: kvadratik.offsetTop + kvadratikSize
                            }

                            // Столкновение Квадратика и Серого Куба...
                            if (((this.grayCube.left <= kvadratikBorder.right && kvadratikBorder.right <= this.grayCube.right) 
                            || (kvadratikBorder.left <= this.grayCube.right && this.grayCube.right <= kvadratikBorder.right))
                            && ((this.grayCube.top < kvadratikBorder.bottom && kvadratikBorder.bottom <= this.grayCube.bottom)
                            || (kvadratikBorder.top <= this.grayCube.bottom && this.grayCube.bottom <= kvadratikBorder.bottom)))
                            {
                                await delay(55);
                                hasKillKvadratik = true;
                                gameover(); 
                            }

                            if (directionGrayCube == "horizontally")
                            {
                                if (this.element.offsetLeft == kvadratik.offsetLeft)
                                    directionGrayCube = "vertical";         
                                else if (this.element.offsetLeft < kvadratik.offsetLeft)
                                    this.element.style.left = this.element.offsetLeft + 1 + "px";                             
                                else
                                    this.element.style.left = this.element.offsetLeft - 1 + "px";     
                            }

                            else
                            {
                                if (this.element.offsetTop == kvadratik.offsetTop)
                                    directionGrayCube = "horizontally";         
                                else if (this.element.offsetTop < kvadratik.offsetTop)
                                    this.element.style.top = this.element.offsetTop + 1 + "px";                             
                                else
                                    this.element.style.top = this.element.offsetTop - 1 + "px";
                            }     
                        }
                        else
                        {
                            clearInterval(grayCubeMove);
                            clearInterval(changeDirection);
                        }                     
                    }, timeUpdateGrayCubePosition);

                    // Смена направления преследования
                    const changeDirection = setInterval(() => {
                        directionGrayCube = directionGrayCube == "horizontally" ? "vertical" : "horizontally";
                    }, 2000);
                }, 1500);
                this.listTimeouts.push(waitForActivationGrayCube);
                break;
        }

        // Механика сбора предметов Квадратиком
        kvadratikGiveObject = setInterval(async () => {     
            kvadratikBorder = {
                right: kvadratik.offsetLeft + kvadratikSize,
                left: kvadratik.offsetLeft,
                top: kvadratik.offsetTop,
                bottom: kvadratik.offsetTop + kvadratikSize
            }

            if (!this.needToDel)
            {
                if (((this.borderLeft <= kvadratikBorder.right && kvadratikBorder.right <= this.borderRight) 
                || (kvadratikBorder.left <= this.borderRight && this.borderRight <= kvadratikBorder.right))
                && ((this.borderTop < kvadratikBorder.bottom && kvadratikBorder.bottom <= this.borderBottom)
                || (kvadratikBorder.top <= this.borderBottom && this.borderBottom <= kvadratikBorder.bottom)))
                {
                    /* Функции при получении предмета */
                    switch (image)
                    {
                        // Яблоки
                        case "images/apple.png":
                            if (appleActive)
                            {   
                                this.element.remove();           
                                countApples--;                                     
                                score.innerHTML = Number(score.innerHTML) + pointsPerApple;
                                document.querySelector("#plus").innerHTML = `+${pointsPerApple}`;
                                
                                clearTimeout(waitForDelPlus);
                                waitForDelPlus = setTimeout(() => {
                                    document.querySelector("#plus").innerHTML = "";
                                }, 1000);                        

                                this.hasGet = true;
                                if (countApples == 0)
                                {
                                    var newApple = new Objects("images/apple.png", 38, 45); 
                                    newApple.waitForDel = setInterval(() => {
                                        if (newApple.needToDel || isGameover)
                                        {
                                            for (let i = 0; i < newApple.listIntervals.length; i++)
                                                clearInterval(newApple.listIntervals[i]);
                                            for (let i = 0; i < newApple.listTimeouts.length; i++)
                                                clearTimeout(newApple.listTimeouts[i]);
                                            clearInterval(newApple.waitForDel);    
                                            newApple.element.remove();
                                            newApple = null;  
                                        }     
                                    }, 250);
                                }
                                this.needToDel = true;
                            }                  
                            break;

                        // Бомбы, взрыв
                        case "images/bomb.png":         
                            if (bombActive)
                            {
                                this.hasGet = true;
                                this.element.src = "images/exploison.png";
                                this.element.style.width = 45 * k + "px";
                                image = "images/exploison.png";        
                                gameover();
                            }
                            break;

                        /* Усиления */
                        // 2x очки
                        case "images/double.png":
                            if (doubleTimer != null)
                            {
                                clearInterval(doubleTimer);
                                clearTimeout(doubleIsActive);
                                document.querySelector(".gainTimer p").innerHTML = "15";
                            }

                            pointsPerApple = 2;
                            doubleIsActive = setTimeout(() => {
                                pointsPerApple = 1;
                                document.querySelector(".gainTimer").style.display = "none";
                                document.querySelector(".gainTimer p").innerHTML = "15";
                                clearInterval(doubleTimer);
                            }, 15000);

                            doubleTimer = setInterval(() => {
                                if (document.querySelector(".gainTimer p").innerHTML != 0)
                                    document.querySelector(".gainTimer p").innerHTML = Number(document.querySelector(".gainTimer p").innerHTML) - 1;
                            }, 1000);
                            document.querySelector(".gainTimer").style.display = "inline-block";
                            this.hasGet = true;
                            this.element.remove();
                            this.needToDel = true;    
                            break;    

                        // Серый Куб (усиление)
                        case "images/grayCubeObject.png":                       
                            let grayCube = new Objects("images/grayCube.png", 50, 50);  
                            grayCube.waitForDel = setInterval(() => {
                                if (grayCube.needToDel || isGameover)
                                {
                                    for (let i = 0; i < grayCube.listIntervals.length; i++)
                                        clearInterval(grayCube.listIntervals[i]);
                                    for (let i = 0; i < grayCube.listTimeouts.length; i++)
                                        clearTimeout(grayCube.listTimeouts[i]);
                                    clearInterval(grayCube.waitForDel);
                                    grayCube.element.remove();
                                    grayCube = null;                               
                                }     
                            }, 1000); 
                            grayCubes.push(grayCube.grayCube); 
                            this.element.remove();
                            this.needToDel = true;                                             
                            break;   
                            
                        // Виноград
                        case "images/grape.png":
                            score.innerHTML = Number(score.innerHTML) + pointsPerApple * 10;
                            document.querySelector("#plus").innerHTML = `+${pointsPerApple * 10}`;
                            waitForDelPlus = setTimeout(() => {
                                document.querySelector("#plus").innerHTML = "";
                            }, 1000);
                            this.element.remove();
                            this.needToDel = true;
                            break;
                    }
                }
            }
        }, 5);
        this.listIntervals.push(kvadratikGiveObject);

        /* Исчезновение предметов */
        // Для предупреждений
        switch (image)
        {
            case "images/warning.png":
                slowlyDelBomb = setTimeout(async () => {
                    if (!this.hasGet)
                    {
                        bombActive = false;
                        for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                            await delay(5);
                        this.element.remove();
                        this.needToDel = true;
                    }
                }, 7500); 
                this.listTimeouts.push(slowlyDelBomb);
                break; 

            // Для Серого Куба
            case "images/grayCube.png": 
                let waitForDieGrayCube = setInterval(() => {
                    if (!this.grayCube.isAlive)
                    {
                        slowlyDelGrayCube = setTimeout(async () => {
                            for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                                await delay(5);
                            
                            this.needToDel = true;
                        }, 1500);
                        grayCubes = del(grayCubes, this.grayCube.number);
                        clearInterval(waitForDieGrayCube);
                    }
                }, 20);   
                this.listIntervals.push(waitForDieGrayCube);
                break;

            // Для остальных предметов
            default:
                slowlyDelOtherObjects = setTimeout(async () => {
                    if (!this.hasGet)
                    {
                        if (image == "images/apple.png")
                        {
                            appleActive = false;
                            countApples--;
                            if (countApples == 0)
                            {
                                var newApple = new Objects("images/apple.png", 38, 45);  
                                for (let i = 0; i < newApple.listIntervals.length; i++)
                                    clearInterval(newApple.listIntervals[i]);
                                for (let i = 0; i < newApple.listTimeouts.length; i++)
                                    clearTimeout(newApple.listTimeouts[i]);
                                clearInterval(newApple.waitForDel || isGameover);
                                
                                newApple = null;  
                            }               
                        } 

                        try 
                        {
                            for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                                await delay(5);
                        }
                        catch
                        {
                            // Исчезающий объект уже был собран
                        }      
                        
                        this.element.remove();
                        this.needToDel = true;   
                    }
                }, 5000);  
                this.listTimeouts.push(slowlyDelOtherObjects);
                break;
        }
    }
}

// Управление на мобильных устройствах
let direction = "right";
function gamepad(directionGamepad)
{
    switch (String(directionGamepad))
    {
        case "right":
            direction = "right";
            break;
        case "left":
            direction = "left";
            break;
        case "up":
            direction = "up";
            break;
        case "down":
            direction = "down";
            break;
    }
}

// Игровой процесс
function play()
{
    // Спавн яблок
    let firstApple = new Objects("images/apple.png", 38, 45);
    firstApple.waitForDel = setInterval(() => {
        if (firstApple.needToDel || isGameover)
        {
            for (let i = 0; i < firstApple.listIntervals.length; i++)
                clearInterval(firstApple.listIntervals[i]);
            for (let i = 0; i < firstApple.listTimeouts.length; i++)
                clearTimeout(firstApple.listTimeouts[i]);
            clearInterval(firstApple.waitForDel); 
            firstApple.element.remove();
            firstApple = null;           
        }     
    }, 250);
    spawnApples = setInterval(() => {
        let apple = new Objects("images/apple.png", 38, 45);
            apple.waitForDel = setInterval(() => {
            if (apple.needToDel || isGameover)
            {
                for (let i = 0; i < apple.listIntervals.length; i++)
                    clearInterval(apple.listIntervals[i]);
                for (let i = 0; i < apple.listTimeouts.length; i++)
                    clearTimeout(apple.listTimeouts[i]);
                clearInterval(apple.waitForDel);
                apple.element.remove();
                apple = null;  
            }     
        }, 250);
    }, 2500);


    // Спавн бомб
    spawnBombs = setInterval(() => {
        let bomb = new Objects("images/warning.png", 36, 44);
        bomb.waitForDel = setInterval(() => {
            if (bomb.needToDel || isGameover)
            {
                for (let i = 0; i < bomb.listIntervals.length; i++)
                    clearInterval(bomb.listIntervals[i]);
                for (let i = 0; i < bomb.listTimeouts.length; i++)
                    clearTimeout(bomb.listTimeouts[i]);
                clearInterval(bomb.waitForDel);    
                bomb = null;  
            }     
        }, 250);
    }, 3000);
    

    // Бонусы
    spawnGains = setInterval(() => {
        const gainNumber = getRandom(1, 3);
        let gain;
        switch (gainNumber)
        {
            case 1:
                gain = new Objects("images/double.png", 36, 38);
                break;
            case 2:
                gain = new Objects("images/grayCubeObject.png", 30, 30);
                break;
            case 3:
                gain = new Objects("images/grape.png", 35, 44);
                break;  
        }
        gain.waitForDel = setInterval(() => {
            if (gain.needToDel || isGameover)
            {
                for (let i = 0; i < gain.listIntervals.length; i++)
                    clearInterval(gain.listIntervals[i]);
                for (let i = 0; i < gain.listTimeouts.length; i++)
                    clearTimeout(gain.listTimeouts[i]);
                clearInterval(gain.waitForDel);    
                gain = null;  
            }     
        }, 1000);
    }, 7500);


    // Управление на ПК
    document.addEventListener("keydown", e => {
    switch (e.key)
    {
        case "ArrowRight":
            direction = "right";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
    }
    });

    // Перемещение
    moveKvadratik = setInterval(() => {
    switch (direction)
    {
        case "right":        
            if (kvadratik.offsetLeft < fieldSize - kvadratikSize) 
                kvadratik.style.left = kvadratik.offsetLeft + 1 + "px";
            else
                gameover();
            break;
        case "left":
            if (kvadratik.offsetLeft > 0)
                kvadratik.style.left = kvadratik.offsetLeft - 1 + "px";
            else
                gameover();
            break;
        case "up":
            if (kvadratik.offsetTop > 0)
                kvadratik.style.top = kvadratik.offsetTop - 1 + "px";
            else
                gameover();
            break;
        case "down":
            if (kvadratik.offsetTop < field.offsetHeight - fieldBorder * 2 - kvadratikSize)
                kvadratik.style.top = kvadratik.offsetTop + 1 + "px";
            else
                gameover();
            break;
    }
    }, timeUpdateKvadratikPosition);
}

// Проверяем: делать ли заставку вначале
let isLoad = false;
window.addEventListener("load", function() {
    document.querySelector(".overlay").style.display = "none";
    document.getElementsByClassName("menus")[1].style.display = "none";
    isLoad = true;
    document.querySelector(".imagesLoadContainer").remove();
    if (localStorage.getItem("countdownWithStarting") != "false")
    {
        startCountdown();
    }
    else
    {
        play();
    }
});

// Загрузка
async function loadMenu()
{
    await delay(155);
    if (!isLoad)
    {
        document.querySelector(".overlay").style.display = "inline-block";
        document.getElementsByClassName("menus")[1].style.display = "inline-block";
    }
}
loadMenu();

// Конец игры
async function gameover()
{
    if (!isGameover)
    {
        isGameover = true;
        kvadratik.src = "images/kvadratikKilled.png";
        for (let i = 0; i < grayCubes.length; i++)
            grayCubes[i].updatePosition = null;
      
        clearInterval(spawnApples);
        clearInterval(spawnBombs);
        clearInterval(spawnGains);
        clearInterval(doubleTimer);
        clearInterval(moveKvadratik);
        clearTimeout(doubleIsActive);  
        await delay(1500);

        let record = document.querySelector("#score").innerHTML;
        const gameoverMenu = document.querySelector(".menus");
        document.querySelector("#result").innerHTML = record;
        if (Number(record) > Number(oldRecord))
        {
            localStorage.setItem("scoreKvadratik", record);
            messageNewRecord = document.createElement("p");
            messageNewRecord.innerHTML = "Новый рекорд!";
            messageNewRecord.classList.add("messageNewRecord");
            gameoverMenu.appendChild(messageNewRecord);
        }
        else
        {
            let messageOldRecord = document.createElement("p");
            messageOldRecord.innerHTML = `Рекорд: ${oldRecord}`;
            gameoverMenu.appendChild(messageOldRecord);        
        }
        gameoverMenu.style.display = "flex";
        document.querySelector(".overlay").style.display = "inline-block";
    }
}

// Начать игру сначала
function playAgain()
{
    document.querySelector(".overlay").style.display = "none";
    const len =  field.children.length;
    for (let i = 0; i < len; i++)
    {
        field.children[0].remove();
    }
    kvadratik = document.createElement("img");
    kvadratik.src = "images/kvadratik.png";
    kvadratik.id = "kvadratik";
    field.appendChild(kvadratik);

    hasKillKvadratik = false;
    countApples = 0;
    pointsPerApple = 1;
    document.querySelector(".gainTimer").style.display = "none";
    document.querySelector(".gainTimer p").innerHTML = "15";
    numberListId = 0;
    kvadratikBorder = null;
    direction = "right";
    isGameover = false;

    document.querySelector(".menus").style.display = "none";
    score.innerHTML = 0;

    for (let i = 4; i < document.querySelector(".menus").children.length; i++)
    {
        document.querySelector(".menus").children[i].remove();
    }

    if (localStorage.getItem("countdownWithStarting") != "false")
        startCountdown();
    else
        play();
}

// Выход из игры
function leave()
{
    window.location.href = "/kvadratik/main/"
}
