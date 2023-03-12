const path = window.location.pathname
const filename = path.substring(path.lastIndexOf('/') + 1)
const MAX_RESERVATIONS = 5

function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    const cancelButton = document.querySelector(".cancel-button")
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    cancelButton.href = pageContent.cancelButtonHref
    const newResButton = document.querySelector(".confirm-button")
    newResButton.innerHTML = pageContent.newResButtonLabel
    newResButton.href = pageContent.newResButtonHref
    if (filename === "reservations.html") return loadReservations(pageContent)
    document.querySelector(".info").innerHTML = pageContent.info
}

function loadReservations(pageContent) {
    fetch("/demo-database/reservations.json").then(response => response.json()).then(data => {
        fillUserTable(document.querySelector(".data-table"), data, pageContent)
    })
}

function fillUserTable(table, reservations, pageContent) {
    const fragment = new DocumentFragment()
    tableTitleHTML(pageContent, fragment)
    reservations.forEach(reservation => reservationHTML(pageContent, reservation, fragment))
    for (let i = reservations.length; i < MAX_RESERVATIONS; i++) {
        emptyRowHTML(pageContent, reservations.length, fragment)
    }
    // Rows selection
    const rows = fragment.querySelectorAll("tr:not(.title-row):not(.empty-row)")
    rows.forEach(row => {
        row.onclick = () => {
            rows.forEach(r => {
                if (r !== row) r.classList.remove("selected-row")
            })
            row.classList.toggle("selected-row")
        }
    })
    table.appendChild(fragment)
}

function tableTitleHTML(pageContent, fragment) {
    const titleRow = document.createElement("tr")
    titleRow.className = "title-row"
    pageContent.tableFields.forEach(tableField => {
        const header = document.createElement("th")
        header.innerHTML = tableField.header
        titleRow.appendChild(header)
    })
    fragment.appendChild(titleRow)
}

function reservationHTML(pageContent, reservation, fragment) {
    const row = document.createElement("tr")
    row.id = `reservation${reservation.id}`
    pageContent.tableFields.forEach(tableField => {
        const data = document.createElement("td")
        data.innerHTML = reservation[tableField.name]
        row.appendChild(data)
    })
    fragment.appendChild(row)
}

function emptyRowHTML(pageContent, nReservations, fragment) {
    const emptyRow = document.createElement("tr")
    emptyRow.className = "empty-row"
    emptyRow.innerHTML = `
        <td colspan="${pageContent.tableFields.length}">
            ${pageContent.availableResLabel.replace("$", (MAX_RESERVATIONS-nReservations).toString())}
        </td>
    `
    fragment.appendChild(emptyRow)
}
