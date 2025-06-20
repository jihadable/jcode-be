const createDefaultCodesTable = require("./tables/createDefaultCodesTable")
const createProblemsTable = require("./tables/createProblemsTable")
const createSubmissionsTable = require("./tables/createSubmissionsTable")
const createTestCasesTable = require("./tables/createTestCasesTable")
const createUsersTable = require("./tables/createUsersTable")

const createAllTables = async() => {
    await Promise.all([
        createUsersTable(),
        createProblemsTable(),
        createTestCasesTable(),
        createSubmissionsTable(),
        createDefaultCodesTable()
    ])
}

module.exports = createAllTables