const COMPLAINTS_URL = `${API_URL}/complaints`

async function getComplaints() {
    const response = await loadFromJson(COMPLAINTS_URL)
    if (response.error) return alert(alertMessage(response.error))
    return response.complaints
}