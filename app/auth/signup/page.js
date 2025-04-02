import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, User, Mail, Phone } from "lucide-react"

export default function Signup() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/auth" className="text-black">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-black text-xl font-medium ml-4">Sign up</h1>
        </div>

        <div className="flex flex-col items-center w-full mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <User size={40} className="text-gray-500" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300">
              <Plus size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-start">
            <input type="checkbox" id="terms" className="mt-1 mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link href="/terms" className="text-purple-800 underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/conditions" className="text-purple-800 underline">
                Conditions
              </Link>
              .
            </label>
          </div>

          <Link href="/auth/check-email-signup" className="block w-full">
            <button className="w-full bg-purple-900 text-white py-3 rounded-full font-medium">Submit</button>
          </Link>

          <div className="flex items-center justify-center">
            <button className="flex items-center justify-center text-gray-700 font-medium">
              <Image src="/google-logo.png" alt="Google" width={20} height={20} className="mr-2" />
              Sign up with Google
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-purple-800">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

