const path = window.location.pathname
const filename = path.substring(path.lastIndexOf('/') + 1)

function loadPage(pageContent) {
    document.querySelector("title").innerHTML = pageContent.tabTitle ? pageContent.tabTitle : pageContent.title
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.cancelButtonLabel
    document.querySelector(".confirm-button").innerHTML = pageContent.confirmButtonLabel
    // let labelsHTML = ""
    // let inputsFragment = new DocumentFragment()
    // pageContent.formFields.forEach(field => {
    //     labelsHTML += `<label for="${field.id}">${field.label}</label>`
    //     const input = document.createElement(field.tag ? field.tag : "input")
    //     for (const attribute in field) {
    //         if (attribute !== "tag" && attribute !== "label") input[attribute] = field[attribute]
    //     }
    //     inputsFragment.appendChild(input)
    // })
    let htmlToAdd = "";
    pageContent.formFields.forEach(field => {
        htmlToAdd += `<div class="label-input-combo">`
        if (field.label) {
            htmlToAdd += `<label for="${field.id}">${field.label}</label>`
        }
        htmlToAdd += `<input id="${field.id}" type="${field.type}" name="${field.name}"
        required="${field.required}" maxlength="${field.maxlength}"></input>`
        htmlToAdd += `</div>`
    })
    const formContainer = document.querySelector(".form-container");
    // const formInputs = document.querySelector(".inputs-container")
    if (htmlToAdd !== "") {
        document.querySelector(".form-container").innerHTML = htmlToAdd
    } else {
        formContainer.style.width = "100%"
    }
    // formContainer.appendChild(inputsFragment)
    if (filename !== "new-reservation.html" && filename !== "complaints.html") {
        document.querySelector(".already-div").innerHTML = `
            <p class="already-paragraph">${pageContent.already}</p>
            <a href="${pageContent.linkHref}" class="go-to-login-signup"><b>${pageContent.alreadyLink}</b></a>
        `
    }

    document.querySelector(".user-form").addEventListener("submit", submit)
}
