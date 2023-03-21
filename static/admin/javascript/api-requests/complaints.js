async function getComplaints() {
    const response = await loadJson(COMPLAINTS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.complaints
}