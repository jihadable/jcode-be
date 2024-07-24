const { db } = require("../database")

const createSubmissionsTable = async() => {
    const dropQuery = "DROP TABLE IF EXISTS submissions"

    await db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE submissions (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        user_id     INT NOT NULL,
        problem_id  INT NOT NULL,
        language    VARCHAR(255) NOT NULL,
        status      TINYINT(1) NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

    await db.query(createQuery)
}

module.exports = createSubmissionsTable