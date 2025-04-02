"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"
import { getCryptoData, formatCryptoData } from "@/app/utils/crypto-api"

export default function Deposit() {
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [cryptoData, setCryptoData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getCryptoData()
        const formatted = formatCryptoData(data)
        setCryptoData(formatted)
      } catch (error) {
        console.error("Error fetching crypto data", error)
        // Set fallback data
        setCryptoData([
          {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "BTC",
            icon: "https://assets.coincap.io/assets/icons/btc@2x.png",
            price: 65000,
            amount: "0.00015385",
            change: "2.5",
          },
          {
            id: "ethereum",
            name: "Ethereum",
            symbol: "ETH",
            icon: "https://assets.coincap.io/assets/icons/eth@2x.png",
            price: 3500,
            amount: "0.01428571",
            change: "1.8",
          },
          {
            id: "solana",
            name: "Solana",
            symbol: "SOL",
            icon: "https://assets.coincap.io/assets/icons/sol@2x.png",
            price: 150,
            amount: "0.33333333",
            change: "3.2",
          },
          {
            id: "tether",
            name: "Tether",
            symbol: "USDT",
            icon: "https://assets.coincap.io/assets/icons/usdt@2x.png",
            price: 1,
            amount: "10.00",
            change: "0.01",
          },
          {
            id: "usd-coin",
            name: "USD Coin",
            symbol: "USDC",
            icon: "https://assets.coincap.io/assets/icons/usdc@2x.png",
            price: 1,
            amount: "10.00",
            change: "0.02",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin)
    setShowNetworkModal(true)
  }

  const closeModal = () => {
    setShowNetworkModal(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="w-full max-w-md px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-white text-xl font-medium">Deposit</h1>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <Image src="/avatar.png" alt="Profile" width={32} height={32} className="rounded-full" />
          </div>
        </div>

        <h2 className="text-gray-300 mb-4">Available coins</h2>

        <div className="bg-purple-800/50 rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-center text-gray-300 mb-1">Asset</h3>
          <p className="text-center text-white text-2xl font-bold mb-6">$57.0476</p>

          <div className="grid grid-cols-2 gap-3">
            {isLoading
              ? // Loading skeleton
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="bg-white/10 rounded-full py-3 px-4 flex items-center animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-white/20 mr-3"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-8 bg-white/20 rounded"></div>
                        <div className="h-3 w-6 bg-white/20 rounded"></div>
                      </div>
                    </div>
                  ))
              : cryptoData.map((coin) => (
                  <CoinButton
                    key={coin.id}
                    name={coin.name}
                    symbol={coin.symbol}
                    icon={coin.icon}
                    onClick={() => handleCoinSelect(coin)}
                  />
                ))}
          </div>
        </div>
      </div>

      {/* Network Selection Modal with outside click handler */}
      {showNetworkModal && (
        <div className="fixed inset-0 bg-black/50 z-10 animate-fadeIn" onClick={closeModal}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-black font-medium">Select network</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {selectedCoin && selectedCoin.symbol === "ETH" && (
                <>
                  <Link href={`/deposit/${selectedCoin.symbol}/arbitrum`}>
                    <NetworkOption
                      name="Arbitrum network"
                      description="Ethereum L2 rollup"
                      fee="Transaction fee: ~$0.25-$1.50"
                    />
                  </Link>
                  <Link href={`/deposit/${selectedCoin.symbol}/base`}>
                    <NetworkOption
                      name="Base network"
                      description="Ethereum L2 rollup"
                      fee="Transaction fee: ~$0.10-$0.50"
                    />
                  </Link>
                  <Link href={`/deposit/${selectedCoin.symbol}/eth-mainnet`}>
                    <NetworkOption name="ETH Mainnet" description="Ethereum mainnet" fee="Transaction fee: ~$5-$20" />
                  </Link>
                  <Link href={`/deposit/${selectedCoin.symbol}/optimism`}>
                    <NetworkOption
                      name="Optimism network"
                      description="Ethereum L2 rollup"
                      fee="Transaction fee: ~$0.15-$0.75"
                    />
                  </Link>
                </>
              )}

              {selectedCoin && selectedCoin.symbol === "BTC" && (
                <Link href={`/deposit/${selectedCoin.symbol}/btc`}>
                  <NetworkOption name="BTC network" description="Bitcoin mainnet" fee="Transaction fee: ~$1-$5" />
                </Link>
              )}

              {selectedCoin && selectedCoin.symbol === "SOL" && (
                <Link href={`/deposit/${selectedCoin.symbol}/sol`}>
                  <NetworkOption name="SOL network" description="Solana mainnet" fee="Transaction fee: ~$0.001-$0.01" />
                </Link>
              )}

              {selectedCoin && (selectedCoin.symbol === "USDT" || selectedCoin.symbol === "USDC") && (
                <>
                  <Link href={`/deposit/${selectedCoin.symbol}/arbitrum`}>
                    <NetworkOption
                      name="Arbitrum network"
                      description="Ethereum L2 rollup"
                      fee="Transaction fee: ~$0.25-$1.50"
                    />
                  </Link>
                  <Link href={`/deposit/${selectedCoin.symbol}/optimism`}>
                    <NetworkOption
                      name="Optimism network"
                      description="Ethereum L2 rollup"
                      fee="Transaction fee: ~$0.15-$0.75"
                    />
                  </Link>
                  <Link href={`/deposit/${selectedCoin.symbol}/base`}>
                    <NetworkOption
                      name="Base network"
                      description="Ethereum L2 rollup"
                      fee="Transaction fee: ~$0.10-$0.50"
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function CoinButton({ name, symbol, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white/20 rounded-full py-3 px-4 flex items-center hover:bg-white/30 transition-colors active:scale-95 transform duration-150"
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden">
        <Image
          src={icon || "https://assets.coincap.io/assets/icons/btc@2x.png"}
          alt={name}
          width={24}
          height={24}
          className="object-contain"
          unoptimized
        />
      </div>
      <div>
        <p className="text-white font-medium text-left">{symbol}</p>
        <p className="text-gray-300 text-xs text-left">{symbol}</p>
      </div>
    </button>
  )
}

function NetworkOption({ name, description, fee }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors hover:bg-purple-50 active:bg-purple-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-black font-medium">{name}</p>
          <p className="text-gray-500 text-xs">{description}</p>
          <p className="text-gray-400 text-xs mt-1">{fee}</p>
        </div>
      </div>
    </div>
  )
}

