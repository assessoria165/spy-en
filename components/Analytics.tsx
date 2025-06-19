"use client"

import { useEffect } from "react"

/**
 * Injeta scripts de rastreamento do UTMify e Pixel.
 * Pode ser importado como default ou como exportação nomeada.
 */
export function Analytics() {
  useEffect(() => {
    // UTMify
    const utmifyScript = document.createElement("script")
    utmifyScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js"
    utmifyScript.setAttribute("data-utmify-prevent-xcod-sck", "")
    utmifyScript.setAttribute("data-utmify-prevent-subids", "")
    utmifyScript.async = true
    utmifyScript.defer = true
    document.head.appendChild(utmifyScript)

    // Pixel
    const pixelScript = document.createElement("script")
    pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js"
    pixelScript.async = true
    pixelScript.defer = true
    document.head.appendChild(pixelScript)
    ;(window as any).pixelId = "6828a17e05c8e029fc870305"

    return () => {
      document.head.removeChild(utmifyScript)
      document.head.removeChild(pixelScript)
    }
  }, [])

  return null
}

/* Exportação default adicional para compatibilidade com imports default */
export default Analytics
