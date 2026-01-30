"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Subheader from './Subheader';
import Footer from './Footer';

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    // We add an ID "admin-panel" if we are on admin pages to override CSS styles
    <div id={isAdmin ? "admin-panel" : "public-site"}>
      
      {/* Only show Header if NOT on admin pages */}
      {!isAdmin && (
        <div className="sticky-header">
           <Subheader /> 
        </div>
      )}

      {children}

      {/* Only show Footer if NOT on admin pages */}
      {!isAdmin && <Footer />}
      
      {/* FORCE REMOVE WHITESPACE FOR ADMIN */}
      {isAdmin && (
        <style jsx global>{`
          body, html, #admin-panel {
            margin-top: 0 !important;
            padding-top: 0 !important;
            background-color: #f4f6f9; /* Optional: Sets admin background color */
          }
          /* Override any main tag margins */
          main {
            margin-top: 0 !important;
          }
        `}</style>
      )}
    </div>
  );
};

export default ClientLayout;