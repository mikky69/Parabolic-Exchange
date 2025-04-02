"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { HomeIcon, BarChart2Icon, UsersIcon, UserIcon, TrendingUp, TrendingDown } from "lucide-react"
import { getCryptoData, formatCryptoData } from "@/app/utils/crypto-api"
import CryptoChart from "@/app/components/crypto-chart"

export default function Auth() {
  const [cryptoData, setCryptoData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("crypto") // crypto or p2p

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getCryptoData()
        const formatted = formatCryptoData(data)
        setCryptoData(formatted)
      } catch (error) {
        console.error("Error fetching crypto data", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="w-full max-w-md px-4 py-2 flex justify-between items-center">
        <div className="text-gray-200 font-medium">
          <span>Asset</span>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded-sm"></div>
      </div>

      <div className="w-full max-w-md px-4 space-y-4 pb-20">
        {/* Asset Card */}
        <div className="w-full bg-purple-800 rounded-xl p-4 relative overflow-hidden shadow-lg animate-fadeIn">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-200 text-sm">Asset</p>
              <p className="text-white text-xl font-bold">$57.0476</p>
            </div>
            <div className="w-16 h-16 relative animate-pulse">
              <Image
                src={cryptoData[0]?.icon || "/bitcoin.png"}
                alt="Bitcoin"
                width={64}
                height={64}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-white text-purple-900 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 duration-200">
              Convert
            </button>
            <button className="bg-white text-purple-900 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 duration-200">
              Withdraw
            </button>
            <button className="bg-white text-purple-900 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 duration-200">
              P2P
            </button>
            <button className="bg-white text-purple-900 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 duration-200">
              Deposit
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-purple-700">
          <button
            className={`text-white pb-2 px-4 ${activeTab === "crypto" ? "border-b-2 border-white font-medium" : "text-gray-400"}`}
            onClick={() => setActiveTab("crypto")}
          >
            Crypto
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === "p2p" ? "text-white border-b-2 border-white font-medium" : "text-gray-400"}`}
            onClick={() => setActiveTab("p2p")}
          >
            P2P
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl p-6 relative animate-slideUp">
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M5,20 L20,5 M5,20 L20,35" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex space-x-2">
            <Link href="/auth/signup" className="flex-1">
              <button className="w-full bg-purple-600 text-cyan-300 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 duration-200">
                Sign up
              </button>
            </Link>
            <Link href="/auth/login" className="flex-1">
              <button className="w-full bg-purple-600 text-cyan-300 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Crypto List */}
        <div className="space-y-3">
          {isLoading
            ? // Loading skeletons
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="bg-purple-700 rounded-xl p-4 animate-pulse">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <div className="h-4 bg-white/20 rounded w-16 mb-1"></div>
                            <div className="h-3 bg-white/20 rounded w-10"></div>
                          </div>
                          <div className="text-right">
                            <div className="h-4 bg-white/20 rounded w-12 mb-1"></div>
                            <div className="h-3 bg-white/20 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="mt-2 h-5 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))
            : cryptoData.slice(0, 3).map((coin, index) => (
                <CryptoCard
                  key={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  icon={coin.icon}
                  value={`$${coin.price.toFixed(1)}`}
                  amount={coin.amount}
                  color="bg-purple-700"
                  chartData={coin.chartData}
                  change={coin.change}
                  delay={index * 150} // Staggered animation delay
                />
              ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-purple-950 border-t border-purple-800">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <NavItem icon={<HomeIcon size={20} />} label="Home" active />
          <NavItem icon={<BarChart2Icon size={20} />} label="Market" href="/market" />
          <NavItem icon={<UsersIcon size={20} />} label="P2P" href="/p2p" />
          <NavItem icon={<UserIcon size={20} />} label="Profile" href="/profile" />
        </div>
      </div>
    </main>
  )
}

function CryptoCard({ name, symbol, icon, value, amount, color, chartData, change, delay = 0 }) {
  const isPositive = Number.parseFloat(change) >= 0
  const changeColor = isPositive ? "text-green-400" : "text-red-400"
  const changePrefix = isPositive ? "+" : ""

  return (
    <div
      className={`${color} rounded-xl p-4 flex flex-col hover:bg-purple-600 transition-colors duration-300 shadow-md animate-fadeIn`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden">
          <Image
            src={icon || "/placeholder.svg"}
            alt={name}
            width={32}
            height={32}
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <p className="text-cyan-400 font-medium">{name}</p>
              <p className="text-gray-300 text-xs">{symbol}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <p className="text-white font-medium mr-1">{value}</p>
                <span className={`text-xs ${changeColor} flex items-center`}>
                  {isPositive ? (
                    <TrendingUp size={14} className="mr-0.5" />
                  ) : (
                    <TrendingDown size={14} className="mr-0.5" />
                  )}
                  {changePrefix}
                  {change}%
                </span>
              </div>
              <p className="text-gray-300 text-xs">{amount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-14 mt-1">
        {chartData ? (
          <CryptoChart data={chartData} color={isPositive ? "#10b981" : "#ef4444"} height={40} />
        ) : (
          <svg width="100%" height="20" viewBox="0 0 100 20">
            <path d="M0,10 Q10,5 20,15 T40,5 T60,15 T80,5 T100,10" fill="none" stroke="#ff00ff" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </div>
  )
}

function NavItem({ icon, label, active, href = "/" }) {
  return (
    <Link href={href} className="flex flex-col items-center py-2 px-4 hover:text-cyan-400 transition-colors">
      <div className={`${active ? "text-cyan-400" : "text-gray-400"}`}>{icon}</div>
      <span className={`text-xs mt-1 ${active ? "text-cyan-400" : "text-gray-400"}`}>{label}</span>
    </Link>
  )
}

