function tableTitle(pageContent) {
    const titleRow = document.createElement("tr")
    titleRow.className = "title-row"
    pageContent.tableFields.forEach(tableField => {
        const header = document.createElement("th")
        header.innerHTML = tableField.header
        titleRow.appendChild(header)
    })
    return titleRow
}

function reservationRow(pageContent, data, label) {
    const row = document.createElement("tr")
    row.id = `${label}${data.id}`
    pageContent.tableFields.forEach(tableField => {
        const tableData = document.createElement("td")
        tableData.innerHTML = data[tableField.name]
        row.appendChild(tableData)
    })
    return row
}

function emptyRow(pageContent, n, max) {
    const emptyRow = document.createElement("tr")
    emptyRow.className = "empty-row"
    emptyRow.innerHTML = `
        <td colspan="${pageContent.tableFields.length}">
            ${pageContent.availableResLabel.replace("$", (max-n).toString())}
        </td>
    `
    return emptyRow
}

function cancelOnClick() {
    cancelReservation(
        document.querySelector(".selected-row").id.replace("reservation", "")
    )
}

function fillTable(table, reservations, pageContent, maxReservations) {
    table.innerHTML = ""
    const fragment = new DocumentFragment()
    fragment.appendChild(tableTitle(pageContent))
    reservations.forEach(reservation => {
        fragment.appendChild(reservationRow(pageContent, reservation, "reservation"))
        const clickedRow = fragment.lastElementChild
        clickedRow.addEventListener("click", e => {
            clickedRow.classList.toggle("selected-row")
            checkButton()
            table.querySelectorAll(`.selected-row:not(#${clickedRow.id})`).forEach(row => {
                row.classList.remove("selected-row")
            })
        })
    })
    if (maxReservations) {
        for (let i = reservations.length; i < maxReservations; i++) {
            fragment.appendChild(emptyRow(
                    pageContent,
                    reservations.length,
                    maxReservations
                )
            )
        }
    }
    document.addEventListener("click", e => {
        if (!e.target.closest(".data-table")) {
            table.querySelectorAll(".selected-row").forEach(row => {
                row.classList.remove("selected-row")
            })
            checkButton()
        }
    })
    table.appendChild(fragment)
}