"use client";

import React from 'react';
import { useCart } from '@/context/community/CartContext';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="cart-sidebar">
            <div className={`cart-container ${isCartOpen ? 'cart-container-open' : ''}`}>
                <div className="cart-header">
                    <h2 className="cart-title">Your Cart ({cart.length})</h2>
                    <button onClick={() => setIsCartOpen(false)} className="btn-close-cart">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="cart-items">
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart-item-info">
                                <h4 className="cart-item-title">{item.name}</h4>
                                <p className="cart-item-price">${item.price}</p>
                                <div className="cart-item-actions">
                                    <div className="quantity-control">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="btn-remove-item">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {cart.length === 0 && <p className="empty-cart-msg">Your cart is empty.</p>}
                </div>
                <div className="cart-footer">
                    <div className="cart-summary">
                        <div className="summary-row">
                            <span className="summary-label">Total</span>
                            <span className="summary-value">${cartTotal}</span>
                        </div>
                    </div>
                    <div className="cart-actions">
                        <button className="btn-checkout" disabled={cart.length === 0}>Checkout</button>
                        <button className="btn-clear-cart" onClick={clearCart} disabled={cart.length === 0}>Clear Cart</button>
                    </div>
                </div>
            </div>
            <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
        </div>
    );
};

export default Cart;
