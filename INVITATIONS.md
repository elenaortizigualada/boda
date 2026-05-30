# Sistema de Invitaciones Personalizado

## 🎯 Cómo funciona

Cada invitado recibe una URL personalizada con su nombre. Al abrir la invitación, verá su nombre en la carta de introducción.

## 📍 URLs de Invitación

### Opción 1: Por Código de Invitado (Recomendado)
```
https://tudominio.com/?code=k7m2x9n3v5
https://tudominio.com/?code=q8w1e4r7t2
https://tudominio.com/?code=m4n7b2c9x1
```

**Ventajas:**
- URLs cortas
- Seguro (difícil de adivinar)
- Fácil de generar

### Opción 2: Por Nombre
```
https://tudominio.com/?guest=Juan+García
https://tudominio.com/?guest=María+López
```

**Ventajas:**
- Transparente
- Fácil de recordar

---

## 📋 Gestionar Invitados

### Agregar/Editar Invitados

1. Abre el archivo `/public/guests.json`
2. Agrega o edita invitados en este formato:

```json
{
  "id": "k7m2x9n3v5",
  "name": "Nuevo Invitado",
  "email": "nuevo@example.com",
  "group": "Amigos"
}
```

**Campos:**
- `id`: Código único aleatorio (10 caracteres alfanuméricos)
- `name`: Nombre completo del invitado
- `email`: Email para contacto
- `group`: Grupo/categoría (Familia, Amigos, Trabajo, etc.)

---

## 🔗 Generar Enlaces

### Opción A: Página Generadora (Recomendado)

1. Ve a: `https://tudominio.com/generate-invitations`
2. Verás lista de todos los invitados
3. Haz clic en el ícono de **copiar** junto a cada URL
4. Comparte el enlace por email, WhatsApp, etc.

### Opción B: Descargar CSV

En la página generadora, haz clic en **"Descargar CSV"** para obtener:
- ID
- Nombre
- Email
- Grupo
- URL personalizada

Perfecto para enviar emails masivos o guardar registro.

---

## 📧 Cómo los Invitados ven la Invitación

1. Reciben un email con su link personalizado: `https://tudominio.com/?code=k7m2x9n3v5`
2. Al abrir, ven su nombre en la carta: **"Juan García"**
3. Hacen clic para abrir la invitación
4. Rellenan el RSVP con su nombre, email, asistencia, etc.

### En Formspree (Backend)

Cuando el invitado confirma, **automaticamente**:
- Se registra su código/nombre (`guestIdentifier`)
- Se vincula su confirmación con su invitación
- Recibes email de confirmación

---

## 🛠️ Utilidades en Código

Si quieres integrar las funciones en tu código:

```typescript
import { 
  getInvitationUrl, 
  loadGuests, 
  findGuestByCode,
  generateInvitationsCsv 
} from "@/lib/invitations"

// Obtener URL para un invitado
const url = getInvitationUrl(guest, baseUrl)

// Cargar lista de invitados
const guests = await loadGuests()

// Buscar invitado por código
const guest = findGuestByCode(guests, "k7m2x9n3v5")

// Generar CSV
const csv = generateInvitationsCsv(guests, baseUrl)
```

---

## 📊 Datos Capturados en RSVP

Cuando alguien confirma su RSVP, recibes:

| Campo | Valor |
|-------|-------|
| **guestIdentifier** | Código del invitado (ej: "Code: k7m2x9n3v5") |
| **firstName** | Nombre |
| **lastName** | Apellidos |
| **email** | Email |
| **attendance** | Sí / No |
| **guests** | Número de acompañantes |
| **dietary** | Restricciones alimentarias |
| **message** | Mensaje personalizado |

---

## 🔐 Seguridad

- Los códigos de invitados son aleatorios y no secuenciales (más difíciles de adivinar)
- Recomendaciones para reforzar más la seguridad:
  - Agregar validación en backend
  - Implementar expiración o rotación de enlaces
  - Usar tokens de una sola vez para campañas sensibles

---

## 📝 Ejemplo Completo

### Archivo `public/guests.json`:
```json
[
  { "id": "k7m2x9n3v5", "name": "Juan García", "email": "juan@mail.com", "group": "Familia" },
  { "id": "q8w1e4r7t2", "name": "María López", "email": "maria@mail.com", "group": "Amigos" }
]
```

### URLs Generadas:
- Juan: `https://tudominio.com/?code=k7m2x9n3v5`
- María: `https://tudominio.com/?code=q8w1e4r7t2`

### Cuando Juan confirma:
```
Email recibido:
- guestIdentifier: "Code: k7m2x9n3v5"
- firstName: "Juan"
- lastName: "García"
- email: juan@mail.com
- attendance: "yes"
- guests: 2
```

---

## 🆘 Troubleshooting

**No veo el nombre personalizado:**
- Verifica que la URL tiene `?code=X` o `?guest=Nombre`
- Revisa que el invitado existe en `guests.json`

**El RSVP no captura el invitado:**
- Verifica que Formspree tiene el campo `guestIdentifier`
- Revisa la consola del navegador para errores

**Quiero cambiar formato de URLs:**
- Edita `envelope-intro.tsx` para el display
- Edita `lib/invitations.ts` para las funciones

---

¡Listo! Tu sistema de invitaciones personalizado está completo. 🎉
