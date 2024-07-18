const createAllTables = require("./createAllTables")
const db = require("./database")
const seeder = require("./seeder")

const migration = async() => {
    createAllTables()

    await seeder()
}

migration()
    .then(() => {
        console.log("Migration completed successfully.")
        db.end()
    })
    .catch(err => {
        console.error("Migration failed.\n", err)
    })
