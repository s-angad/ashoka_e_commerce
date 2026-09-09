import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ui/ProductCard';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { MagneticButton } from '../components/ui/MagneticButton';
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
import { motion, useScroll, useTransform } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 60]);
  const heroImageY = useTransform(scrollY, [0, 600], [0, 35]);
  const leafY = useTransform(scrollY, [0, 600], [0, -50]);

  const bestSellers = products.filter((p: Product) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#1C3A27] text-white overflow-hidden rounded-b-3xl sm:rounded-b-4xl shadow-2xl">
        {/* Scroll Parallax Decorative Background Pattern Overlay */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-[radial-gradient(#4E6E4C_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 pointer-events-none"
        />

        {/* Floating Botanical Leaf Micro-Animation Layer */}
        <motion.div
          style={{ y: leafY }}
          className="absolute top-12 right-1/4 opacity-20 text-amber-200 pointer-events-none"
          animate={{ rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        >
          <Leaf className="w-24 h-24" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-amber-300 text-xs font-semibold shadow-md backdrop-blur-xs"
            >
              <Sparkles className="w-4 h-4 text-[#C59B27] animate-pulse" />
              <span>EST. 2024 • 100% PURE & UNADULTERATED</span>
            </motion.div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              PURE TRADITION, <br />
              <span className="text-[#C59B27] italic font-serif">DELIVERED HOME.</span>
            </h1>

            <p className="text-sm sm:text-base text-amber-100/80 max-w-2xl leading-relaxed font-sans mx-auto lg:mx-0">
              Naturally sourced raw herbs, Kashmir valley dry fruits, and time-tested traditional wellness blends, carefully selected for your everyday health and vitality.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <MagneticButton
                onClick={() => navigate('/shop')}
                className="px-7 py-3.5 rounded-xl bg-[#C59B27] hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg hover:shadow-2xl flex items-center gap-2"
              >
                SHOP NOW <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#categories"
                className="px-6 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-amber-100 font-semibold text-sm border border-emerald-700/60 transition-all shadow-xs"
              >
                Explore Categories
              </motion.a>
            </div>

            {/* Quick Sourcing Metrics */}
            <div className="pt-8 border-t border-emerald-800/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block font-serif text-2xl font-bold text-amber-300">100%</span>
                <span className="text-[11px] text-amber-100/70">Organic Sourced</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-amber-300">50K+</span>
                <span className="text-[11px] text-amber-100/70">Happy Families</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-amber-300">4.9★</span>
                <span className="text-[11px] text-amber-100/70">Average Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Card with Multi-Layer Scroll Parallax */}
          <motion.div
            style={{ y: heroImageY }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <motion.div
              data-cursor="view"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative w-full max-w-md aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/30 group cursor-pointer"
              onClick={() => navigate('/shop')}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000"
                alt="Ashoka Dry Fruits & Herbs Bowl"
                category="Dry Fruits & Herbs"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              
              {/* Floating Quality Seal */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-900/80 backdrop-blur-md border border-amber-300/40 flex items-center gap-3 shadow-lg">
                <ImageWithFallback
                  src="/ashoka-logo.jpg"
                  alt="Ashoka Seal"
                  className="w-12 h-12 rounded-full border-2 border-[#C59B27] object-cover shrink-0"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">Ashoka Heritage Guarantee</h4>
                  <p className="text-[11px] text-amber-200/90">Direct from Himalayan & Kashmiri Growers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Highlights Section */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center space-y-2 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1C3A27] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#1C3A27] group-hover:text-amber-300 transition-all duration-300">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">100% Quality Assured</h4>
            <p className="text-xs text-stone-500">Rigorously lab tested for purity & zero adulteration.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1C3A27] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#1C3A27] group-hover:text-amber-300 transition-all duration-300">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">Naturally Sourced</h4>
            <p className="text-xs text-stone-500">Ethically harvested directly from Kashmiri orchards.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1C3A27] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#1C3A27] group-hover:text-amber-300 transition-all duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">Freshly Packed</h4>
            <p className="text-xs text-stone-500">Nitrogen-flushed vacuum sealed for crispness.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1C3A27] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#1C3A27] group-hover:text-amber-300 transition-all duration-300">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">Trusted Since 2024</h4>
            <p className="text-xs text-stone-500">Over 50,000+ satisfied families across India.</p>
          </div>
        </div>
      </motion.section>

      {/* Best Sellers Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#4E6E4C] uppercase">
              CUSTOMER FAVORITES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mt-1">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.section>

      {/* Shop By Category Section */}
      <motion.section
        id="categories"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#4E6E4C] uppercase">
            WELLNESS CATEGORIES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mt-1">
            SHOP BY CATEGORY
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Explore our carefully curated range of authentic herbal powders, Kashmir dry fruits, and Ayurvedic remedies.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {MOCK_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.slug}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group cursor-pointer bg-white rounded-2xl p-4 border border-stone-200/90 text-center flex flex-col items-center gap-3 hover:shadow-xl hover:border-[#1C3A27]/50 transition-all duration-300"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-stone-200 group-hover:border-[#C59B27] transition-all shadow-sm relative">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  category={cat.name}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                />
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 group-hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif font-bold text-stone-900 text-sm group-hover:text-[#1C3A27] transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <span className="text-[11px] text-stone-500 block mt-0.5">{cat.itemCount} Items</span>
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
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-[#EFEAD8] rounded-3xl p-8 sm:p-12 border border-stone-300 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg">
          <div className="lg:col-span-7 space-y-4 relative z-10">
            <span className="inline-block bg-[#1C3A27] text-amber-200 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              HERITAGE SPOTLIGHT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Royal Kashmiri Mamra Almonds — Rich in Natural Oils
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl">
              Concave-shaped Mamra almonds harvested from the cold high-altitude valleys of Kashmir contain up to 50% natural almond oil. Zero chemicals, zero processing, pure natural brain food.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/product/prod-2"
                  className="px-6 py-3 rounded-xl bg-[#1C3A27] hover:bg-[#244833] text-amber-100 font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  DISCOVER MAMRA ALMONDS <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800"
                alt="Kashmiri Mamra Almonds"
                category="Dry Fruits"
                className="w-full max-w-sm rounded-2xl shadow-2xl border-4 border-white object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="bg-[#FAF8F3] py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Ashoka Logo Emblem Display */}
            <div className="relative p-6 bg-white rounded-full shadow-2xl border-4 border-amber-300/60 max-w-xs sm:max-w-sm transform hover:rotate-2 transition-transform duration-500">
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
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="text-xs font-bold tracking-widest text-[#4E6E4C] uppercase">
              OUR HERITAGE & PROMISE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              ROOTED IN TRADITION. COMMITMENT TO PURITY.
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              Ashoka Herbs and Dry Fruits was born out of a commitment to restore authentic, unadulterated Indian wellness into modern households. In an era dominated by heavily polished dry fruits and chemically processed powders, we bring raw herbs sun-dried with care and Kashmiri nuts harvested at peak natural potency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#1C3A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">Direct Grower Sourcing</h4>
                  <p className="text-xs text-stone-500">No middlemen; direct partnership with farmers.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#1C3A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">Zero Sulfur Processing</h4>
                  <p className="text-xs text-stone-500">Unbleached nuts & unadulterated ground herbs.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#4E6E4C] uppercase">
            REAL FEEDBACK
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mt-1">
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <Quote className="w-8 h-8 text-amber-400 opacity-60" />
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "The Amla powder aroma is distinct and sour-bitter just like real wild amla. Helped noticeably with hair fall in 3 weeks of daily intake."
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-xs">Kavita Verma</h4>
                <span className="text-[10px] text-emerald-800 font-semibold">Verified Buyer • New Delhi</span>
              </div>
              <span className="text-amber-500 font-bold text-xs">★★★★★</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <Quote className="w-8 h-8 text-amber-400 opacity-60" />
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "Most vendors sell California almonds disguised as Mamra. Ashoka almonds have that distinct small concave shape and rich oil residue. Superb crispness!"
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-xs">Vikramaditya R.</h4>
                <span className="text-[10px] text-emerald-800 font-semibold">Verified Buyer • Jaipur</span>
              </div>
              <span className="text-amber-500 font-bold text-xs">★★★★★</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <Quote className="w-8 h-8 text-amber-400 opacity-60" />
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "Order reached within 2 days in Meerut! Vacuum nitrogen packing kept the walnuts completely fresh without any bitter aftertaste."
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
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
