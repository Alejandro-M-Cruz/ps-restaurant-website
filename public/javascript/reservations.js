const MAX_RESERVATIONS = 5

w3IncludeHTML(() => loadContent("/demo-database/reservations-page-content.json"))

function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".left-button").innerHTML = pageContent.leftButtonLabel
    const middleButton = document.querySelector(".middle-button")
    middleButton.innerHTML = pageContent.middleButtonLabel
    middleButton.href = pageContent.middleButtonHref
    const rightButton = document.querySelector(".right-button")
    rightButton.innerHTML = pageContent.rightButtonLabel
    rightButton.href = pageContent.rightButtonHref
    loadReservations(pageContent, middleButton)
    middleButton.disabled = !document.querySelector(".selected-row")
    return middleButton.addEventListener("click", cancelReservation)
}

async function loadReservations(pageContent, cancelResButton) {
    const user = window.sessionStorage.getItem("user")
    fetch(`/api/v1/reservations/user/${user.id}`).then(response => response.json()).then(data => {
        fillTable(document.querySelector(".data-table"), data.reservations, pageContent, cancelResButton)
    })
}

function fillTable(table, reservations, pageContent, cancelResButton) {
    table.innerHTML = ""
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
            cancelResButton.disabled = !row.classList.contains("selected-row")
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
