import dao from "../dao/UsersDAO.js"

let user
const login = loggedUser => user = loggedUser

export default class UsersController {
    static apiGetUser(req, res) {
        if (!user) return res.json({ error: "NOT_LOGGED_IN" })
        res.json({
            id: user.id,
            phone_number: user.phone_number,
            admin: user.admin,
            creation_date: user.creation_date
        })
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
            await dao.deleteUser(req.params.id)
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
            login(result[0])
            res.json({ id: user.id, admin: user.admin === 1 })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static apiLogout(req, res) {
        if (!user) return res.json({ error: "NOT_LOGGED_IN" })
        user = null
        res.json({ error: null })
    }
}