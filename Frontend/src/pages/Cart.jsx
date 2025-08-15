import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Star, ArrowLeft, Trash2, Plus, Minus, CreditCard, Lock, Truck, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const [isLoading, setIsLoading] = useState(false)
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()

  const getSubtotal = () => {
    return getCartTotal()
  }

  const getShipping = () => {
    return getSubtotal() > 2000 ? 0 : 150
  }

  const getTotal = () => {
    return getSubtotal() + getShipping()
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false)
      console.log('Proceeding to checkout with items:', cartItems)
      // Add your checkout logic here
    }, 2000)
  }

  return (
    <div className="cart-page">
      {/* Background Orbs */}
      <div className="cart-background">
        <div className="gradient-orb cart-orb-1"></div>
        <div className="gradient-orb cart-orb-2"></div>
        <div className="gradient-orb cart-orb-3"></div>
      </div>

      {/* Back Button */}
      <motion.div 
        className="back-button"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="back-link">
          <ArrowLeft size={24} />
          <span>Back to Shop</span>
        </Link>
      </motion.div>

      <div className="cart-container">
        <motion.div 
          className="cart-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Cart Header */}
          <motion.div 
            className="cart-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="cart-title text-gradient">Your Cart</h1>
            <p className="cart-subtitle">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>

          <div className="cart-layout">
            {/* Cart Items */}
            <motion.div 
              className="cart-items-section"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="cart-items-header">
                <h3>Items</h3>
                <span className="item-count">{cartItems.length} items</span>
              </div>

              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <motion.div 
                    className="empty-cart glass"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <ShoppingBag size={64} className="empty-cart-icon" />
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/">
                      <motion.button 
                        className="cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Shopping
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="cart-items">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="cart-item glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.1 }}
                        layout
                      >
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        
                        <div className="item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <p className="item-category">{item.category}</p>
                          <div className="item-size">
                            <span>Size: {item.size}</span>
                          </div>
                          <div className="item-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={14} fill="#FFE66D" />
                            ))}
                            <span>(4.8)</span>
                          </div>
                        </div>

                                                 <div className="item-quantity">
                           <motion.button
                             className="quantity-btn"
                             onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                             whileHover={{ scale: 1.1 }}
                             whileTap={{ scale: 0.9 }}
                           >
                             <Minus size={16} />
                           </motion.button>
                           <span className="quantity">{item.quantity}</span>
                           <motion.button
                             className="quantity-btn"
                             onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                             whileHover={{ scale: 1.1 }}
                             whileTap={{ scale: 0.9 }}
                           >
                             <Plus size={16} />
                           </motion.button>
                         </div>

                        <div className="item-price">
                          <span className="price">₹{item.price}</span>
                          <span className="total-price">₹{item.price * item.quantity}</span>
                        </div>

                                                 <motion.button
                           className="remove-btn"
                           onClick={() => removeFromCart(item.id, item.size)}
                           whileHover={{ scale: 1.1, color: '#ff4757' }}
                           whileTap={{ scale: 0.9 }}
                         >
                           <Trash2 size={20} />
                         </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Cart Summary */}
            <motion.div 
              className="cart-summary glass"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-items">
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>₹{getSubtotal()}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping</span>
                  <span>{getShipping() === 0 ? 'Free' : `₹${getShipping()}`}</span>
                </div>
                {getShipping() > 0 && (
                  <div className="free-shipping-notice">
                    <span>Add ₹{2000 - getSubtotal()} more for free shipping</span>
                  </div>
                )}
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{getTotal()}</span>
                </div>
              </div>

              <motion.button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isLoading || cartItems.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <motion.div 
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <CreditCard size={20} />
                    Proceed to Checkout
                  </>
                )}
              </motion.button>

              <div className="security-badges">
                <div className="security-badge">
                  <Lock size={16} />
                  <span>Secure Payment</span>
                </div>
                <div className="security-badge">
                  <Truck size={16} />
                  <span>Fast Delivery</span>
                </div>
                <div className="security-badge">
                  <Shield size={16} />
                  <span>Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Cart
