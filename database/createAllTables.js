const createProblemsTable = require("./tables/createProblemsTable")
const createSubmissionsTable = require("./tables/createSubmissionsTable")
const createTestCasesTable = require("./tables/createTestCasesTable")
const createUsersTable = require("./tables/createUsersTable")

const createAllTables = () => {
    createUsersTable()
    createProblemsTable()
    createTestCasesTable()
    createSubmissionsTable()
}

module.exports = createAllTables