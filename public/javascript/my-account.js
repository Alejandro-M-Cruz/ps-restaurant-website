w3IncludeHTML(() => {
    fetch(`/demo-database/my-account-page-content.json`).then(response => response.json()).then(pageContent => {
        fetch(`/demo-database/logged-user.json`).then(response => response.json()).then(userData => {
            loadPage(pageContent, userData)
        })
    })
})

function loadPage(pageContent, userData) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    const fragment = new DocumentFragment()
    const titleRow = document.createElement("tr")
    titleRow.className = "title-row"
    fragment.appendChild(titleRow)
    const dataRow = document.createElement("tr")
    dataRow.className = "non-selectable-row"
    fragment.appendChild(dataRow)
    pageContent.tableFields.forEach(tableField => {
        const header = document.createElement("th")
        header.innerHTML = tableField.header
        const data = document.createElement("td")
        data.innerHTML = userData[tableField.name]
        fragment.firstChild.appendChild(header)
        fragment.lastChild.appendChild(data)
    })

    document.querySelector(".data-table").appendChild(fragment)
    document.querySelector(".left-button").innerHTML = pageContent.backButtonLabel
    document.querySelector(".middle-button").innerHTML = pageContent.deleteButtonLabel
    document.querySelector(".right-button").innerHTML = pageContent.logoutButtonLabel
}
