import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function CheckEmail() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-6">
        <div className="flex items-center mb-8">
          <Link href="/auth/forgot-password" className="text-black">
            <ArrowLeft size={20} />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center w-full px-4 py-8">
          <div className="relative w-32 h-32 mb-6">
            <Image src="/email-check.png" alt="Check your email" width={128} height={128} className="object-contain" />
            <div className="absolute -top-4 -right-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xl">@</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4">
              <div className="w-8 h-8 rounded-full bg-teal-500"></div>
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-purple-800"></div>
            </div>
          </div>

          <h2 className="text-black text-xl font-bold mb-2">Check your email!</h2>
          <p className="text-gray-600 text-center mb-8">
            We've sent a link to your email address. Please check your inbox.
          </p>

          <Link href="/auth/reset-password" className="block w-full">
            <button className="w-full bg-purple-800 text-white py-3 rounded-lg font-medium">Resend mail</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

