"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import this to check current page
import '@/styles/AdmissionPopup.css';

const AdmissionPopup = () => {
    const pathname = usePathname(); // Get current URL path
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Check: If we are NOT on the home page, do not run the script
        if (pathname !== '/') return;

        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
        document.body.appendChild(s);

        return () => {
            if (document.body.contains(s)) {
                document.body.removeChild(s);
            }
        };
    }, [pathname]); // Re-run check if page changes

    // Check: If not home page OR user closed it, return nothing
    if (pathname !== '/') return null;
    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={() => setShow(false)}>
                    &times;
                </button>
                {/* Space for the NPF widget */}
                <div className="npf_wgts" data-height="580px" data-w="c1073fe2350d112d90b129addc24e9ff"></div>
            </div>
        </div>
    );
};

export default AdmissionPopup;