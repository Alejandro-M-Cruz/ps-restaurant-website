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
        case "new-reservation.html":
            loadContent("/demo-database/new-reservation-page-content.json")
            break
        default:
            loadContent("/demo-database/complaints-page-content.json")
    }
    document.querySelector(".user-form").addEventListener("submit", e => submit(e))
})

function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".cancel-button").innerHTML = pageContent.cancelButtonLabel
    document.querySelector(".submit-button").innerHTML = pageContent.confirmButtonLabel
    let labelsHTML = ""
    let inputsFragment = new DocumentFragment()
    pageContent.formFields.forEach(field => {
        if (field.label) labelsHTML += `<label for="${field.id}">${field.label}</label>`
        const input = document.createElement(field.tag ? field.tag : "input")
        for (const attribute in field) {
            if (attribute !== "tag" && attribute !== "label") input[attribute] = field[attribute]
        }
        inputsFragment.appendChild(input)
    })
    const formInputs = document.querySelector(".inputs-container")
    if (labelsHTML !== "") {
        document.querySelector(".labels-container").innerHTML = labelsHTML
    } else {
        formInputs.style.width = "100%"
    }
    formInputs.appendChild(inputsFragment)
    if (filename !== "new-reservation.html" && filename !== "complaints.html") {
        document.querySelector(".already-div").innerHTML = `
            <p class="already-paragraph">${pageContent.already}</p>
            <a href="${pageContent.linkHref}" class="go-to-login-signup"><b>${pageContent.alreadyLink}</b></a>
        `
    }
}
