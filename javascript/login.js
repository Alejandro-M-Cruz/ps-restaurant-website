const form = document.querySelector(".user-form")

form.addEventListener("submit", e => {
    e.preventDefault()
    const formData = new FormData(form)
    const phone_number = formData.get("phone_number")
    const password = formData.get("password")
    fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone_number, password })
    })
    .then(res => res.json())
    .then(res => {
        if (res.error) return alert(res.error)
        window.location.href = "/index.html"
    })
})