import { errorMessage } from "./error-messages.js";

const RESERVATIONS_URL = "/api/v1/reservations"

export default function submit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name")
    const date = formData.get("date")
    const time = formData.get("time")
    const customers = formData.get("customers")
    fetch(RESERVATIONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, date, time, customers })
    }).then(res => res.json()).then(data => {
        if (!data.error) return window.location.href = "/html/reservations.html"
        const message = errorMessage(data.error)
        let invalidInput
        switch(data.error) {
            case "MAX_CUSTOMERS_EXCEEDED":
                invalidInput = e.target.querySelector("#customers")
                break
            case "RESERVATION_SAME_DAY":
                invalidInput = e.target.querySelector("#date")
                break
            case "RESERVATIONS_FULL":
                invalidInput = e.target.querySelector("#customers")
                break
            default:
                return alert(message)
        }
        invalidInput.setCustomValidity(message)
        invalidInput.reportValidity()
    })
}