"use client";
import React from 'react';
import Link from 'next/link';
import '@/styles/Navigation.css';

export default function Header() {
  return (
    <div className="top-bar">
      <div className="top-bar-container">
        {/* Left Side: Contact Info */}
        <div className="contact-info">
          <span>
            <i className="fas fa-phone-alt"></i> +91-88750 71333
          </span>
          <span>
            <i className="fas fa-envelope"></i> admission@jeckukas.org.in
          </span>
        </div>

        {/* Right Side: Links and Buttons */}
        <div className="jec-top-right"> {/* Changed class to match CSS */}
          <Link href="/admission/admission-enquiry" className="jec-top-link">
             <i className="fas fa-edit"></i> Admission Enquiry 2026
          </Link>
          {/* UPDATED CLASS HERE: contact-btn -> jec-top-cta */}
          <Link href="/contact-us" className="jec-top-cta">
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}