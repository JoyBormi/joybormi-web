/**
 * Get the appropriate API base URL based on environment
 * For mobile development, use your computer's local IP address
 *
 * To find your local IP:
 * - Mac/Linux: Run `ifconfig | grep "inet " | grep -v 127.0.0.1`
 * - Windows: Run `ipconfig` and look for IPv4 Address
 *
 * Then set NEXT_PUBLIC_API_ENDPOINT in your .env file:
 * NEXT_PUBLIC_API_ENDPOINT=http://YOUR_LOCAL_IP:4000
 */
const getApiBaseUrl = (): string => {
  let url: string

  // Use environment variable if set
  if (process.env.NEXT_PUBLIC_API_ENDPOINT) {
    url = process.env.NEXT_PUBLIC_API_ENDPOINT
  } else {
    // Production default
    url = "https://api.joybormiapp.uz"
  }

  return url
}

export const appConfig = {
  // API Configuration
  api: {
    baseURL: getApiBaseUrl(),
    timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 30000, // 30 seconds
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    NEXT_PUBLIC_VERCEL_ID: process.env.NEXT_PUBLIC_VERCEL_ID,
  },

  // App Information
  app: {
    name: "JoyBormi",
    version: "1.0.0",
    email: "joybormiapp@gmail.com",
    phone: ["998 93 455 25 65", "99 566 76 86"],
    urls: {
      site: "https://joybormiapp.uz",
      appStore: "https://apps.apple.com",
      googlePlay: "https://play.google.com/store",
      telegram: "https://t.me/joybormi",
    },
    assets: {
      logoIcon: "/images/icon.png",
      primaryScreen: "/images/mockup-screen-1.png",
      secondaryScreen: "/images/mockup-screen-2.png",
    },
    social: {
      facebook: "https://www.facebook.com/joybormi",
      instagram: "https://www.instagram.com/joybormi",
      blog: "https://blog.naver.com/joybormi",
    },
  },
} as const
