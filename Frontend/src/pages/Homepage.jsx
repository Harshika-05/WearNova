import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Star, ArrowRight, Menu, X, Instagram, Twitter, Facebook, Search, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImage from '../assets/image-removebg-preview.png'
import { useCart } from '../context/CartContext'
import '../App.css'

function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [addedItems, setAddedItems] = useState({})
  const { addToCart, getCartCount } = useCart()

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const defaultSearchItems = [
    "Anime Print",
    "Cartoon Print",
    "Neon Street",
    "Cyberpunk Style",
    "Retro Fashion",
    "Y2K Aesthetic"
  ]

  const filteredSearchItems = defaultSearchItems.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Add your search logic here
    }
  }

  const handleSearchItemClick = (item) => {
    setSearchQuery(item)
    setIsSearchFocused(false)
    console.log('Selected search item:', item)
    // Add your search logic here
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    setAddedItems(prev => ({ ...prev, [product.id]: true }))
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  const products = [
    {
      id: 1,
      name: "Oversized-Fit",
      price: "899 Rs",
      image: "/img1.avif",
      category: "T-Shirts"
    },
    {
      id: 2,
      name: "Cyberpunk Tee",
      price: "999 Rs",
      image: "/img2.avif",
      category: "T-Shirts"
    },
    {
      id: 3,
      name: "Cool-Fit oversized T-Shirt",
      price: "799 Rs",
      image: "/img3.avif",
      category: "T-Shirts"
    },
    {
      id: 4,
      name: "Loved by all",
      price: "799 Rs",
      image: "/img4.avif",
      category: "T-Shirts"
    },
    {
      id: 5,
      name: "Girly pop Print Collection",
      price: "849 Rs",
      image: "/umm2.jpg",
      category: "T-Shirts"
    },
    {
      id: 6,
      name: "Retro Gaming Tee",
      price: "949 Rs",
      image: "/umm.jpg",
      category: "T-Shirts"
    }
  ]

  const heroSlides = [
    {
      title: "WearNova",
      subtitle: "Where Style Meets Innovation",
      gradient: "linear-gradient(135deg, #FF6B9D, #4ECDC4)",
      image: "/m3.avif",
      alt: "Stylish oversized t-shirt"
    },
    {
      title: "Gen Z Fashion",
      subtitle: "Express Your Unique Style",
      gradient: "linear-gradient(135deg, #4ECDC4, #FFE66D)",
      image: "/m2.avif",
      alt: "Cyberpunk style t-shirt"
    },
    {
      title: "Future is Now",
      subtitle: "Sustainable & Stylish",
      gradient: "linear-gradient(135deg, #FFE66D, #FF6B9D)",
      image: "/wm1.avif",
      alt: "Cool fit oversized t-shirt"
    }
  ]

  return (
    <div className="homepage">
      {/* Navigation */}
      <motion.nav 
        className="nav glass"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="nav-content">
          <div className="nav-brand">
            <motion.img 
              src={logoImage} 
              alt="WearNova Logo" 
              className="nav-logo-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h1 
              className="logo text-gradient"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              WearNova
            </motion.h1>
          </div>
          
          <div className="nav-search">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search anime print, cartoon print..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="search-input"
                />
                {searchQuery && (
                  <motion.button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </div>
              
              <AnimatePresence>
                {isSearchFocused && (searchQuery || filteredSearchItems.length > 0) && (
                  <motion.div 
                    className="search-dropdown glass"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {searchQuery ? (
                      filteredSearchItems.length > 0 ? (
                        filteredSearchItems.map((item, index) => (
                          <motion.div
                            key={index}
                            className="search-item"
                            onClick={() => handleSearchItemClick(item)}
                            whileHover={{ backgroundColor: 'rgba(255, 107, 157, 0.1)' }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Search size={16} />
                            <span>{item}</span>
                          </motion.div>
                        ))
                      ) : (
                        <div className="search-item no-results">
                          <span>No results found</span>
                        </div>
                      )
                    ) : (
                      defaultSearchItems.map((item, index) => (
                        <motion.div
                          key={index}
                          className="search-item"
                          onClick={() => handleSearchItemClick(item)}
                          whileHover={{ backgroundColor: 'rgba(255, 107, 157, 0.1)' }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Search size={16} />
                          <span>{item}</span>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
          
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
          </div>

          <div className="nav-actions">
            <motion.button 
              className="icon-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={20} />
            </motion.button>
            <Link to="/cart">
              <motion.button 
                className="icon-btn cart-icon-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag size={20} />
                {getCartCount() > 0 && (
                  <motion.span 
                    className="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button 
                className="auth-btn login-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button 
                className="auth-btn signup-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </Link>
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
            <Link to="/cart">Cart</Link>
            <div className="mobile-auth">
              <Link to="/login">
                <button className="auth-btn login-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="auth-btn signup-btn">Sign Up</button>
              </Link>
            </div>
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
                src={heroSlides[currentSlide].image} 
                alt={heroSlides[currentSlide].alt}
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
                     className={`add-to-cart-btn ${addedItems[product.id] ? 'added' : ''}`}
                     onClick={() => handleAddToCart(product)}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     {addedItems[product.id] ? (
                       <Check size={20} />
                     ) : (
                       <ShoppingBag size={20} />
                     )}
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
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
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

export default Homepage 