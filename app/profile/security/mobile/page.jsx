"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, Check } from "lucide-react"

export default function MobileSecurityPage() {
  const [phone, setPhone] = useState("+1 234 567 8901")
  const [newPhone, setNewPhone] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newPhone) return
    setShowVerification(true)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (!verificationCode) return
    setIsSuccess(true)
    setTimeout(() => {
      setPhone(newPhone)
      setNewPhone("")
      setVerificationCode("")
      setShowVerification(false)
      setIsSuccess(false)
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link href="/profile/security" className="text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-white text-xl font-medium ml-4">Update Mobile Number</h1>
        </div>

        <div className="bg-purple-800/60 rounded-xl p-4 mb-6 animate-fadeIn">
          <div className="flex items-center mb-2">
            <Phone size={20} className="text-cyan-400 mr-3" />
            <span className="text-white">Current Mobile Number</span>
          </div>
          <p className="text-gray-300 ml-8">{phone}</p>
        </div>

        {!showVerification ? (
          <form onSubmit={handleSubmit} className="space-y-4 animate-slideUp">
            <div className="space-y-2">
              <label className="text-white text-sm">New Mobile Number</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Enter new mobile number"
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-400 text-purple-900 py-3 rounded-lg font-medium hover:bg-cyan-300 transition-all transform hover:scale-105 active:scale-95 duration-200"
            >
              Update Mobile Number
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4 animate-slideUp">
            <div className="bg-purple-800/30 rounded-xl p-4 mb-4">
              <p className="text-white text-sm">
                We've sent a verification code to <span className="text-cyan-400">{newPhone}</span>. Please enter the
                code below to verify your new mobile number.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full px-4 py-3 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-400 text-purple-900 py-3 rounded-lg font-medium hover:bg-cyan-300 transition-all transform hover:scale-105 active:scale-95 duration-200"
            >
              Verify
            </button>
          </form>
        )}

        {isSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4 animate-slideUp">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
                <p className="text-gray-600 text-center mb-4">Your mobile number has been updated successfully.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

