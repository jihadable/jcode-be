const { db } = require("../database/database")

// problem
// +id
// +slug
// +title
// +description
// +difficulty

const Problem = {
    async findAll(){
        const query = "SELECT * FROM problems"
        const [rows] = await db.query(query)

        return rows
    },

    response(problem){
        return {
            id: problem.id,
            slug: problem.slug,
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
            function_name: problem.function_name  
        }
    }
}

module.exports = Problem