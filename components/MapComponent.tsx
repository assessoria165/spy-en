"use client"

import { useEffect, useRef } from "react"

interface LocationData {
  latitude: number
  longitude: number
  city: string
  region: string
  country_name: string
  org: string
}

interface MapComponentProps {
  locationData: LocationData | null
}

export default function MapComponent({ locationData }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!locationData || !mapRef.current) return

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!).setView([locationData.latitude, locationData.longitude], 15)

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map)

      // User location marker
      const userIcon = L.divIcon({
        html: '<div style="background-color:#4285F4; width:16px; height:16px; border-radius:50%; border:2px solid white;"></div>',
        className: "user-location-marker",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      L.marker([locationData.latitude, locationData.longitude], { icon: userIcon })
        .addTo(map)
        .bindPopup("<strong>Target Location</strong>")

      // Accuracy circle
      L.circle([locationData.latitude, locationData.longitude], {
        color: "#4285F4",
        fillColor: "#4285F4",
        fillOpacity: 0.15,
        radius: 1000,
      }).addTo(map)

      // Nearby point of interest
      const poiLat = locationData.latitude + 0.003
      const poiLng = locationData.longitude - 0.002

      const poiIcon = L.divIcon({
        html: '<div style="background-color:#FF5252; width:24px; height:24px; border-radius:12px; border:3px solid white; display:flex; justify-content:center; align-items:center; color:white; font-weight:bold;">!</div>',
        className: "poi-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      })

      L.marker([poiLat, poiLng], { icon: poiIcon }).addTo(map).bindPopup("Point of Interest")

      return () => {
        map.remove()
      }
    })
  }, [locationData])

  return <div ref={mapRef} className="h-96 w-full rounded-lg shadow-lg" style={{ minHeight: "400px" }} />
}
