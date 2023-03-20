const RESERVATIONS_PER_TABLE = 5
let counter = 1
let reservations

function loadPage(pageContent) {
    document.querySelector("title").innerHTML = pageContent.title
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    const cancelButton = document.querySelector(".cancel-button")
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    loadReservations(pageContent)
}

const counterString = () => {
    const total = Math.ceil(reservations.length/RESERVATIONS_PER_TABLE)
    return `${counter}/${total}`
}


function loadReservations(pageContent) {
    fetch("/api/v1/reservations").then(response => response.json()).then(data => {
        reservations = data.reservations
        const table = document.querySelector(".data-table")
        if (reservations.length > RESERVATIONS_PER_TABLE) {
            const reservationsSelector = document.querySelector(".reservations-selector")
            reservationsSelector.style.visibility = "visible"
            const counterElement = reservationsSelector.querySelector(".counter")
            counterElement.innerHTML = counterString()
            nextPrevListeners(
                reservationsSelector.querySelector(".prev-reservations"),
                reservationsSelector.querySelector(".next-reservations"),
                table,
                pageContent,
                counterElement
            )
        }
        fillTable(table, reservations.slice(0, RESERVATIONS_PER_TABLE),pageContent)
    })
}

function nextPrevListeners(prev, next, table, pageContent, counterElement) {
    prev.addEventListener("click", () => {
        console.log("PREV")
        fillTable(
            table,
            reservations.slice(
                (--counter - 1) * RESERVATIONS_PER_TABLE,
                counter * RESERVATIONS_PER_TABLE
            ),
            pageContent
        )
        counterElement.innerHTML = counterString()
        if (counter <= 1) prev.disabled = true
        next.disabled = false
    })
    next.addEventListener("click", () => {
        console.log("NEXT")
        fillTable(
            table,
            reservations.slice(
                counter++ * RESERVATIONS_PER_TABLE,
                Math.min(counter * RESERVATIONS_PER_TABLE, reservations.length)
            ),
            pageContent
        )
        counterElement.innerHTML = counterString()
        prev.disabled = false
        if (counter >= Math.ceil(reservations.length / RESERVATIONS_PER_TABLE))
            next.disabled = true
    })
}

function adminEmptyRow(pageContent) {
    const emptyRow = document.createElement("tr")
    emptyRow.className = "empty-row"
    emptyRow.innerHTML = `
        <td colspan="${pageContent.tableFields.length}">
            ${pageContent.emptyRowMessage}
        </td>
    `
    return emptyRow
}

function fillTable(table, reservations, pageContent) {
    table.innerHTML = ""
    const fragment = new DocumentFragment()
    fragment.appendChild(tableTitle(pageContent))
    if (reservations.length === 0) {
        fragment.appendChild(adminEmptyRow(pageContent))
        document.querySelector(".cancel-button").disabled = true
    }
    reservations.forEach(reservation => {
        fragment.appendChild(reservationRow(pageContent, reservation, "reservation"))
    })
    // Rows selection
    const rows = fragment.querySelectorAll("tr:not(.title-row)")
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