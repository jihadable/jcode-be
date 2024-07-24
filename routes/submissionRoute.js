const { Router } = require("express")
const { getAllSubmissionByUser, storeSubmission, updateSubmission } = require("../controllers/submissonController")
const verifyTokenMiddlware = require("../middlewares/verifyTokenMiddleware")

const submissionRouter = Router()

// get all submissons by user
submissionRouter.get("/", verifyTokenMiddlware, getAllSubmissionByUser)

// store submission
submissionRouter.post("/", verifyTokenMiddlware, storeSubmission)

// update submission
submissionRouter.patch("/", verifyTokenMiddlware, updateSubmission)

module.exports = submissionRouter