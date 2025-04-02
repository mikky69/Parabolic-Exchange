"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Copy, Wifi, Check } from "lucide-react"

export default function DepositAddress({ params }) {
  const { coin, network } = params
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  // This would normally be fetched from an API or generated
  const walletAddress = "f1mmp4akpgwpxj3zzgfyuqpqrd33zzgfyuqpqrd33zzgfyuqpqrd33"

  const getNetworkDisplayName = () => {
    if (network === "eth-mainnet") return "ETH Mainnet"
    if (network === "arbitrum") return "Arbitrum network"
    if (network === "base") return "Base network"
    if (network === "optimism") return "Optimism network"
    if (network === "sol") return "SOL network"
    if (network === "btc") return "BTC network"
    return network
  }

  const getTransactionFee = () => {
    if (coin === "BTC") return "0.0001 BTC"
    if (coin === "SOL") return "0.00001 SOL"
    if (coin === "ETH") return "0.001 ETH"
    if (coin === "USDT") return "1 USDT"
    if (coin === "USDC") return "1 USDC"
    return "0.001 ETH"
  }

  const getMinWithdrawal = () => {
    if (coin === "BTC") return "0.001 BTC"
    if (coin === "ETH") return "0.01 ETH"
    if (coin === "SOL") return "0.1 SOL"
    if (coin === "USDT") return "10 USDT"
    if (coin === "USDC") return "10 USDC"
    return "0.01 ETH"
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveAndShare = () => {
    // In a real app, this would save the address to user's account
    // For now, just navigate back
    router.push("/deposit")
  }

  // Get coin icon
  const getCoinIcon = () => {
    const icons = {
      BTC: "https://assets.coincap.io/assets/icons/btc@2x.png",
      ETH: "https://assets.coincap.io/assets/icons/eth@2x.png",
      SOL: "https://assets.coincap.io/assets/icons/sol@2x.png",
      USDT: "https://assets.coincap.io/assets/icons/usdt@2x.png",
      USDC: "https://assets.coincap.io/assets/icons/usdc@2x.png",
    }
    return icons[coin] || icons["BTC"]
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md px-4 py-4">
        <div className="flex items-center mb-6">
          <Link href="/deposit" className="text-black hover:text-purple-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-black text-xl font-medium ml-4">Deposit {coin}</h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center relative">
            {/* QR Code placeholder */}
            <div className="w-40 h-40 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <Image
                src={getCoinIcon() || "/placeholder.svg"}
                alt={`${coin} QR Code`}
                width={64}
                height={64}
                className="opacity-20"
                unoptimized
              />
            </div>
            {/* Coin icon overlay */}
            <div className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
              <Image src={getCoinIcon() || "/placeholder.svg"} alt={coin} width={32} height={32} unoptimized />
            </div>
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition-colors">
            <label className="text-gray-700 text-sm mb-1 block">Network</label>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-black font-medium">{getNetworkDisplayName()}</p>
                <p className="text-gray-500 text-xs">Transaction fee: {getTransactionFee()}</p>
                <p className="text-purple-500 text-xs">Minimum withdrawal: {getMinWithdrawal()}</p>
              </div>
              <Wifi size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
            <label className="text-gray-700 text-sm mb-1 block">Address</label>
            <div className="flex justify-between items-center">
              <p className="text-green-500 text-xs truncate w-4/5">{walletAddress}</p>
              <button
                className={`text-gray-400 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-gray-100`}
                onClick={handleCopy}
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-purple-900 text-white py-3 rounded-full font-medium mt-8 hover:bg-purple-800 transition-colors active:scale-98 transform duration-150"
            onClick={handleSaveAndShare}
          >
            Save & share address
          </button>
        </div>
      </div>
    </main>
  )
}

