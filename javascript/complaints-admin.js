// JavaScript source code
function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    fetch("/demo-database/complaints.json").then(response => response.json()).then(data => {
        let grid = document.querySelector(".cards-grid")
        let cardsHTML = ""
        data.forEach(complaint => cardsHTML += cardHTML(complaint.creation_datetime, complaint.content))
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
