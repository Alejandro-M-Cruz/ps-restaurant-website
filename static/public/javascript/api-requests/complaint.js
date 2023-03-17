import { alertMessage } from "../alert-messages.js";

const COMPLAINTS_URL = "/api/v1/complaints"

export default function submit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const content = formData.get("complaint")
    fetch(COMPLAINTS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
    }).then(res => res.json()).then(data => {
        if (data.error) return alert(alertMessage(data.error))
        window.location.href = "/"
    })
}