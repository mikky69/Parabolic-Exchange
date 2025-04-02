"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Home,
  BarChart2,
  Users,
  User,
  Shield,
  Info,
  HelpCircle,
  Star,
  ChevronRight,
  Mail,
  Lock,
  Phone,
  Key,
  AlertCircle,
  MessageSquare,
} from "lucide-react"

// Import the ImageWithFallback component
import ImageWithFallback from "@/app/components/image-with-fallback"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("main")

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="w-full max-w-md px-4 py-4">
        {activeTab !== "main" && (
          <div className="flex items-center mb-6">
            <button onClick={() => setActiveTab("main")} className="text-white hover:text-cyan-400 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-white text-xl font-medium ml-4 capitalize">{activeTab}</h1>
            <div className="ml-auto">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <ImageWithFallback
                  src="/avatar.png"
                  fallbackSrc="/placeholder.svg?height=32&width=32"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "main" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="text-white hover:text-cyan-400 transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <ImageWithFallback
                  src="/avatar.png"
                  fallbackSrc="/placeholder.svg?height=32&width=32"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 mb-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                <ImageWithFallback
                  src="/avatar.png"
                  fallbackSrc="/placeholder.svg?height=48&width=48"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-white font-medium">sandraali@gmail.com</p>
                <p className="text-gray-300 text-sm flex items-center">
                  ID: 77265954B
                  <span className="ml-2 bg-pink-500 text-white text-xs px-1 rounded">ID</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <ProfileMenuItem icon={<Shield size={20} />} title="Security" onClick={() => setActiveTab("security")} />
              <ProfileMenuItem icon={<Info size={20} />} title="About Us" onClick={() => setActiveTab("about us")} />
              <ProfileMenuItem
                icon={<HelpCircle size={20} />}
                title="Help & Support"
                onClick={() => setActiveTab("help & support")}
              />
              <ProfileMenuItem
                icon={<Star size={20} />}
                title="Rate Our App"
                onClick={() => window.open("https://play.google.com")}
              />
            </div>

            <div className="mt-auto pt-12">
              <button
                className="w-full bg-white text-purple-900 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors active:scale-98 transform duration-150"
                onClick={() => (window.location.href = "/auth")}
              >
                Sign Out
              </button>
            </div>
          </>
        )}

        {activeTab === "security" && <SecurityContent />}
        {activeTab === "about us" && <AboutUsContent />}
        {activeTab === "help & support" && <HelpSupportContent />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-purple-950 border-t border-purple-800">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <NavItem icon={<Home size={20} />} label="Home" href="/" />
          <NavItem icon={<BarChart2 size={20} />} label="Market" href="/market" />
          <NavItem icon={<Users size={20} />} label="P2P" href="/p2p" />
          <NavItem icon={<User size={20} />} label="Profile" href="/profile" active />
        </div>
      </div>
    </main>
  )
}

function SecurityContent() {
  return (
    <div className="space-y-3">
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
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
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
  )
}

function AboutUsContent() {
  return (
    <div className="space-y-4">
      <div className="bg-purple-800/60 rounded-xl p-4 flex items-center">
        <Info size={20} className="text-cyan-400 mr-3" />
        <span className="text-white">Your app is up to date</span>
      </div>

      <div className="bg-purple-800/30 rounded-xl p-4">
        <p className="text-gray-200 text-sm leading-relaxed">
          Parabolic Exchange is a web3-based P2P crypto exchange designed to provide a secure, efficient, and
          user-friendly platform for converting cryptocurrencies to local currencies. It is built on the latest
          blockchain technology to ensure maximum security.
        </p>
        <p className="text-gray-200 text-sm leading-relaxed mt-4">
          Parabolic Exchange is a web3-based P2P crypto exchange designed to provide a secure, efficient, and
          user-friendly platform for converting cryptocurrencies to local currencies. It is built on the latest
          blockchain technology to ensure maximum security.
        </p>
        <p className="text-gray-200 text-sm leading-relaxed mt-4">
          Parabolic Exchange is a web3-based P2P crypto exchange designed to provide a secure, efficient, and
          user-friendly platform for converting cryptocurrencies to local currencies. It is built on the latest
          blockchain technology to ensure maximum security.
        </p>
      </div>
    </div>
  )
}

function HelpSupportContent() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 mb-4">
        <h3 className="text-black font-medium mb-4">How can we be of help?</h3>

        <div className="space-y-4">
          <div className="flex items-start border-b border-gray-200 pb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <HelpCircle size={20} className="text-purple-800" />
            </div>
            <div>
              <p className="text-black font-medium">Help</p>
              <p className="text-gray-500 text-sm">Get helpful tips</p>
            </div>
          </div>

          <div className="flex items-start border-b border-gray-200 pb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <Phone size={20} className="text-purple-800" />
            </div>
            <div>
              <p className="text-black font-medium">Call us</p>
              <p className="text-gray-500 text-sm">+1-800-555-1234</p>
            </div>
          </div>

          <div className="flex items-start border-b border-gray-200 pb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <MessageSquare size={20} className="text-purple-800" />
            </div>
            <div>
              <p className="text-black font-medium">FAQ</p>
              <p className="text-gray-500 text-sm">Get quick answers</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <Star size={20} className="text-purple-800" />
            </div>
            <div>
              <p className="text-black font-medium">Feedback</p>
              <p className="text-gray-500 text-sm">We want to hear from you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileMenuItem({ icon, title, onClick }) {
  return (
    <button
      className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between w-full hover:bg-purple-700/60 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="text-white mr-3">{icon}</div>
        <span className="text-white">{title}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </button>
  )
}

function SecurityMenuItem({ icon, title }) {
  return (
    <div className="bg-purple-800/60 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white mr-3">{icon}</div>
        <span className="text-white">{title}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  )
}

function NavItem({ icon, label, href, active }) {
  return (
    <Link href={href} className="flex flex-col items-center py-2 px-4 hover:text-cyan-400 transition-colors">
      <div className={`${active ? "text-cyan-400" : "text-gray-400"}`}>{icon}</div>
      <span className={`text-xs mt-1 ${active ? "text-cyan-400" : "text-gray-400"}`}>{label}</span>
    </Link>
  )
}

