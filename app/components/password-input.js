import { Eye } from "lucide-react"

export default function PasswordInput({ placeholder, className }) {
  return (
    <div className="relative">
      <input
        type="password"
        placeholder={placeholder || "Password"}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 ${className || ""}`}
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <Eye size={20} />
      </button>
    </div>
  )
}

