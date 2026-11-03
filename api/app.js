const express = require("express");
const cors = require("cors");
const db = require("./dbScript.js");

const app = express();
const corsOptions = {
    origin: "*",
    methods: "GET, POST, PATCH, DELETE, OPTIONS",
    allowedHeaders: "Content-Type"
}
app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log("Сервер начал работу"));

let tableName;
app.get("/api/getTable/:game", async (req, res) =>
{
    const table = await db.execute(`SELECT name, score FROM ${getTableName(req.params.game)};`);
        res.status(200).json(table.rows);
});

function getTableName(game)
{
    return "records" + game[0].toUpperCase() + game.slice(1);
}

async function getRecord(req, res, data)
{
    try
    {
        tableName = getTableName(req.params.game);
        let probablyRecords = await db.execute({sql: `SELECT * FROM ${tableName} WHERE password = ?;`,
            args: [data.password.toLowerCase()]});

        for (let i = 0; i < probablyRecords.rows.length; i++)
        {
            if (data.name.toLowerCase() == probablyRecords.rows[i].name.toLowerCase())
                return probablyRecords.rows[i];
        }

        res.status(401).send("Неверное имя или пароль");
        return false;
    }
    catch
    {
        res.status(500).send("Непредвиденная ошибка");
        return;
    }
}

app.post("/api/createRecord/:game", async (req, res) => 
{
    const data = req.body;
    try
    {
        await db.execute({sql: `INSERT INTO ${getTableName(req.params.game)}(name, password, score)
            VALUES(?, ?, ?);`,
            args: [data.name, data.password.toLowerCase(), data.score]});
       
        res.status(201).send("Рекорд добавлен");
    }
    catch (exception)
    {
        if (exception.message.includes("UNIQUE"))
            res.status(409).send("Такое имя уже существует");
        else
            res.status(500).send("Непредвиденная ошибка");
    }
});

app.patch("/api/editRecord/:game", async (req, res) =>
{
    const data = req.body;
    const record = await getRecord(req, res, data);
    if (record)
    {       
        await db.execute({sql: `UPDATE ${tableName} SET score = ?
            WHERE name = ?;`,
            args: [data.newScore, record.name]});              
        res.status(200).send("Рекорд перезаписан");
    }
});

app.patch("/api/editData/:game", async (req, res) =>
{
    const data = req.body;
    const record = await getRecord(req, res, data);
    if (record)
    {
        await db.execute({sql: `UPDATE ${tableName} SET name = ?, password = ?
            WHERE name = ?;`,
            args: [data.newName, data.newPassword, record.name]});
        res.status(200).send("Данные обновлены");       
    }
});

app.delete("/api/deleteRecord/:game", async (req, res) =>
{
    const data = req.body;
    const record = await getRecord(req, res, data);
    if (record)
    {      
        await db.execute({sql: `DELETE FROM ${tableName} WHERE name = ?;`,
            args: [record.name]});                   
        res.status(200).send("Рекорд удалён");
    }
});

module.exports = app;
