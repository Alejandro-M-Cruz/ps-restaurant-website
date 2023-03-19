async function getUser() {
    const user = await loadFromJson(USER_URL)
    if (user.error) return alert(alertMessage(user.error))
    return user
}