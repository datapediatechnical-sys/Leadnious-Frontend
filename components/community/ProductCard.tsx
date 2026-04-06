"use client";

import React from 'react';
import { Product } from '@/lib/community/data';

interface ProductCardProps {
    product: Product;
    onProductClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    return (
        <div className="product-card" onClick={() => onProductClick(product.id)}>
            <div className="card-image-wrap">
                <img src={product.image} alt={product.name} className="card-image" />
                {product.isNew && <span className="badge-new">NEW</span>}
                <div className="card-overlay">
                    <span className="btn-view">View Details</span>
                </div>
            </div>
            <div className="card-content">
                <div className="card-header">
                    <div className="card-icon">
                        <i className={product.icon}></i>
                    </div>
                    <div className="card-title-wrap">
                        <h3 className="card-title">{product.name}</h3>
                        <span className="card-category">{product.category}</span>
                    </div>
                </div>
                <p className="card-subtitle">{product.subtitle}</p>
                <div className="card-footer">
                    <div className="card-rating">
                        <i className="fas fa-star"></i>
                        <span>{product.rating}</span>
                        <span className="review-count">({product.reviews})</span>
                    </div>
                    <div className="card-price">
                        <span className="original-price">${product.originalPrice}</span>
                        <span className="current-price">${product.price}</span>
                    </div>
                </div>
            </div>
            <div className="card-brand">
                <span>LEADNIUS SELECT</span>
            </div>
        </div>
    );
};

export default ProductCard;
