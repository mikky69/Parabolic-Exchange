"use client"

import UserAvatar from "@/app/components/user-avatar"

export default function P2PListing({ listing, mode = "buy", onAction }) {
  const { price, user, availableQuantity, limits, paymentMethod, responseTime, excluded, symbol } = listing

  const buttonText = mode === "buy" ? "Buy" : "Sell"
  const buttonColor = excluded ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-cyan-400 text-black"

  const handleAction = () => {
    if (!excluded && onAction) {
      onAction(listing)
    }
  }

  return (
    <div className="w-full rounded-xl bg-purple-900/80 p-4 mb-3 shadow-md">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <UserAvatar user={user} size={36} />
          <div className="ml-2">
            <p className="text-white font-medium flex items-center">
              {user.name}
              {user.verified && (
                <svg
                  className="w-4 h-4 ml-1 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              )}
            </p>
          </div>
        </div>
        <div className="text-gray-300 text-xs">{responseTime}</div>
      </div>

      <div className="flex justify-between items-center my-2">
        <div>
          <p className="text-white font-medium text-lg">₦ {price}</p>
        </div>

        {!excluded && (
          <button className={`px-6 py-1.5 rounded-full font-medium text-sm ${buttonColor}`} onClick={handleAction}>
            {buttonText}
          </button>
        )}

        {excluded && <div className="text-gray-400 text-sm bg-purple-800/50 px-4 py-1 rounded-full">Excluded</div>}
      </div>

      <div className="flex justify-between text-xs text-gray-300 mt-3">
        <div>
          <p className="mb-1">
            Avail. Quantity:{" "}
            <span className="text-white">
              {availableQuantity} {symbol || "usdt"}
            </span>
          </p>
          <p>
            Limit:{" "}
            <span className="text-white">
              {limits.min}-{limits.max} {limits.currency}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="mb-1">{paymentMethod}</p>
          <div className="flex items-center justify-end mt-1 space-x-1">
            {user.paymentMethods?.map((method, index) => (
              <span key={index} className="bg-purple-800/50 text-white px-2 py-0.5 rounded text-xs">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

