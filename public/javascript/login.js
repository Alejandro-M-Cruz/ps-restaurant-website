import {errorMessage} from "./error-messages.js"

const LOGIN_URL = "/api/v1/users/login"

export default function submit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const phone_number = formData.get("phone_number")
    const password = formData.get("password")
    fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone_number, password })
    }).then(res => res.json()).then(data => {
        if (!data.error) {
            window.sessionStorage.setItem("user", JSON.stringify(data))
            window.location.href = "/"
        }
        const message = errorMessage(data.error)
        let invalidInput
        switch(data.error) {
            case "FAILED_LOGIN":
                invalidInput = e.target.querySelector("#password")
                break
            default:
                alert(message)
        }
        invalidInput.setCustomValidity(message)
        invalidInput.reportValidity()
        setTimeout(() => invalidInput.setCustomValidity(""), 3000)
    })
}
