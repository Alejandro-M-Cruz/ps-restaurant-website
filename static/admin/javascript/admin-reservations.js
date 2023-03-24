const RESERVATIONS_PER_TABLE = 5
let counter = 1
let reservations
let cancelButton

async function loadPage(pageContent) {
    document.querySelector("title").innerHTML = pageContent.title
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    cancelButton = document.querySelector(".cancel-button")
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    cancelButton.addEventListener("click", cancelOnClick)
    loadReservations(pageContent, reservations = await getReservations())
}

function counterString() {
    const total = Math.ceil(reservations.length/RESERVATIONS_PER_TABLE)
    return `${counter}/${total}`
}

function loadReservations(pageContent, reservations) {
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
    if (reservations.length === 0) return table.appendChild(adminEmptyRow(pageContent))
    fillTable(table, reservations.slice(0, RESERVATIONS_PER_TABLE),pageContent)
}

function checkButton() {
    cancelButton.disabled = !document.querySelector(".selected-row")
}

function nextPrevListeners(prev, next, table, pageContent, counterElement) {
    prev.addEventListener("click", () => {
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
