"use client"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, Phone, Key, Shield, AlertCircle, ChevronRight } from "lucide-react"

export default function SecurityPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link href="/profile" className="text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-white text-xl font-medium ml-4">Security</h1>
        </div>

        <div className="space-y-3 animate-fadeIn">
          <Link href="/profile/security/email">
            <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between hover:bg-purple-700/60 transition-colors duration-200">
              <div className="flex items-center">
                <Mail size={20} className="text-white mr-3" />
                <span className="text-white">Email</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/profile/security/password">
            <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between hover:bg-purple-700/60 transition-colors duration-200">
              <div className="flex items-center">
                <Lock size={20} className="text-white mr-3" />
                <span className="text-white">Change Password</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/profile/security/mobile">
            <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between hover:bg-purple-700/60 transition-colors duration-200">
              <div className="flex items-center">
                <Phone size={20} className="text-white mr-3" />
                <span className="text-white">Update Mobile No.</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/profile/security/passkeys">
            <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between hover:bg-purple-700/60 transition-colors duration-200">
              <div className="flex items-center">
                <Key size={20} className="text-white mr-3" />
                <span className="text-white">Passkeys</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/profile/security/2fa">
            <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between hover:bg-purple-700/60 transition-colors duration-200">
              <div className="flex items-center">
                <Shield size={20} className="text-white mr-3" />
                <span className="text-white">Set Up 2FA Verification</span>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
              </div>
            </div>
          </Link>

          <Link href="/profile/security/deactivate">
            <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between hover:bg-purple-700/60 transition-colors duration-200">
              <div className="flex items-center">
                <AlertCircle size={20} className="text-red-400 mr-3" />
                <span className="text-white">Deactivate Account</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}

