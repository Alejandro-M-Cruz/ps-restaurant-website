const path = window.location.pathname
const filename = path.substring(path.lastIndexOf('/') + 1)

w3IncludeHTML(() => {
    switch (filename) {
        case "login.html":
            loadContent("/demo-database/login-page-content.json")
            break
        case "signup.html":
            loadContent("/demo-database/signup-page-content.json")
            break
        default:
            loadContent("/demo-database/new-reservation-page-content.json")
    }
})

function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    const formLabels = document.querySelector(".labels-container")
    const formInputs = document.querySelector(".inputs-container")
    document.querySelector(".cancel-button").innerHTML = pageContent.cancelButtonLabel
    document.querySelector(".submit-button").innerHTML = pageContent.confirmButtonLabel

    formLabels.innerHTML = ""
    formInputs.innerHTML = ""
    pageContent.formFields.forEach(field => {
        formLabels.innerHTML += `<label for="${field.id}">${field.label}</label>`
        formInputs.innerHTML += `<input id="${field.id}" type="${field.type}" name="${field.name}" ${field.constraints}>`
    })
    if (filename !== "new-reservation.html") {
        document.querySelector(".already-div").innerHTML = `
            <p class="already-paragraph">${pageContent.already}</p>
            <a href="${pageContent.linkHref}" class="go-to-login-signup"><b>${pageContent.alreadyLink}</b></a>
        `
    }
}
