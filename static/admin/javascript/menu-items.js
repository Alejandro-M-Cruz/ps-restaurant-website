let menuItems
let menuSections
const updatedMenuItems = []
const addedMenuItems = []

function menuItemHTML(item) {
    const template = document.createElement("template")
    template.innerHTML = `
        <div class="menu-card-div">
            <input name="name" class="card-title name-input" type="text" required>
            <button class="delete-item-button"><img src="/images/delete-icon.png" width="30" alt="Delete icon"></button>
            <textarea name="ingredients" class="ingredients-textarea"></textarea>
            <input name="price" class="price-input" type="text" required>
            <select name="section_id" class="section-select" required></select>
            <input name="image_src" class="image-input" type="text">
        </div>
    `
    const sectionSelect = template.content.querySelector(".section-select")
    menuSections.forEach(section => {
        const option = document.createElement("option")
        option.value = section.id
        option.innerHTML = section.name
        sectionSelect.appendChild(option)
    })
    const inputs = template.content.querySelectorAll("input, textarea, select")
    inputs.forEach(input => {
        if (item) {
            switch(input.name) {
                case "ingredients":
                    input.innerHTML = item.ingredients
                    break
                case "price":
                    input.value = (Math.round(item.price * 100) / 100).toFixed(2) + "€"
                    break
                case "section":
                    input.value = item.section_id
                    break
                default:
                    input.value = item[input.name]
            }
        }
        input.addEventListener("change", () => {
            for (const field of inputs) {
                if (!item) return
                if (field.value !== item[field.name])
                    return updatedMenuItems.includes(item.id) ? null : updatedMenuItems.push(item.id)
            }
        })
    })
    template.content.querySelector(".delete-item-button")
        .addEventListener("click", e => deleteMenuItem(e, item))
    return template.content
}

async function loadPage(pageContent) {
    menuSections = (await loadFromJson(`/api/v1/menu/`)).sections
    menuItems = (await loadFromJson(`/api/v1/menu/items`)).menuItems
    const editedSectionId = window.sessionStorage.getItem("editedSectionId")
    const title = menuSections.find(section => section.id === parseInt(editedSectionId)).name
    document.querySelector("title").innerHTML = title
    document.querySelector(".page-title").innerHTML = `<input type="text" value="${title}">`
    const menuItemsFragment = document.createDocumentFragment()
    menuItems.forEach(item => menuItemsFragment.appendChild(menuItemHTML(item)))
    const grid = document.querySelector(".cards-grid")
    grid.appendChild(menuItemsFragment)
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    const undoButton = document.querySelector(".cancel-button")
    undoButton.innerHTML = pageContent.undoButtonLabel
    undoButton.addEventListener("click", e => {
        e.preventDefault()
        if (!confirm("Are you sure you want to undo all changes?")) return
        location.reload()
    })
    document.querySelector(".confirm-button").innerHTML = pageContent.confirmButtonLabel
    const newItemButton = document.querySelector(".edit-button")
    newItemButton.innerHTML = pageContent.newItemButtonLabel
    newItemButton.addEventListener("click", e => {
        e.preventDefault()
        grid.appendChild(menuItemHTML())
    })
}

function deleteMenuItem(e, item) {
    e.preventDefault()
    if (!confirm("Are you sure you want to delete this item?")) return
    if (!item) return e.target.parentElement.parentElement.remove()
    if (updatedMenuItems.includes(item.id))
        updatedMenuItems.splice(updatedMenuItems.indexOf(item.id), 1)

}