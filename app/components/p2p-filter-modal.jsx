"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function P2PFilterModal({ isOpen, onClose, currency, onApplyFilters, initialFilters = {} }) {
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || { min: "", max: "" })
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(initialFilters.paymentMethods || [])
  const [availability, setAvailability] = useState(initialFilters.availability || "any")
  const [orderSize, setOrderSize] = useState(initialFilters.orderSize || { min: "", max: "" })

  const handleReset = () => {
    setPriceRange({ min: "", max: "" })
    setSelectedPaymentMethods([])
    setAvailability("any")
    setOrderSize({ min: "", max: "" })
  }

  const handleApply = () => {
    onApplyFilters({
      priceRange,
      paymentMethods: selectedPaymentMethods,
      availability,
      orderSize,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-gray-800 font-medium">Filter Options</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <h4 className="text-gray-800 font-medium mb-2">Price Range</h4>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value.replace(/[^0-9.]/g, "") })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                  {currency}
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value.replace(/[^0-9.]/g, "") })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                  {currency}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-gray-800 font-medium mb-2">Payment Methods</h4>
            <div className="space-y-2">
              {["Bank transfer", "Mobile money", "Cash deposit", "PayPal", "Wise"].map((method) => (
                <label
                  key={method}
                  className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedPaymentMethods.includes(method)}
                    onChange={() => {
                      if (selectedPaymentMethods.includes(method)) {
                        setSelectedPaymentMethods(selectedPaymentMethods.filter((m) => m !== method))
                      } else {
                        setSelectedPaymentMethods([...selectedPaymentMethods, method])
                      }
                    }}
                    className="mr-2"
                  />
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      {method === "Bank transfer" && (
                        <>
                          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </>
                      )}
                      {method === "Mobile money" && (
                        <>
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                          <line x1="12" y1="18" x2="12" y2="18.01"></line>
                        </>
                      )}
                      {method === "Cash deposit" && (
                        <>
                          <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                          <path d="M12 12h.01"></path>
                        </>
                      )}
                      {method === "PayPal" && (
                        <>
                          <path d="M7 11l5-5 5 5"></path>
                          <path d="M12 6v12"></path>
                        </>
                      )}
                      {method === "Wise" && (
                        <>
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </>
                      )}
                    </svg>
                    <span className="text-gray-700">{method}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gray-800 font-medium mb-2">Availability</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setAvailability("any")}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  availability === "any"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Any
              </button>
              <button
                onClick={() => setAvailability("online")}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  availability === "online"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Online Now
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-gray-800 font-medium mb-2">Order Size</h4>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Min"
                  value={orderSize.min}
                  onChange={(e) => setOrderSize({ ...orderSize, min: e.target.value.replace(/[^0-9.]/g, "") })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Max"
                  value={orderSize.max}
                  onChange={(e) => setOrderSize({ ...orderSize, max: e.target.value.replace(/[^0-9.]/g, "") })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

