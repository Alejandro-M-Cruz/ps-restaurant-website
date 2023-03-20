async function getUserReservations() {
    const response = await loadJson(USER_RESERVATIONS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.reservations
}