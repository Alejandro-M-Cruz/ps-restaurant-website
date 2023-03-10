function initNavbar() {
    const navbarItems = document.querySelectorAll(".navbar-list li:not(.navbar-list__logo)")
    document.querySelector(".hamburger-button").onclick = () => {
        const display = navbarItems[0].style.display === "block" ? "none" : "block"
        navbarItems.forEach(li => li.style.display = display)
    }
    window.onbeforeunload = () => navbarItems.forEach(li => li.style.display = "none")
}