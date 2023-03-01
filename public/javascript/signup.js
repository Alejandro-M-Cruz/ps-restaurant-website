const API = "/api/v1"
function signup() {
    const form = document.querySelector(".user-form")
    const phone_number = document.querySelector("#phone-number")
    const password = document.querySelector("#password")
    const password_confirmation = document.querySelector("#password-confirm")
    if (password.value !== password_confirmation.value) return alert("Las contraseñas deben coincidir")
    fetch(`${API}/check-phone-number/${phone_number.value}`).then(res => res.json()).then(data => {
        if (data.error) return alert(data.error)
        if (data.phone_number_exists) return alert("Este número de teléfono ya ha sido registrado")
        form.action = `${API}/user-signup`
        form.method = "post"
        form.submit()
        alert("Se ha registrado correctamente")
    })
}