const TestCase = require("../models/testCaseModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

const getTestCasesByProblem = async(req, res) => {
    try {
        const { problem_id } = req.params

        const testCases = await TestCase.findByProblem(problem_id)

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan semua test case berdasarkan problem"),
            test_cases: testCases.map(testCase => TestCase.response(testCase))
        })
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}

module.exports = { getTestCasesByProblem }