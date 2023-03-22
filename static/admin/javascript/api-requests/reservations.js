async function getReservations() {
    const response = await loadJson(RESERVATIONS_URL)
    if (response.error) alert(alertMessage(response.error))
    return response.reservations
}

function cancelReservation(reservationId) {
    if (!confirm(alertMessage("CONFIRM_CANCEL_RESERVATION"))) return
    fetch(`${RESERVATIONS_URL}/${reservationId}`, {
        method: "DELETE"
    }).then(res => res.json).then(data => {
        if (data.error) return alert(data.error)
        window.location.href = "/admin/html/reservations-admin.html"
    })
}