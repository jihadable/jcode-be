const express = require("express")
const cors = require("cors")
const path = require("path")
const userRouter = require("./routes/userRoute")
const problemRouter = require("./routes/problemRoute")
const testCaseRouter = require("./routes/testCaseRoute")
const { db } = require("./database/database")
const defaultCodeRouter = require("./routes/defaultCodeRoute")
const submissionRouter = require("./routes/submissionRoute")
const rateLimit = require('express-rate-limit')

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

// rate limit
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        ok: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    statusCode: 429
})

app.use("/api", apiLimiter)

// user route
app.use("/api/users", userRouter)

// problem route
app.use("/api/problems", problemRouter)

// test case route
app.use("/api/test_cases", testCaseRouter)

// default code route
app.use("/api/default_codes", defaultCodeRouter)

// submission route
app.use("/api/submissions", submissionRouter)

// route not found
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "views", "not-found.html"))
})

process.on('SIGINT', () => {
    db.end(() => {
        console.log('Database connection closed.')
        process.exit(0)
    })
})

app.listen(port, async() => {
	console.log("Server is running")
})