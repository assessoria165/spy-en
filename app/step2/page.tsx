import type { Metadata } from "next"
import { Suspense } from "react"
import Step2Progress from "@/components/Step2Progress"
import ProfileDisplay from "@/components/ProfileDisplay"
import StatusAnimation from "@/components/StatusAnimation"

export const metadata: Metadata = {
  title: "Step 2 - Processing | SPY EN",
  description: "Processing your request and analyzing the data",
}

export default function Step2Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="card text-center mb-6">
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold text-yellow-800">
              ⚠️ You have used your last free trial. Stay on this page, otherwise no further trials will be possible.
            </h2>
          </div>

          <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold text-green-800">
              ✅ Success! We found the number. Please wait, we are currently generating the report of the found data.
            </h2>
          </div>

          <h3 className="text-lg font-semibold mb-4">
            Watch the video below in the meantime to better understand the system.👇
          </h3>
        </div>

        <div className="card mb-6">
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <div className="text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              <p>Video Player</p>
            </div>
          </div>
          <p className="text-center text-gray-600">⏰ Usually this operation takes 3 minutes.</p>
        </div>

        <Suspense fallback={<div className="loading-spinner mx-auto"></div>}>
          <ProfileDisplay />
        </Suspense>

        <div className="card mb-6">
          <Step2Progress />
        </div>

        <div className="card">
          <StatusAnimation />
        </div>

        <div className="card text-center">
          <h3 className="text-lg font-semibold mb-2">
            👀 As soon as the progress bar reaches 100%, you will know the whole truth!
          </h3>
          <p className="text-gray-600 mb-4">📡 OrionX satellite has already started tracking the number!</p>
          <div className="text-sm text-green-600">
            🟢 <strong id="user-count">847</strong> people are currently taking the test..
          </div>
        </div>
      </div>
    </div>
  )
}
