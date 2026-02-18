'use client'; // Required for useState and event listeners

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure icons are loaded
import '@/styles/Sidebar.css';

function Sidebar() {
    const [hoveredItem, setHoveredItem] = useState(null);

    const pathname = usePathname();

    // Check if the current route is an admin page
    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    const menuLinks = [
        { id: 'helpline', icon: 'fas fa-phone', label: 'Helpline', path: 'tel:+918875071333' },
        { id: 'brochure', icon: 'fas fa-book-open', label: 'Brochure', path: 'https://firebasestorage.googleapis.com/...' },
        { id: 'admissions', icon: 'fas fa-user-graduate', label: 'Admissions', path: 'https://admission.jeckukas.org.in/' },
        { id: 'events', icon: 'fas fa-calendar-alt', label: 'Events', path: 'https://jeckukas.org.in/jec/Alumni' },
        { id: 'whatsapp', icon: 'fab fa-whatsapp', label: 'WhatsApp', path: 'https://wa.me/918875071333' },
    ];

    return (
        <div className="college-side-bar">
            {menuLinks.map((link) => (
                <a
                    key={link.id}
                    href={link.path}
                    className={`${link.id} ${hoveredItem === link.id ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredItem(link.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    target={link.id === 'whatsapp' || link.id === 'brochure' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                >
                    <i className={link.icon}></i>
                    <span>{link.label}</span>
                </a>
            ))}
        </div>
    );
}

export default Sidebar;