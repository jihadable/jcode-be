const { Router } = require("express")
const { getAllSubmissionByUser, storeSubmission } = require("../controllers/submissonController")
const verifyTokenMiddlware = require("../middlewares/verifyTokenMiddleware")

const submissionRouter = Router()

// get all submissons by user
submissionRouter.get("/", verifyTokenMiddlware, getAllSubmissionByUser)

// store submission
submissionRouter.post("/", verifyTokenMiddlware, storeSubmission)

module.exports = submissionRouter