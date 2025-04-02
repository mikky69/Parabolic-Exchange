import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-6">
        <div className="flex items-center mb-8">
          <Link href="/auth/login" className="text-black">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-black text-xl font-medium ml-4">Forget password</h1>
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <Link href="/auth/check-email-password" className="block w-full">
            <button className="w-full bg-purple-900 text-white py-3 rounded-full font-medium">Submit</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

