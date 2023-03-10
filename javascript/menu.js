function loadMenuItems(path, element) {
    fetch(path).then(response => response.json()).then(data => {
        loadMenu(data, element)
    })
}

const menuLeft = document.querySelector(".menu-left")
const menuRight = document.querySelector(".menu-right")

loadMenuItems("/demo-database/menu-left.json", menuLeft)
loadMenuItems("/demo-database/menu-right.json", menuRight)

function loadMenu(data, element) {
    const template = document.createElement("template")
    let dishesHTML = ""
    data.forEach(section => {
        dishesHTML += `<h3>${section.title}</h3>`
        section.dishes.forEach(dish => {
            dishesHTML += `
                <div class="sides">
                    <div class="left-side">
                        <p>${dish.name}</p>
                        <p class="left-side__ingredients">${dish.ingredients}</p>
                    </div>
                    <div class="right-side">
                        <p>${dish.price}</p>
                    </div>
               </div>
            `
        })
    })
    template.innerHTML = dishesHTML
    element.appendChild(template.content)
}
