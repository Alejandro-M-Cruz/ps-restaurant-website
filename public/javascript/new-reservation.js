const API = "/api/v1"
function newReservation() {
    const inputs = document.querySelectorAll(".user-form input, .user-form select")
    fetch(`${API}/user`).then(res => res.json()).then(data => {
        const post = { user_id: data.user_id }
        inputs.forEach(input => post[input.name] = input.value)
        fetch(`${API}/reservation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }).then(res => res.json()).then(data => {
            if (data.error) return alert(data.error)
            window.location.href = "/html/reservations.html"
        })
    })
}