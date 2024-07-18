const express = require("express")
const cors = require("cors")
const path = require("path")
const db = require("./database/database")
const userRouter = require("./routes/userRoute")

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

app.use("/api/users", userRouter)

// route not found
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "views", "not-found.html"))
})

db.connect(error => {
	if (error){
		console.log(error)

		return
	}

	app.listen(port, () => {
		console.log("Server is running")
	})
})