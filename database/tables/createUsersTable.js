const { db } = require("../database")

const createUsersTable = async() => {
    const dropQuery = "DROP TABLE IF EXISTS users"

    await db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE users (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        username    VARCHAR(255) NOT NULL,
        email       VARCHAR(255) NOT NULL UNIQUE,
        password    VARCHAR(255) NOT NULL,
        birth       DATE NOT NULL,
        gender      TINYINT(1) NOT NULL,
        bio         TEXT,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

    await db.query(createQuery)
}

module.exports = createUsersTable