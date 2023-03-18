const COMPLAINTS_URL = "/api/v1/complaints/"

function loadPage(pageContent) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    fetch(COMPLAINTS_URL).then(response => response.json()).then(data => {
        let grid = document.querySelector(".cards-grid")
        let cardsHTML = ""
        data.complaints.forEach(complaint => {
            cardsHTML += cardHTML(complaint.creation_datetime, complaint.content)
        })
        grid.innerHTML = cardsHTML
    })
}

function cardHTML(creation_datetime, content) {
    return `
        <div class="card-div">
            <p class="card-title">${creation_datetime}</p>
            <p class="card-content">${content}</p>
        </div>
    `
}
