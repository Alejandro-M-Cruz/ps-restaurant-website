const API_URL = "/api/v1"
const USER_URL = `${API_URL}/users`

function includeHTML() {
    const promises = []
    document.querySelectorAll("[include-html]").forEach(element => {
        promises.push((async element => {
            element.innerHTML = await (await fetch(element.getAttribute("include-html"))).text()
        })(element))
    })
    return Promise.allSettled(promises)
}

const loadFromJson = async path => (await fetch(path)).json()

async function initNavbar() {
    console.log("initNavbar")
    const user = await loadFromJson(USER_URL)
    let navbarContentJson
    let showUserIcon = true
    if (user.error) {
        navbarContentJson = "/json/navbar.json"
        showUserIcon = false
    } else {
        navbarContentJson = user.admin ? "/admin/json/navbar-admin.json" : "/logged-in/json/navbar-logged-in.json"
    }
    const userIcon = document.querySelector(".navbar-list__user-icon")
    userIcon.style.display = showUserIcon ? "block" : "none"
    const navbarList = document.querySelector(".navbar-list")
    const navbarContent = await loadFromJson(navbarContentJson)
    navbarContent.forEach(item => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="${item.href}">${item.label}</a>`
        navbarList.insertBefore(li, navbarList.lastElementChild)
    })
    const navbarLinks = document
        .querySelectorAll(".navbar-list li:not(.navbar-list__logo):not(.navbar-list__user-icon)")
    document.querySelector(".hamburger-button").addEventListener("click", () => {
        const display = navbarLinks[0].style.display === "block" ? "none" : "block"
        userIcon.style.display = showUserIcon ? display : "none"
        navbarLinks.forEach(li => li.style.display = display)
    })
    window.onbeforeunload = () => navbarLinks.forEach(li => li.style.display = "none")
}