function setButtonsEventListeners(cancelResButton, newResButton, pageContent) {
    cancelResButton.addEventListener("click", () => {
        if (!confirm("¿Está seguro de que desea cancelar la reserva?")) return
        const selectedRow = document.querySelector(".selected-row")
        if (selectedRow) {
            const reservationId = selectedRow.id.replace("reservation", "")
            fetch(`/api/v1/reservations/${reservationId}`, {
                method: "DELETE"
            }).then(response => {
                if (response.error) return alert(response.error)
                loadReservations(pageContent)
            })
        } else alert("Seleccione una reserva para cancelarla")
    })
    newResButton.addEventListener("click", () => window.location.href = "/new-reservation.html")
}