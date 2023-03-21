async function getMenuItems() {
    const response = await loadJson(MENU_ITEMS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.menuItems
}