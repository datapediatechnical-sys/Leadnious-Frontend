"use client";

import React from 'react';

interface SidebarProps {
    onCategoryChange: (category: string) => void;
    currentCategory: string;
}

const categories = [
    { name: "All Products", icon: "fas fa-th-large" },
    { name: "Email marketing", icon: "fas fa-envelope" },
    { name: "Content Creation", icon: "fas fa-pen-nib" },
    { name: "Social Media", icon: "fas fa-share-alt" },
    { name: "Productivity", icon: "fas fa-tasks" },
    { name: "Analytics", icon: "fas fa-chart-line" },
];

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, currentCategory }) => {
    return (
        <aside className="community-sidebar">
            <div className="sidebar-section">
                <h3 className="sidebar-title">Categories</h3>
                <nav className="sidebar-nav">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            className={`sidebar-item ${currentCategory === cat.name ? 'active' : ''}`}
                            onClick={() => onCategoryChange(cat.name)}
                        >
                            <i className={cat.icon}></i>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
            <div className="sidebar-section">
                <h3 className="sidebar-title">Filter by Price</h3>
                <div className="price-filter">
                    <button className="sidebar-item">Under $50</button>
                    <button className="sidebar-item">$50 - $100</button>
                    <button className="sidebar-item">Over $100</button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
