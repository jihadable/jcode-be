const { db } = require("../database/database")

const DefaultCode = {
    async findByProblem(problem_id){
        const query = "SELECT * FROM default_codes WHERE problem_id = ?"

        const [rows] = await db.query(query, [problem_id])

        return rows
    },

    response(defaulCode){
        return {
            language: defaulCode.language,
            default_code: defaulCode.default_code
        }
    }
}

module.exports = DefaultCode