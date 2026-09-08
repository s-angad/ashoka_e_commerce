import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ShieldCheck, Truck, Clock, Award, Send, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Subscribed!', 'Thank you for subscribing to Ashoka Wellness Journal.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C3A27] text-amber-100/90 pt-16 pb-8 border-t-4 border-[#C59B27]">
      {/* Top Features Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 pb-12 border-b border-emerald-800/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
            <div className="w-10 h-10 rounded-full bg-[#C59B27] text-stone-950 flex items-center justify-center shrink-0 font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">100% Quality Assured</h4>
              <p className="text-[11px] text-amber-200/70">Lab-tested wild herbs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
            <div className="w-10 h-10 rounded-full bg-[#C59B27] text-stone-950 flex items-center justify-center shrink-0 font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">Pan-India Express</h4>
              <p className="text-[11px] text-amber-200/70">Free shipping on ₹999+</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
            <div className="w-10 h-10 rounded-full bg-[#C59B27] text-stone-950 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">Authentic Sourcing</h4>
              <p className="text-[11px] text-amber-200/70">Direct Kashmiri & Himalayan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
            <div className="w-10 h-10 rounded-full bg-[#C59B27] text-stone-950 flex items-center justify-center shrink-0 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">Fresh Nitrogen Pack</h4>
              <p className="text-[11px] text-amber-200/70">Sealed crispness & aroma</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4 pr-4">
          <div className="flex items-center gap-3">
            <img
              src="/ashoka-logo.jpg"
              alt="Ashoka Logo"
              className="w-12 h-12 rounded-full border-2 border-[#C59B27] bg-white object-cover"
            />
            <div>
              <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                ASHOKA HERBS AND DRY FRUITS
              </h3>
              <p className="text-[10px] text-[#C59B27] tracking-widest uppercase font-semibold">
                ESTABLISHED 2024 • MEERUT
              </p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-amber-100/80">
            Dedicated to bringing authentic Indian wellness, raw sun-dried Ayurvedic herbs, and handpicked orchard dry fruits directly from nature to your household.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-[#C59B27] hover:text-stone-950 flex items-center justify-center transition-colors text-amber-200"
              aria-label="Social Media"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-[#C59B27] hover:text-stone-950 flex items-center justify-center transition-colors text-amber-200"
              aria-label="WhatsApp Support"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="/"
              className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-[#C59B27] hover:text-stone-950 flex items-center justify-center transition-colors text-amber-200"
              aria-label="Official Website"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Categories */}
        <div>
          <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-2">
            Our Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/shop?category=Herbs" className="hover:text-amber-300 transition-colors">
                Ayurvedic Herbs
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Dry Fruits" className="hover:text-amber-300 transition-colors">
                Kashmiri Dry Fruits
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Remedies" className="hover:text-amber-300 transition-colors">
                Herbal Remedies & Kadha
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Nuts" className="hover:text-amber-300 transition-colors">
                Royal Nuts & Mixes
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Seeds" className="hover:text-amber-300 transition-colors">
                Organic Super Seeds
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Powders" className="hover:text-amber-300 transition-colors">
                Pure Micro-milled Powders
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/order-tracking" className="hover:text-amber-300 transition-colors font-semibold text-[#C59B27]">
                Track Your Order
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-amber-300 transition-colors">
                My Account & Orders
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-amber-300 transition-colors">
                Shipping & Delivery Policy
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-amber-300 transition-colors">
                Returns & Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-amber-300 transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-300 transition-colors">
                Contact & Store Location
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-2">
            Wellness Journal
          </h4>
          <p className="text-xs text-amber-100/70 mb-3">
            Subscribe for seasonal herbal remedies, health tips, and exclusive discount offers.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full text-xs px-3 py-2 bg-emerald-950/60 border border-emerald-800 rounded-lg text-white placeholder:text-emerald-600 focus:outline-none focus:border-[#C59B27]"
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#C59B27] hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              Subscribe Now <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright & Trust Seals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/60">
        <p>© 2024-2026 Ashoka Herbs & Dry Fruits. All Rights Reserved. Crafted with care in India.</p>

        <div className="flex items-center gap-4 text-[11px]">
          <Link to="/privacy" className="hover:text-amber-200">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-amber-200">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
