import dao from "../dao/complaintsDAO.js"
import { errorMessage, noError } from "../error-messages.js"

export default class ComplaintsController {
    static async apiGetAllComplaints(req, res) {
        try {
            const complaints = await dao.getAllComplaints()
            res.json(complaints)
        } catch(error) { res.status(500).json(errorMessage(error.message)) }
    }

    static async apiPostComplaint(req, res) {
        try {
            const complaint = { content: req.body.content }
            await dao.addComplaint(complaint)
            res.json(noError)
        } catch(error) { res.status(500).json(errorMessage(error.message)) }
    }
}