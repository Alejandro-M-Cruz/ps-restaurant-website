const API_URL = "/api/v1"
const USERS_URL = `${API_URL}/users`
const SIGNUP_URL = `${API_URL}/users`
const LOGIN_URL = `${API_URL}/users/login`
const LOGOUT_URL = `${API_URL}/users/logout`
const MENU_SECTIONS_URL = `${API_URL}/menu`
const MENU_ITEMS_URL = `${API_URL}/menu/items`
const COMPLAINTS_URL = `${API_URL}/complaints`
const RESERVATIONS_URL = `${API_URL}/reservations`
const USER_RESERVATIONS_URL = `${API_URL}/reservations/user`
const AVAILABLE_RESERVATIONS_URL = `${API_URL}/reservations/available`

function includeHTML() {
    const promises = []
    document.querySelectorAll("[include-html]").forEach(element => {
        promises.push((async element => {
            element.innerHTML = await (await fetch(element.getAttribute("include-html"))).text()
        })(element))
    })
    return Promise.allSettled(promises)
}

const loadJson = async path => (await fetch(path)).json()

async function initNavbar() {
    const user = await loadJson(USERS_URL)
    let navbarContentJson
    let showUserIcon = true
    if (user.error) {
        navbarContentJson = "/json/navbar.json"
        showUserIcon = false
    } else {
        navbarContentJson = user.admin ? "/admin/json/navbar-admin.json" : "/logged-in/json/navbar-logged-in.json"
    }
    const navbarList = document.querySelector(".navbar-list")
    const navbarContent = await loadJson(navbarContentJson)
    navbarContent.forEach(item => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="${item.href}">${item.label}</a>`
        navbarList.insertBefore(li, navbarList.lastElementChild)
    })
    const navbarLinks = document
    .querySelectorAll(".navbar-list li:not(.navbar-list__logo):not(.navbar-list__user-icon)")
    const userIcon = document.querySelector(".navbar-list__user-icon")
    userIcon.style.display = showUserIcon ? navbarLinks[0].style.display : "none"
    const hamburgerButton = document.querySelector(".hamburger-button")
    hamburgerButton.addEventListener("click", () => {
        const display = navbarLinks[0].style.display === "block" ? "none" : "block"
        userIcon.style.display = showUserIcon ? display : "none"
        navbarLinks.forEach(li => li.style.display = display)
    })
    window.addEventListener('scroll', function(e) {
        if(navbarLinks[0].style.display === "block") {
            navbarLinks.forEach(li => li.style.display = "none")
            userIcon.style.display = "none"
        }
    })
    window.onbeforeunload = () => navbarLinks.forEach(li => li.style.display = "none")
}