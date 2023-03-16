async function initNavbar() {
    const navbarItems = await (await fetch("/demo-database/navbar.json")).json()
    const navbarList = document.querySelector(".navbar-list")
    navbarItems.forEach(item => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="${item.href}">${item.label}</a>`
        navbarList.insertBefore(li, navbarList.lastElementChild)
    })
    const navbarLinks = document.querySelectorAll(".navbar-list li:not(.navbar-list__logo)")
    document.querySelector(".hamburger-button").onclick = () => {
        const display = navbarLinks[0].style.display === "block" ? "none" : "block"
        navbarLinks.forEach(li => li.style.display = display)
    }
    window.onbeforeunload = () => navbarLinks.forEach(li => li.style.display = "none")
}