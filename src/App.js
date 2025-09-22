import './App.css';
import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SideNavbar from './components/SideNavbar'
import Header from './components/Header'
import ContentBody from './components/ContentBody';
import MobileMenuToggle from './components/MobileMenuToggle';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMobileMenuOpen && !event.target.closest('.side-navbar') && 
          !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {/* Mobile Menu Toggle */}
        <MobileMenuToggle isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />

        {/* Sidebar */}
        <SideNavbar isOpen={isMobileMenuOpen} isMobile={isMobile} />

        {/* Main Content */}
        <div className={`main-body ${isMobileMenuOpen && isMobile ? 'menu-open' : ''}`}>
          {/* Header */}
          <Header />

          {/* Content Body */}
          <ContentBody />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
