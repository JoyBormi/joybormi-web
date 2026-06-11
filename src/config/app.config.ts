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
    phone: ["+998 91 446 85 00"],
    urls: {
      site: "https://www.joybormiapp.uz",
      appStore: "https://apps.apple.com/app/id6759666506",
      googlePlay: "https://play.google.com/store/apps/details?id=com.joybormi.app",
      telegram: "https://t.me/joybormiuz",
    },
    assets: {
      logoIcon: "/images/icon.png",
      primaryScreen: "/images/mockup-screen-1.png",
      secondaryScreen: "/images/mockup-screen-2.png",
    },
    social: {
      facebook: "https://www.facebook.com/joybormiuz",
      instagram: "https://www.instagram.com/joybormiuz",
    },
  },
} as const
