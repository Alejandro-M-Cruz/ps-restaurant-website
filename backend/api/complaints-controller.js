import dao from "../dao/complaintsDAO.js"

export default class ComplaintsController {
    static async apiGetAllComplaints(req, res) {
        try {
            const complaints = await dao.getAllComplaints()
            res.json({ complaints })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiPostComplaint(req, res) {
        try {
            const complaint = { content: req.body.content }
            await dao.addComplaint(complaint)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }
}