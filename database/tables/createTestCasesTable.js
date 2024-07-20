const db = require("../database")

const createTestCasesTable = () => {
    const dropQuery = "DROP TABLE IF EXISTS test_cases"

    db.query(dropQuery)

    const createQuery = 
    `CREATE TABLE test_cases (
        id                  INT AUTO_INCREMENT PRIMARY KEY,
        problem_id          INT NOT NULL,
        input               VARCHAR(255) NOT NULL,
        expected_output     VARCHAR(255) NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

    db.query(createQuery)
}

module.exports = createTestCasesTable