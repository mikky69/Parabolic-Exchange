import Link from "next/link"
import { HomeIcon, BarChart2Icon, UsersIcon, UserIcon } from "lucide-react"

export default function BottomNav({ active = "home" }) {
  return (
    <div className="fixed bottom-0 w-full bg-white py-2 border-t border-gray-200">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link href="/" className="flex flex-col items-center w-1/4 py-1">
          <HomeIcon size={20} className={active === "home" ? "text-purple-600" : "text-gray-500"} />
          <span className={`text-xs ${active === "home" ? "text-purple-600" : "text-gray-500"}`}>Home</span>
        </Link>
        <Link href="/market" className="flex flex-col items-center w-1/4 py-1">
          <BarChart2Icon size={20} className={active === "market" ? "text-purple-600" : "text-gray-500"} />
          <span className={`text-xs ${active === "market" ? "text-purple-600" : "text-gray-500"}`}>Market</span>
        </Link>
        <Link href="/p2p" className="flex flex-col items-center w-1/4 py-1">
          <UsersIcon size={20} className={active === "p2p" ? "text-purple-600" : "text-gray-500"} />
          <span className={`text-xs ${active === "p2p" ? "text-purple-600" : "text-gray-500"}`}>P2P</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center w-1/4 py-1">
          <UserIcon size={20} className={active === "profile" ? "text-purple-600" : "text-gray-500"} />
          <span className={`text-xs ${active === "profile" ? "text-purple-600" : "text-gray-500"}`}>Profile</span>
        </Link>
      </div>
    </div>
  )
}

