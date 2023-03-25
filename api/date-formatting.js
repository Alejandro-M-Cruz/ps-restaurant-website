export function dateFormat(datetime) {
    return new Date(datetime).toLocaleDateString("es-ES", { timeZone: "Atlantic/Canary" })
}

export function timeFormat(datetime) {
    const timeString = new Date(datetime)
        .toLocaleTimeString("es-ES", { timeZone: "Atlantic/Canary" })
    return timeString.substring(0, timeString.lastIndexOf(":"))
}

export function datetimeFormat(datetime) {
    return new Date(datetime).toLocaleString("es-ES", { timeZone: "Atlantic/Canary" })
}

export function localeToDBDatetimeFormatString(date, time) {
    const dateSplit = date.split("/")
    const formattedDate = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
    const formattedTime = time + ":00"
    return formattedDate + " " + formattedTime
}