function postMenuSection(name) {
    fetch(MENU_SECTIONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    }).then(res => res.json()).then(data => {
        if (data.error) alert(alertMessage(data.error))
        else window.location.reload();
    })
}

function deleteMenuSection(id) {
    fetch(`${MENU_SECTIONS_URL}/${id}`, {
        method: "DELETE"
    }).then(res => res.json()).then(data => {
        if (data.error) alert(alertMessage(data.error))
        else window.location.reload();
    })
}

function updateMenuSection(id, menuSection) {
    fetch(`${MENU_SECTIONS_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(menuSection)
    }).then(res => res.json()).then(data => {
        if (data.error) alert(alertMessage(data.error))
    })
}
