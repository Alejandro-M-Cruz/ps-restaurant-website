const API = "/api/v1"
function login() {
    const phone_number = document.querySelector("#phone-number").value
    const password = document.querySelector("#password").value
    fetch(`${API}/user-login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phone_number,
            password
        })
    }).then(res => res.json()).then(data => {
        if (data.error) return alert(data.error)
        window.location.href = "/"
    })
}