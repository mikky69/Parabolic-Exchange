import Link from "next/link"

export default function CheckEmailPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-6">
        <div className="flex flex-col items-center justify-center w-full px-4 py-8">
          <div className="relative w-full h-40 mb-6">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2">
              <div className="w-8 h-8 rounded-full bg-green-400"></div>
            </div>
            <div className="absolute top-4 right-1/3 transform translate-x-1/2">
              <div className="w-10 h-10 rounded-full bg-blue-500"></div>
            </div>
            <div className="absolute top-10 right-1/4">
              <div className="w-8 h-8 rounded-full bg-black"></div>
            </div>

            {/* Email envelope with checkmark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-16 border-2 border-gray-200 rounded-lg flex items-center justify-center relative">
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 8L7 12L13 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-16 h-1 bg-purple-600 absolute bottom-3"></div>
              </div>
            </div>
          </div>

          <h2 className="text-black text-xl font-bold mb-2">Check your email!</h2>
          <p className="text-gray-600 text-center text-sm mb-8">
            We've sent a mail to your email address, please
            <br />
            check and verify your password.
          </p>

          <Link href="/auth/reset-password" className="block w-full">
            <button className="w-full bg-purple-900 text-white py-3 rounded-full font-medium">Resend mail</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

