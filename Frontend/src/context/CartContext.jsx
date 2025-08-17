import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('wearnova-cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wearnova-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, size = 'M') => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.size === size)
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prev.map(item => 
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item to cart
        const newItem = {
          id: product.id,
          name: product.name,
          price: parseInt(product.price.replace(/\D/g, '')), // Extract number from "899 Rs"
          image: product.image,
          category: product.category,
          size: size,
          quantity: 1
        }
        return [...prev, newItem]
      }
    })
  }

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, size)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
