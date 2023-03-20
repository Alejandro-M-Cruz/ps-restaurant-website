function loadPage(pageContent) {
    document.querySelector(".slide-image-thing__center-text").innerHTML = pageContent.slideShowTitle
    document.querySelector(".slide-image-thing__center-text-p").innerHTML = pageContent.slideShowAddress
    document.querySelector("#menu-section h2").innerHTML = pageContent.menuTitle
    document.querySelector(".reserva b").innerHTML = pageContent.reservationLinkLabel
    document.querySelector(".complaints b").innerHTML = pageContent.complaintsLinkLabel
    document.querySelector("#about-us-section h2").innerHTML = pageContent.aboutUsTitle
    document.querySelector(".about-us-description p").innerHTML = pageContent.aboutUsDescription
}