const db = require("../database")

const createProblemsTable = () => {
    const dropQuery = "DROP TABLE IF EXISTS problems"

    db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE problems (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        title           VARCHAR(255) NOT NULL,
        description     TEXT NOT NULL,
        difficulty      VARCHAR(255) NOT NULL
    )`

    db.query(createQuery)
}

module.exports = createProblemsTable