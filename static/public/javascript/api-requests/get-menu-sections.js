const MENU_SECTIONS_URL = `${API_URL}/menu`

async function getMenuSections() {
    const response = await loadFromJson(MENU_SECTIONS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.sections
}