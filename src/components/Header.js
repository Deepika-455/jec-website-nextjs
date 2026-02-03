/* src/components/Header.js (or Navigation.js) */
"use client";
import React from 'react';
import Link from 'next/link';
import '@/styles/Navigation.css'; // Ensure this import is uncommented!

export default function Header() {
  return (
    <>
      {/* Top Bar Section */}
      <div className="jec-top-bar">
        <div className="jec-top-container">
          
          {/* LEFT SIDE: Contact Info with Yellow Icons */}
          <div className="jec-top-left">
            
            {/* Phone Number Item */}
            <div className="jec-info-item">
              {/* The CSS rule '.jec-info-item i' turns this icon GOLD/YELLOW */}
              <i className="fas fa-phone-alt"></i> 
              <span>+91-88750 71333 (30 lines)</span>
            </div>

            {/* Email Item */}
            <div className="jec-info-item">
              {/* The CSS rule '.jec-info-item i' turns this icon GOLD/YELLOW */}
              <i className="fas fa-envelope"></i>
              <a href="mailto:admission@jeckukas.org.in">admission@jeckukas.org.in</a>
            </div>

          </div>

          {/* RIGHT SIDE: Links & Red Button */}
          <div className="jec-top-right">
            {/* 1. Admission Enquiry */}
          <Link href="/admission/admission-enquiry" className="jec-top-link">
             <i className="fas fa-edit"></i> Admission Enquiry 2026
          </Link>

          {/* 2. Virtual Tour */}
          <Link href="/virtual-tour" className="jec-top-link">
             <i className="fas fa-vr-cardboard"></i> Virtual Tour 
          </Link>

          {/* 3. Grievance Form */}
          <Link href="/grievance-form" className="jec-top-link">
             <i className="fas fa-file-alt"></i> Grievance Form
          </Link>

          {/* 4. Blog */}
          <Link href="/blog" className="jec-top-link">
             <i className="fas fa-blog"></i> Blog
          </Link>
          
          {/* 5. Contact Button (Red) */}
          <Link href="/contact-us" className="jec-top-cta">
             CONTACT US
          </Link>
          </div>

        </div>
      </div>

      {/* Main Navigation (Logo, Menu, etc.) would go here... */}
    </>
  );
}