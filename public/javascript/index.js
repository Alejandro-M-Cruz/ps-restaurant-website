function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

loadContent("/demo-database/index-page-content.json")

function loadPage(pageContent) {
    document.querySelector(".slide-image-thing__center-text").innerHTML = pageContent.slideShowTitle
    document.querySelector(".slide-image-thing__center-text-p").innerHTML = pageContent.slideShowAddress
    document.querySelector("#main-content h2").innerHTML = pageContent.menuTitle
    document.querySelector(".reserva h2").innerHTML = pageContent.reservationLinkLabel
    document.querySelector(".complaints h2").innerHTML = pageContent.complaintsLinkLabel
    document.querySelector("#about-us-section h2").innerHTML = pageContent.aboutUsTitle
    document.querySelector(".about-us-description p").innerHTML = pageContent.aboutUsDescription
}