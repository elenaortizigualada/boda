"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Guest {
  id: string
  name: string
  email: string
  group: string
}

export default function GenerateInvitationsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [baseUrl, setBaseUrl] = useState("")

  useEffect(() => {
    // Establecer URL base
    setBaseUrl(typeof window !== "undefined" ? window.location.origin : "")

    // Cargar guests
    const loadGuests = async () => {
      try {
        const response = await fetch("/guests.json")
        const data = await response.json()
        setGuests(data)
      } catch (error) {
        console.error("Error cargando guests:", error)
      }
    }

    loadGuests()
  }, [])

  const getInvitationUrl = (guest: Guest) => {
    return `${baseUrl}/?code=${guest.id}`
  }

  const copyToClipboard = (url: string, guestId: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(guestId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadCsv = () => {
    const headers = ["ID", "Nombre", "Email", "Grupo", "URL Invitación"]
    const rows = guests.map((guest) => [
      guest.id,
      guest.name,
      guest.email,
      guest.group,
      getInvitationUrl(guest),
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "invitaciones-enlaces.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-serif font-light mb-4">Generar Invitaciones Personalizadas</h1>
          <p className="text-foreground/60">
            Copia los enlaces para enviar invitaciones personalizadas a cada invitado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button
            onClick={downloadCsv}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Download className="w-4 h-4" />
            Descargar CSV
          </Button>
        </motion.div>

        <div className="space-y-4">
          {guests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-foreground/50 mb-1">Nombre</p>
                  <p className="font-serif text-lg">{guest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/50 mb-1">Email</p>
                  <p className="text-sm break-all">{guest.email}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/50 mb-1">Grupo</p>
                  <p className="text-sm">{guest.group}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-foreground/10">
                <p className="text-sm text-foreground/50 mb-2">Enlaces de invitación</p>
                
                {/* Con code (ID) - Recomendado */}
                <div className="flex items-center gap-2 mb-3">
                  <code className="flex-1 bg-foreground/5 px-3 py-2 rounded text-xs break-all">
                    {getInvitationUrl(guest)}
                  </code>
                  <button
                    onClick={() => copyToClipboard(getInvitationUrl(guest), guest.id)}
                    className="p-2 hover:bg-foreground/10 rounded transition-colors"
                    title="Copiar"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedId === guest.id && (
                    <span className="text-xs text-green-600">¡Copiado!</span>
                  )}
                </div>

                {/* Alternativa: con nombre */}
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-foreground/5 px-3 py-2 rounded text-xs break-all">
                    {baseUrl}/?guest={guest.name.replace(/ /g, "+")}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(`${baseUrl}/?guest=${guest.name.replace(/ /g, "+")}`, guest.id + 1000)
                    }
                    className="p-2 hover:bg-foreground/10 rounded transition-colors"
                    title="Copiar"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {guests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60">Cargando invitados...</p>
          </div>
        )}
      </div>
    </div>
  )
}
