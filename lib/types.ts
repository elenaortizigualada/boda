/**
 * Tipos compartidos en toda la aplicación
 */

/**
 * Estructura de un invitado en guests.json
 */
export interface Guest {
  id: string
  name: string
  email: string
  group: string
}

/**
 * Respuesta RSVP del formulario
 */
export interface RSVPResponse {
  firstName: string
  lastName: string
  email: string
  attendance: "yes" | "no"
  guests?: number
  dietary?: string
  message?: string
  guestIdentifier?: string
}

/**
 * Estado de una invitación
 */
export interface InvitationStatus {
  guestId: number
  status: "pending" | "accepted" | "declined"
  respondedAt?: Date
}

/**
 * Propiedades para componentes de animación
 */
export interface AnimationProps {
  isInView?: boolean
  delay?: number
  duration?: number
  disabled?: boolean
}

/**
 * Error personalizado para la aplicación
 */
export class WeddingError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = "WeddingError"
  }
}

/**
 * Fases de la animación del sobre
 */
export type EnvelopePhase = "idle" | "preparing" | "opening" | "opened"

/**
 * Estado de carga
 */
export type LoadingState = "idle" | "loading" | "success" | "error"
