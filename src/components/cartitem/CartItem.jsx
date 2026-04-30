import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import "./CartItem.css"
import { Link } from 'react-router-dom'

const CartItem = () => {
    const { getTotalCartAmount, all_product, cartItem, addToCart, removeFromCart } = useContext(ShopContext)

    // ✅ NEW: popup state
    const [showPopup, setShowPopup] = useState(false)

    // Function to clear all items from cart
    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            Object.keys(cartItem).forEach(productId => {
                for (let i = 0; i < cartItem[productId]; i++) {
                    removeFromCart(parseInt(productId))
                }
            })
        }
    }

    // ✅ NEW: place order handler
    const handlePlaceOrder = () => {
        setShowPopup(true)

        // optional auto close after 2 sec
        setTimeout(() => {
            setShowPopup(false)
        }, 2000)
    }

    return (
        <div className='cartitems'>
            <div className="cartitems-header">
                <h2>Shopping Cart ({Object.keys(cartItem).reduce((total, key) => total + cartItem[key], 0)} items)</h2>
                {Object.keys(cartItem).length > 0 && (
                    <button className='clear-cart-btn' onClick={handleClearCart}>
                        CLEAR CART
                    </button>
                )}
            </div>

            {Object.keys(cartItem).length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add items to your cart and they will appear here</p>
                    <Link to="/shop" className="continue-shopping-btn">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            ) : (
                <div className="cartitems-main">
                    {/* Left Side */}
                    <div className="cartitems-left">
                        <div className="cartitems-container">
                            <div className="cartitems-header-row">
                                <div className="header-product">PRODUCT DETAILS</div>
                                <div className="header-price">PRICE</div>
                                <div className="header-quantity">QUANTITY</div>
                                <div className="header-total">TOTAL</div>
                            </div>

                            {all_product.map((product) => {
                                if (cartItem[product.id] > 0) {
                                    return (
                                        <div className="cartitem-row" key={product.id}>
                                            <div className="cartitem-product">
                                                <img src={product.image} alt={product.name} className='cartitem-product-icon' />
                                                <div className="cartitem-product-details">
                                                    <h4>{product.name}</h4>
                                                    <p className="category">Category: {product.category}</p>
                                                    <p className="delivery">Delivery in 2-3 days</p>
                                                </div>
                                            </div>

                                            <div className="cartitem-price">
                                                <div className="price-amount">${product.new_price}</div>
                                                <div className="price-old">${product.old_price}</div>
                                                <div className="price-save">Save ${(product.old_price - product.new_price).toFixed(2)}</div>
                                            </div>

                                            <div className="cartitem-quantity-controls">
                                                <button className="quantity-btn minus" onClick={() => removeFromCart(product.id)}>−</button>
                                                <span className="quantity-value">{cartItem[product.id]}</span>
                                                <button className="quantity-btn plus" onClick={() => addToCart(product.id)}>+</button>
                                            </div>

                                            <div className="cartitem-total-price">
                                                ${(product.new_price * cartItem[product.id]).toFixed(2)}
                                            </div>

                                            <button
                                                className="remove-btn"
                                                onClick={() => {
                                                    if (window.confirm('Remove this item from cart?')) {
                                                        removeFromCart(product.id)
                                                    }
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="cartitems-right">
                        <div className="price-details-card">
                            <div className="price-details-header">
                                <h3>PRICE DETAILS</h3>
                            </div>

                            <div className="price-details-content">
                                <div className="price-row">
                                    <span>Price ({Object.keys(cartItem).reduce((total, key) => total + cartItem[key], 0)} items)</span>
                                    <span>${getTotalCartAmount().toFixed(2)}</span>
                                </div>

                                <div className="price-row">
                                    <span>Delivery Charges</span>
                                    <span className="free">FREE</span>
                                </div>

                                <div className="price-row total-amount">
                                    <span>Total Amount</span>
                                    <span>${getTotalCartAmount().toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="savings-info">
                                <span>
                                    You will save ${(all_product.reduce((total, product) => {
                                        if (cartItem[product.id] > 0) {
                                            return total + ((product.old_price - product.new_price) * cartItem[product.id])
                                        }
                                        return total
                                    }, 0)).toFixed(2)} on this order
                                </span>
                            </div>

                            {/* ✅ UPDATED BUTTON */}
                            <button className="place-order-btn" onClick={handlePlaceOrder}>
                                PLACE ORDER
                            </button>

                            <div className="payment-security">
                                <div className="security-badge">
                                    <span className="lock-icon">🔒</span>
                                    <span>Safe and Secure Payments</span>
                                </div>
                                <div className="payment-methods">
                                    <span>100% Payment Protection</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ NEW POPUP (no design break) */}
           {showPopup && (
    <div className="order-modal-overlay">
        <div className="order-modal">
            <h2>Order Placed 🎉</h2>
            <p>Your order has been placed successfully!</p>

            <button onClick={() => setShowPopup(false)}>
                OK
            </button>
        </div>
    </div>
)}
        </div>
    )
}

export default CartItem