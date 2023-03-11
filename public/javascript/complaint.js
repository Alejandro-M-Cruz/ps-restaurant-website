import { errorMessage } from "./error-messages.js";

const COMPLAINTS_URL = "/api/v1/complaints"

export default function submit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const complaint = formData.get("complaint")
    fetch(COMPLAINTS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ complaint })
    }).then(res => res.json()).then(data => {
        if (data.error) return alert(errorMessage(data.error))
        window.location.href = "/"
    })
}