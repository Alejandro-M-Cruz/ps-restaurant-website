const MAX_RESERVATIONS = 5

let cancelButton

async function loadPage(pageContent) {
    document.querySelector("title").innerHTML = pageContent.title
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    cancelButton = document.querySelector(".cancel-button")
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    cancelButton.href = pageContent.cancelButtonHref
    cancelButton.addEventListener("click", cancelOnClick)
    checkButton()
    const newResButton = document.querySelector(".confirm-button")
    newResButton.innerHTML = pageContent.newResButtonLabel
    newResButton.href = pageContent.newResButtonHref
    const data = await getUserReservations()
    fillTable(
        document.querySelector(".data-table"),
        data ? data : [],
        pageContent,
        MAX_RESERVATIONS
    )
}

function checkButton() {
    cancelButton.disabled = !document.querySelector(".selected-row")
}
