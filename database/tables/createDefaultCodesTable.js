const { db } = require("../database")

const createDefaultCodesTable = async() => {
    const dropQuery = "DROP TABLE IF EXISTS default_codes"

    await db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE default_codes (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        problem_id      INT NOT NULL,
        language        VARCHAR(255) NOT NULL,
        default_code    TEXT NOT NULL,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

    await db.query(createQuery)
}

module.exports = createDefaultCodesTable