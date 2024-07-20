const db = require("../database")

const createSubmissionsTable = () => {
    const dropQuery = "DROP TABLE IF EXISTS submissions"

    db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE submissions (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        user_id     INT NOT NULL,
        problem_id  INT NOT NULL,
        language    VARCHAR(255) NOT NULL,
        code        TEXT NOT NULL,
        status      VARCHAR(255) NOT NULL,
        date        DATE NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

    db.query(createQuery)
}

module.exports = createSubmissionsTable