function loadAvailableReservations() {
    const dateSelect = document.querySelector("#date")
    const timeSelect = document.querySelector("#time")
    const available = getAvailableReservations()
    for (const date in available) {
        const option = document.createElement("option")
        option.value = date
        option.innerText = date
        dateSelect.appendChild(option)
    }
    dateSelect.addEventListener("change", () => {
        timeSelect.innerHTML = ""
        for (const time in available[dateSelect.value]) {
            const option = document.createElement("option")
            option.value = time
            option.innerText = time
            timeSelect.appendChild(option)
        }
    })
    timeSelect.addEventListener("change", () => {
        const maxCustomers = available[dateSelect.value][timeSelect.value]
        document.querySelector("#customers").max = maxCustomers
    })
}