import Link from "next/link"
import { Eye } from "lucide-react"

export default function SetPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-6">
        <div className="flex flex-col items-center w-full mb-8">
          <div className="w-full h-40 relative mb-4">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-24 h-24 bg-purple-900 rounded-md"></div>
                <div className="absolute -top-4 -right-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-purple-600 text-xl font-bold">?</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-6">
                  <div className="w-12 h-8 bg-pink-300 rounded-full"></div>
                </div>
                <div className="absolute -bottom-2 -left-6">
                  <div className="w-12 h-8 bg-pink-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          </div>

          <h1 className="text-black text-xl font-medium">Set password</h1>
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 pl-10 pr-10 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Eye size={18} />
              </button>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-3 pl-10 pr-10 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Eye size={18} />
              </button>
            </div>
          </div>

          <Link href="/auth/success" className="block w-full">
            <button className="w-full bg-purple-900 text-white py-3 rounded-full font-medium">Submit</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

