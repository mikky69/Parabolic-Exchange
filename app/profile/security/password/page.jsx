"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Eye, EyeOff, Check } from "lucide-react"

export default function PasswordSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setError("")
    setIsSuccess(true)

    setTimeout(() => {
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
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
          <h1 className="text-white text-xl font-medium ml-4">Change Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 animate-slideUp">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg animate-fadeIn">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-white text-sm">Current Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm">New Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm">Confirm New Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-cyan-400 text-purple-900 py-3 rounded-lg font-medium hover:bg-cyan-300 transition-all transform hover:scale-105 active:scale-95 duration-200"
            >
              Update Password
            </button>
          </div>
        </form>

        {isSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4 animate-slideUp">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
                <p className="text-gray-600 text-center mb-4">Your password has been updated successfully.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

