import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Truck,
  Menu,
  X,
  ChevronRight,
  PhoneCall,
  LayoutDashboard,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { cartCount, cartSubtotal, wishlist } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Herbs', path: '/shop?category=Herbs' },
    { name: 'Dry Fruits', path: '/shop?category=Dry Fruits' },
    { name: 'Remedies', path: '/shop?category=Remedies' },
    { name: 'All Products', path: '/shop' },
    { name: 'Our Story', path: '/about' },
  ];

  return (
    <>
      {/* Subtle Scroll Progress Indicator */}
      <div
        className="h-[2px] bg-gradient-to-r from-[#1C3A27] via-[#C59B27] to-[#4E6E4C] transition-all duration-75 fixed top-0 left-0 z-50 pointer-events-none opacity-90"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Announcement Bar */}
      <div className="bg-[#1C3A27] text-amber-100 text-xs py-2 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="bg-[#C59B27] text-stone-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-xs uppercase">
              PURE TRADITION
            </span>
            <span className="hidden sm:inline">Delivered Fresh to Your Home Across India</span>
            <span className="sm:hidden">Delivered Home Across India</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link
              to="/order-tracking"
              className="flex items-center gap-1 hover:text-white transition-colors font-semibold"
            >
              <Truck className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Track Order</span>
            </Link>
            <span className="hidden md:inline text-emerald-700">|</span>
            <a
              href="tel:+919876543210"
              className="hidden md:flex items-center gap-1 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>+91 98765 43210</span>
            </a>
            <span className="hidden md:inline text-emerald-700">|</span>
            <Link
              to="/admin"
              className="hidden md:flex items-center gap-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 px-2 py-0.5 rounded-md font-semibold transition-colors border border-amber-300/30"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header with Frosted Glassmorphism */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F3]/85 backdrop-blur-2xl shadow-sm py-2.5 border-b border-amber-900/10'
            : 'bg-[#FAF8F3] py-3.5 border-b border-stone-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo & Brand Title */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <ImageWithFallback
              src="/ashoka-logo.jpg"
              alt="Ashoka Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-amber-300/60 shadow-xs group-hover:scale-105 transition-transform duration-300 object-cover"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1C3A27] leading-none group-hover:text-ashoka-sage transition-colors">
                ASHOKA
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#4E6E4C] tracking-widest uppercase mt-0.5">
                HERBS & DRY FRUITS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path.includes('?') && location.search.includes(link.path.split('?')[1]));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-all py-1 border-b-2 ${
                    isActive
                      ? 'text-[#1C3A27] border-[#1C3A27]'
                      : 'border-transparent hover:text-[#1C3A27] hover:border-[#1C3A27]/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-300/80 hover:border-stone-400 bg-white text-stone-700 hover:text-stone-900 flex items-center gap-2 text-xs font-medium shadow-2xs transition-all"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-ashoka-sage" />
              <span className="hidden md:inline text-stone-500">Search products...</span>
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-stone-700 hover:text-rose-600 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 transition-transform hover:scale-110" />
              {wishlist.length > 0 && (
                <motion.span
                  key={wishlist.length}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </Link>

            {/* User Account */}
            <Link
              to="/account"
              className="p-2 text-stone-700 hover:text-[#1C3A27] hover:bg-stone-100 rounded-xl transition-colors hidden sm:block"
              aria-label="My Account"
            >
              <User className="w-5 h-5 transition-transform hover:scale-110" />
            </Link>

            {/* Cart Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#1C3A27] hover:bg-[#244833] text-amber-100 font-semibold text-xs flex items-center gap-2 shadow-md transition-colors"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2.5 bg-[#C59B27] text-stone-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <span className="hidden sm:inline font-sans font-bold">₹{cartSubtotal}</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-stone-900/60 backdrop-blur-xs flex">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-4/5 max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Top */}
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F3]">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src="/ashoka-logo.jpg"
                    alt="Ashoka Logo"
                    className="w-10 h-10 rounded-full border border-amber-300 object-cover"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">Ashoka Herbs</h4>
                    <p className="text-[10px] text-stone-500">Pure Tradition, Delivered Home</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center justify-between py-3 px-3 rounded-xl font-semibold text-stone-800 hover:bg-stone-100 text-sm transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </Link>
                ))}

                <div className="pt-4 border-t border-stone-200 space-y-2">
                  <Link
                    to="/order-tracking"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 text-amber-900 text-sm font-semibold border border-amber-200"
                  >
                    <Truck className="w-4 h-4 text-ashoka-sage" />
                    <span>Track Your Order</span>
                  </Link>

                  <Link
                    to="/account"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-100 text-stone-800 text-sm font-semibold"
                  >
                    <User className="w-4 h-4 text-stone-600" />
                    <span>My Account & Orders</span>
                  </Link>

                  <Link
                    to="/admin"
                    className="flex items-center justify-between p-3 rounded-xl bg-emerald-900 text-amber-200 text-sm font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-amber-300" />
                      <span>Admin Dashboard UI</span>
                    </div>
                    <span className="text-[10px] bg-amber-400 text-stone-950 font-bold px-1.5 py-0.5 rounded-xs">
                      DEMO
                    </span>
                  </Link>
                </div>
              </div>

              {/* Mobile Drawer Bottom Support */}
              <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-ashoka-sage" />
                  <span>Call/WhatsApp: +91 98765 43210</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
