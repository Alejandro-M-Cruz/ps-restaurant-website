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

function deleteMenuSection(id) {
    fetch(`${MENU_SECTIONS_URL}/${id}`, {
        method: "DELETE"
    }).then(res => res.json()).then(data => {
        console.log(data.error)
        if (!data.error) return window.location.href = "/admin/html/menu-edit.html"
        alert(alertMessage(data.error))
    })
}
