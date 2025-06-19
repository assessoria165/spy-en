"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function ProfileDisplay() {
  const [photoUrl, setPhotoUrl] = useState("/private_profile.svg")
  const [phoneNumber, setPhoneNumber] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const photo = searchParams.get("photo")
    const tel = searchParams.get("tel")

    if (tel) {
      setPhoneNumber(tel)
    }

    if (photo) {
      setPhotoUrl(photo)
    } else if (tel && !photo) {
      // Fetch photo from API if not provided
      fetchPhotoFromAPI(tel)
    }
  }, [searchParams])

  const fetchPhotoFromAPI = async (phoneNumber: string) => {
    try {
      const response = await fetch(`/api/whatsapp-photo?tel=${phoneNumber}`)
      const data = await response.json()

      if (data.success && data.result && !data.is_photo_private) {
        setPhotoUrl(data.result)
      } else {
        setPhotoUrl("/private_profile.svg")
      }
    } catch (error) {
      console.error("Error fetching photo:", error)
      setPhotoUrl("/private_profile.svg")
    }
  }

  return (
    <div className="card text-center">
      <div className="w-72 h-72 mx-auto mb-4 relative">
        <Image
          src={photoUrl || "/placeholder.svg"}
          alt="Profile Photo"
          fill
          className="rounded-full object-cover"
          onError={() => setPhotoUrl("/private_profile.svg")}
        />
      </div>
      {phoneNumber && <p className="text-lg font-semibold text-green-600">{phoneNumber}</p>}
    </div>
  )
}
