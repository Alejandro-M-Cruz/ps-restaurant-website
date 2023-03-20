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