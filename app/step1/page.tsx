import type { Metadata } from "next"
import Step1Form from "@/components/Step1Form"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Step 1 - Enter Phone Number | SPY EN",
  description: "Enter the phone number you want to monitor and track",
}

export default function Step1Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="text-center mb-8">
          <div className="w-60 h-60 mx-auto mb-6">
            <img src="/images/spy-logo.png" alt="SPY EN Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Are you tired of constant suspicion? Get the answers you need now.
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">First step</h3>
            <p className="text-gray-600">Enter the number of the person you want to monitor and track.</p>
          </div>

          <div className="card">
            <div className="bg-gray-400 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Second step</h3>
            <p className="text-gray-600">Wait while the system secretly scans messages and all media files.</p>
          </div>

          <div className="card">
            <div className="bg-gray-400 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Third step</h3>
            <p className="text-gray-600">
              View all monitored messages and suspicious files detected by our spy software.
            </p>
          </div>
        </div>

        <div className="card max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">ENTER YOUR PARTNER NUMBER BELOW 👇</h2>
          <p className="text-sm text-gray-600 mb-6">It is not necessary to enter the country code, only the number.</p>

          <Suspense fallback={<div className="loading-spinner mx-auto"></div>}>
            <Step1Form />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
