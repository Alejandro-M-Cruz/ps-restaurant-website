import dao from "../database/UsersDAO.js"
import { dateFormat, timeFormat } from "./date-formatting.js";

export default class UsersController {
    static apiGetUser(req, res) {
        try {
            res.json({
                id: req.session.user.id,
                phone_number: req.session.user.phone_number,
                admin: req.session.user.admin,
                creation_date: dateFormat(req.session.user.creation_date)
            })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiPostUser(req, res) {
        try {
            const user = {
                phone_number: req.body.phone_number,
                email: req.body.email,
                password: req.body.password
            }
            await dao.addUser(user)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            if (error.code === "ER_DUP_ENTRY") return res.json({ error: "DUPLICATE_USER" })
            res.json({ error: error.message }) 
        }
    }

    static async apiDeleteUser(req, res) {
        try {
            await dao.deleteUser(req.session.user.id)
            req.session.user = null
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiLogin(req, res) {
        try {
            const result = await dao.getUser(req.body.phone_number, req.body.password)
            if (result.length === 0) return res.json({ error: "FAILED_LOGIN" })
            result[0].admin = result[0].admin === 1
            req.session.user = result[0]
            res.json({ id: result[0].id, admin: result[0].admin })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static apiLogout(req, res) {
        try {
            req.session.user = null
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }
}