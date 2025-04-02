"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, Check } from "lucide-react"

export default function DeactivateAccountPage() {
  const [reason, setReason] = useState("")
  const [password, setPassword] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsConfirming(true)
  }

  const handleConfirm = () => {
    setIsSuccess(true)
    setTimeout(() => {
      window.location.href = "/auth"
    }, 2000)
  }

  const handleCancel = () => {
    setIsConfirming(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link href="/profile/security" className="text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-white text-xl font-medium ml-4">Deactivate Account</h1>
        </div>

        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6 animate-fadeIn">
          <div className="flex items-start">
            <AlertTriangle size={20} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
            <p className="text-white text-sm">
              Warning: Deactivating your account will remove all your data and cannot be undone. Please proceed with
              caution.
            </p>
          </div>
        </div>

        {!isConfirming ? (
          <form onSubmit={handleSubmit} className="space-y-4 animate-slideUp">
            <div className="space-y-2">
              <label className="text-white text-sm">Reason for deactivation (optional)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us why you're leaving..."
                className="w-full px-4 py-3 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Enter your password to confirm</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-all transform hover:scale-105 active:scale-95 duration-200"
            >
              Deactivate Account
            </button>
          </form>
        ) : (
          <div className="space-y-4 animate-slideUp">
            <div className="bg-purple-800/30 rounded-xl p-4 mb-4">
              <p className="text-white text-sm text-center">
                Are you absolutely sure you want to deactivate your account? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex-1 bg-purple-800 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-all transform hover:scale-105 active:scale-95 duration-200"
              >
                Yes, Deactivate
              </button>
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4 animate-slideUp">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Account Deactivated</h2>
                <p className="text-gray-600 text-center mb-4">
                  Your account has been successfully deactivated. You will be redirected to the login page.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

