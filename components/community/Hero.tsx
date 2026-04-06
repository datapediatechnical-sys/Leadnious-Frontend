"use client";

import React from 'react';
import { products } from '@/lib/community/data';

const Hero: React.FC = () => {
  return (
    <section className="community-hero">
      <div className="hero-content">
        <h2 className="hero-title">Welcome to Leadnius Community</h2>
        <p className="hero-description">Discover the best sales and marketing software, curated by experts.</p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{products.length}</span>
            <span className="stat-label">Verified Tools</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2,000+</span>
            <span className="stat-label">Active Users</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
