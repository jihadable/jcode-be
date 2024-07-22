const { Router } = require("express")
const { getTestCasesByProblem } = require("../controllers/testCaseController")

const testCaseRouter = Router()

testCaseRouter.get("/:problem_id", getTestCasesByProblem)

module.exports = testCaseRouter