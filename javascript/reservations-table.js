export function tableTitleHTML(pageContent) {
    const titleRow = document.createElement("tr")
    titleRow.className = "title-row"
    pageContent.tableFields.forEach(tableField => {
        const header = document.createElement("th")
        header.innerHTML = tableField.header
        titleRow.appendChild(header)
    })
    return titleRow
}

export function reservationHTML(pageContent, reservation) {
    const row = document.createElement("tr")
    row.id = `reservation${reservation.id}`
    pageContent.tableFields.forEach(tableField => {
        const data = document.createElement("td")
        data.innerHTML = reservation[tableField.name]
        row.appendChild(data)
    })
    return row
}

export function emptyRowHTML(pageContent, nReservations, maxReservations) {
    const emptyRow = document.createElement("tr")
    emptyRow.className = "empty-row"
    emptyRow.innerHTML = `
        <td colspan="${pageContent.tableFields.length}">
            ${pageContent.availableResLabel.replace("$", (maxReservations-nReservations).toString())}
        </td>
    `
    return emptyRow
}
