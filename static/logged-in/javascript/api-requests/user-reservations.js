const USER_RESERVATIONS_URL = `${API_URL}/reservations/user`

async function getUserReservations() {
    const response = await loadFromJson(USER_RESERVATIONS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.reservations
}