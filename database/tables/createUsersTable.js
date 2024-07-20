const db = require("../database")

const createUsersTable = () => {
    const dropQuery = "DROP TABLE IF EXISTS users"

    db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE users (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(255) NOT NULL,
        email       VARCHAR(255) NOT NULL UNIQUE,
        password    VARCHAR(255) NOT NULL,
        bio         TEXT,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

    db.query(createQuery)
}

module.exports = createUsersTable