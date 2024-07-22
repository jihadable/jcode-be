const { db } = require("../database/database")

// test_case
// +id
// +problem_id
// +input
// +expected_output

const TestCase = {
    async findByProblem(problem_id){
        const query = "SELECT * FROM test_cases WHERE problem_id = ?"

        const [rows] = await db.query(query, [problem_id])

        return rows
    },

    response(testCase){
        return {
            problem_id: testCase.problem_id,
            input: testCase.input,
            expected_output: testCase.expected_output,
        }
    }
}

module.exports = TestCase