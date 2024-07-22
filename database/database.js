const mysql = require("mysql2")

require("dotenv").config()

const host = process.env.DB_HOST
const database = process.env.DB_NAME
const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const db = mysql.createPool({
    host, user, password, port, database,
    connectionLimit: 5
}).promise()

module.exports = { db }