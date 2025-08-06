// <<<<<<< HEAD
// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ShoppingBag, Heart, Star, ArrowRight, Menu, X, Instagram, Twitter, Facebook } from 'lucide-react'
// import './App.css'

// function App() {
 
// // >>>>>>> c8e7110e8dbdb29b86e0c87933d26b852db98fdd
  
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
// =======
// import Homepage from './pages/Homepage'
// import './App.css'

// function App() {
//   return (
//     <div className="app">
//       <Homepage />
//     </div>
//   )
// >>>>>>> 5ffe39c94a15e0a3d111a5c23bbe85452bce9439
}

export default App;

