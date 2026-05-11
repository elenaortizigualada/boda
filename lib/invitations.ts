/**
 * Utilidades para generar URLs de invitación personalizada
 */

export interface Guest {
  id: number
  name: string
  email: string
  group: string
}

export function getInvitationUrl(guest: Guest, baseUrl: string = ""): string {
  const url = baseUrl || (typeof window !== "undefined" ? window.location.origin : "")
  return `${url}/?code=${guest.id}`
}

export function getInvitationUrlByName(name: string, baseUrl: string = ""): string {
  const url = baseUrl || (typeof window !== "undefined" ? window.location.origin : "")
  return `${url}/?guest=${name.replace(/ /g, "+")}`
}

export async function loadGuests(): Promise<Guest[]> {
  try {
    const response = await fetch("/guests.json")
    if (!response.ok) throw new Error("Failed to load guests")
    return await response.json()
  } catch (error) {
    console.error("Error loading guests:", error)
    return []
  }
}

export function findGuestByCode(guests: Guest[], code: string | number): Guest | undefined {
  return guests.find((g) => g.id === (typeof code === "string" ? parseInt(code) : code))
}

export function findGuestByName(guests: Guest[], name: string): Guest | undefined {
  return guests.find((g) => g.name.toLowerCase() === name.toLowerCase())
}

export function generateInvitationsCsv(guests: Guest[], baseUrl: string): string {
  const headers = ["ID", "Nombre", "Email", "Grupo", "URL de Invitación"]
  const rows = guests.map((guest) => [
    guest.id,
    guest.name,
    guest.email,
    guest.group,
    getInvitationUrl(guest, baseUrl),
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n")

  return csv
}

export function downloadCsv(csv: string, filename: string = "invitaciones.csv"): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
