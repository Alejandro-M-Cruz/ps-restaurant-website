const RESERVATIONS_URL = "/api/v1/users/reservations/"

function cancelReservation() {
    if (!confirm(alertMessage("CONFIRM_CANCEL_RESERVATION"))) return
    const reservationId = selectedRow.id.replace("reservation", "")
    fetch(RESERVATIONS_URL + reservationId, {
        method: "DELETE"
    }).then(res => res.json).then(data => {
        if (data.error) return alert(data.error)
        window.location.href = "../../html/reservations.html"
    })
}