const SIGNUP_URL = `${API_URL}/users`

function submit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const phone_number = formData.get("phone_number")
    const password = formData.get("password")
    const password_confirmation = formData.get("password_confirmation")
    if (password !== password_confirmation)
        return e.target.querySelector("#password_confirmation").setCustomValidity(alertMessage("PASSWORDS_DONT_MATCH"))
    fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone_number, password })
    }).then(res => res.json()).then(data => {
        if (!data.error) {
            window.localStorage.setItem("user", JSON.stringify(data))
            return window.location.href = "/"
        }
        const message = alertMessage(data.error)
        let invalidInput
        switch(data.error) {
            case "DUPLICATE_USER":
                invalidInput = e.target.querySelector("#phone-number")
                break
            default:
                return alert(message)
        }
        invalidInput.setCustomValidity(message)
        invalidInput.reportValidity()
    })
}