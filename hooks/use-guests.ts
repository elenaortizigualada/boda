"use client"

import { useEffect, useState } from "react"
import type { Guest } from "@/lib/types"

// Caché simple en memoria
let guestsCache: Guest[] | null = null
let cachePromise: Promise<Guest[]> | null = null

/**
 * Hook para cargar y cachear lista de invitados
 * Evita múltiples requests al mismo archivo guests.json
 */
export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGuests = async () => {
      try {
        // Si ya tenemos en caché, usar ese
        if (guestsCache) {
          setGuests(guestsCache)
          setLoading(false)
          return
        }

        // Si hay una promesa en progreso, esperar a ella
        if (cachePromise) {
          const data = await cachePromise
          setGuests(data)
          setLoading(false)
          return
        }

        // Hacer fetch si no hay caché ni promesa
        cachePromise = fetch("/guests.json").then((res) => {
          if (!res.ok) throw new Error("Failed to load guests")
          return res.json()
        })

        const data = await cachePromise
        guestsCache = data
        setGuests(data)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        setError(message)
        console.error("Error loading guests:", err)
      } finally {
        setLoading(false)
      }
    }

    loadGuests()
  }, [])

  return { guests, loading, error }
}

/**
 * Función para buscar un invitado por ID (code)
 */
export function findGuestByCode(guests: Guest[], code: string | number): Guest | undefined {
  return guests.find((g) => g.id === String(code))
}

/**
 * Función para buscar un invitado por nombre
 */
export function findGuestByName(guests: Guest[], name: string): Guest | undefined {
  return guests.find((g) => g.name.toLowerCase() === name.toLowerCase())
}
