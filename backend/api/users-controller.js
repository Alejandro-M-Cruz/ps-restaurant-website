import dao from "../dao/usersDAO.js"
import errorMessages from "../error-messages.js"

let user
const login = loggedUser => user = loggedUser

export default class UsersController {
    static apiGetUser(req, res) {
        if (!user) return res.json({ error: errorMessages["not-logged-in"] })
        res.json({
            id: user.id,
            phone_number: user.phone_number,
            admin: user.admin,
            creation_date: user.creation_date,
            error: null
        })
    }

    static apiPostUser(req, res) {
        const newUser = {
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password
        }
        dao.addUser(newUser)
            .then(result => res.json({ error: null }))
            .catch(error => {
                if (error.code === "ER_DUP_ENTRY") return res.json({ error: errorMessages["duplicate-user"] })
                res.json({ error: errorMessages["db-error"] })
            })
    }

    static apiDeleteUser(req, res) {
        dao.deleteUser(req.params.id)
            .then(result => res.json({ error: null }))
            .catch(error => res.json({ error: errorMessages["db-error"] }))
    }

    static apiLogin(req, res) {
        dao.getUser(req.body.phone_number, req.body.password)
            .then(result => {
                if (result.length === 0) return res.json({ error: errorMessages["failed-login"] })
                login(result[0])
                res.json({ id: user.id, admin: user.admin === 1, error: null })
            }, error => {
                res.json({ error: errorMessages["db-error"] })
            })
    }

    static apiLogout(req, res) {
        if (!user) return res.json({ error: errorMessages["not-logged-in"] })
        user = null
        res.json({ error: null })
    }
}