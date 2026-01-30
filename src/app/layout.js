import "@/styles/globals.css";
import "@/styles/Navigation.css";
import "@/styles/Footer.css";
import "@/styles/AdmissionPopup.css";
import ClientLayout from "@/components/ClientLayout"; // Import the wrapper
import AdmissionPopup from "@/components/AdmissionPopup";

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
        
        {/* ClientLayout now handles the Header (Subheader) and Footer visibility logic */}
        <ClientLayout>
            {children}
        </ClientLayout>

        <AdmissionPopup /> 
      </body>
    </html>
  );
}