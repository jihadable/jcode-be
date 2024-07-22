const createAllTables = require("./createAllTables")
const { db } = require("./database")
const seeder = require("./seeder")

const migration = async() => {
    try {
        await createAllTables()
        await seeder()
        console.log("Migration completed successfully.")
    } catch (err) {
        console.error("Migration failed.\n", err)
    } finally{
        db.end()
    }
}

migration()