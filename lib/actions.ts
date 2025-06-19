"use server"

interface WhatsAppResponse {
  success: boolean
  result?: string
  is_photo_private?: boolean
  error?: string
}

export async function submitPhoneNumber(phoneNumber: string) {
  try {
    // Clean phone number
    const cleanPhone = phoneNumber.replace(/\D/g, "")

    // Make request to WhatsApp API
    const response = await fetch(
      `https://primary-production-aac6.up.railway.app/webhook/request_photo?tel=${cleanPhone}`,
      {
        method: "GET",
        headers: {
          Origin: "https://whatspy.chat",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`)
    }

    const data: WhatsAppResponse = await response.json()

    if (data.success) {
      return {
        success: true,
        photoUrl: data.is_photo_private ? "/private_profile.svg" : data.result,
        isPrivate: data.is_photo_private || false,
      }
    } else {
      return {
        success: false,
        error: data.error || "Unknown error",
        photoUrl: "/private_profile.svg",
      }
    }
  } catch (error) {
    console.error("Error in submitPhoneNumber:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      photoUrl: "/private_profile.svg",
    }
  }
}
