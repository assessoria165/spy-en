"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitPhoneNumber } from "@/lib/actions"

export default function Step1Form() {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone.trim()) {
      alert("Please enter a valid phone number")
      return
    }

    setIsLoading(true)

    try {
      const result = await submitPhoneNumber(phone)

      if (result.success) {
        const photoParam = result.photoUrl ? `?photo=${encodeURIComponent(result.photoUrl)}` : ""
        const telParam = phone ? `${photoParam ? "&" : "?"}tel=${encodeURIComponent(phone)}` : ""
        router.push(`/step2${photoParam}${telParam}`)
      } else {
        // Even on error, proceed to step2 with default image
        router.push(`/step2?tel=${encodeURIComponent(phone)}`)
      }
    } catch (error) {
      console.error("Error:", error)
      // Always proceed to step2, even on error
      router.push(`/step2?tel=${encodeURIComponent(phone)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-custom"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="loading-spinner mr-2"></div>
            Processing...
          </div>
        ) : (
          "✅ CLICK HERE TO MONITOR NUMBERS"
        )}
      </button>
    </form>
  )
}
