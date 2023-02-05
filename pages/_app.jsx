import React from 'react'
import Script from 'next/script'
import '../styles/globals.css'

function App( { Component, pageProps }) {
    return( 
    <>
        <Script strategy="afterInteractive" dangerouslySetInnerHTML={{ __html:
            `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',${process.env.GTM_TAG});
            `}}
        />
        
        {/* Google Analytics 4 */}
        <Script async 
            src="https://www.googletagmanager.com/gtag/js?id=G-WW96NP0QD1" />
        <Script>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', ${process.env.GA_ANALYTICS_TAG}, { 'cookieFlags': 'SameSite=None; Secure' });

            `}
        </Script>

        <Component {...pageProps} />
    </>
)}

export default App