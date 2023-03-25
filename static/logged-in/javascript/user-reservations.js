const MAX_RESERVATIONS = 5

let cancelButton
let newResButton
let userReservations

async function loadPage(pageContent) {
    document.querySelector("title").innerHTML = pageContent.title
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    cancelButton = document.querySelector(".cancel-button")
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    cancelButton.href = pageContent.cancelButtonHref
    cancelButton.addEventListener("click", cancelOnClick)
    newResButton = document.querySelector(".confirm-button")
    newResButton.innerHTML = pageContent.newResButtonLabel
    newResButton.addEventListener("click", () => window.location.href = pageContent.newResButtonHref)
    userReservations = await getUserReservations()
    checkButton()
    fillTable(
        document.querySelector(".data-table"),
        userReservations,
        pageContent,
        MAX_RESERVATIONS
    )
}

function checkButton() {
    cancelButton.disabled = !document.querySelector(".selected-row")
    newResButton.disabled = userReservations.length >= MAX_RESERVATIONS
}
