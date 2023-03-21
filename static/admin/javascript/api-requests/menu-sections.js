const MENU_SECTIONS_URL = `${API_URL}/menu`

function postMenuSection(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name")
    fetch(MENU_SECTIONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    }).then(res => res.json()).then(data => {
        if (!data.error) {
            window.location.href = "/admin/html/menu-edit.html"
        }
        let invalidInput
        switch (data.error) {
            case "DUPLICATE_MENU_SECTION":
                invalidInput = e.target.querySelector('input[name="name"]')
                break
            default: 
                return alert(alertMessage(data.error))
        }
        invalidInput.setCustomValidity(alertMessage(data.error))
        invalidInput.reportValidity()
    })
}
