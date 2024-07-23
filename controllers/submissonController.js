const Submission = require("../models/submissionModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

const getAllSubmissionByUser = async(req, res) => {
    try {
        const { user_id } = req.body

        const submissions = await Submission.findByUser(user_id)

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan semua data submission berdasarkan user"),
            submissions: submissions.map(submission => Submission.response(submission))
        })
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}

const storeSubmission = async(req, res) => {
    try {
        const submission = await Submission.create({ ...req.body })

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil membuat submission baru"),
            submission: Submission.response(submission)
        })
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}

module.exports = { getAllSubmissionByUser, storeSubmission }