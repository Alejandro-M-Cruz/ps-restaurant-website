const MENU_ITEMS_URL = `${API_URL}/menu/items`

async function getMenuItems() {
    const response = await loadFromJson(MENU_ITEMS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.menuItems
}