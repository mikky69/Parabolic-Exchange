export default function manifest() {
  return {
    name: "Parabolic Exchange",
    short_name: "Parabolic",
    description: "Web3-based peer-to-peer cryptocurrency exchange platform",
    start_url: "/",
    display: "standalone",
    background_color: "#6b21a8",
    theme_color: "#6b21a8",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  }
}

