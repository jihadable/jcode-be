const express = require("express")
const cors = require("cors")
const path = require("path")
const userRouter = require("./routes/userRoute")
const problemRouter = require("./routes/problemRoute")
const testCaseRouter = require("./routes/testCaseRoute")
const { db } = require("./database/database")

require("dotenv").config()

const app = express()
const port = process.env.PORT

// middlewares
app.use(cors(), express.json(), express.static("views"))
app.use("/styles", express.static(path.join(__dirname, "styles")))
app.use("/images", express.static(path.join(__dirname, "images")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

// user route
app.use("/api/users", userRouter)

// problem route
app.use("/api/problems", problemRouter)

// test case route
app.use("/api/test_cases", testCaseRouter)

// route not found
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "views", "not-found.html"))
})

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...')

    db.end(() => {
        console.log('Database connection closed.')
        process.exit(0)
    })
})

app.listen(port, () => {
	console.log("Server is running")
})