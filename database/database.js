const mysql = require("mysql2")

require("dotenv").config()

const host = process.env.DB_HOST
const database = process.env.DB_NAME
const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const db = mysql.createConnection({
    host, user, password, database, port
})

module.exports = db