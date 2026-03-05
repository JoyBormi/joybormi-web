"use client"

import Script from "next/script"
import { JSX } from "react"

interface GoogleAnalyticsProps {
  measurementId: string
}

/**
 * Google Analytics component that loads gtag.js and initializes GA4
 * @param measurementId - Google Analytics measurement ID (e.g., 'G-XXXXXXXXXX')
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps): JSX.Element {
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
