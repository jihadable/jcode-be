const express = require("express")
const cors = require("cors")
const path = require("path")
const db = require("./database/database")

require("dotenv").config()

const app = express()
const port = process.env.PORT

db.connect(error => {
	if (error){
		console.log(error)

		return
	}

	app.listen(port, () => {
		console.log("Server is running")
	})
})