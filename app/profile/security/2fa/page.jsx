"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Check, Smartphone, Mail } from "lucide-react"

export default function TwoFactorAuthPage() {
  const [method, setMethod] = useState("none") // none, app, sms, email
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod)
    if (selectedMethod !== "none") {
      setShowVerification(true)
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (!verificationCode) return
    setIsSuccess(true)
    setTimeout(() => {
      setVerificationCode("")
      setShowVerification(false)
      setIsSuccess(false)
    }, 2000)
  }

  const handleDisable = () => {
    setMethod("none")
    setShowVerification(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link href="/profile/security" className="text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-white text-xl font-medium ml-4">Two-Factor Authentication</h1>
        </div>

        <div className="bg-purple-800/30 rounded-xl p-4 mb-6 animate-fadeIn">
          <p className="text-white text-sm">
            Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to
            provide a verification code in addition to your password when signing in.
          </p>
        </div>

        {!showVerification ? (
          <div className="space-y-4">
            <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center">
                <Shield size={20} className="text-cyan-400 mr-3" />
                <div>
                  <p className="text-white">2FA Status</p>
                  <p className={`text-sm ${method === "none" ? "text-red-400" : "text-green-400"}`}>
                    {method === "none" ? "Not Enabled" : "Enabled"}
                  </p>
                </div>
              </div>
              {method !== "none" && (
                <button onClick={handleDisable} className="text-red-400 hover:text-red-300 transition-colors text-sm">
                  Disable
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Authentication Method</label>

              <button
                onClick={() => handleMethodSelect("app")}
                className={`w-full p-4 rounded-lg flex items-center ${
                  method === "app"
                    ? "bg-cyan-400 text-purple-900"
                    : "bg-purple-800/60 text-white hover:bg-purple-700/60"
                } transition-colors duration-200 mb-2`}
              >
                <Smartphone size={20} className="mr-3" />
                <div className="text-left">
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm opacity-80">Use an app like Google Authenticator</p>
                </div>
                {method === "app" && <Check size={20} className="ml-auto" />}
              </button>

              <button
                onClick={() => handleMethodSelect("sms")}
                className={`w-full p-4 rounded-lg flex items-center ${
                  method === "sms"
                    ? "bg-cyan-400 text-purple-900"
                    : "bg-purple-800/60 text-white hover:bg-purple-700/60"
                } transition-colors duration-200 mb-2`}
              >
                <Smartphone size={20} className="mr-3" />
                <div className="text-left">
                  <p className="font-medium">SMS Authentication</p>
                  <p className="text-sm opacity-80">Receive codes via text message</p>
                </div>
                {method === "sms" && <Check size={20} className="ml-auto" />}
              </button>

              <button
                onClick={() => handleMethodSelect("email")}
                className={`w-full p-4 rounded-lg flex items-center ${
                  method === "email"
                    ? "bg-cyan-400 text-purple-900"
                    : "bg-purple-800/60 text-white hover:bg-purple-700/60"
                } transition-colors duration-200`}
              >
                <Mail size={20} className="mr-3" />
                <div className="text-left">
                  <p className="font-medium">Email Authentication</p>
                  <p className="text-sm opacity-80">Receive codes via email</p>
                </div>
                {method === "email" && <Check size={20} className="ml-auto" />}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4 animate-slideUp">
            <div className="bg-purple-800/30 rounded-xl p-4 mb-4">
              <p className="text-white text-sm">
                {method === "app" &&
                  "Scan the QR code with your authenticator app and enter the verification code below."}
                {method === "sms" && "We've sent a verification code to your phone. Please enter the code below."}
                {method === "email" && "We've sent a verification code to your email. Please enter the code below."}
              </p>
            </div>

            {method === "app" && (
              <div className="flex justify-center mb-4">
                <div className="w-48 h-48 bg-white p-4 rounded-lg">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="black" strokeWidth="1" />
                    <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="black" />
                    <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="white" />
                    <path d="M45,45 L55,45 L55,55 L45,55 Z" fill="black" />
                  </svg>
                </div>
              </div>
            )}

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

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowVerification(false)}
                className="flex-1 bg-purple-800 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-cyan-400 text-purple-900 py-3 rounded-lg font-medium hover:bg-cyan-300 transition-all transform hover:scale-105 active:scale-95 duration-200"
              >
                Verify
              </button>
            </div>
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
                <p className="text-gray-600 text-center mb-4">
                  Two-factor authentication has been enabled successfully.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

