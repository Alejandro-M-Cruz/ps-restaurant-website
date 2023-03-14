function loadContent(path) {
    fetch(path).then(response => response.json()).then(async data => {
        const menuItems = await (await fetch(`/demo-database/menu-items.json`)).json()
        loadPage(data, menuItems)
    })
}

function loadPage(pageContent, menuItems) {
    const title = menuItems[0].section
    document.querySelector("title").innerHTML = title
    document.querySelector(".page-title").innerHTML = title
    let menuItemsHTML = ""
    menuItems.forEach(item => {
        menuItemsHTML += `
            <div class="menu-card-div">
                <input class="card-title name-input" type="text" value="${item.name}">
                <textarea name="ingredients" class="ingredients-textarea">${item.ingredients}</textarea>
                <input class="price-input" type="text" value="${item.price}€">
                <select name="section" class="section-select" selected="${item.section}">
                    <option value="1">Pizzas</option>
                    <option value="2">Pasta</option>
                    <option value="3">Postres</option>
                </select>
                <input class="image-input" type="text" value="${item.imageSrc}">
            </div>
        `
    })
    document.querySelector(".cards-grid").innerHTML = menuItemsHTML
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    document.querySelector(".cancel-button").innerHTML = pageContent.undoButtonLabel
    document.querySelector(".confirm-button").innerHTML = pageContent.confirmButtonLabel
}