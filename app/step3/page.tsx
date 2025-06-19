import type { Metadata } from "next"
import { Suspense } from "react"
import ProfileDisplay from "@/components/ProfileDisplay"
import LocationMap from "@/components/LocationMap"
import PricingCard from "@/components/PricingCard"
import SuspiciousActivity from "@/components/SuspiciousActivity"

export const metadata: Metadata = {
  title: "Step 3 - Results | SPY EN",
  description: "View your tracking results and get full access",
}

export default function Step3Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="card text-center mb-6">
          <div className="bg-red-100 border border-red-400 rounded-lg p-4 mb-6">
            <h1 className="text-2xl font-bold text-red-800 mb-2">EMERGENCY ALERT!</h1>
            <p className="text-red-700 font-semibold">Your relationship could be in danger!</p>
          </div>

          <h2 className="text-lg font-semibold mb-4">
            Our data-driven algorithm, using words and photos, detected suspicious messages and files…
          </h2>

          <div className="bg-blue-100 border border-blue-400 rounded-lg p-4">
            <h3 className="font-semibold">
              Report exported with 98% accuracy on: <span id="current-date"></span>
            </h3>
          </div>
        </div>

        <Suspense fallback={<div className="loading-spinner mx-auto"></div>}>
          <ProfileDisplay />
        </Suspense>

        <SuspiciousActivity />

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">We have detected suspicious messages on WhatsApp.</h3>
            <p className="text-sm text-gray-600 mb-4">(Get access to the app to view messages.)</p>
            <div className="bg-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p>WhatsApp Messages Preview</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">We have detected photos and videos containing nudity.</h3>
            <p className="text-sm text-gray-600 mb-4">(Get access to the app to view photos without censorship.)</p>
            <div className="bg-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Censored Content Preview</p>
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="loading-spinner mx-auto"></div>}>
          <LocationMap />
        </Suspense>

        <div className="card text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4">
            <img src="/images/warning-icon.webp" alt="Warning" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-xl font-bold mb-4">You have reached the end of your free consultation.</h3>
          <div className="text-left max-w-2xl mx-auto space-y-4 text-gray-700">
            <p>I know you're tired of guessing and want some real answers.</p>
            <p>
              Our satellite tracking system is the most advanced technology to find out what's going on. But there's a
              catch: keeping the satellites and servers running 24/7 is expensive.
            </p>
            <p>That's why, unfortunately, we can't provide more than 5% of the information we uncover for free.</p>
            <p>The good news? You don't have to spend a fortune to hire a private investigator.</p>
            <p>
              We've developed an app that puts that same technology in your hands and lets you track everything
              discreetly and efficiently on your own.
            </p>
            <p>
              And the best part? The costs are a fraction of what you'd pay for an investigator – just enough to keep
              our satellites and system running.
            </p>
            <p className="font-semibold">
              It's time to stop guessing and find out the truth. The answers are waiting for you. Click now and get
              instant access – before it's too late!
            </p>
          </div>
        </div>

        <PricingCard />

        <div className="card text-center">
          <div className="w-24 h-24 mx-auto mb-4">
            <img src="/images/guarantee-badge.png" alt="30 Day Guarantee" className="w-full h-full object-contain" />
          </div>
          <div className="max-w-2xl mx-auto text-gray-700 space-y-4">
            <p>
              Under French law, we are required to refund you if you are not satisfied with the app within 14 days.
              However, because we are so confident that our app works perfectly, we have extended this guarantee to 30
              days.
            </p>
            <p>
              This means you have twice as much time to test the app and see the results for yourself – completely
              risk-free. If for any reason you are not satisfied, we will refund you – no questions asked.
            </p>
            <p>
              If you have any questions regarding refunds, please contact: <strong>Customer Service</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
