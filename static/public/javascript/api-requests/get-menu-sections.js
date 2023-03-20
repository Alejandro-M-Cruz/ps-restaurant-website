async function getMenuSections() {
    const response = await loadJson(MENU_SECTIONS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.sections
}