"use client"

import { useEffect, useRef, useState } from "react"

export default function CryptoChart({ data, color = "#ff00ff", height = 40, className = "" }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 100, height })

  // Update dimensions when container size changes
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    // Initial update
    updateDimensions()

    // Add resize listener
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [height])

  useEffect(() => {
    if (!data || data.length < 2 || !canvasRef.current) return

    // Add a small visual effect when data updates
    const canvas = canvasRef.current
    canvas.classList.add("chart-update")
    setTimeout(() => {
      if (canvas) canvas.classList.remove("chart-update")
    }, 300)

    // Rest of the hook...
    const canvasElement = canvasRef.current
    const ctx = canvasElement.getContext("2d")

    // Set canvas dimensions
    canvasElement.width = dimensions.width
    canvasElement.height = dimensions.height

    const width = canvasElement.width
    const canvasHeight = canvasElement.height

    // Clear canvas
    ctx.clearRect(0, 0, width, canvasHeight)

    // Find min and max values
    const prices = data.map((point) => point.price)
    const minPrice = Math.min(...prices) * 0.998 // Add a little padding
    const maxPrice = Math.max(...prices) * 1.002
    const priceRange = maxPrice - minPrice || 1 // Prevent division by zero

    // Draw path
    ctx.beginPath()
    ctx.moveTo(0, canvasHeight - ((data[0].price - minPrice) / priceRange) * canvasHeight)

    for (let i = 1; i < data.length; i++) {
      const x = (i / (data.length - 1)) * width
      const y = canvasHeight - ((data[i].price - minPrice) / priceRange) * canvasHeight
      ctx.lineTo(x, y)
    }

    // Style and stroke
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()

    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, `${color}40`) // 25% opacity
    gradient.addColorStop(1, `${color}00`) // 0% opacity

    ctx.lineTo(width, canvasHeight)
    ctx.lineTo(0, canvasHeight)
    ctx.fillStyle = gradient
    ctx.fill()

    // Add hover interaction
    const handleMouseMove = (e) => {
      const rect = canvasElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const pointIndex = Math.min(data.length - 1, Math.max(0, Math.round((x / rect.width) * (data.length - 1))))

      // Ensure timestamp exists or create one
      const timestamp =
        data[pointIndex].timestamp ||
        new Date(Date.now() - (24 - pointIndex) * 3600000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })

      setHoveredPoint({
        price: data[pointIndex].price,
        timestamp: timestamp,
        x: (pointIndex / (data.length - 1)) * width,
        y: canvasHeight - ((data[pointIndex].price - minPrice) / priceRange) * canvasHeight,
      })
      setIsHovering(true)

      // Redraw with hover point
      ctx.clearRect(0, 0, width, canvasHeight)

      // Redraw line
      ctx.beginPath()
      ctx.moveTo(0, canvasHeight - ((data[0].price - minPrice) / priceRange) * canvasHeight)

      for (let i = 1; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width
        const y = canvasHeight - ((data[i].price - minPrice) / priceRange) * canvasHeight
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Redraw gradient
      ctx.lineTo(width, canvasHeight)
      ctx.lineTo(0, canvasHeight)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw hover point
      const hx = (pointIndex / (data.length - 1)) * width
      const hy = canvasHeight - ((data[pointIndex].price - minPrice) / priceRange) * canvasHeight

      ctx.beginPath()
      ctx.arc(hx, hy, 4, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()

      // Draw vertical line
      ctx.beginPath()
      ctx.moveTo(hx, 0)
      ctx.lineTo(hx, canvasHeight)
      ctx.strokeStyle = `${color}80`
      ctx.lineWidth = 1
      ctx.setLineDash([2, 2])
      ctx.stroke()
      ctx.setLineDash([])
    }

    const handleMouseLeave = () => {
      setIsHovering(false)

      // Redraw without hover effects
      ctx.clearRect(0, 0, width, canvasHeight)

      ctx.beginPath()
      ctx.moveTo(0, canvasHeight - ((data[0].price - minPrice) / priceRange) * canvasHeight)

      for (let i = 1; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width
        const y = canvasHeight - ((data[i].price - minPrice) / priceRange) * canvasHeight
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.lineTo(width, canvasHeight)
      ctx.lineTo(0, canvasHeight)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    canvasElement.addEventListener("mousemove", handleMouseMove)
    canvasElement.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvasElement.removeEventListener("mousemove", handleMouseMove)
      canvasElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [data, color, dimensions, hoveredPoint])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        height={dimensions.height}
        className={`w-full h-full ${className}`}
        style={{ display: "block" }}
      />
      {isHovering && hoveredPoint && (
        <div
          className="absolute bg-white text-black text-xs p-1 rounded shadow-md pointer-events-none z-10"
          style={{
            left: `${hoveredPoint.x}px`,
            top: `${hoveredPoint.y - 30}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-medium">${hoveredPoint.price.toFixed(2)}</div>
          <div className="text-gray-500">{hoveredPoint.timestamp}</div>
        </div>
      )}
    </div>
  )
}

