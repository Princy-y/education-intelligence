const {
    getStudentIntelligence
} = require("../services/studentIntelligenceService");


async function getIntelligence(req, res) {

    try {

        const { id } = req.params;

        const result =
            await getStudentIntelligence(id);

        res.json(result);

    } catch (error) {

        console.error(
            "Student intelligence error:",
            error
        );

        const status =
            error.statusCode || 500;

        res.status(status).json({
            error:
                status === 404
                    ? "Student not found"
                    : "Failed to generate student intelligence",

            message: error.message
        });
    }
}


module.exports = {
    getIntelligence
};