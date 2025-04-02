"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { bankAccounts } from "@/app/utils/p2p-data"

export default function SellPiPage() {
  const [amount, setAmount] = useState("")
  const [receiveAmount, setReceiveAmount] = useState("")
  const [stage, setStage] = useState("order") // order, payment, waiting, success
  const [selectedAccount, setSelectedAccount] = useState(bankAccounts[0])
  const router = useRouter()

  // Pi details
  const piDetails = {
    price: 1535.3,
    availableQuantity: "50,000",
    limits: {
      min: "100",
      max: "430K",
      currency: "NGN",
    },
    paymentMethod: "Bank transfer",
    responseTime: "15Min",
  }

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value.replace(/[^0-9]/g, "")
    setAmount(inputAmount)

    if (inputAmount) {
      const piAmount = (Number.parseFloat(inputAmount) / piDetails.price).toFixed(2)
      setReceiveAmount(piAmount)
    } else {
      setReceiveAmount("")
    }
  }

  const handleSell = () => {
    if (amount && receiveAmount) {
      setStage("payment")
    }
  }

  const handleContinue = () => {
    setStage("waiting")

    // Mock successful transaction after 3 seconds
    setTimeout(() => {
      setStage("success")
    }, 3000)
  }

  const handlePaymentReceived = () => {
    setStage("success")
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleReport = () => {
    alert("Report submitted. Our team will contact you shortly.")
  }

  // Order screen
  if (stage === "order") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-800">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/p2p" className="text-white">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-white text-xl font-medium">Sell Pi</h1>
            <div className="w-6 h-6"></div> {/* Spacer */}
          </div>

          <div className="bg-purple-800/50 rounded-lg p-4 mb-4">
            <div className="text-white mb-2">
              Price <span className="float-right">₦ {piDetails.price.toFixed(1)}</span>
            </div>
            <div className="text-white text-sm mb-2">
              Avail. Quantity <span className="float-right">{piDetails.availableQuantity} Pi</span>
            </div>
            <div className="text-white text-sm mb-2">
              Limits{" "}
              <span className="float-right">
                {piDetails.limits.min}-{piDetails.limits.max} {piDetails.limits.currency}
              </span>
            </div>
            <div className="text-white text-sm mb-2">
              Payment Method <span className="float-right">{piDetails.paymentMethod}</span>
            </div>
            <div className="text-white text-sm">
              Payment Duration <span className="float-right">{piDetails.responseTime}</span>
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
              <div className="text-black font-medium">{receiveAmount ? receiveAmount : "0.00"} Pi</div>
            </div>
          </div>

          <button
            className="w-full bg-purple-800 text-white font-medium py-3 rounded-lg mb-4"
            onClick={handleSell}
            disabled={!amount || !receiveAmount}
          >
            Sell
          </button>
        </div>
      </main>
    )
  }

  // Payment details screen
  if (stage === "payment") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-800">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setStage("order")} className="text-white">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-white text-xl font-medium">Preview Payment Details</h1>
            <Link href="/p2p" className="text-cyan-400 text-sm">
              Cancel Order
            </Link>
          </div>

          <div className="text-white text-sm mb-4">Order expires within {piDetails.responseTime}</div>

          <div className="bg-purple-800/30 rounded-lg p-4 mb-6">
            <h3 className="text-white mb-4">Select Account</h3>

            <div className="flex justify-between text-white mb-2">
              <div>First Bank</div>
              <div></div>
            </div>

            <div className="flex justify-between text-white mb-2">
              <div>Account Name</div>
              <div>{selectedAccount.accountName}</div>
            </div>

            <div className="flex justify-between text-white mb-2">
              <div>Account Number</div>
              <div>{selectedAccount.accountNumber}</div>
            </div>
          </div>

          <button className="w-full bg-purple-800 text-white font-medium py-3 rounded-lg mb-4" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </main>
    )
  }

  // Waiting screen
  if (stage === "waiting") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-800">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/p2p" className="text-white">
              <ArrowLeft size={20} />
            </Link>
            <div></div>
            <button className="bg-cyan-400 text-black text-sm px-4 py-1 rounded-full">Chat</button>
          </div>

          <div className="flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm flex flex-col items-center mb-8">
              <div className="w-64 h-64 mb-6 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-48 bg-white rounded-lg shadow-lg">
                    <div className="w-24 h-4 bg-purple-800 absolute top-6 left-4"></div>
                    <div className="w-16 h-3 bg-purple-800 absolute top-12 left-4"></div>
                    <div className="w-12 h-8 bg-purple-600 absolute bottom-8 left-4 rounded"></div>
                  </div>
                  <div className="absolute -right-8 top-16">
                    <div className="w-12 h-24 flex flex-col items-center">
                      <div className="w-8 h-8 bg-purple-200 rounded-full mb-2"></div>
                      <div className="w-6 h-16 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-white mb-6">
                Waiting for buyer to make payment. Once confirmed, we'll proceed with next steps. Thank you for your
                patience.
              </p>

              <div className="text-white text-sm space-y-2 w-full">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Don't release asset until you receive payment</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Notify customer care if there's any issue</span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-purple-800 text-white font-medium py-3 rounded-lg mb-4"
              onClick={handlePaymentReceived}
            >
              Payment Received
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Success screen
  if (stage === "success") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-800">
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <div className="absolute top-4 right-4">
            <button className="bg-purple-900 text-white px-4 py-1 rounded-lg" onClick={handleBackToHome}>
              Back To Home
            </button>
          </div>

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

            <div className="text-2xl font-bold text-purple-800 mb-4">Transaction Successful</div>
          </div>

          <button
            className="w-full max-w-sm bg-purple-800 text-white font-medium py-3 rounded-lg"
            onClick={handleReport}
          >
            Report
          </button>
        </div>
      </main>
    )
  }

  return null
}

