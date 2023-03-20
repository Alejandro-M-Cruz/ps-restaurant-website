async function getMenuItemsBySectionId(sectionId) {
    const response = await loadJson(`${MENU_SECTIONS_URL}/${sectionId}`)
    if (response.error) return alert(alertMessage(response.error))
    return response.menuItems
}

function postMenuItem(item) {
    console.log(item)
    fetch(MENU_ITEMS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(data => {
        console.log(data.error)
        if (data.error) return alert(alertMessage(data.error))
    })
}

function updateMenuItem(id, item) {
    console.log(item)
    fetch(`${MENU_ITEMS_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(data => {
        console.log(data.error)
        if (data.error) return alert(alertMessage(data.error))
    })
}

function deleteMenuItem(id) {
    fetch(`${MENU_ITEMS_URL}/${id}`, {
        method: "DELETE"
    }).then(res => res.json()).then(data => {
        console.log(data.error)
        if (data.error) return alert(alertMessage(data.error))
    })
}
