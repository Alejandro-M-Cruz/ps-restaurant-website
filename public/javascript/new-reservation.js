function submit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name")
    const date = formData.get("date")
    const time = formData.get("time")
    const customers = formData.get("customers")
    fetch("/api/v1/reservations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, date, time, customers })
    }).then(res => res.json()).then(data => {
        if (data.error) return alert(data.error)
        window.location.href = "/html/reservations.html"
    })
}