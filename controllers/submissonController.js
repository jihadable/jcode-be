const Joi = require("joi")
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
    const storeSubmissionSchema = Joi.object({
        user_id: Joi.number().required(),
        problem_id: Joi.number().required(),
        language: Joi.string().required(),
        status: Joi.number().min(0).max(1).required(),
    })

    const { error } = storeSubmissionSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

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

const updateSubmission = async(req, res) => {
    const updateSubmissionSchema = Joi.object({
        user_id: Joi.number().required(),
        problem_id: Joi.number().required(),
        language: Joi.string().required(),
        status: Joi.number().min(0).max(1).required()
    })

    const { error } = updateSubmissionSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const submission = await Submission.update({ ...req.body })

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil memperbarui submission"),
            submission: Submission.response(submission)
        })
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}

module.exports = { getAllSubmissionByUser, storeSubmission, updateSubmission }