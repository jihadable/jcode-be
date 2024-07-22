const express = require("express")
const cors = require("cors")
const path = require("path")
const userRouter = require("./routes/userRoute")
const problemRouter = require("./routes/problemRoute")

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

// route not found
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "views", "not-found.html"))
})

app.listen(port, () => {
	console.log("Server is running")
})