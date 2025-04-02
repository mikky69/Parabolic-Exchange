"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { HomeIcon, BarChart2Icon, UsersIcon, UserIcon, Loader, RefreshCw } from "lucide-react"
import { getCryptoData, formatCryptoData } from "@/app/utils/crypto-api"
import CryptoCard from "@/app/components/crypto-card"
import Head from "next/head"

export default function Home() {
  const [cryptoData, setCryptoData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

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

    // Refresh data every 10 seconds but don't show loading state
    const interval = setInterval(() => {
      setRefreshing(true)
      getCryptoData()
        .then((data) => {
          const formatted = formatCryptoData(data)
          setCryptoData(formatted)
          setRefreshing(false)
        })
        .catch((error) => {
          console.error("Error refreshing crypto data", error)
          setRefreshing(false)
        })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleManualRefresh = async () => {
    setRefreshing(true)
    try {
      const data = await getCryptoData()
      const formatted = formatCryptoData(data)
      setCryptoData(formatted)
    } catch (error) {
      console.error("Error refreshing crypto data", error)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <>
      <Head>
        <title>Parabolic Exchange - Web3 P2P Cryptocurrency Exchange</title>
        <meta
          name="description"
          content="Secure, efficient, and user-friendly platform for converting cryptocurrencies to local currencies. Trade Bitcoin, Ethereum, Solana, and stablecoins."
        />
        <meta name="keywords" content="cryptocurrency, exchange, bitcoin, ethereum, solana, p2p, web3, crypto" />
        <meta property="og:title" content="Parabolic Exchange - Web3 P2P Cryptocurrency Exchange" />
        <meta
          property="og:description"
          content="Secure, efficient, and user-friendly platform for converting cryptocurrencies to local currencies."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Parabolic Exchange" />
        <meta name="twitter:description" content="Web3-based peer-to-peer cryptocurrency exchange platform" />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="w-full max-w-md px-4 py-2 flex justify-between items-center">
          <div className="text-cyan-400 font-medium">
            <Link href="/auth/signup" className="hover:text-white transition-colors">
              Sign up
            </Link>{" "}
            /{" "}
            <Link href="/auth/login" className="hover:text-white transition-colors">
              login
            </Link>
          </div>
          <Link href="/profile">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
                priority
                unoptimized
              />
            </div>
          </Link>
        </div>

        <div className="w-full max-w-md px-4 space-y-4 pb-20">
          {/* Asset Card */}
          <div className="w-full bg-purple-800 rounded-xl p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-200 text-sm">Asset</p>
                <div className="flex items-center">
                  <p className="text-white text-xl font-bold">
                    {isLoading ? (
                      <span className="inline-flex items-center">
                        <Loader size={16} className="animate-spin mr-1" />
                        Loading
                      </span>
                    ) : (
                      "$0.0000"
                    )}
                  </p>
                  {refreshing && (
                    <span className="ml-2">
                      <Loader size={12} className="animate-spin text-gray-300" />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleManualRefresh}
                  className="mr-2 p-1 rounded-full hover:bg-purple-700 transition-colors"
                  disabled={refreshing}
                >
                  <RefreshCw size={16} className={`text-gray-300 ${refreshing ? "animate-spin" : ""}`} />
                </button>
                <div className="w-16 h-16 relative">
                  <Image
                    src="/bitcoin.png"
                    alt="Bitcoin"
                    width={64}
                    height={64}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Link href="/convert">
                <button className="bg-white text-purple-900 rounded-full py-1 px-2 text-sm font-medium hover:bg-gray-100 transition-colors active:scale-95 transform duration-150 flex items-center">
                  <RefreshCw size={14} className="mr-1" />
                  Convert
                </button>
              </Link>
              <Link href="/withdraw">
                <button className="bg-white text-purple-900 rounded-full py-1 px-2 text-sm font-medium hover:bg-gray-100 transition-colors active:scale-95 transform duration-150 flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M12 5v14M5 12l7-7 7 7" />
                  </svg>
                  Withdraw
                </button>
              </Link>
              <Link href="/deposit">
                <button className="bg-white text-purple-900 rounded-full py-1 px-2 text-sm font-medium hover:bg-gray-100 transition-colors active:scale-95 transform duration-150 flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M12 19V5M5 12l7 7 7-7" />
                  </svg>
                  Deposit
                </button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-purple-700">
            <button className="text-white pb-2 px-4 border-b-2 border-white font-medium">Crypto</button>
            <button className="text-gray-400 pb-2 px-4 hover:text-gray-200 transition-colors">P2P</button>
          </div>

          {/* Crypto List */}
          <div className="space-y-3">
            {isLoading
              ? // Loading skeleton
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="bg-purple-700/50 rounded-xl p-4 animate-pulse h-24 flex">
                      <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/20 rounded w-1/4"></div>
                        <div className="h-3 bg-white/20 rounded w-1/5"></div>
                        <div className="h-4 bg-white/20 rounded w-full mt-2"></div>
                      </div>
                    </div>
                  ))
              : cryptoData.map((coin) => (
                  <CryptoCard
                    key={coin.id}
                    name={coin.name}
                    symbol={coin.symbol}
                    icon={coin.icon}
                    value={`$${coin.price.toFixed(2)}`}
                    amount={coin.amount}
                    chartData={coin.chartData}
                    color="bg-purple-700"
                    change={coin.change}
                  />
                ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full bg-purple-950 border-t border-purple-800">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <NavItem icon={<HomeIcon size={20} />} label="Home" href="/" active />
            <NavItem icon={<BarChart2Icon size={20} />} label="Market" href="/market" />
            <NavItem icon={<UsersIcon size={20} />} label="P2P" href="/p2p" />
            <NavItem icon={<UserIcon size={20} />} label="Profile" href="/profile" />
          </div>
        </div>
      </main>
    </>
  )
}

function NavItem({ icon, label, href, active }) {
  return (
    <Link href={href} className="flex flex-col items-center py-2 px-4 hover:text-cyan-400 transition-colors">
      <div className={`${active ? "text-cyan-400" : "text-gray-400"}`}>{icon}</div>
      <span className={`text-xs mt-1 ${active ? "text-cyan-400" : "text-gray-400"}`}>{label}</span>
    </Link>
  )
}

