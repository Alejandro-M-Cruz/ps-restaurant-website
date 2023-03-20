// Almacena los elementos de la lista del navegador excepto el LOGO
// Cuando apretamos el boton que lanza el DESPLEGABLE de opciones,
// Cambiamos entre que se vean en la pantalla o no
// Por defecto antes de descargar la página, esos elementos no se podran ver

function initNavbar() {
    const navbarItems = document.querySelectorAll(".navbar-list li:not(.navbar-list__logo)")
    document.querySelector(".hamburger-button").onclick = () => {
        const display = navbarItems[0].style.display === "block" ? "none" : "block"
        navbarItems.forEach(li => li.style.display = display)
    }
    window.onbeforeunload = () => navbarItems.forEach(li => li.style.display = "none")
}