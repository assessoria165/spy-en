"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Step2Progress() {
  const [progress, setProgress] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fastDuration = 120000 // 2 minutes for first 50%
    const slowDuration = 240000 // 4 minutes for last 50%

    const fastIncrementTime = fastDuration / 50
    const slowIncrementTime = slowDuration / 50

    const updateProgress = () => {
      setProgress((prev) => {
        if (prev < 50) {
          setTimeout(updateProgress, fastIncrementTime)
          return prev + 1
        } else if (prev < 99) {
          setTimeout(updateProgress, slowIncrementTime)
          return prev + 1
        } else if (prev === 99) {
          setTimeout(() => setShowButton(true), 500)
          return 100
        }
        return prev
      })
    }

    updateProgress()
  }, [])

  const handleRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const photo = urlParams.get("photo")
    const tel = urlParams.get("tel")

    let redirectUrl = "/step3"
    const params = new URLSearchParams()

    if (photo) params.append("photo", photo)
    if (tel) params.append("tel", tel)

    if (params.toString()) {
      redirectUrl += `?${params.toString()}`
    }

    router.push(redirectUrl)
  }

  return (
    <div className="space-y-4">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>

      {showButton && (
        <button onClick={handleRedirect} className="w-full btn-secondary animate-pulse-custom">
          🔥 Click here to see the test result
        </button>
      )}
    </div>
  )
}
