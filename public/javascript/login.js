function submit(e) {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(e.target)
    const phone_number = formData.get("phone_number")
    const password = formData.get("password")
    fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone_number, password })
    }).then(res => res.json()).then(data => {
        if (data.error) return alert(data.error)
        window.location.href = "/"
    })
}
