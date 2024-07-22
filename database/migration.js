const createAllTables = require("./createAllTables")
const seeder = require("./seeder")

const migration = async() => {
    try {
        await createAllTables()
        await seeder()
        console.log("Migration completed successfully.")
        process.exit()
    } catch (err) {
        console.error("Migration failed.\n", err)
        process.exit(1)
    }
}

migration()