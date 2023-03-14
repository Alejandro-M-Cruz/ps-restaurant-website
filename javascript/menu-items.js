let menuItems = []

function loadContent(path) {
    fetch(path).then(response => response.json()).then(async data => {
        menuItems = await (await fetch(`/demo-database/menu-items.json`)).json()
        loadPage(data)
    })
}

function menuItemHTML(item) {
    return item ? `
        <div class="menu-card-div">
            <input class="card-title name-input" type="text" value="${item.name}" required>
            <button class="delete-item-button"><img src="/images/delete-icon.png" width="30" alt="Delete icon" onclick="deleteMenuItem(false)"></button>
            <textarea name="ingredients" class="ingredients-textarea">${item.ingredients}</textarea>
            <input class="price-input" type="text" value="${(Math.round(item.price * 100) / 100).toFixed(2)}€" required>
            <select name="section" class="section-select" selected="${item.section}" required>
                <option value="1">Pizzas</option>
                <option value="2">Pasta</option>
                <option value="3">Postres</option>
            </select>
            <input class="image-input" type="text" value="${item.imageSrc}">
        </div>
    ` : `
        <div class="menu-card-div empty-item">
            <input class="card-title name-input" type="text" required>
            <button class="delete-item-button"><img src="/images/delete-icon.png" width="30" alt="Delete icon" onclick="deleteMenuItem(true)"></button>
            <textarea name="ingredients" class="ingredients-textarea"></textarea>
            <input class="price-input" type="text" required>
            <select name="section" class="section-select" required>
                <option value="1">Pizzas</option>
                <option value="2">Pasta</option>
                <option value="3">Postres</option>
            </select>
            <input class="image-input" type="text">
        </div>
    `
}

function loadPage(pageContent) {
    const title = menuItems[0].section
    document.querySelector("title").innerHTML = title
    document.querySelector(".page-title").innerHTML = `<input type="text" value="${title}">`
    let menuItemsHTML = ""
    menuItems.forEach(item => menuItemsHTML += menuItemHTML(item))
    const grid = document.querySelector(".cards-grid")
    grid.innerHTML = menuItemsHTML
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    document.querySelector(".cancel-button").innerHTML = pageContent.undoButtonLabel
    document.querySelector(".confirm-button").innerHTML = pageContent.confirmButtonLabel
    const newItemButton = document.querySelector(".edit-button")
    newItemButton.innerHTML = pageContent.newItemButtonLabel
    newItemButton.addEventListener("click", e => {
        e.preventDefault()
        grid.innerHTML += menuItemHTML()
    })
}

function deleteMenuItem(isNew) {
    if (isNew) {

    }
}