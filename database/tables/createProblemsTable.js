const { db } = require("../database")

const createProblemsTable = async() => {
    const dropQuery = "DROP TABLE IF EXISTS problems"

    await db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE problems (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        slug            VARCHAR(255) NOT NULL UNIQUE,
        title           VARCHAR(255) NOT NULL,
        description     TEXT NOT NULL,
        difficulty      VARCHAR(255) NOT NULL,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

    await db.query(createQuery)
}

module.exports = createProblemsTable