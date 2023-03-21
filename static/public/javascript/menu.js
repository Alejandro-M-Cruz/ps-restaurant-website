async function loadMenu() {
    const menuLeft = document.querySelector(".menu-left")
    const menuRight = document.querySelector(".menu-right")
    const menuSections = await getMenuSections()
    const menuItems = await getMenuItems()
    loadHalf(menuLeft, menuSections.slice(0, Math.round(menuSections.length / 2)), menuItems)
    loadHalf(menuRight, menuSections.slice(Math.round(menuSections.length / 2)), menuItems)
}

function loadHalf(element, sections, items) {
    const template = document.createElement("template")
    let menuHTML = ""
    sections.forEach(section => {
        menuHTML += menuSectionHTML(section, items.filter(item => item.section_id === section.id))
    })
    template.innerHTML = menuHTML
    element.appendChild(template.content)
}

function menuSectionHTML(section, items) {
    let sectionHTML = `<h3>${section.name}</h3>`
    items.forEach(item => {
        sectionHTML += `
            <div class="sides">
                ${item.image_src ? `
                <div class="left-side-image">
                    <img src="${item.image_src}" alt="food"></img>
                </div>
                ` : ""}
                <div class="left-side-text">
                    <p>${item.name}</p>
                    <p class="left-side__ingredients">${item.ingredients}</p>
                </div>
                
                <div class="right-side-text">
                    <p>${(Math.round(item.price * 100) / 100).toFixed(2)}€</p>
                </div>
            </div>
        `
    })
    return sectionHTML
}