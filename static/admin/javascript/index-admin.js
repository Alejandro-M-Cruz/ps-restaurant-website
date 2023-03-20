function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    document.querySelector(".reservations-admin-link h2").innerHTML = pageContent.reservationsLinkLabel
    document.querySelector(".complaints-admin-link h2").innerHTML = pageContent.complaintsLinkLabel
    document.querySelector(".menu-edit-section h2").innerHTML = pageContent.menuEditLinkLabel
}