const { db } = require("../database/database")

const Submission = {
    async findByUser(user_id){
        const query = "SELECT * FROM submissions WHERE user_id = ?"

        const [rows] = await db.query(query, [user_id])

        return rows
    },

    async create(submission){
        const insertQuery = "INSERT INTO submissions (user_id, problem_id, language, status) VALUES (?, ?, ?, ?)"
        const [insertResult] = await db.query(insertQuery, [submission.user_id, submission.problem_id, submission.language, submission.status])

        const id = insertResult.insertId
        const selectQuery = "SELECT * FROM submissions WHERE id = ?"
        const [rows] = await db.query(selectQuery, [id])

        return rows[0]
    },

    response(submission){
        return {
            user_id: submission.user_id,
            problem_id: submission.problem_id,
            language: submission.language,
            status: submission.status,
        }
    }
}

module.exports = Submission