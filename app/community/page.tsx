"use client";

import React, { useState } from 'react';
import Navbar from '@/components/community/Navbar';
import Sidebar from '@/components/community/Sidebar';
import Hero from '@/components/community/Hero';
import ProductGrid from '@/components/community/ProductGrid';
import ProductDetail from '@/components/community/ProductDetail';
import Cart from '@/components/community/Cart';
import BottomSection from '@/components/community/BottomSection';
import Footer from '@/components/community/Footer';
import SignupPage from '@/components/community/SignupPage';
import { products, Product } from '@/lib/community/data';
import { CartProvider } from '@/context/community/CartContext';
import './community.css';

export default function CommunityPage() {
  const [view, setView] = useState<'store' | 'signup'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All Products');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  if (view === 'signup') {
    return (
      <div className="community-root">
        <SignupPage onBack={() => setView('store')} />
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = currentCategory === 'All Products' || product.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <CartProvider>
      <div className="community-root">
        <Navbar 
          onSearch={setSearchQuery} 
          onSoftwareClick={() => setSelectedProductId(null)}
          isDetailView={!!selectedProductId}
        />
        
        <main className="community-main">
          {!selectedProductId ? (
            <>
              <Sidebar 
                onCategoryChange={setCurrentCategory} 
                currentCategory={currentCategory} 
              />
              <div className="content-area">
                <Hero />
                <ProductGrid 
                  products={filteredProducts} 
                  onProductClick={setSelectedProductId} 
                />
              </div>
            </>
          ) : (
            selectedProduct && (
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => setSelectedProductId(null)} 
              />
            )
          )}
        </main>

        <BottomSection />
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
}
