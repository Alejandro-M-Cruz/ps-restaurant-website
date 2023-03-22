export function datetimeFormat(datetime) {
    if (datetime instanceof Date) datetime = datetime.toISOString()
    return dateFormat(datetime) + " " + timeFormat(datetime)
}

export function dateFormat(datetime) {
    if (datetime instanceof Date) datetime = datetime.toISOString()
    return datetime.substring(0, datetime.indexOf("T"))
}

export function timeFormat(datetime) {
    if (datetime instanceof Date) datetime = datetime.toISOString()
    return datetime.substring(datetime.indexOf("T") + 1, datetime.lastIndexOf(":"))
}
