function cancelReservation() {
    if (!confirm("¿Está seguro de que desea cancelar la reserva?")) return
    const reservationId = selectedRow.id.replace("reservation", "")
    fetch(`/api/v1/reservations/${reservationId}`, {
        method: "DELETE"
    }).then(res => res.json).then(data => {
        if (response.error) return alert(response.error)
        window.location.href = "/html/reservations.html"
    })
}