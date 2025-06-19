"use client"

import { useEffect, useState } from "react"

export default function SuspiciousActivity() {
  const [userCity, setUserCity] = useState("Paris")

  useEffect(() => {
    // Get user's city
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        if (data.city) {
          setUserCity(data.city)
        }
      })
      .catch(() => {
        setUserCity("Paris")
      })
  }, [])

  const suspiciousItems = [
    { count: 58, description: "suspicious messages found" },
    { count: 13, description: 'posts contained the word "delicious"' },
    { count: 41, description: 'messages contained the word "Love"' },
    { count: 20, description: "photos and 5 videos are hidden by password" },
    { count: 8, description: 'messages contained the word "Secret"' },
    { count: 2, description: "archived conversations marked as suspicious" },
    { count: 1, description: "unregistered contact with nostalgia messages" },
    { count: 9, description: "single-view images identified and restored" },
    { count: 7, description: `suspicious locations detected near ${userCity}` },
  ]

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold mb-6 text-center">
        We found <span className="text-red-600 font-bold">58</span> suspicious messages:
      </h3>

      <div className="space-y-4">
        {suspiciousItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700">
              {index === 0 ? (
                item.description
              ) : (
                <>
                  The <span className="text-red-600 font-bold">{item.count}</span> {item.description}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
