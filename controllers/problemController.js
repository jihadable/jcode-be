const Problem = require("../models/problemModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

const getAllProblems = async(req, res) => {
    try {
        const problems = await Problem.findAll()

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan semua data problem"),
            problems: problems.map(problem => Problem.response(problem))
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getAllProblems }