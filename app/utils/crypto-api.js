// Fallback data to use in case of errors

function generateFallbackChartData(price) {
  const now = new Date()
  const data = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    data.push({
      time: date.toISOString().slice(0, 10),
      value: price + Math.random() * 10 - 5, // Simulate price fluctuations
    })
  }
  return data.reverse()
}

const FALLBACK_DATA = {
  prices: [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      priceUsd: "30000",
      changePercent24Hr: "0.5",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      priceUsd: "2000",
      changePercent24Hr: "-0.2",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      priceUsd: "150",
      changePercent24Hr: "3.2",
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      priceUsd: "1",
      changePercent24Hr: "0.01",
    },
    {
      id: "usd-coin",
      name: "USD Coin",
      symbol: "USDC",
      priceUsd: "1",
      changePercent24Hr: "0.02",
    },
    {
      id: "pi-network",
      name: "Pi Network",
      symbol: "PI",
      priceUsd: "1.5",
      changePercent24Hr: "5.0",
    },
  ],
  history: {
    bitcoin: generateFallbackChartData(30000),
    ethereum: generateFallbackChartData(2000),
    solana: generateFallbackChartData(150),
    tether: generateFallbackChartData(1),
    "usd-coin": generateFallbackChartData(1),
    "pi-network": generateFallbackChartData(1.5),
  },
}

// Update the getCryptoData function to handle errors better
export async function getCryptoData() {
  try {
    // In a real app, we would fetch from the API, but for simulation we'll use fallback data
    // with randomized price changes to simulate real-time data

    // Make a deep copy of the fallback data
    const dataCopy = JSON.parse(JSON.stringify(FALLBACK_DATA.prices))

    // Add some random variation to the prices to simulate real-time changes
    return dataCopy.map((coin) => {
      const changeDirection = Math.random() > 0.5 ? 1 : -1
      const changePercentage = Math.random() * 1.5 // Up to 1.5% change
      const priceChange = Number.parseFloat(coin.priceUsd) * (changePercentage / 100) * changeDirection

      return {
        ...coin,
        priceUsd: (Number.parseFloat(coin.priceUsd) + priceChange).toString(),
        changePercent24Hr: (
          Number.parseFloat(coin.changePercent24Hr) +
          changeDirection * Math.random() * 0.2
        ).toString(),
      }
    })

    /* In a real app, we would use this:
    const response = await fetch("https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,solana,tether,usd-coin", {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch crypto data. Status: ${response.status}. Using fallback data.`);
      return FALLBACK_DATA.prices;
    }
    
    const { data } = await response.json();
    return data;
    */
  } catch (error) {
    console.error("Error fetching crypto data:", error)
    return FALLBACK_DATA.prices
  }
}

export function formatCryptoData(data) {
  return data.map((item) => {
    // Get current timestamp for the latest data point
    const now = new Date()
    const currentTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

    const price = Number.parseFloat(item.priceUsd)
    const chartData = generateChartData(price)

    // Ensure the last data point has the current time and exact price
    if (chartData.length > 0) {
      chartData[chartData.length - 1] = {
        timestamp: currentTime,
        price: price,
      }
    }

    return {
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      icon:
        item.symbol === "PI"
          ? "/pi-network.png"
          : `https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`,
      price: price,
      amount: (Math.random() * 0.02).toFixed(8), // Generate a random amount
      change: Number.parseFloat(item.changePercent24Hr).toFixed(2),
      chartData: chartData,
      lastUpdated: currentTime,
    }
  })
}

function generateChartData(basePrice) {
  const data = []
  const now = Date.now()
  const hourInMs = 3600000
  const minuteInMs = 60000

  // Generate data points for the last 24 hours
  for (let i = 0; i < 24; i++) {
    const hourOffset = 24 - i

    // Create a more realistic trend with some volatility
    const trendFactor = 1 + Math.sin(hourOffset / 8) * 0.02
    const randomFactor = 0.99 + Math.random() * 0.02
    const price = basePrice * trendFactor * randomFactor

    // For more recent points (last hour), add more granular data
    if (i === 0) {
      for (let j = 0; j < 12; j++) {
        const minuteOffset = 12 - j
        const microTrendFactor = 1 + Math.sin(minuteOffset / 4) * 0.005
        const microRandomFactor = 0.998 + Math.random() * 0.004
        const microPrice = price * microTrendFactor * microRandomFactor
        const timestamp = new Date(now - j * minuteInMs * 5)

        data.push({
          timestamp: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          price: microPrice,
        })
      }
    } else {
      const timestamp = new Date(now - i * hourInMs)
      data.push({
        timestamp: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price: price,
      })
    }
  }

  // Sort by timestamp, oldest first
  return data.sort((a, b) => {
    const timeA = new Date("1/1/2023 " + a.timestamp).getTime()
    const timeB = new Date("1/1/2023 " + b.timestamp).getTime()
    return timeA - timeB
  })
}

// Simulate real-time price updates
export function updatePriceData(data) {
  const updatedData = [...data]

  // Update each item's price with slight random changes
  updatedData.forEach((item) => {
    const changeDirection = Math.random() > 0.5 ? 1 : -1
    const changeAmount = item.price * (Math.random() * 0.01) * changeDirection
    item.price = Number.parseFloat((item.price + changeAmount).toFixed(2))

    // Update change percentage
    const newChangeValue = Number.parseFloat(item.change) + changeDirection * Math.random() * 0.1
    item.change = newChangeValue.toFixed(2)

    // Update chart data
    if (item.chartData && item.chartData.length > 0) {
      // Add new data point
      const lastPoint = item.chartData[item.chartData.length - 1]
      const now = new Date()
      const newPoint = {
        timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price: item.price,
      }

      // Remove oldest point if we have enough data
      if (item.chartData.length > 30) {
        item.chartData.shift()
      }

      // Add new point
      item.chartData.push(newPoint)
    }
  })

  return updatedData
}

