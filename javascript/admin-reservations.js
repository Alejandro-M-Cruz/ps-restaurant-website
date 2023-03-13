import { tableTitleHTML, reservationHTML } from "./reservations-table.js"

const RESERVATIONS_PER_TABLE = 5
let counter = 1
let reservations

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
    loadReservations(pageContent)
}

const counterString = () => {
    const total = Math.ceil(reservations.length/RESERVATIONS_PER_TABLE)
    return `${counter}/${total}`
}


function loadReservations(pageContent) {
    fetch("/demo-database/reservations.json").then(response => response.json()).then(data => {
        reservations = data
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

function fillTable(table, reservations, pageContent) {
    table.innerHTML = ""
    const fragment = new DocumentFragment()
    fragment.appendChild(tableTitleHTML(pageContent))
    reservations.forEach(reservation => {
        fragment.appendChild(reservationHTML(pageContent, reservation))
    })
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