"use client"

import { useEffect } from "react"
import SwRegister from "./sw-register"

export function Providers({ children }) {
  // Add any app-wide providers here

  // Handle PWA install prompt
  useEffect(() => {
    let deferredPrompt

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      deferredPrompt = e

      // Optionally, show your own "Add to Home Screen" button here
      // For now, we'll just log it
      console.log("App can be installed, showing custom UI")
    })

    // Optional: Handle the install success
    window.addEventListener("appinstalled", () => {
      console.log("PWA was installed")
    })
  }, [])

  return (
    <>
      <SwRegister />
      {children}
    </>
  )
}

