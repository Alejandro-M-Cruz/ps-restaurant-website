const alertMessages = {
    "NOT_FOUND": "El recurso solicitado no está disponible",
    "UNKNOWN_ERROR": "Se ha producido un error, inténtelo de nuevo",
    "PASSWORDS_DONT_MATCH": "Las contraseñas no coinciden",
    "DUPLICATE_USER": "Este número de teléfono ya ha sido registrado",
    "FAILED_LOGIN": "El número de teléfono o la contraseña son incorrectos",
    "NOT_LOGGED_IN": "No se ha iniciado sesión",
    "INVALID_DATE": "La fecha seleccionada no es válida",
    "INVALID_TIME": "La hora seleccionada no es válida",
    "RESERVATION_SAME_DAY": "Ya ha realizado una reserva para la fecha seleccionada",
    "RESERVATIONS_FULL": "No hay más reservas disponibles para la hora seleccionada",
    "MAX_CUSTOMERS_EXCEEDED": "Ha seleccionado más asientos de los disponibles",
    "CONFIRM_CANCEL_RESERVATION": "¿Está seguro de que desea cancelar la reserva?"
}

export function alertMessage(message) {
    return alertMessages[alertMessages[message] ? message : "UNKNOWN_ERROR"]
}
