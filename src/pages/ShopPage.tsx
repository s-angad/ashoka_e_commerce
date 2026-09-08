import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Product } from '../types';
import { SlidersHorizontal, X, Filter, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShopPage: React.FC = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low-high' | 'price-high-low' | 'rating'>('featured');

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [categoryParam, searchParam]);

  const categoriesList = ['All', 'Herbs', 'Dry Fruits', 'Remedies', 'Nuts', 'Seeds', 'Powders'];
  const weightOptions = ['250g', '500g', '1kg'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p: Product) => {
      // Category Filter
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search Query
      if (
        searchQuery.trim() &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Price Filter
      if (p.price > maxPrice) return false;
      // In Stock
      if (inStockOnly && p.stock <= 0) return false;
      // Organic
      if (organicOnly && !p.organicCertified) return false;
      // Weight
      if (selectedWeights.length > 0 && !selectedWeights.some((w: string) => p.weight === w || p.variants.some((v) => v.weight === w))) {
        return false;
      }
      return true;
    }).sort((a: Product, b: Product) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, organicOnly, selectedWeights, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(2500);
    setSelectedWeights([]);
    setInStockOnly(false);
    setOrganicOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const toggleWeight = (w: string) => {
    setSelectedWeights((prev) =>
      prev.includes(w) ? prev.filter((item) => item !== w) : [...prev, w]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link to="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-900 font-semibold">Shop Catalogue</span>
        {selectedCategory !== 'All' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#1C3A27] font-bold">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* Header Title Banner */}
      <div className="bg-[#1C3A27] text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative z-10">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            AUTHENTIC WELLNESS
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold mt-1 text-white">
            {selectedCategory === 'All' ? 'Complete Collection' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-lg">
            Directly sourced sun-dried Ayurvedic herbs, raw Kashmiri nuts, and traditional health powders.
          </p>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-stone-200">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              if (cat === 'All') searchParams.delete('category');
              else searchParams.set('category', cat);
              setSearchParams(searchParams);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#1C3A27] text-amber-200 shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <Filter className="w-4 h-4 text-ashoka-sage" /> Filters
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Max Price: ₹{maxPrice}
            </label>
            <input
              type="range"
              min={100}
              max={3000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1C3A27]"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
              <span>₹100</span>
              <span>₹3,000</span>
            </div>
          </div>

          {/* Weight Variants */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Pack Size / Weight
            </label>
            <div className="flex flex-wrap gap-2">
              {weightOptions.map((w) => (
                <button
                  key={w}
                  onClick={() => toggleWeight(w)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    selectedWeights.includes(w)
                      ? 'bg-[#1C3A27] text-white border-[#1C3A27]'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#1C3A27] focus:ring-[#1C3A27]"
              />
              In Stock Only
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#1C3A27] focus:ring-[#1C3A27]"
              />
              100% Organic Certified
            </label>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-2 border border-stone-300"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <span className="text-xs text-stone-600 font-medium">
                Showing <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> products
              </span>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-[#1C3A27]"
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== 'All' || searchQuery || selectedWeights.length > 0 || organicOnly || inStockOnly) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-400 font-medium">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-ashoka-sage border border-emerald-200 font-semibold flex items-center gap-1">
                  Category: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-ashoka-sage border border-emerald-200 font-semibold flex items-center gap-1">
                  Search: "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              {organicOnly && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-ashoka-sage border border-emerald-200 font-semibold flex items-center gap-1">
                  Organic
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setOrganicOnly(false)} />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-stone-500 hover:text-stone-900 underline text-xs font-semibold ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">No products match your criteria</h3>
                <p className="text-xs text-stone-500 mt-1">Try resetting filters or expanding your price range.</p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#1C3A27] text-amber-200 text-xs font-semibold rounded-xl hover:bg-[#244833] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-stone-900/60 backdrop-blur-xs flex items-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-h-[85vh] rounded-t-3xl p-6 shadow-2xl flex flex-col justify-between overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="font-serif font-bold text-stone-900 text-base">Filter Catalogue</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Max Price: ₹{maxPrice}
                </label>
                <input
                  type="range"
                  min={100}
                  max={3000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1C3A27]"
                />
              </div>

              {/* Weights */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Pack Size
                </label>
                <div className="flex gap-2">
                  {weightOptions.map((w) => (
                    <button
                      key={w}
                      onClick={() => toggleWeight(w)}
                      className={`text-xs font-semibold px-4 py-2 rounded-xl border ${
                        selectedWeights.includes(w)
                          ? 'bg-[#1C3A27] text-white border-[#1C3A27]'
                          : 'bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 bg-[#1C3A27] text-amber-200 font-bold rounded-xl text-sm shadow-md"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
