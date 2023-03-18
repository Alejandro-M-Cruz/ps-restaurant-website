async function loadPage(pageContent) {
    const userData = await loadFromJson("/api/v1/users")
    document.querySelector("title").innerHTML = pageContent.title
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
    const deleteAccountButton = document.querySelector(".cancel-button")
    if (userData.admin) deleteAccountButton.style.display = "none"
    else deleteAccountButton.innerHTML = pageContent.deleteButtonLabel
    const logoutButton = document.querySelector(".confirm-button")
    logoutButton.innerHTML = pageContent.logoutButtonLabel
    logoutButton.addEventListener("click", logout)
}
