"use client"

import { useEffect } from "react"

export default function Analytics() {
  useEffect(() => {
    // UTMify script
    const utmifyScript = document.createElement("script")
    utmifyScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js"
    utmifyScript.setAttribute("data-utmify-prevent-xcod-sck", "")
    utmifyScript.setAttribute("data-utmify-prevent-subids", "")
    utmifyScript.async = true
    utmifyScript.defer = true
    document.head.appendChild(utmifyScript)

    // Pixel script
    const pixelScript = document.createElement("script")
    pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js"
    pixelScript.async = true
    pixelScript.defer = true
    document.head.appendChild(pixelScript)

    // Set pixel ID
    ;(window as any).pixelId = "6828a17e05c8e029fc870305"

    return () => {
      document.head.removeChild(utmifyScript)
      document.head.removeChild(pixelScript)
    }
  }, [])

  return null
}
