import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const step = searchParams.get("step")

  try {
    // Make request to monitoring API
    const response = await fetch(`https://primary-production-aac6.up.railway.app/webhook/pablo-monitor?step=${step}`, {
      method: "GET",
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in monitor API:", error)
    return NextResponse.json({ error: "Failed to send monitoring data" }, { status: 500 })
  }
}
