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
    const user = await loadFromJson(USER_URL)
    let navbarContentJson
    if (!user) {
        navbarContentJson = "/json/navbar.json"
    } else {
        navbarContentJson = user.admin ? "/admin/json/navbar-admin.json" : "/json/navbar.json"
    }
    document.querySelector(".user-icon").href = user ? "/logged-in/html/my-account.html" : "/html/login.html"
    if (!user) document.querySelector(".navbar-list__user-icon").style.display = "none"
    const navbarContent = await loadFromJson(navbarContentJson)
    const navbarList = document.querySelector(".navbar-list")
    navbarContent.forEach(item => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="${item.href}">${item.label}</a>`
        navbarList.insertBefore(li, navbarList.lastElementChild)
    })
    const navbarLinks = document.querySelectorAll(".navbar-list li:not(.navbar-list__logo)")
    document.querySelector(".hamburger-button").addEventListener("click", () => {
        const display = navbarLinks[0].style.display === "block" ? "none" : "block"
        navbarLinks.forEach(li => li.style.display = display)
    })
    window.onbeforeunload = () => navbarLinks.forEach(li => li.style.display = "none")
}