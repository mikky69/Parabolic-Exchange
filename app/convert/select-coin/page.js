import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function SelectCoin() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="w-full max-w-md px-4 py-4">
        <div className="flex items-center mb-6">
          <Link href="/convert" className="text-white">
            <ArrowLeft size={20} />
          </Link>
        </div>

        <h2 className="text-gray-300 mb-4">Available coins</h2>

        <div className="space-y-4 w-full">
          <CoinItem name="Bitcoin" symbol="BTC" icon="/bitcoin.png" value="$6.75" amount="0.00001234" />

          <CoinItem name="Ethereum" symbol="ETH" icon="/ethereum.png" value="$6.75" amount="0.00001234" />

          <CoinItem name="Solana" symbol="SOL" icon="/solana.png" value="$54.75" amount="0.00001234" />

          <CoinItem name="USDT" symbol="USDT" icon="/usdt.png" value="$200" amount="0.00001234" />

          <CoinItem name="USDC" symbol="USDC" icon="/usdc.png" value="$133.55" amount="0.00001234" />
        </div>
      </div>
    </main>
  )
}

function CoinItem({ name, symbol, icon, value, amount }) {
  return (
    <Link href="/convert/select-network">
      <div className="bg-transparent border-b border-purple-800 py-3 flex items-center">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
          <Image src={icon || "/placeholder.svg"} alt={name} width={24} height={24} className="object-contain" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <p className="text-white font-medium">{name}</p>
              <p className="text-gray-400 text-xs">{symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">{value}</p>
              <p className="text-gray-400 text-xs">{amount}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

