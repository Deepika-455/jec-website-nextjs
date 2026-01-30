"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '@/styles/Gallery.css'; 
import LogoCarousel from '@/components/LogoCarousel'; 
import { db } from '@/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

function Gallery() {
    const [galleryData, setGalleryData] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albumImages, setAlbumImages] = useState([]);
    const [viewerIndex, setViewerIndex] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    const albumId = params?.albumId ? params.albumId[0] : null;

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "albums"));
                const albums = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setGalleryData(albums);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };
        fetchGallery();
    }, []);

    useEffect(() => {
        if (albumId && galleryData.length > 0) {
            const album = galleryData.find(a => a.id === albumId);
            if (album) {
                const sourceImages = album.images || [];
                const normalizedImages = sourceImages.map(img => {
                    if (typeof img === 'string') {
                        return { url: img, alt: album.title + " Photo" };
                    }
                    return img;
                });
                setAlbumImages(normalizedImages);
                setSelectedAlbum(album);
                document.body.style.overflow = 'hidden';
            }
        } else if (!albumId) {
            setSelectedAlbum(null);
            setAlbumImages([]);
            document.body.style.overflow = 'auto';
        }
    }, [albumId, galleryData]);

    const handleAlbumClick = (album) => {
        router.push(`/campus-life/image-gallery/${album.id}`);
    };

    const closeModal = () => {
        setSelectedAlbum(null);
        document.body.style.overflow = 'auto';
        router.push('/campus-life/image-gallery');
    };

    const openImageViewer = (index) => {
        setViewerIndex(index);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        setViewerIndex(null);
    };

    const changeImage = useCallback((direction) => {
        if (!isViewerOpen || viewerIndex === null) return;
        let newIndex = viewerIndex + direction;
        if (newIndex >= albumImages.length) newIndex = 0;
        else if (newIndex < 0) newIndex = albumImages.length - 1;
        setViewerIndex(newIndex);
    }, [isViewerOpen, viewerIndex, albumImages.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isViewerOpen) closeImageViewer();
                else if (selectedAlbum) closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isViewerOpen, selectedAlbum]);

    return (
        <div className="gallery-page">
            <header className="modern-hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <i className="fas fa-camera"></i> JEC MEMORIES
                    </div>
                    <h1>Capturing<br /><span>Excellence</span> & Life</h1>
                    <p>Explore our visual journey. From vibrant cultural fests to state-of-the-art labs, experience the JEC spirit through our lens.</p>
                    <div className="scroll-indicator">
                        <i className="fas fa-arrow-down"></i> Scroll to Albums
                    </div>
                </div>
                
                <div className="hero-collage">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2FBimg1.JPG?alt=media&token=bb203ee8-435d-447b-8fc9-c0049cbdc72f" className="collage-img img-main" alt="Campus Life" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2FBimg2.JPG?alt=media&token=d93ec6c5-5618-499a-b1d3-dc91716c6bd0" className="collage-img img-sub-1" alt="Labs" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2FBimg3.jpg?alt=media&token=127580d4-7463-49df-a65f-6ad0d6ef532e" className="collage-img img-sub-2" alt="Culture" />
                </div>
            </header>

            <div className="container">
                <div className="section-header">
                    <div>
                        <h2>Event <span>Albums</span></h2>
                        <p>Select a category to view the full gallery.</p>
                    </div>
                </div>

                <div className="album-grid">
                    {galleryData.map((item) => (
                        <div className="album-card" key={item.id} onClick={() => handleAlbumClick(item)}>
                            <div className="album-cover">
                                <img src={item.cover} alt={item.coverAlt || item.title} />
                                <div className="album-overlay">
                                    <div className="view-btn">View Album</div>
                                </div>
                            </div>
                            <div className="album-info">
                                <div className="album-meta">
                                    <span className="album-count">{item.count} Photos</span>
                                </div>
                                <div className="album-title">{item.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- ALBUM MODAL --- */}
            {selectedAlbum && (
                <div className="modal" style={{ zIndex: 10000, display: 'block', overflowY: 'auto', paddingTop: '100px' }}>
                    <div className="container">
                        
                        {/* HEADER SECTION WITH UNDERLINE */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            width: '100%',
                            paddingBottom: '1rem',
                            marginBottom: '2rem',
                            borderBottom: '1px solid rgba(255,255,255,0.1)' // RESTORED UNDERLINE
                        }}>
                            <h2 className="modal-title" style={{ margin: 0, color: '#f39c12', fontSize: '1.8rem' }}>
                                {selectedAlbum.title}
                            </h2>
                            
                            <div 
    className="close-btn" 
    onClick={closeModal}
    style={{ 
        cursor: 'pointer', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        /* --- ADJUST THESE VALUES --- */
        marginTop: '100px',    // Higher number = moves the icon LOWER
        marginRight: '120px',  // Higher number = moves the icon further LEFT (toward title)
    }}
>
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
</div>
                        </div>

                        {/* GRID SECTION */}
                        <div className="modal-grid">
                            {albumImages.map((imgObj, index) => (
                                <div className="modal-img-wrapper" key={index} onClick={() => openImageViewer(index)}>
                                    <img src={imgObj.url} alt={imgObj.alt} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {isViewerOpen && (
                <div className="image-viewer" style={{ zIndex: 11000 }}>
                    <span className="viewer-close" onClick={closeImageViewer}>&times;</span>
                    <div className="viewer-nav viewer-prev" onClick={() => changeImage(-1)}>&#10094;</div>
                    <img className="viewer-img" src={albumImages[viewerIndex].url} alt={albumImages[viewerIndex].alt} />
                    <div className="viewer-nav viewer-next" onClick={() => changeImage(1)}>&#10095;</div>
                    <div className="image-counter">{viewerIndex + 1} / {albumImages.length}</div>
                </div>
            )}

            <LogoCarousel />
        </div>
    );
}

export default Gallery;