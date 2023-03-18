export const dateFormat = dateISOString => dateISOString.substring(0, dateISOString.indexOf("T"))


export const timeFormat = dateISOString =>
    dateISOString.substring(dateISOString.indexOf("T") + 1, dateISOString.lastIndexOf(":"))
