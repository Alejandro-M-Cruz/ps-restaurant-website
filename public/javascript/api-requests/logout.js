import alertMessage from "/javascript/alert-messages.js"

const LOGOUT_URL = "/api/v1/users/logout"

export default function logout() {
    fetch(LOGOUT_URL, {
        method: "POST"
    }).then(res => res.json()).then(data => {
        if(data.error) return alert(alertMessage(data.error))
        window.localStorage.removeItem("user")
        window.location.href = "/"
    })
}