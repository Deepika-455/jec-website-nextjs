"use client";
import React, { useState, useEffect,useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '@/styles/Navigation.css';


// Full list of menu items
const menuData = [
    { name: "Home", link: "/" },
    // ... (Your menu data remains the same)
];

function Subheader() {
    const searchRef = useRef(null); 
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const inputRef = useRef(null);  // added recently

    const pathname = usePathname();

    // Close menu on navigate
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        setSearchQuery(""); // Clear search on page change  added recently
    }, [pathname]);

    const toggleDropdown = (e, menuName) => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            setActiveDropdown(activeDropdown === menuName ? null : menuName);
        }
    };
    // added recently
  const handleSearch = (query) => {
    setSearchQuery(query);

    // 1. Remove any old highlights first to avoid infinite loops/messy DOM
    const oldMarks = document.querySelectorAll('.jec-page-highlight');
    oldMarks.forEach(mark => {
        const parent = mark.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize(); 
        }
    });

    if (!query || query.trim().length < 2) return;

    // 2. Function to crawl the text and wrap matches
    const walkAndMark = (node) => {
        if (node.nodeType === 3) { // It's a Text Node
            const text = node.textContent;
            const lowerText = text.toLowerCase();
            const lowerQuery = query.toLowerCase();
            const index = lowerText.indexOf(lowerQuery);

            if (index >= 0) {
                const range = document.createRange();
                range.setStart(node, index);
                range.setEnd(node, index + query.length);

                const mark = document.createElement('mark');
                mark.className = 'jec-page-highlight';
                range.surroundContents(mark);
                return true; // Match found
            }
        } else if (node.nodeType === 1 && 
                   node.childNodes && 
                   !['SCRIPT', 'STYLE', 'HEADER', 'NAV', 'INPUT'].includes(node.tagName)) {
            // Traverse children but skip UI elements
            for (let i = 0; i < node.childNodes.length; i++) {
                if (walkAndMark(node.childNodes[i])) i++; // Increment skip for the new mark tag
            }
        }
    };

    // 3. Highlight inside the main content area
    const mainContent = document.querySelector('main') || document.body;
    walkAndMark(mainContent);
};

    const highlightText = (text, query) => {
  if (!query) return text;

  // Escape special characters and create a global, case-insensitive regex
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  
  // Split the text into an array of matching and non-matching parts
  const parts = text.split(regex);

  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} className="jec-search-match">{part}</span>
    ) : (
      part
    )
  );
};

    return (
        <div className="jec-master-header">
            
            {/* --- 1. TOP BLACK BAR --- */}
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
                        <Link href="/admission-enquiry" className="jec-top-link"><i className="far fa-edit"></i> Admission Enquiry 2026</Link>
                        <Link href="/virtual-tour" className="jec-top-link"><i className="fas fa-vr-cardboard"></i> Virtual Tour</Link>
                        <Link href="/grievance" className="jec-top-link"><i className="fas fa-file-alt"></i> Grievance Form</Link>
                        <Link href="/blog" className="jec-top-link"><i className="fas fa-blog"></i> Blog</Link>
                        <Link href="/contact" className="jec-top-cta">
             CONTACT US
          </Link>
                    </div>
                </div>
            </div>

            {/* --- 2. MAIN WHITE NAVIGATION --- */}
            <div className="jec-nav-wrapper">
                <header className="jec-header">
                    <div className="jec-container">

                        {/* LOGO */}
                        <Link href="/" className="jec-logo-link">
                            <img src="/JEC-LOGO.png" alt="JEC Logo" className="jec-logo-img" />
                        </Link>

                        {/* HAMBURGER */}
                        <div className="jec-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                        </div>

                        {/* MENU ITEMS */}
                        <ul className={`jec-menu-list ${isMobileMenuOpen ? 'jec-active' : ''}`}>
                            <li className="jec-menu-item"><Link href="/" className="jec-nav-link">Home</Link></li>

                            <li className={`jec-menu-item ${activeDropdown === 'jec' ? 'jec-open' : ''}`}>
                                <a href="#!" className="jec-nav-link" onClick={(e) => toggleDropdown(e, 'jec')}>JEC <i className="fas fa-chevron-down"></i></a>
                                <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'jec' ? 'jec-show' : ''}`}>
                                    <li><Link href="/jec/about-jec" className="jec-dropdown-link">About JEC</Link></li>
                                    <li><Link href="/jec/management" className="jec-dropdown-link">Management</Link></li>
                                    <li><Link href="/jec/network" className="jec-dropdown-link">Faculty</Link></li>
                                    <li><Link href="/jec/alumni" className="jec-dropdown-link">Alumni</Link></li>
                                    <li><Link href="/jec/Students-Testimonials" className="jec-dropdown-link">Students Testimonials</Link></li>
                                    <li><Link href="/jec/Anti-Ragging-Committee" className="jec-dropdown-link">Anti-Ragging Committee</Link></li>
                                    <li><Link href="/jec/Institution-Innovation-Council-JEC" className="jec-dropdown-link">Institution Innovation Council</Link></li>
                                    <li><Link href="/jec/JEC-FAQ" className="jec-dropdown-link">JEC FAQ</Link></li>
                                    <li><Link href="/jec/Employment-JEC" className="jec-dropdown-link">Employment @JEC</Link></li>
                                </ul>
                            </li>

                            <li className={`jec-menu-item ${activeDropdown === 'admission' ? 'jec-open' : ''}`}>
                                <a href="#!" className="jec-nav-link" onClick={(e) => toggleDropdown(e, 'admission')}>Admission <i className="fas fa-chevron-down"></i></a>
                                <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'admission' ? 'jec-show' : ''}`}>
                                    <li><Link href="/admission/Admission-Open" className="jec-dropdown-link jec-highlight">Admission Open 2026</Link></li>
                                    <li><Link href="/admission/Admission-Procedure" className="jec-dropdown-link">Admission Procedure</Link></li>
                                    <li><Link href="/admission/Fee-Structure" className="jec-dropdown-link">Fee Structure</Link></li>
                                    <li><Link href="/admission/Documents-Required" className="jec-dropdown-link">Documents Required</Link></li>
                                    <li><Link href="/admission/Courses-Offered" className="jec-dropdown-link">Courses Offered</Link></li>
                                    <li><Link href="/admission/REAP-2025" className="jec-dropdown-link">REAP-2025</Link></li>
                                    <li><Link href="/admission/Financial-Aids-Bank-Loans" className="jec-dropdown-link">Financial Aids & Loans</Link></li>
                                    <li><Link href="/admission/Mandatory-Disclosure" className="jec-dropdown-link">Mandatory Disclosure</Link></li>
                                    <li><Link href="/admission/karma" className="jec-dropdown-link">Skill Courses @JEC</Link></li>
                                </ul>
                            </li>

                            <li className={`jec-menu-item ${activeDropdown === 'dept' ? 'jec-open' : ''}`}>
                                <a href="#!" className="jec-nav-link" onClick={(e) => toggleDropdown(e, 'dept')}>Departments <i className="fas fa-chevron-down"></i></a>
                                <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'dept' ? 'jec-show' : ''}`}>
                                    <li><Link href="/department/Computer-Science-Engineering-AI" className="jec-dropdown-link">Computer Science & Eng. (AI)</Link></li>
                                    <li><Link href="/department/Computer-Science-Engineering" className="jec-dropdown-link">Computer Science Engineering</Link></li>
                                    <li><Link href="/department/Electronics-Communication-Engineering" className="jec-dropdown-link">Electronics & Communication</Link></li>
                                    <li><Link href="/department/Civil-Engineering" className="jec-dropdown-link">Civil Engineering</Link></li>
                                    <li><Link href="/department/Mechanical-Engineering" className="jec-dropdown-link">Mechanical Engineering</Link></li>
                                    <li><Link href="/department/Electrical-Engineering" className="jec-dropdown-link">Electrical Engineering</Link></li>
                                    <li><Link href="/department/Applied-Sciences-Humanities" className="jec-dropdown-link">Applied Sciences & Humanities</Link></li>
                                    <li><Link href="/department/Centre-Of-Excellence-COE" className="jec-dropdown-link">Centre Of Excellence (COE)</Link></li>
                                    <li><Link href="/department/JEC-Research-Cell" className="jec-dropdown-link">JEC Research Cell</Link></li>
                                    <li><Link href="/department/Engineering-JEC" className="jec-dropdown-link">Engineering @ JEC</Link></li>
                                    <li><Link href="/department/MOOCS-NPTEL-SWAYAM" className="jec-dropdown-link">MOOCS: NPTEL SWAYAM</Link></li>
                                    <li><Link href="/department/MTech" className="jec-dropdown-link">M.Tech Programs</Link></li>
                                </ul>
                            </li>

                            <li className="jec-menu-item"><Link href="/placement" className="jec-nav-link">
    {highlightText("Placement", searchQuery)}
</Link></li>

                            <li className={`jec-menu-item ${activeDropdown === 'infra' ? 'jec-open' : ''}`}>
                                <a href="#!" className="jec-nav-link" onClick={(e) => toggleDropdown(e, 'infra')}>Infrastructure <i className="fas fa-chevron-down"></i></a>
                                <ul className={`jec-dropdown jec-mega jec-cols-2 ${activeDropdown === 'infra' ? 'jec-show' : ''}`}>
                                    <li><Link href="/Infrastructure/Learning-By-Doing" className="jec-dropdown-link">Learning By Doing</Link></li>
                                    <li><Link href="/Infrastructure/Prepare-and-Present" className="jec-dropdown-link">Prepare and Present</Link></li>
                                    <li><Link href="/Infrastructure/Refuel-and-Relax" className="jec-dropdown-link">Refuel and Relax</Link></li>
                                    <li><Link href="/Infrastructure/Convenience-and-Safety" className="jec-dropdown-link">Convenience and Safety</Link></li>
                                </ul>
                            </li>

                            <li className={`jec-menu-item ${activeDropdown === 'campus' ? 'jec-open' : ''}`}>
                                <a href="#!" className="jec-nav-link" onClick={(e) => toggleDropdown(e, 'campus')}>Campus Life <i className="fas fa-chevron-down"></i></a>
                                <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'campus' ? 'jec-show' : ''}`}>
                                  
                                    <li><Link href="/campus-life/academic-achievers" className="jec-dropdown-link">Academic Achievers</Link></li>
                                    <li><Link href="/campus-life/engineering-projects" className="jec-dropdown-link">Engineering Projects</Link></li>
                                    <li><Link href="/campus-life/games-and-sports" className="jec-dropdown-link">Games and Sports</Link></li>
                                    <li><Link href="/campus-life/guts-n-glory" className="jec-dropdown-link">Guts n Glory</Link></li>
                                    <li><Link href="/campus-life/committees-zone" className="jec-dropdown-link">Committees Zone</Link></li>
                                    <li><Link href="/campus-life/mental-health" className="jec-dropdown-link">Student Mental Health</Link></li>
                                    <li><Link href="/campus-life/students-corner" className="jec-dropdown-link">JEC Students Corner</Link></li>
                                    <li><Link href="/campus-life/image-gallery" className="jec-dropdown-link">Image Gallery</Link></li>
                                    <li><Link href="/campus-life/video-gallery" className="jec-dropdown-link">Video Gallery</Link></li>
                                </ul>
                            </li>

                            <li className={`jec-menu-item ${activeDropdown === 'society' ? 'jec-open' : ''}`}>
                                <a href="#!" className="jec-nav-link" onClick={(e) => toggleDropdown(e, 'society')}>Society <i className="fas fa-chevron-down"></i></a>
                                <ul className={`jec-dropdown jec-mega jec-cols-2 ${activeDropdown === 'society' ? 'jec-show' : ''}`}>
                                    <li><Link href="/Our-Society/Foundation-for-Better-Tomorrow" className="jec-dropdown-link">Foundation for Better Tomorrow</Link></li>
                                    <li><Link href="/Our-Society/Key-Teams-Functions" className="jec-dropdown-link">Key Teams & Functions</Link></li>
                                    <li><Link href="/Our-Society/Other-Institutes-Agrasen-College" className="jec-dropdown-link">Agrasen College</Link></li>
                                    <li><Link href="/Our-Society/Other-Institutes-Jaipur-College-of-Education-and-Science" className="jec-dropdown-link">Jaipur College of Ed & Sci</Link></li>
                                </ul>
                            </li>
                            {/* --- MOBILE ONLY: CONTACT INFO (Issue 2 Fix) --- */}
                            <li className="jec-mobile-contact-wrapper"> {/* Add this line */}
                            <div className="jec-mobile-contact-info">
                                <h4>GET IN TOUCH</h4>
                                <div className="jec-contact-row">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>SP-43, RIICO Ind. Area, Kukas, Jaipur - 302028</span>
                                </div>
                                <div className="jec-contact-row">
                                    <i className="fas fa-phone-alt"></i>
                                    <a href="tel:+918875071333">+91-88750 71333</a>
                                </div>
                                <div className="jec-contact-row">
                                    <i className="fas fa-envelope"></i>
                                    <a href="mailto:admission@jeckukas.org.in">admission@jeckukas.org.in</a>
                                </div>
                            </div>
                            </li>
                            
                            {/* SEARCH ICON REMOVED FROM HERE */}


 {/* SEARCH ICON (Desktop Only) */}
                               {/* SEARCH ICON (Desktop Only) - IN-PAGE SEARCH */}
{/* --- SEARCH ICON (Desktop Only) --- */}
<li className="jec-menu-item jec-desktop-search" ref={searchRef}>
    <div className={`jec-search-inline ${isSearchOpen ? 'active' : ''}`}>
        <input
            ref={inputRef}
            type="text"
            placeholder="Find on page..." 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus={isSearchOpen}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                        const found = window.find(searchQuery);
                        if (!found) alert("Text not found on this page.");
                    }
                }
            }}
        />
        <button 
            type="button" 
            onClick={() => {
                if (!isSearchOpen) {
                    setIsSearchOpen(true);
                } else if (searchQuery.trim()) {
                    window.find(searchQuery);
                } else {
                    setIsSearchOpen(false);
                }
            }}
        >
            <i className="fas fa-search"></i>
        </button>
    </div>
</li>


                        </ul>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Subheader;