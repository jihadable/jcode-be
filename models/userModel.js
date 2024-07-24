const { db } = require("../database/database")

// user
// +id
// +name
// +email
// +password
// +bio

const User = {
    async findById(id){
        const query = "SELECT username, email, bio FROM users WHERE id = ?"

        const [rows] = await db.query(query, [id])

        return rows[0]
    },

    async findByEmail(email){
        const query = "SELECT * FROM users WHERE email = ?"

        const [rows] = await db.query(query, [email])

        return rows[0]
    },

    async create(user){
        const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        const [insertResult] = await db.query(insertQuery, [user.username, user.email, user.password])

        const id = insertResult.insertId
        const selectQuery = "SELECT id, username, email, bio FROM users WHERE id = ?"
        const [rows] = await db.query(selectQuery, [id])

        return rows[0]
    },

    async update(id, bio){
        const updateQuery = "UPDATE users SET bio = ? WHERE id = ?"
        await db.query(updateQuery, [bio, id])

        const selectQuery = "SELECT username, email, bio FROM users WHERE id = ?"
        const [rows] = await db.query(selectQuery, [id])

        return rows[0]
    },

    response(user){
        return {
            username: user.username,
            email: user.email,
            bio: user.bio
        }
    }
}

module.exports = User