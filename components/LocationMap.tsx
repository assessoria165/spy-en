"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="loading-spinner"></div>
    </div>
  ),
})

export default function LocationMap() {
  const [locationData, setLocationData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching location:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="card">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p>Locating phone position...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">The phone you want to track was recently located here.</h3>

      {locationData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="text-center">
            <div className="font-semibold text-accent text-lg mb-2">📱 Phone Last Location</div>
            <div className="text-lg font-medium mb-2">
              {locationData.city}, {locationData.region}, {locationData.country_name}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                <strong>Network provider:</strong> {locationData.org}
              </div>
              <div>
                <strong>Coordinates:</strong> {locationData.latitude?.toFixed(6)}, {locationData.longitude?.toFixed(6)}
              </div>
              <div>
                <strong>Last seen:</strong> Recently
              </div>
            </div>
          </div>
        </div>
      )}

      <MapComponent locationData={locationData} />

      {locationData && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 text-center">
          <div className="font-semibold text-secondary text-lg mb-2">📍 Nearby Point of Interest</div>
          <div className="text-gray-700">Location details available in full version</div>
        </div>
      )}
    </div>
  )
}
