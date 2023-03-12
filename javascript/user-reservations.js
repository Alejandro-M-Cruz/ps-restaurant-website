import { tableTitleHTML, reservationHTML, emptyRowHTML } from "./reservations-table.js"

const path = window.location.pathname
const filename = path.substring(path.lastIndexOf('/') + 1)
const MAX_RESERVATIONS = 5

export default function loadContent(path) {
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
        fillTable(document.querySelector(".data-table"), data, pageContent)
    })
}

function fillTable(table, reservations, pageContent) {
    const fragment = new DocumentFragment()
    fragment.appendChild(tableTitleHTML(pageContent))
    reservations.forEach(reservation => {
        fragment.appendChild(reservationHTML(pageContent, reservation))
    })
    for (let i = reservations.length; i < MAX_RESERVATIONS; i++) {
        fragment.appendChild(emptyRowHTML(
            pageContent,
            reservations.length,
            MAX_RESERVATIONS)
        )
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
