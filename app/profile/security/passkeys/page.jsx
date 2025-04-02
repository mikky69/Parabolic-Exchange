"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Key, Plus, Trash2, Check } from "lucide-react"

export default function PasskeysPage() {
  const [passkeys, setPasskeys] = useState([
    { id: 1, name: "MacBook Pro", added: "Added on Jan 15, 2023" },
    { id: 2, name: "iPhone 13", added: "Added on Mar 22, 2023" },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPasskeyName, setNewPasskeyName] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleAddPasskey = (e) => {
    e.preventDefault()
    if (!newPasskeyName) return

    const newPasskey = {
      id: Date.now(),
      name: newPasskeyName,
      added: `Added on ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
    }

    setPasskeys([...passkeys, newPasskey])
    setNewPasskeyName("")
    setShowAddForm(false)
    setSuccessMessage("Passkey added successfully")
    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
    }, 2000)
  }

  const handleRemovePasskey = (id) => {
    setPasskeys(passkeys.filter((passkey) => passkey.id !== id))
    setSuccessMessage("Passkey removed successfully")
    setIsSuccess(true)

    setTimeout(() => {
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
          <h1 className="text-white text-xl font-medium ml-4">Passkeys</h1>
        </div>

        <div className="bg-purple-800/30 rounded-xl p-4 mb-6 animate-fadeIn">
          <p className="text-white text-sm">
            Passkeys are a more secure alternative to passwords. They use biometric data like your fingerprint or face
            to authenticate you.
          </p>
        </div>

        <div className="space-y-4">
          {passkeys.map((passkey) => (
            <div
              key={passkey.id}
              className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between animate-fadeIn"
            >
              <div className="flex items-center">
                <Key size={20} className="text-cyan-400 mr-3" />
                <div>
                  <p className="text-white">{passkey.name}</p>
                  <p className="text-gray-400 text-xs">{passkey.added}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemovePasskey(passkey.id)}
                className="text-red-400 hover:text-red-300 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-6 w-full bg-cyan-400 text-purple-900 py-3 rounded-lg font-medium hover:bg-cyan-300 transition-all transform hover:scale-105 active:scale-95 duration-200 flex items-center justify-center"
          >
            <Plus size={18} className="mr-2" />
            Add New Passkey
          </button>
        ) : (
          <form onSubmit={handleAddPasskey} className="mt-6 space-y-4 animate-slideUp">
            <div className="space-y-2">
              <label className="text-white text-sm">Device Name</label>
              <input
                type="text"
                value={newPasskeyName}
                onChange={(e) => setNewPasskeyName(e.target.value)}
                placeholder="Enter device name"
                className="w-full px-4 py-3 rounded-lg border border-purple-700 bg-purple-800/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-purple-800 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-cyan-400 text-purple-900 py-3 rounded-lg font-medium hover:bg-cyan-300 transition-all transform hover:scale-105 active:scale-95 duration-200"
              >
                Add Passkey
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
                <p className="text-gray-600 text-center mb-4">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

