async function loadAvailableReservations() {
    const dateSelect = document.querySelector("#date")
    const timeSelect = document.querySelector("#time")
    const available = await getAvailableReservations()
    loadDateSelect(dateSelect, available)
    loadTimeSelect(timeSelect, available[dateSelect.value])
    dateSelect.addEventListener("change", () => {
        loadTimeSelect(timeSelect, available[dateSelect.value])
    })
    timeSelect.addEventListener("change", () => {
        console.log(available[dateSelect.value][timeSelect.value])
        document.querySelector("#customers").max = available[dateSelect.value][timeSelect.value]
    })
}

function loadDateSelect(dateSelect, dates) {
    dateSelect.innerHTML = ""
    for (const date in dates) {
        const option = document.createElement("option")
        option.value = date
        option.innerText = date
        dateSelect.appendChild(option)
    }
}

function loadTimeSelect(timeSelect, times) {
    timeSelect.innerHTML = ""
    for (const time in times) {
        const option = document.createElement("option")
        option.value = time
        option.innerText = time
        timeSelect.appendChild(option)
    }
}