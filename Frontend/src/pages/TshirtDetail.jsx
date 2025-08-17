import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Star, ArrowLeft, Minus, Plus, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../App.css';
import './TshirtDetail.css';

function TshirtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Product data
  const products = {
    1: {
      id: 1,
      name: "Oversized-Fit",
      price: 899,
      category: "T-Shirts",
      images: ["/img1.avif", "/img2.avif"],
      description: "Experience ultimate comfort with our premium oversized-fit t-shirt.",
      fabric: "100% Organic Cotton",
      fit: "Oversized - Relaxed fit",
      care: "Machine wash cold",
      origin: "Made in India",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    2: {
      id: 2,
      name: "Cyberpunk Tee",
      price: 999,
      category: "T-Shirts",
      images: ["/img2.avif", "/img3.avif"],
      description: "Step into the future with our cyberpunk-inspired graphic tee.",
      fabric: "95% Cotton, 5% Elastane",
      fit: "Regular fit",
      care: "Machine wash cold",
      origin: "Designed in Tokyo",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    3: {
      id: 3,
      name: "Cool-Fit oversized T-Shirt",
      price: 799,
      category: "T-Shirts",
      images: ["/img3.avif", "/img4.avif"],
      description: "Stay cool and stylish with our signature cool-fit oversized tee.",
      fabric: "60% Cotton, 40% Polyester",
      fit: "Oversized",
      care: "Machine wash cold",
      origin: "Ethically made in India",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    4: {
      id: 4,
      name: "Loved by all",
      price: 799,
      category: "T-Shirts",
      images: ["/img4.avif", "/img1.avif"],
      description: "Our most loved design that speaks to everyone.",
      fabric: "100% Premium Cotton",
      fit: "Classic fit",
      care: "Machine wash warm",
      origin: "Made with pride in India",
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    5: {
      id: 5,
      name: "Girly pop Print Collection",
      price: 849,
      category: "T-Shirts",
      images: ["/umm2.jpg", "/img2.avif"],
      description: "Express your feminine side with our girly pop collection.",
      fabric: "100% Combed Cotton",
      fit: "Semi-fitted",
      care: "Hand wash recommended",
      origin: "Designed for the modern woman",
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    6: {
      id: 6,
      name: "Retro Gaming Tee",
      price: 949,
      category: "T-Shirts",
      images: ["/umm.jpg", "/img3.avif"],
      description: "Level up your style with our retro gaming inspired tee.",
      fabric: "100% Ringspun Cotton",
      fit: "Modern fit",
      care: "Machine wash cold",
      origin: "Gamer-approved design",
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  };

  const product = products[id];

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [id, product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity
    };
    addToCart(cartProduct, selectedSize, quantity);
    
    // Show notification
    setNotificationMessage(`${quantity} ${product.name} added to cart!`);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="tshirt-detail">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle size={20} />
            <span>{notificationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="detail-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button 
          className="back-btn"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Back to Shop
        </motion.button>

        <div className="detail-content">
          <div className="image-gallery">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="product-main-image"
              />
            </div>
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <motion.h1 className="product-title">{product.name}</motion.h1>
            <div className="product-price">₹{product.price}</div>
            <p className="product-description">{product.description}</p>

            <div className="size-selection">
              <h3>Select Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <div className="product-details">
              <h3>Product Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Fabric:</span>
                  <span className="detail-value">{product.fabric}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Fit:</span>
                  <span className="detail-value">{product.fit}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Care:</span>
                  <span className="detail-value">{product.care}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Origin:</span>
                  <span className="detail-value">{product.origin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TshirtDetail;
