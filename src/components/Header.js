"use client";
import React from 'react';
import Link from 'next/link';
import '@/styles/Navigation.css'; // Ensure your styles are shared or split

function Header() {
    return (
        <div className="jec-top-bar">
            <div className="jec-container jec-top-container">
                <div className="jec-top-left">
                    <div className="jec-info-item">
                        <i className="fas fa-phone-alt"></i>
                        <a href="tel:+918875071333">+91-88750 71333 (30 lines)</a>
                    </div>
                    <div className="jec-info-item">
                        <i className="fas fa-envelope"></i>
                        <a href="mailto:admission@jeckukas.org.in">admission@jeckukas.org.in</a>
                    </div>
                </div>
                
                <div className="jec-top-right">
                    <Link href="/admission-enquiry" className="jec-top-link">
                        <i className="far fa-edit"></i> Admission Enquiry 2026
                    </Link>
                    <Link href="/virtual-tour" className="jec-top-link">
                        <i className="fas fa-vr-cardboard"></i> Virtual Tour
                    </Link>
                    <Link href="/grievance" className="jec-top-link">
                        <i className="fas fa-file-alt"></i> Grievance Form
                    </Link>
                    <Link href="/blog" className="jec-top-link">
                        <i className="fas fa-blog"></i> Blog
                    </Link>
                    <Link href="/contact" className="jec-top-cta">
                        CONTACT US
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;