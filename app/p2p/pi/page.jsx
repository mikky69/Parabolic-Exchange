"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PiRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the Pi sell page
    router.push("/p2p/sell-pi")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 to-purple-800">
      <div className="text-white">Loading Pi marketplace...</div>
    </div>
  )
}

