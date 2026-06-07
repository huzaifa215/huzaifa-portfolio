'use client'

import Script from 'next/script'

export function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GMEJVZ2WN2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GMEJVZ2WN2', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
