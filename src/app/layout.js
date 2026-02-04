import "@/styles/globals.css";
import "@/styles/Navigation.css";
// import Header from './components/Header';
import "@/styles/Footer.css";
import "@/styles/AdmissionPopup.css";
import "@/styles/Sidebar.css"; // <--- 1. Import your Sidebar CSS
import ClientLayout from "@/components/ClientLayout"; 
import AdmissionPopup from "@/components/AdmissionPopup";
import Chatbot from "@/components/Chatbot"; 
import Sidebar from "@/components/Sidebar"; // <--- 2. Import the Sidebar component
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Poppins', sans-serif" }}>
        {/* --- 2. GOOGLE SCRIPTS START --- */}
        
        {/* Google Tag Manager (Script) */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W6GFCXV4');`}
        </Script>

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VS43V49H94"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VS43V49H94');
          `}
        </Script>

        {/* Google Tag Manager (NoScript Fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W6GFCXV4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        {/* --- GOOGLE SCRIPTS END --- */}
        
        {/* ClientLayout now handles the Header (Subheader) and Footer visibility logic */}
        <ClientLayout>
            {children}
        </ClientLayout>

        <AdmissionPopup /> 

        <Sidebar /> {/* <--- 3. Add Sidebar here */}

        <Chatbot />
      </body>
    </html>
  );
}