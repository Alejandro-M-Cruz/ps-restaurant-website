function submit(e) {
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
            return window.location.href = "/"
        }
        const message = alertMessage(data.error)
        let invalidInput
        switch(data.error) {
            case "FAILED_LOGIN":
                invalidInput = e.target.querySelector("#password")
                break
            default:
                return alert(message)
        }
        invalidInput.setCustomValidity(message)
        invalidInput.reportValidity()
    })
}
