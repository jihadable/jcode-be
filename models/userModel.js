const { db } = require("../database/database")

// user
// +id
// +username
// +email
// +password
// +birth
// +gender
// +bio

const User = {
    async findById(id){
        const query = "SELECT * FROM users WHERE id = ?"

        const [rows] = await db.query(query, [id])

        return rows[0]
    },

    async findByEmail(email){
        const query = "SELECT * FROM users WHERE email = ?"

        const [rows] = await db.query(query, [email])

        return rows[0]
    },

    async create(user){
        const insertQuery = "INSERT INTO users (username, email, password, birth, gender) VALUES (?, ?, ?, ?, ?)"
        const [insertResult] = await db.query(insertQuery, [user.username, user.email, user.password, user.birth, user.gender])

        const id = insertResult.insertId
        const selectQuery = "SELECT * FROM users WHERE id = ?"
        const [rows] = await db.query(selectQuery, [id])

        return rows[0]
    },

    async update(id, data){
        const updateQuery = "UPDATE users SET username = ?, birth = ?, gender = ?, bio = ? WHERE id = ?"
        await db.query(updateQuery, [data.username, data.birth, data.gender, data.bio, id])

        const selectQuery = "SELECT * FROM users WHERE id = ?"
        const [rows] = await db.query(selectQuery, [id])

        return rows[0]
    },

    response(user){
        return {
            username: user.username,
            email: user.email,
            birth: user.birth,
            gender: user.gender,
            bio: user.bio
        }
    }
}

module.exports = User