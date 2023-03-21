function postMenuSection(name) {
    fetch(MENU_SECTIONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    }).then(res => res.json()).then(data => {
        if (!data.error) return window.location.href = "/admin/html/menu-edit.html"
        alert(alertMessage(data.error))
    })
}
