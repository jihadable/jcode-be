const { hash } = require("bcrypt")
const db = require("./database")

require("dotenv").config()

const seeder = async() => {
    await userSeeder()
}

const userSeeder = async() => {
    const query = "INSERT INTO users (name, email, password, bio) values (?, ?, ?, ?)"

    const hashedPassword = await hash(process.env.PRIVATE_PASSWORD, 10);

    db.query(query, [
        "Umar Jihad",
        "umarjihad@gmail.com",
        hashedPassword,
        "test"
    ])
}

module.exports = seeder