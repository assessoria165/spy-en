import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tel = searchParams.get("tel")

  if (!tel) {
    return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
  }

  try {
    // Clean phone number
    const cleanPhone = tel.replace(/\D/g, "")

    // Make request to external API
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

    const data = await response.json()

    // Check if photo is private or default
    const isPhotoPrivate = !data.link || data.link === null || (data.link && data.link.includes("no-user-image-icon"))

    return NextResponse.json({
      success: true,
      result: isPhotoPrivate ? "/private_profile.svg" : data.link,
      is_photo_private: isPhotoPrivate,
    })
  } catch (error) {
    console.error("Error in WhatsApp API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        result: "/private_profile.svg",
        is_photo_private: true,
      },
      { status: 500 },
    )
  }
}
