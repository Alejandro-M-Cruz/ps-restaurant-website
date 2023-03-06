const errorMessages = {
    "NOT_FOUND": "El recurso solicitado no está disponible",
    "UNKNOWN_ERROR": "Se ha producido un error, inténtelo de nuevo",
    "DUPLICATE_USER": "Este número de teléfono ya ha sido registrado",
    "FAILED_LOGIN": "El número de teléfono o la contraseña son incorrectos",
    "NOT_LOGGED_IN": "No se ha iniciado sesión",
    "RESERVATION_SAME_DAY": "Ya ha realizado una reserva para la fecha seleccionada",
    "RESERVATIONS_FULL": "No hay más reservas disponibles para la hora seleccionada"
}

export function errorMessage(message) {
    return { error: errorMessages[errorMessages[message] ? message : "UNKNOWN_ERROR"] }
}

export const noError = { error: null }

export class ValidationError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
        this.message = message
    }
}