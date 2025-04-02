import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SelectNetwork() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="w-full max-w-md px-4 py-4">
        <div className="flex items-center mb-6">
          <Link href="/convert/select-coin" className="text-white">
            <ArrowLeft size={20} />
          </Link>
        </div>

        <h2 className="text-gray-300 mb-4">Available coins</h2>

        <div className="space-y-4 w-full mb-4">
          <CoinItem name="Bitcoin" symbol="BTC" icon="/bitcoin.png" value="$6.75" amount="0.00001234" />

          <CoinItem name="Ethereum" symbol="ETH" icon="/ethereum.png" value="$6.75" amount="0.00001234" />

          <CoinItem name="Solana" symbol="SOL" icon="/solana.png" value="$54.75" amount="0.00001234" />

          <CoinItem name="USDT" symbol="USDT" icon="/usdt.png" value="$200" amount="0.00001234" />
        </div>

        {/* Network Selection Modal */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
          <h3 className="text-black font-medium mb-4">Select network</h3>

          <div className="space-y-3">
            <NetworkOption
              name="Arbitrum network"
              description="Ethereum L2 rollup"
              fee="Transaction fee: ~$0.25-$1.50"
            />

            <NetworkOption name="Base network" description="Ethereum L2 rollup" fee="Transaction fee: ~$0.10-$0.50" />

            <NetworkOption name="ETH Mainnet" description="Ethereum mainnet" fee="Transaction fee: ~$5-$20" />

            <NetworkOption
              name="Optimism network"
              description="Ethereum L2 rollup"
              fee="Transaction fee: ~$0.15-$0.75"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function CoinItem({ name, symbol, icon, value, amount }) {
  return (
    <div className="bg-transparent border-b border-purple-800 py-3 flex items-center">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
        <img src={icon || "/placeholder.svg"} alt={name} className="w-6 h-6 object-contain" />
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
  )
}

function NetworkOption({ name, description, fee }) {
  return (
    <Link href="/convert">
      <div className="border border-gray-200 rounded-lg p-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-black font-medium">{name}</p>
            <p className="text-gray-500 text-xs">{description}</p>
            <p className="text-gray-400 text-xs mt-1">{fee}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

