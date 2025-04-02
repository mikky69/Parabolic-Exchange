"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("buy") // buy, sell, all

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/market" className="text-black">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-black text-xl font-medium">Orders</h1>
        <div className="w-6 h-6"></div> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="px-4 flex space-x-2 mb-4">
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            activeTab === "buy" ? "bg-cyan-400 text-black" : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            activeTab === "sell" ? "bg-cyan-400 text-black" : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            activeTab === "all" ? "bg-cyan-400 text-black" : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-4"></div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-gray-200 rounded mb-4"></div>
        <p className="text-gray-500">Nothing found!</p>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto">
        <div className="fixed bottom-0 w-full bg-purple-900 border-t border-purple-800">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <Link href="/market/history" className="flex flex-col items-center py-2 px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span className="text-xs text-gray-300">History</span>
            </Link>
            <Link href="/market/orders" className="flex flex-col items-center py-2 px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-purple-300"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span className="text-xs text-purple-300">Orders</span>
            </Link>
            <Link href="/market/assets" className="flex flex-col items-center py-2 px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <span className="text-xs text-gray-300">Assets</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

