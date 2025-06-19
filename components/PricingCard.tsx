"use client"

import { useEffect, useState } from "react"

export default function PricingCard() {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()
    setCurrentDate(`${day}/${month}/${year}`)
  }, [])

  const handlePurchase = () => {
    window.open("https://app.monetizze.com.br/checkout/KEJ382325", "_blank")
  }

  return (
    <div className="card text-center mb-6">
      <h3 className="text-2xl font-bold mb-6">90% off today only, the {currentDate}</h3>

      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 max-w-md mx-auto">
        <div className="mb-6">
          <div className="text-gray-500 line-through text-xl mb-2">
            <span className="text-lg">$</span>299
          </div>
          <div className="text-4xl font-bold text-green-600">
            <span className="text-2xl">$</span>47
          </div>
        </div>

        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>30 days warranty</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Access for 1 year</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Tracking up to 3 numbers</span>
          </div>
        </div>

        <button
          onClick={handlePurchase}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors animate-pulse-custom"
        >
          ✅ CLICK HERE TO GET 90% OFF
        </button>
      </div>
    </div>
  )
}
