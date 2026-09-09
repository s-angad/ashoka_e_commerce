import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ui/ProductCard';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { MagneticButton } from '../components/ui/MagneticButton';
import { CountUpNumber } from '../components/ui/CountUpNumber';
import { MOCK_CATEGORIES } from '../data/mockData';
import { Product } from '../types';
import {
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Leaf,
  CheckCircle2,
  Quote,
  Truck,
} from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const navigate = useNavigate();

  // Scroll Parallax Layers
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 20]);        // 0.05x
  const leafY = useTransform(scrollY, [0, 600], [0, -40]);      // 0.10x
  const heroImageY = useTransform(scrollY, [0, 600], [0, 60]); // 0.15x
  const cardY = useTransform(scrollY, [0, 600], [0, 80]);      // 0.20x

  // Interactive Desktop Mouse Parallax with Fast Spring Inertia (Zero React Re-renders)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { stiffness: 450, damping: 28 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);

  const leafMouseX = useTransform(smoothMouseX, [-1, 1], [10, -10]);
  const heroImageMouseX = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const cardMouseX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchCheck || reducedMotionCheck) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));
    rawMouseX.set(normX);
    rawMouseY.set(normY);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  const bestSellers = products.filter((p: Product) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16 overflow-hidden">
      {/* Full-Width Editorial Hero Section — Compact E-Commerce Height */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full bg-[#1C3A27] text-white overflow-hidden py-6 sm:py-8 lg:py-8 lg:h-[430px] flex items-center shadow-lg"
      >
        {/* Layer 1 — Background Texture & Radial Glow Lighting (0.05x Scroll Parallax) */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-[radial-gradient(#4E6E4C_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(78,110,76,0.30),transparent_70%)] pointer-events-none" />

        {/* Layer 2 — Floating Botanical Leaf */}
        <motion.div
          style={{
            y: leafY,
            x: isTouchDevice ? 0 : leafMouseX,
          }}
          className="absolute top-6 right-[26%] opacity-15 text-amber-200 pointer-events-none hidden lg:block z-0"
          animate={{ rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        >
          <Leaf className="w-20 h-20 lg:w-24 lg:h-24" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Responsive Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Hero Content Column */}
            <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-2.5 sm:space-y-3">
              
              {/* Step 1: Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-amber-300 text-[11px] font-semibold shadow-xs backdrop-blur-md"
              >
                <Sparkles className="w-3 h-3 text-[#C59B27] animate-pulse" />
                <span>EST. 2024 • 100% PURE & UNADULTERATED</span>
              </motion.div>

              {/* Step 2: Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(1.5rem,2.6vw+0.5rem,2.35rem)] font-extrabold text-white tracking-tight leading-[1.12]"
              >
                PURE TRADITION, <br />
                <span className="text-[#C59B27] italic font-serif">DELIVERED HOME.</span>
              </motion.h1>

              {/* Step 3: Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs sm:text-sm text-amber-100/85 max-w-md leading-relaxed font-sans"
              >
                Naturally sourced raw herbs, Kashmir valley dry fruits, and time-tested traditional wellness blends, carefully selected for your everyday health and vitality.
              </motion.p>

              {/* Step 4: CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-0.5 w-full"
              >
                <MagneticButton
                  onClick={() => navigate('/shop')}
                  className="px-5 py-2.5 rounded-xl bg-[#C59B27] hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md hover:shadow-lg flex items-center gap-2 transition-transform duration-200"
                >
                  SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href="#categories"
                  className="px-4.5 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/90 text-amber-100 font-semibold text-xs border border-emerald-700/60 transition-all shadow-xs"
                >
                  Explore Categories
                </motion.a>
              </motion.div>

              {/* Product Image on Mobile View */}
              <motion.div
                style={{
                  y: heroImageY,
                  x: isTouchDevice ? 0 : heroImageMouseX,
                }}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xs sm:max-w-sm lg:hidden my-2.5 relative"
              >
                <div
                  data-cursor="view"
                  className="relative aspect-[4/2.8] rounded-xl overflow-hidden shadow-lg border border-amber-300/30 group cursor-pointer"
                  onClick={() => navigate('/shop')}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000"
                    alt="Ashoka Dry Fruits & Herbs Bowl"
                    category="Dry Fruits & Herbs"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-2.5 left-2.5 right-2.5 p-2 rounded-lg glass-guarantee-deep flex items-center gap-2 shadow-md">
                  <ImageWithFallback
                    src="/ashoka-logo.jpg"
                    alt="Ashoka Seal"
                    className="w-7 h-7 rounded-full border border-[#C59B27] object-cover shrink-0"
                  />
                  <div className="text-left">
                    <h4 className="font-serif text-[11px] font-bold text-white leading-tight">Ashoka Heritage Guarantee</h4>
                    <p className="text-[9px] text-amber-200/90 leading-none">Direct Himalayan Sourcing</p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Desktop Product Photo with Floating Deep Botanical Glass Card */}
            <motion.div
              style={{
                y: heroImageY,
                x: isTouchDevice ? 0 : heroImageMouseX,
              }}
              initial={{ opacity: 0, scale: 0.96, x: 15 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative hidden lg:flex justify-center items-center z-10"
            >
              <motion.div
                data-cursor="view"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative w-full max-w-xs sm:max-w-sm lg:max-w-[340px] aspect-[4/2.8] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.3)] border border-amber-300/30 group cursor-pointer"
                onClick={() => navigate('/shop')}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000"
                  alt="Ashoka Dry Fruits & Herbs Bowl"
                  category="Dry Fruits & Herbs"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-400 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Deep Botanical Liquid Glass Guarantee Card (Overlapping Bottom Left Edge) */}
              <motion.div
                style={{
                  y: cardY,
                  x: isTouchDevice ? 0 : cardMouseX,
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.40, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 p-3.5 sm:p-4 rounded-2xl glass-guarantee-deep flex items-center gap-3.5 max-w-[260px] sm:max-w-[290px] z-20 pointer-events-none"
              >
                <ImageWithFallback
                  src="/ashoka-logo.jpg"
                  alt="Ashoka Seal"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C59B27] object-cover shrink-0 shadow-sm"
                />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-white leading-tight">Ashoka Heritage Guarantee</h4>
                  <p className="text-[10px] sm:text-[11px] text-amber-200/90 leading-snug">Direct Himalayan & Kashmiri Sourcing</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Floating Trust Panel (Overlapping Boundary Between Green Hero & Cream Body) */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-30"
      >
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/90 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-stone-200/70">
          <div className="flex flex-col items-center text-center space-y-1 group pt-2 md:pt-0">
            <CountUpNumber
              end={100}
              suffix="%"
              duration={0.8}
              className="block font-serif text-xl sm:text-2xl font-bold text-[#1C3A27] group-hover:text-[#C59B27] transition-colors"
            />
            <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">Organic Sourced</h4>
            <p className="text-[10px] sm:text-xs text-stone-500">Pure, raw & unadulterated herbs.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-1 group pt-2 md:pt-0">
            <CountUpNumber
              end={50}
              suffix="K+"
              duration={0.8}
              className="block font-serif text-xl sm:text-2xl font-bold text-[#1C3A27] group-hover:text-[#C59B27] transition-colors"
            />
            <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">Happy Families</h4>
            <p className="text-[10px] sm:text-xs text-stone-500">Trusted wellness across India.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-1 group pt-2 md:pt-0">
            <CountUpNumber
              end={4.9}
              decimals={1}
              suffix="★"
              duration={0.8}
              className="block font-serif text-xl sm:text-2xl font-bold text-[#1C3A27] group-hover:text-[#C59B27] transition-colors"
            />
            <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">Average Rating</h4>
            <p className="text-[10px] sm:text-xs text-stone-500">Verified buyer reviews & feedback.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-1 group pt-2 md:pt-0">
            <CountUpNumber
              end={100}
              suffix="%"
              duration={0.8}
              className="block font-serif text-xl sm:text-2xl font-bold text-[#1C3A27] group-hover:text-[#C59B27] transition-colors"
            />
            <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">Lab Tested Purity</h4>
            <p className="text-[10px] sm:text-xs text-stone-500">Nitrogen-flushed vacuum packing.</p>
          </div>
        </div>
      </motion.section>

      {/* Best Sellers Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#4E6E4C] uppercase">
              CUSTOMER FAVORITES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
              OUR BEST SELLERS
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#1C3A27] hover:text-[#244833] flex items-center gap-1 group shrink-0"
          >
            VIEW ALL PRODUCTS{' '}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.section>

      {/* Shop By Category Section */}
      <motion.section
        id="categories"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24"
      >
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#4E6E4C] uppercase">
            WELLNESS CATEGORIES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
            SHOP BY CATEGORY
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Explore our carefully curated range of authentic herbal powders, Kashmir dry fruits, and Ayurvedic remedies.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {MOCK_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.slug}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group cursor-pointer bg-white rounded-2xl p-3.5 border border-stone-200/90 text-center flex flex-col items-center gap-2.5 hover:shadow-xl hover:border-[#1C3A27]/40 transition-all duration-250"
            >
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-stone-200 group-hover:border-[#C59B27] transition-all shadow-sm relative">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  category={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400 ease-out"
                />
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 group-hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#1C3A27] transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-stone-500 block mt-0.5">{cat.itemCount} Items</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Editorial Featured Spotlight */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-[#EFEAD8] rounded-3xl p-6 sm:p-10 border border-stone-300 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-lg">
          <div className="lg:col-span-7 space-y-3.5 relative z-10">
            <span className="inline-block bg-[#1C3A27] text-amber-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              HERITAGE SPOTLIGHT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Royal Kashmiri Mamra Almonds — Rich in Natural Oils
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl">
              Concave-shaped Mamra almonds harvested from the cold high-altitude valleys of Kashmir contain up to 50% natural almond oil. Zero chemicals, zero processing, pure natural brain food.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/product/prod-2"
                  className="px-5 py-2.5 rounded-xl bg-[#1C3A27] hover:bg-[#244833] text-amber-100 font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  DISCOVER MAMRA ALMONDS <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800"
                alt="Kashmiri Mamra Almonds"
                category="Dry Fruits"
                className="w-full max-w-xs sm:max-w-sm rounded-2xl shadow-xl border-4 border-white object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="bg-[#FAF8F3] py-12 sm:py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Ashoka Logo Emblem Display */}
            <div className="relative p-5 bg-white rounded-full shadow-xl border-4 border-amber-300/60 max-w-[220px] sm:max-w-xs transform hover:rotate-2 transition-transform duration-300">
              <ImageWithFallback
                src="/ashoka-logo.jpg"
                alt="Ashoka Herbs and Dry Fruits Logo Emblem"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <span className="text-[11px] font-bold tracking-widest text-[#4E6E4C] uppercase">
              OUR HERITAGE & PROMISE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              ROOTED IN TRADITION. COMMITMENT TO PURITY.
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Ashoka Herbs and Dry Fruits was born out of a commitment to restore authentic, unadulterated Indian wellness into modern households. In an era dominated by heavily polished dry fruits and chemically processed powders, we bring raw herbs sun-dried with care and Kashmiri nuts harvested at peak natural potency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#1C3A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">Direct Grower Sourcing</h4>
                  <p className="text-[11px] text-stone-500">No middlemen; direct partnership with farmers.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#1C3A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">Zero Sulfur Processing</h4>
                  <p className="text-[11px] text-stone-500">Unbleached nuts & unadulterated ground herbs.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#4E6E4C] uppercase">
            REAL FEEDBACK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-250 flex flex-col justify-between space-y-3.5"
          >
            <div className="space-y-2.5">
              <Quote className="w-7 h-7 text-amber-400 opacity-60" />
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "The Amla powder aroma is distinct and sour-bitter just like real wild amla. Helped noticeably with hair fall in 3 weeks of daily intake."
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-xs">Kavita Verma</h4>
                <span className="text-[10px] text-emerald-800 font-semibold">Verified Buyer • New Delhi</span>
              </div>
              <span className="text-amber-500 font-bold text-xs">★★★★★</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-250 flex flex-col justify-between space-y-3.5"
          >
            <div className="space-y-2.5">
              <Quote className="w-7 h-7 text-amber-400 opacity-60" />
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "Most vendors sell California almonds disguised as Mamra. Ashoka almonds have that distinct small concave shape and rich oil residue. Superb crispness!"
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-xs">Vikramaditya R.</h4>
                <span className="text-[10px] text-emerald-800 font-semibold">Verified Buyer • Jaipur</span>
              </div>
              <span className="text-amber-500 font-bold text-xs">★★★★★</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-250 flex flex-col justify-between space-y-3.5"
          >
            <div className="space-y-2.5">
              <Quote className="w-7 h-7 text-amber-400 opacity-60" />
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "Order reached within 2 days in Meerut! Vacuum nitrogen packing kept the walnuts completely fresh without any bitter aftertaste."
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-xs">Priya Singh</h4>
                <span className="text-[10px] text-emerald-800 font-semibold">Verified Buyer • Meerut</span>
              </div>
              <span className="text-amber-500 font-bold text-xs">★★★★★</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

