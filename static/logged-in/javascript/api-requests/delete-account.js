function deleteAccount() {
    if (!confirm(alertMessage("CONFIRM_DELETE_ACCOUNT"))) return
    if (!confirm(alertMessage("CONFIRM_DELETE_ACCOUNT2"))) return
    fetch(USERS_URL, {
        method: "DELETE"
    }).then(res => res.json).then(data => {
        if (data.error) return alert(data.error)
        window.location.href = "/html/index.html"
    })
}