"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/community/CartContext';

interface NavbarProps {
    onSearch: (query: string) => void;
    onRegisterClick?: () => void;
    onSoftwareClick?: () => void;
    isDetailView?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onRegisterClick, onSoftwareClick, isDetailView }) => {
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <header className="community-navbar">
            <div className={`navbar-container ${isDetailView ? 'navbar-container-detail' : ''}`}>
                <div className="navbar-left">
                    <div className="logo-wrap">
                        <Link href="/" className="logo-link">
                            <h1 className="logo">
                                <span className="logo-text-primary">Leadnius</span>
                                <span className="logo-text-secondary">Community</span>
                            </h1>
                        </Link>
                    </div>
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search products (⌘+k)"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                </div>
                <nav className="navbar-center">
                    <Link
                        href="/"
                        className="nav-link"
                    >
                        Home
                    </Link>
                    <button
                        className={`nav-link ${!isDetailView ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (onSoftwareClick) onSoftwareClick();
                        }}
                    >
                        Software
                    </button>
                    <span className="nav-link">New Arrival</span>
                    <span className={`nav-link ${isDetailView ? 'active' : ''}`}>
                        {isDetailView ? 'Software Detail' : 'Collaborate'}
                    </span>
                </nav>
                <div className="navbar-right">
                    <div className="cart-icon-wrap" onClick={() => setIsCartOpen(true)}>
                        <div className="cart-icon-inner">
                            <i className="fas fa-shopping-cart"></i>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </div>
                        <span className="cart-text">Cart</span>
                    </div>
                    <button className="btn-login" onClick={onRegisterClick}>Register Now</button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
