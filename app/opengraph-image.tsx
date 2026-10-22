import { ImageResponse } from "next/og"

export const alt = "¡Nos casamos! Elena y Fran"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F6F1E7",
          color: "#334127",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 1040,
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "48px 76px",
            border: "2px solid #D8CEB7",
            background: "#EEEBDD",
          }}
        >
          <div
            style={{
              width: 430,
              height: 310,
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              background: "#7F8F5D",
              boxShadow: "0 18px 35px rgba(58, 48, 36, 0.18)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: "215px solid transparent",
                borderRight: "215px solid transparent",
                borderTop: "150px solid #91A16C",
              }}
            />
            <div
              style={{
                width: 92,
                height: 92,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                border: "2px solid #B88B57",
                background: "#9A744A",
                color: "#F6E9D4",
                fontSize: 30,
                zIndex: 1,
              }}
            >
              E &amp; F
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: 420,
            }}
          >
            <div style={{ fontSize: 52, letterSpacing: 3, lineHeight: 1.1 }}>
              ¡NOS CASAMOS!!!
            </div>
            <div style={{ marginTop: 28, fontSize: 30, color: "#8F7F6B" }}>
              Elena &amp; Fran
            </div>
            <div style={{ marginTop: 18, fontSize: 24, color: "#8F7F6B" }}>
              17.04.2027
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
