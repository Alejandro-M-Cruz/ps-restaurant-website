const MAX_RESERVATIONS = 5
let selectedReservation

async function loadPage(pageContent) {
    document.querySelector("title").innerHTML = pageContent.title
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    const cancelButton = document.querySelector(".cancel-button")
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    cancelButton.href = pageContent.cancelButtonHref
    const newResButton = document.querySelector(".confirm-button")
    newResButton.innerHTML = pageContent.newResButtonLabel
    newResButton.href = pageContent.newResButtonHref
    const data = await getUserReservations()
    fillTable(document.querySelector(".data-table"), data ? data : [], pageContent)
}

function fillTable(table, reservations, pageContent) {
    const fragment = new DocumentFragment()
    fragment.appendChild(tableTitle(pageContent))
    reservations.forEach(reservation => {
        fragment.appendChild(reservationRow(pageContent, reservation, "reservation"))
        const clickedRow = fragment.lastElementChild
        clickedRow.addEventListener("click", e => {
            clickedRow.classList.toggle("selected-row")
            document.querySelectorAll(`.selected-row:not(#${clickedRow.id})`)
                .forEach(row => {
                    row.classList.remove("selected-row")
                })
        })
    })
    for (let i = reservations.length; i < MAX_RESERVATIONS; i++) {
        fragment.appendChild(emptyRow(
            pageContent,
            reservations.length,
            MAX_RESERVATIONS)
        )
    }
    table.appendChild(fragment)
}
