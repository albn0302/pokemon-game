const express = require("express");
const pg = require("pg");
require("dotenv").config();
const cors = require("cors");

const db = new pg.Client({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST,
});
db.connect().then(res => console.log("Connected ✅!"));

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/api/pokemon", async (req, res) => {
    const data = await db.query("SELECT * FROM products");
    res.json(data.rows);
});

server.post("/api/pokemon", async (req, res) => {
    console.log(req.body);
    try {
        await db.query("INSERT INTO pokemon(name) VALUES($1)", [req.body.name]);
    } catch (error) {
        console.log(error);
    }
    res.json({ msg: "saved" });
});

server.listen(3000);