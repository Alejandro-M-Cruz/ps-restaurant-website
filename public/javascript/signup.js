function submit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const phone_number = formData.get("phone_number")
    const password = formData.get("password")
    const password_confirmation = formData.get("password_confirmation")
    fetch("/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone_number, password, password_confirmation })
    }).then(res => res.json()).then(data => {
        if (data.error) return alert(data.error)
        window.location.href = "/"
    })
}