// Отключение музыки(
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
let waitForActivationBomb = null;
let slowlyDelBomb = null;
let waitForActivationGrayCube = null;
let kvadratikGiveObject = null;
let slowlyDelOtherObjects = null;
let doubleTimer = null;
let spawnApples = null;
let spawnBombs = null;
let spawnGains = null;
let moveKvadratik = null;
let waitForDelPlus = null;
let doubleIsActive = null;
let slowlyDelGrayCube = null;

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
        let hasGet = false;      
        this.width = width * k;
        this.height = height * k;
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

        if (image == "/kvadratik/images/warning.png")
            var bombIsActive = true;
        else if (image == "/kvadratik/images/grayCube.png")
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
        else if (image == "/kvadratik/images/apple.png")
            var appleActive = true; 

        // Уникальная функция предмета при появлении
        switch (image)
        {
            case "/kvadratik/images/apple.png":
                countApples++;
                break;

            case "/kvadratik/images/warning.png":
                waitForActivationBomb = setTimeout(async () => {
                    try
                    {
                        for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                            await delay(5);

                        this.element.src = "/kvadratik/images/bomb.png";
                        this.element.style.zIndex = 2;
                        image = "/kvadratik/images/bomb.png";
                        this.element.style.opacity = 1;
                        this.element.style.width = 35 * k + "px";
                        this.element.width = 35 * k;
                        this.borderRight = this.element.offsetLeft + this.width;

                        // Серый Куб врезается в бомбу (туда его)
                        let grayCubeBomb = setInterval(async () => {
                            if (this.borderLeft && bombIsActive)
                            {
                                for (let i = 0; i < grayCubes.length; i++)
                                {
                                    if (((this.borderLeft <= grayCubes[i].right && grayCubes[i].right <= this.borderRight) 
                                        || (grayCubes[i].left <= this.borderRight && this.borderRight <= grayCubes[i].right))
                                        && ((this.borderTop < grayCubes[i].bottom && grayCubes[i].bottom <= this.borderBottom)
                                        || (grayCubes[i].top <= this.borderBottom && this.borderBottom <= grayCubes[i].bottom)))
                                    {
                                        grayCubes[i].element.src = "/kvadratik/images/grayCubeKilled.png";
                                        hasGet = true;
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
                                            this.deleteObject(this, element);                           
                                        }, 1500);
                                        clearInterval(grayCubes[i].updatePosition); 
                                                  
                                        await delay(55);
                                        this.element.src = "/kvadratik/images/exploison.png";
                                        image = "/kvadratik/images/exploison.png";
                                        this.element.style.width = 45 * k + "px";

                                        clearInterval(grayCubeBomb);                            
                                    }
                                }
                            }
                        }, 5);       
                    }
                    catch
                    {
                        // По каким-то причинам тут может быть ошибка ._.
                    }      
                }, 2500);
                break;

            case "/kvadratik/images/grayCube.png":
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
                        }                     
                    }, timeUpdateGrayCubePosition);

                    // Смена направления преследования
                    setInterval(() => {
                        directionGrayCube = directionGrayCube == "horizontally" ? "vertical" : "horizontally";
                    }, 2000);
                }, 1500);
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

            if (this.borderLeft != null)
            {
                if (((this.borderLeft <= kvadratikBorder.right && kvadratikBorder.right <= this.borderRight) 
                || (kvadratikBorder.left <= this.borderRight && this.borderRight <= kvadratikBorder.right))
                && ((this.borderTop < kvadratikBorder.bottom && kvadratikBorder.bottom <= this.borderBottom)
                || (kvadratikBorder.top <= this.borderBottom && this.borderBottom <= kvadratikBorder.bottom)))
                {
                    /* Функции при получении предмета*/
                    switch (image)
                    {
                        // Яблоки
                        case "/kvadratik/images/apple.png":
                            if (appleActive)
                            {   
                                this.deleteObject(this, element);
                                countApples--;                                     
                                score.innerHTML = Number(score.innerHTML) + pointsPerApple;
                                document.querySelector("#plus").innerHTML = `+${pointsPerApple}`;
                                
                                clearTimeout(waitForDelPlus);
                                waitForDelPlus = setTimeout(() => {
                                    document.querySelector("#plus").innerHTML = "";
                                }, 1000);                        

                                hasGet = true;
                                if (countApples == 0)
                                var newApple = new Objects("/kvadratik/images/apple.png", 38, 45);  
                            }                  
                            break;

                        // Бомбы, взрыв
                        case "/kvadratik/images/bomb.png":
                            hasGet = true;
                            if (bombIsActive)
                            {
                                this.element.src = "/kvadratik/images/exploison.png";
                                this.element.style.width = 45 * k + "px";
                                image = "/kvadratik/images/exploison.png";        
                                gameover();
                            }
                            break;

                        /* Усиления */
                        // 2x очки
                        case "/kvadratik/images/double.png":
                            if (doubleTimer != null)
                            {
                                clearInterval(doubleTimer);
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
                            this.deleteObject(this, element);
                            hasGet = true;
                            break;    

                        // Серый Куб (усиление)
                        case "/kvadratik/images/grayCubeObject.png":
                            this.deleteObject(this, element);  
                            const grayCube = new Objects("/kvadratik/images/grayCube.png", 50, 50);   
                            grayCubes.push(grayCube.grayCube);                                              
                            break;   
                            
                        // Виноград
                        case "/kvadratik/images/grape.png":
                            score.innerHTML = Number(score.innerHTML) + pointsPerApple * 10;
                            document.querySelector("#plus").innerHTML = `+${pointsPerApple * 10}`;
                            waitForDelPlus = setTimeout(() => {
                                document.querySelector("#plus").innerHTML = "";
                            }, 1000);
                            this.deleteObject(this, element);
                    }
                }
            }
        }, 5);

        /* Исчезновение предметов */
        // Для предупреждений
        switch (image)
        {
            case "/kvadratik/images/warning.png":
                slowlyDelBomb = setTimeout(async () => {
                    if (!hasGet)
                    {
                        bombIsActive = false;
                        for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                            await delay(5);
                        this.deleteObject(this, element);
                    }
                }, 7500); 
                break; 

            // Для Серого Куба
            case "/kvadratik/images/grayCube.png": 
                let waitForDieGrayCube = setInterval(() => {
                    if (!this.grayCube.isAlive)
                    {
                        slowlyDelGrayCube = setTimeout(async () => {
                            for (this.element.style.opacity = 1; this.element.style.opacity > 0; this.element.style.opacity -= 0.01)
                                await delay(5);
                            
                            this.deleteObject(this, element);
                        }, 1500);
                        grayCubes = del(grayCubes, this.grayCube.number);
                        clearInterval(waitForDieGrayCube);
                    }
               }, 20);   
               break;

            // Для остальных предметов
            default:
                slowlyDelOtherObjects = setTimeout(async () => {
                    if (!hasGet)
                    {
                        if (image == "/kvadratik/images/apple.png")
                        {
                            countApples--;
                            appleActive = false;
                            if (countApples == 0)
                                var newApple = new Objects("/kvadratik/images/apple.png", 38, 45);                 
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

                        this.deleteObject(this, element);    
                    }
                }, 5000);  
                break;
        }
    }

    // Удаление предметов
    async deleteObject(object, element)
    {
        object.width = null;
        object.height = null;
        object.element = null;
        object.borderRight = null;
        object.borderLeft = null;
        object.borderTop = null;
        object.borderBottom = null;
        object.grayCube = null;
        element.remove();
        await delay(55); 
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
    // Яблоки
    let apple = new Objects("/kvadratik/images/apple.png", 38, 45);
    spawnApples = setInterval(() => {
    apple = new Objects("/kvadratik/images/apple.png", 38, 45);
    }, 2500);

    // Бомбы
    spawnBombs = setInterval(() => {
    const bomb = new Objects("/kvadratik/images/warning.png", 36, 44);
    }, 3000);

    // Усиления
    spawnGains = setInterval(() => {
        const gainNumber = getRandom(1, 3);
        let gain;
        switch (gainNumber)
        {
            case 1:
                gain = new Objects("/kvadratik/images/double.png", 36, 38);
                break;
            case 2:
                gain = new Objects("/kvadratik/images/grayCubeObject.png", 30, 30);
                break;
            case 3:
                gain = new Objects("/kvadratik/images/grape.png", 35, 44);
                break;
        }
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
if (localStorage.getItem("countdownWithStarting") != "false")
{
    startCountdown();
}
else
{
    play();
}

// Конец игры
async function gameover()
{
    if (!isGameover)
    {
        isGameover = true;
        kvadratik.src = "/kvadratik/images/kvadratikKilled.png";
        for (let i = 0; i < grayCubes.length; i++)
            grayCubes[i].updatePosition = null;

        clearTimeout(waitForActivationBomb);
        clearTimeout(slowlyDelBomb);
        clearTimeout(waitForActivationGrayCube);
        clearInterval(kvadratikGiveObject);
        clearTimeout(slowlyDelOtherObjects);
        clearInterval(spawnApples);
        clearInterval(spawnBombs);
        clearInterval(spawnGains);
        clearInterval(moveKvadratik);
        clearInterval(doubleTimer);
        clearTimeout(slowlyDelGrayCube);
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
    kvadratik.src = "/kvadratik/images/kvadratik.png";
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
