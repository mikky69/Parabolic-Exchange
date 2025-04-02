import Link from "next/link"
import { ArrowLeft, Copy } from "lucide-react"

export default function Withdraw() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-black">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-black text-xl font-medium ml-4">Withdraw USDT</h1>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            $200 <span className="text-cyan-500 font-medium">USDT</span>
          </p>
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-gray-700 text-sm mb-1 block">Receiver's address</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Paste link here"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="text-gray-700 text-sm mb-1 block">Memo</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Paste link here"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="text-gray-700 text-sm mb-1 block">Payout amount</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 pr-16"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 font-medium">
                  Max
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-1">Minimum 10 USDT</p>
            </div>
          </div>

          <div className="space-y-1 mt-4">
            <p className="text-gray-700 text-xs flex items-start">
              <span className="mr-2">•</span>
              <span>withdrawal rules if necessary</span>
            </p>
            <p className="text-gray-700 text-xs flex items-start">
              <span className="mr-2">•</span>
              <span>withdrawal rules if necessary</span>
            </p>
            <p className="text-gray-700 text-xs flex items-start">
              <span className="mr-2">•</span>
              <span>withdrawal rules if necessary withdrawal rules if necessary</span>
            </p>
          </div>

          <Link href="/withdraw/success" className="block w-full mt-8">
            <button className="w-full bg-purple-900 text-white py-3 rounded-full font-medium">Withdraw</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

