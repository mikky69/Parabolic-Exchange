"use client"

import { User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function UserAvatar({ user, size = 36 }) {
  const [imageError, setImageError] = useState(false)

  if (!user || imageError) {
    return (
      <div className="bg-gray-200 rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
        <User size={size * 0.6} className="text-gray-500" />
      </div>
    )
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        {user.avatar ? (
          <Image
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            width={size}
            height={size}
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div
            className="bg-purple-600 text-white font-bold rounded-full flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {user.verified && (
        <div className="absolute -bottom-1 -right-1 bg-cyan-400 rounded-full w-4 h-4 flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}

