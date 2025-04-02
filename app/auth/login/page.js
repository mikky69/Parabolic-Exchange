import Link from "next/link"
import { ArrowLeft, Eye, Mail, Lock } from "lucide-react"

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-6">
        <div className="flex items-center mb-8">
          <Link href="/auth" className="text-black">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-black text-xl font-medium ml-4">Login</h1>
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-3">
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
                <Lock size={18} />
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
          </div>

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-purple-800">
              forgot password?
            </Link>
          </div>

          <Link href="/dashboard" className="block w-full">
            <button className="w-full bg-purple-900 text-white py-3 rounded-full font-medium">Submit</button>
          </Link>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-purple-800">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

