"use client"

import { useState, useEffect } from "react"

const statusMessages = [
  "Decoding secret conversations…",
  "Capturing recent photos…",
  "Tracking real-time location…",
  "Unblocking access to Snapchat…",
  "Analyzing video calls…",
  "Analyzing text messages…",
  "Checking statuses…",
  "Synchronizing with the cloud…",
  "Monitoring TikTok activity…",
  "Recovering deleted messages…",
  "Accessing hidden galleries…",
  "Reading received emails…",
  "Decrypting encrypted messages…",
  "Checking browsing history…",
  "Viewing private notes…",
  "Checking recently added contacts…",
  "Analyzing voice messages…",
  "Identifying connected devices…",
  "Viewing photo albums…",
  "Monitoring activity on social networks…",
]

export default function StatusAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statusMessages.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-4">🔍 STATUS:</h3>
      <div className="text-accent font-medium text-lg min-h-[2rem] flex items-center justify-center">
        {statusMessages[currentIndex]}
      </div>
    </div>
  )
}
