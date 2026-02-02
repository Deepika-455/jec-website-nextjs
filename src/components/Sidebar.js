"use client";
import React, { useState } from 'react';
//import Link from 'next/link'; // Optional: Use Link for internal navigation if preferred
import '@/styles/Sidebar.css'; // Ensure this path matches where you put the CSS

function Sidebar() {
    // Logic to track which item is hovered so only one expands at a time
    const [hoveredItem, setHoveredItem] = useState(null);

    const menuLinks = [
        {
            id: 'helpline',
            icon: 'fas fa-phone',
            label: 'Helpline',
            path: 'tel:+918875071333' // Triggers a standard phone call
        },
        { 
            id: 'brochure', 
            icon: 'fas fa-book-open', 
            label: 'Brochure', 
            path: 'https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/02%20(1)%20(1).pdf?alt=media&token=53ba1100-809c-4815-9db8-01b1cac5071d' 
        },
        { 
            id: 'admissions', 
            icon: 'fas fa-user-graduate', 
            label: 'Admissions', 
            path: 'https://admission.jeckukas.org.in/' 
        },
        { 
            id: 'events', 
            icon: 'fas fa-calendar-alt', 
            label: 'Events', 
            path: '/jec/Alumni' 
        },
        {
            id: 'whatsapp',
            icon: 'fab fa-whatsapp',
            label: 'WhatsApp',
            path: 'https://wa.me/918875071333' // Opens a WhatsApp chat window
        },
    ];

    return (
        <div className="college-side-bar">
            {menuLinks.map((link) => (
                <a
                    key={link.id}
                    href={link.path}
                    // Only the item in state gets the 'active' class to expand
                    className={`${link.id} ${hoveredItem === link.id ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredItem(link.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    // Ensures WhatsApp and Brochure open in a new tab
                    target={link.id === 'whatsapp' || link.id === 'brochure' ? '_blank' : '_self'}
                    rel={link.id === 'whatsapp' || link.id === 'brochure' ? 'noopener noreferrer' : ''}
                >
                    <i className={link.icon}></i>
                    <span>{link.label}</span>
                </a>
            ))}
        </div>
    );
}

export default Sidebar;