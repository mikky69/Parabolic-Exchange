import Link from "next/link"
import { Check } from "lucide-react"

export default function SetPasswordSuccess() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="bg-white rounded-xl p-8 shadow-lg w-full relative">
          <div className="absolute inset-x-0 bottom-0 h-4 bg-purple-200 rounded-b-xl"></div>

          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-800 flex items-center justify-center mb-4">
              <Check size={32} className="text-white" />
            </div>
            <h2 className="text-black text-xl font-bold">Successful!</h2>
          </div>
        </div>

        <Link href="/" className="block w-full mt-8">
          <button className="w-full bg-purple-800 text-white py-3 rounded-lg font-medium">Continue</button>
        </Link>
      </div>
    </main>
  )
}

