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

function setMaxCustomers(customersInput, maxCustomers) {
    customersInput.max = maxCustomers
}

async function loadAvailableReservations() {
    const dateSelect = document.querySelector("#date")
    const timeSelect = document.querySelector("#time")
    const customersInput = document.querySelector("#customers")
    const available = await getAvailableReservations()
    loadDateSelect(dateSelect, available)
    loadTimeSelect(timeSelect, available[dateSelect.value])
    setMaxCustomers(customersInput, available[dateSelect.value][timeSelect.value])
    dateSelect.addEventListener("change", () => {
        loadTimeSelect(timeSelect, available[dateSelect.value])
        setMaxCustomers(customersInput, available[dateSelect.value][timeSelect.value])
    })
    timeSelect.addEventListener("input", () => {
        console.log(available[dateSelect.value][timeSelect.value])
        setMaxCustomers(customersInput, available[dateSelect.value][timeSelect.value])
    })
}
