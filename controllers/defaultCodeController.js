const DefaultCode = require("../models/defaultCodeModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

const getDefaultCodeByProblem = async(req, res) => {
    try {
        const { problem_id } = req.params

        const defaultCodes = await DefaultCode.findByProblem(problem_id)

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan default code berdasarkan problem"),
            defaultCodes: defaultCodes.map(defaultCode => DefaultCode.response(defaultCode))
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getDefaultCodeByProblem }