async function getUser() {
    const user = await loadJson(USERS_URL)
    if (user.error) return alert(alertMessage(user.error))
    return user
}