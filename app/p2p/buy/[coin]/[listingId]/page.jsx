"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import UserAvatar from "@/app/components/user-avatar"
import { availableCoins, generateListings } from "@/app/utils/p2p-data"

export default function BuyCoinPage({ params }) {
  const { coin, listingId } = params
  const [listing, setListing] = useState(null)
  const [amount, setAmount] = useState("")
  const [receiveAmount, setReceiveAmount] = useState("")
  const [stage, setStage] = useState("order") // order, details, payment, waiting, success
  const [selectedCoin, setSelectedCoin] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Find the selected coin
    const coinInfo = availableCoins.find((c) => c.symbol.toLowerCase() === coin.toLowerCase())
    if (coinInfo) {
      setSelectedCoin(coinInfo)

      // Generate mock listings and find the requested one
      const mockListings = generateListings(coinInfo.symbol)
      const foundListing = mockListings.find((l) => l.id === listingId)

      if (foundListing) {
        setListing(foundListing)
      } else {
        // Redirect to P2P page if listing not found
        router.push("/p2p")
      }
    } else {
      // Redirect to P2P page if coin not found
      router.push("/p2p")
    }
  }, [coin, listingId, router])

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value.replace(/[^0-9]/g, "")
    setAmount(inputAmount)

    if (inputAmount && listing) {
      const price = Number.parseFloat(listing.price)
      const coinAmount = (Number.parseFloat(inputAmount) / price).toFixed(4)
      setReceiveAmount(coinAmount)
    } else {
      setReceiveAmount("")
    }
  }

  const handleOrder = () => {
    if (amount && receiveAmount) {
      setStage("details")
    }
  }

  const handleViewPaymentDetails = () => {
    setStage("payment")
  }

  const handleNotifySeller = () => {
    setStage("waiting")

    // Mock successful transaction after 3 seconds
    setTimeout(() => {
      setStage("success")
    }, 3000)
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/p2p")
  }

  if (!listing || !selectedCoin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Order screen
  if (stage === "order") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/p2p" className="text-white">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-white text-xl font-medium">Buy {selectedCoin.symbol}</h1>
            <div className="w-6 h-6"></div> {/* Spacer */}
          </div>

          <div className="bg-purple-800/50 rounded-lg p-4 mb-4">
            <div className="text-white mb-2">
              Price <span className="float-right">₦{listing.price}</span>
            </div>
            <div className="text-white text-sm mb-2">
              Limit{" "}
              <span className="float-right">
                {listing.limits.min}-{listing.limits.max} {listing.limits.currency}
              </span>
            </div>
            <div className="text-white text-sm mb-2">
              Payment Method <span className="float-right">{listing.paymentMethod}</span>
            </div>
            <div className="text-white text-sm">
              Payment Duration <span className="float-right">{listing.responseTime}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="150,000"
                className="w-full text-2xl font-medium bg-transparent text-black outline-none"
              />
              <span className="text-black font-medium">NGN</span>
            </div>

            <hr className="my-3 border-gray-200" />

            <div className="flex items-center justify-between">
              <div className="text-gray-500 text-sm">I will receive</div>
              <div className="text-black font-medium">
                {receiveAmount ? receiveAmount : "0.0000"} {selectedCoin.symbol}
              </div>
            </div>
          </div>

          <button
            className="w-full bg-purple-800 text-white font-medium py-3 rounded-lg mb-4"
            onClick={handleOrder}
            disabled={!amount || !receiveAmount}
          >
            Order
          </button>
        </div>
      </main>
    )
  }

  // Order details screen
  if (stage === "details") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/p2p" className="text-white">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-white text-xl font-medium">Order Details</h1>
            <button onClick={handleCancel} className="text-cyan-400 text-sm">
              Cancel Order
            </button>
          </div>

          <div className="bg-purple-800/50 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <UserAvatar user={listing.user} />
              <div className="ml-3 text-white font-medium">{listing.user.name}</div>
              <button className="ml-auto bg-cyan-400 text-black text-sm px-4 py-1 rounded-full">Chat</button>
            </div>
            <div className="text-white text-sm">Order expires within {listing.responseTime.replace("Min", "mins")}</div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="mb-3 text-gray-700 font-medium">Buy {selectedCoin.symbol}</div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <div>Price</div>
              <div className="text-black">₦{listing.price}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <div>Fiat Amount</div>
              <div className="text-black">₦{amount}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <div>Receive Quantity</div>
              <div className="text-black">
                {receiveAmount} {selectedCoin.symbol}
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="text-gray-700 mb-2">Payment Method: {listing.paymentMethod}</div>
              <button className="w-full bg-purple-800 text-white py-3 rounded-lg" onClick={handleViewPaymentDetails}>
                View Payment Details
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Payment details screen
  if (stage === "payment") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setStage("details")} className="text-white">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-white text-xl font-medium">Payment Details</h1>
            <button className="bg-cyan-400 text-black text-sm px-4 py-1 rounded-full">Chat</button>
          </div>

          <div className="bg-purple-800/50 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <UserAvatar user={listing.user} />
              <div className="ml-3 text-white font-medium">{listing.user.name}</div>
            </div>

            <div className="flex justify-between text-white mb-2">
              <div>Amount to Pay</div>
              <div>₦{amount}</div>
            </div>

            <div className="flex justify-between text-white mb-2">
              <div>Bank Name</div>
              <div>Opay</div>
            </div>

            <div className="flex justify-between text-white mb-2">
              <div>Account Name</div>
              <div>Sharon Grace</div>
            </div>

            <div className="flex justify-between text-white mb-2">
              <div>Account Number</div>
              <div className="flex items-center">
                8063546234
                <button className="ml-2 text-gray-300">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4 mb-2 text-white text-sm">
              <strong>NB:</strong> No time party! Ensure that your account name matches the name you used to verify your
              account.
            </div>
            <div className="text-white text-sm">• When the payment is done, tap the button below to notify seller.</div>
          </div>

          <button className="w-full bg-white text-black font-medium py-3 rounded-lg mb-4" onClick={handleNotifySeller}>
            Notify Seller
          </button>
        </div>
      </main>
    )
  }

  // Waiting screen
  if (stage === "waiting") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <div className="bg-cyan-400 text-black text-sm px-4 py-1 rounded-full absolute top-4 right-4">Chat</div>

          <div className="bg-white rounded-lg p-8 w-full max-w-sm flex flex-col items-center mb-4">
            <div className="w-40 h-40 mb-6 flex items-center justify-center">
              <div className="w-32 h-48 bg-purple-200 rounded-lg relative">
                <div className="w-28 h-6 bg-purple-800 absolute top-4 left-2"></div>
                <div className="w-20 h-3 bg-purple-800 absolute top-12 left-2"></div>
                <div className="w-12 h-10 bg-purple-400 absolute bottom-6 left-2 rounded"></div>
              </div>
              <div className="ml-4 h-32 w-12 flex justify-center items-center">
                <div className="w-8 h-12 bg-gray-200 rounded-full relative">
                  <div className="w-2 h-2 bg-purple-800 absolute top-2 left-3 rounded-full"></div>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-800 mb-6">
              Waiting for seller to confirm payment receipt. Once confirmed, we'll process with next steps. Thank you
            </p>

            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg mb-2">
              Report to Customer Care
            </button>
          </div>

          <button className="bg-purple-900 text-white px-6 py-2 rounded-full mt-6" onClick={handleBackToHome}>
            Back To Home
          </button>
        </div>
      </main>
    )
  }

  // Success screen
  if (stage === "success") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-sm flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>

            <div className="text-2xl font-bold text-black mb-1">
              {receiveAmount} {selectedCoin.symbol}
            </div>

            <div className="text-lg font-medium text-purple-800 mb-4">Transaction Successful</div>
          </div>

          <button className="bg-purple-900 text-white px-6 py-2 rounded-full" onClick={handleBackToHome}>
            Back To Home
          </button>
        </div>
      </main>
    )
  }

  return null
}

