const MENU_ITEMS_URL = "/api/v1/menu/items"

function postMenuItem(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name")
    fetch(MENU_ITEMS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    }).then(res => res.json()).then(data => {
        if (data.error) return alert(alertMessage(data.error))
        window.location.href = "../../html/menu-edit.html"
    })
}

function deleteMenuItem() {

}