const path = window.location.pathname
const filename = path.substring(path.lastIndexOf('/') + 1)

function loadPage(pageContent) {
    document.querySelector("title").innerHTML = pageContent.tabTitle ? pageContent.tabTitle : pageContent.title
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".back-button").innerHTML = pageContent.cancelButtonLabel
    document.querySelector(".confirm-button").innerHTML = pageContent.confirmButtonLabel
    const fragment = document.createDocumentFragment()
    pageContent.formFields.forEach(field => {
        const div = document.createElement("div")
        div.className = "label-input-combo"
        const label = document.createElement("label")
        if (field.label) {
            label.setAttribute("for", field.id)
            label.innerHTML = field.label
            div.appendChild(label)
        }
        const input = document.createElement(field.tag ? field.tag : "input")
        input.id = field.id
        input.name = field.name
        input.type = field.type
        for (const property in field.properties) input[property] = field.properties[property]
        div.appendChild(input)
        fragment.appendChild(div)
        input.addEventListener("input", () => input.setCustomValidity(""))
    })
    document.querySelector(".form-container").appendChild(fragment)
    if (filename !== "new-reservation.html" && filename !== "complaints.html") {
        document.querySelector(".already-div").innerHTML = `
            <p class="already-paragraph">${pageContent.already}</p>
            <a href="${pageContent.linkHref}" class="go-to-login-signup"><b>${pageContent.alreadyLink}</b></a>
        `
    }
    document.querySelector(".user-form").addEventListener("submit", submit)
}
