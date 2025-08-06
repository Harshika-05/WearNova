import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Star, ArrowRight, Menu, X, Instagram, Twitter, Facebook } from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const products = [
    {
      id: 1,
      name: "Neon Street Hoodie",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      category: "Hoodies"
    },
    {
      id: 2,
      name: "Cyberpunk Tee",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      category: "T-Shirts"
    },
    {
      id: 3,
      name: "Retro Denim Jacket",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      category: "Jackets"
    },
    {
      id: 4,
      name: "Y2K Cargo Pants",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      category: "Pants"
    }
  ]

  const heroSlides = [
    {
      title: "WearNova",
      subtitle: "Where Style Meets Innovation",
      gradient: "linear-gradient(135deg, #FF6B9D, #4ECDC4)"
    },
    {
      title: "Gen Z Fashion",
      subtitle: "Express Your Unique Style",
      gradient: "linear-gradient(135deg, #4ECDC4, #FFE66D)"
    },
    {
      title: "Future is Now",
      subtitle: "Sustainable & Stylish",
      gradient: "linear-gradient(135deg, #FFE66D, #FF6B9D)"
    }
  ]

  return (
    <div className="app">
      {/* Navigation */}
      <motion.nav 
        className="nav glass"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="nav-content">
          <motion.h1 
            className="logo text-gradient"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            WearNova
          </motion.h1>
          
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#login">Login/Signup</a>
          </div>

          <div className="nav-actions">
            <motion.button 
              className="icon-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={20} />
            </motion.button>
            <motion.button 
              className="icon-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={20} />
            </motion.button>
            <motion.button 
              className="menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu glass"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title text-gradient neon-text">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="hero-subtitle">
              {heroSlides[currentSlide].subtitle}
            </p>
            <motion.button 
              className="cta-btn"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 157, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="floating-card glass">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop" 
                alt="Fashion Model"
                className="hero-image"
              />
            </div>
          </motion.div>
        </div>

        <div className="slide-indicators">
          {[0, 1, 2].map((index) => (
            <motion.button
              key={index}
              className={`indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="products-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-gradient">Trending Now</h2>
          <p className="section-subtitle">Discover the latest in Gen Z fashion</p>
        </motion.div>

        <div className="products-grid">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card glass hover-glow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <motion.button 
                    className="wishlist-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={20} />
                  </motion.button>
                  <motion.button 
                    className="add-to-cart-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingBag size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="#FFE66D" />
                  ))}
                  <span>(4.8)</span>
                </div>
                <p className="product-price">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <motion.div 
            className="feature-card glass"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>Get your style delivered in 24 hours</p>
          </motion.div>

          <motion.div 
            className="feature-card glass"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="feature-icon">🌱</div>
            <h3>Sustainable</h3>
            <p>Eco-friendly materials and practices</p>
          </motion.div>

          <motion.div 
            className="feature-card glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="feature-icon">💎</div>
            <h3>Premium Quality</h3>
            <p>Only the finest materials used</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer glass">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="text-gradient">WearNova</h3>
            <p>Where style meets innovation. Join the fashion revolution.</p>
            <div className="social-links">
              <motion.a href="#" whileHover={{ scale: 1.2 }}><Instagram size={20} /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }}><Twitter size={20} /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }}><Facebook size={20} /></motion.a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Returns</a>
            <a href="#">Size Guide</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 WearNova. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
