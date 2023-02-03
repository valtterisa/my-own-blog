import React from 'react'
import Script from 'next/script'
import '../styles/globals.css'

function App( { Component, pageProps }) {
    return( 
    <>
        <Script async 
            src="https://www.googletagmanager.com/gtag/js?id=G-WW96NP0QD1" />
        <Script>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){
                dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'G-WW96NP0QD1');
            `}
        </Script>

        <Component {...pageProps} />
    </>
)}

export default App