import dao from "../database/ComplaintsDAO.js"
import { datetimeFormat } from "./date-formatting.js";

export default class ComplaintsController {
    static async apiGetAllComplaints(req, res) {
        try {
            const complaints = await dao.getAllComplaints()
            complaints.map(complaint => {
                complaint.creation_datetime = datetimeFormat(complaint.creation_datetime)
            })
            res.json({ complaints })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiPostComplaint(req, res) {
        try {
            const complaint = { content: req.body.content }
            await dao.addComplaint(complaint)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }
}