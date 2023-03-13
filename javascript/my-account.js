function loadContent(path) {
    fetch(path).then(response => response.json()).then(async data => {
        const userData = await (await fetch(`/demo-database/logged-user.json`)).json()
        loadPage(data, userData)
    })
}

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
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    document.querySelector(".back-button").innerHTML = pageContent.deleteButtonLabel
    document.querySelector(".confirm-button").innerHTML = pageContent.logoutButtonLabel
}
