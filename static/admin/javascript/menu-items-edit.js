let menuItems
let menuSections
const updatedMenuItems = []
const addedMenuItems = []
const deletedMenuItems = []

const form = document.querySelector("form")
let confirmButton
let undoButton
function enableButton() {
    confirmButton.disabled = false
    undoButton.disabled = false
}
let idCount = 1

function menuItemHTML(id, item, hints) {
    const template = document.createElement("template")
    template.innerHTML = `
        <div class="menu-card-div">
            <input name="name" class="card-title name-input" type="text" placeholder="${hints.name}" required>
            <button class="delete-item-button" type="button"><img src="/images/delete-icon.png" width="30" alt="Delete icon"></button>
            <textarea name="ingredients" class="ingredients-textarea" placeholder="${hints.ingredients}"></textarea>
            <input name="price" class="price-input" type="number" step=".01" min="0" max="9999999999" placeholder="${hints.price}" required>
            <p class="euro-label">€</p>
            <select name="section_id" class="section-select" required></select>
            <input name="image_src" class="image-input" type="text"  placeholder="${hints.image_src}">
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
                    input.value = (Math.round(item.price * 100) / 100).toFixed(2)
                    break
                case "section":
                    input.value = item.section_id
                    break
                default:
                    input.value = item[input.name]
            }
        }
        input.addEventListener("change", () => {
            item ? itemToUpdate(item, inputs) : itemToAdd(id, inputs)
            enableButton()
        })
    })
    template.content.querySelector(".delete-item-button")
        .addEventListener("click", e => deleteCard(e, item))
    return template.content
}

function itemToUpdate(item, inputs) {
    const update = { id: item.id }
    for (const field of inputs)
        update[field.name] = field.value
    const pos = updatedMenuItems.indexOf(updatedMenuItems.find(prevUpdate => prevUpdate.id === item.id))
    if (update === item)
        return pos !== -1 ? updatedMenuItems.splice(pos, 1) : null
    pos !== -1 ? updatedMenuItems[pos] = update : updatedMenuItems.push(update)
}

function itemToAdd(id, inputs) {
    const newItem = { id }
    for (const field of inputs)
        newItem[field.name] = field.value
    const pos = addedMenuItems.indexOf(addedMenuItems.find(prev => prev.id === newItem.id))
    pos !== -1 ? addedMenuItems[pos] = newItem : addedMenuItems.push(newItem)
}

async function loadPage(pageContent) {
    menuSections = await getMenuSections()
    const sectionId = window.sessionStorage.getItem("editedSectionId")
    menuItems = await getMenuItemsBySectionId(sectionId)
    const editedSectionId = window.sessionStorage.getItem("editedSectionId")
    const title = menuSections.find(section => section.id === parseInt(editedSectionId)).name
    document.querySelector("title").innerHTML = title
    document.querySelector(".page-title").innerHTML = `<input type="text" value="${title}">`
    const menuItemsFragment = document.createDocumentFragment()
    menuItems.forEach(item => {
        menuItemsFragment.appendChild(menuItemHTML(null, item, pageContent.hints))
    })
    const grid = document.querySelector(".cards-grid")
    grid.appendChild(menuItemsFragment)
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel
    undoButton = document.querySelector(".cancel-button")
    undoButton.innerHTML = pageContent.undoButtonLabel
    undoButton.addEventListener("click", e => {
        e.preventDefault()
        if (!confirm(alertMessage("CONFIRM_CANCEL_CHANGES"))) return
        location.reload()
    })
    confirmButton = document.querySelector(".confirm-button")
    if (updatedMenuItems.length === 0 && addedMenuItems.length === 0 && deletedMenuItems.length === 0) {
        confirmButton.disabled = true
        undoButton.disabled = true
    }
    confirmButton.innerHTML = pageContent.confirmButtonLabel
    confirmButton.addEventListener("click", confirmChanges)
    const newItemButton = document.querySelector(".edit-button")
    newItemButton.innerHTML = pageContent.newItemButtonLabel
    newItemButton.addEventListener("click", e => {
        enableButton()
        grid.appendChild(menuItemHTML(idCount++, null, pageContent.hints))
    })
}

function deleteCard(e, item) {
    e.target.parentElement.parentElement.remove()
    if (addedMenuItems.includes(item)) addedMenuItems.splice(addedMenuItems.indexOf(item), 1)
    if (!item) return
    if (updatedMenuItems.includes(item)) updatedMenuItems.splice(updatedMenuItems.indexOf(item), 1)
    deletedMenuItems.push(item.id)
    enableButton()
}

function confirmChanges() {
    if (!form.checkValidity()) return form.reportValidity()
    if (!confirm(alertMessage("CONFIRM_SAVE_CHANGES"))) return
    console.log(addedMenuItems)
    console.log(updatedMenuItems)
    console.log(deletedMenuItems)
    addedMenuItems.forEach(item => postMenuItem(item))
    updatedMenuItems.forEach(item => updateMenuItem(item.id, item))
    deletedMenuItems.forEach(id => deleteMenuItem(id))
}
