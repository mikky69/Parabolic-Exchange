// Mock data for P2P listings
export const mockUsers = [
  {
    id: 1,
    name: "Sharp_Gee",
    verified: true,
    avatar: "/users/sharp-gee.png",
  },
  {
    id: 2,
    name: "Lord_Chris",
    verified: true,
    avatar: "/users/lord-chris.png",
  },
  {
    id: 3,
    name: "Mirae_Jay",
    verified: true,
    avatar: "/users/mirae-jay.png",
  },
  {
    id: 4,
    name: "Dummy",
    verified: true,
    avatar: "/users/dummy.png",
  },
]

// Generate mock P2P listings
export function generateListings(coinSymbol) {
  const baseRate = getBaseRate(coinSymbol)
  const listings = []

  // Create 5-10 listings
  const count = 5 + Math.floor(Math.random() * 5)

  for (let i = 0; i < count; i++) {
    // Vary the price slightly
    const priceVariation = Math.random() * 0.05 - 0.025 // ±2.5%
    const price = baseRate * (1 + priceVariation)

    // Random available quantity
    const quantity =
      coinSymbol === "PI" ? (10000 + Math.random() * 90000).toFixed(0) : (0.1 + Math.random() * 0.9).toFixed(4)

    const userId = Math.floor(Math.random() * mockUsers.length)
    const user = mockUsers[userId]

    // Random time (10-30 mins)
    const responseTime = 10 + Math.floor(Math.random() * 20)

    // Randomly exclude some listings
    const excluded = Math.random() > 0.7

    listings.push({
      id: `listing-${coinSymbol}-${i}`,
      price: price.toFixed(2),
      user,
      availableQuantity: quantity,
      limits: {
        min: "100",
        max: "430K",
        currency: "NGN",
      },
      paymentMethod: "Bank transfer",
      responseTime: `${responseTime}Min`,
      excluded,
    })
  }

  return listings
}

// Get base exchange rate for different coins
function getBaseRate(symbol) {
  switch (symbol.toUpperCase()) {
    case "BTC":
      return 67000000 // NGN per BTC
    case "ETH":
      return 3500000 // NGN per ETH
    case "SOL":
      return 120000 // NGN per SOL
    case "USDT":
    case "USDC":
      return 1700 // NGN per USDT/USDC
    case "PI":
      return 1535.3 // NGN per PI (matching your screenshot)
    default:
      return 1700 // Default to USDT rate
  }
}

// Available cryptocurrencies
export const availableCoins = [
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    icon: "https://assets.coincap.io/assets/icons/usdt@2x.png",
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    icon: "https://assets.coincap.io/assets/icons/btc@2x.png",
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://assets.coincap.io/assets/icons/usdc@2x.png",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    icon: "https://assets.coincap.io/assets/icons/sol@2x.png",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    icon: "https://assets.coincap.io/assets/icons/eth@2x.png",
  },
  {
    id: "pi-network",
    symbol: "PI",
    name: "Pi Network",
    icon: "/pi-network.png",
  },
]

// Available payment methods
export const paymentMethods = ["Bank transfer", "Mobile money", "Cash deposit", "PayPal", "Wise"]

// Bank accounts for payment
export const bankAccounts = [
  {
    id: 1,
    bankName: "First Bank",
    accountName: "Dummy's Name",
    accountNumber: "846-3545-256",
  },
  {
    id: 2,
    bankName: "Opay",
    accountName: "Sharon Grace",
    accountNumber: "8063546234",
  },
]

