import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ui/ProductCard';
import { RatingStars } from '../components/ui/RatingStars';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { MOCK_REVIEWS } from '../data/mockData';
import { Product, ProductVariant, Review } from '../types';
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, toggleWishlist, isInWishlist, addToast } = useShop();
  const navigate = useNavigate();

  const product = products.find((p: Product) => p.id === id) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { weight: product.weight, price: product.price, inStock: true, sku: product.sku }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage' | 'reviews'>('benefits');

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  const relatedProducts = products
    .filter((p: Product) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p: Product) => p.id !== product.id))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link to="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to="/shop" className="hover:text-stone-900 transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-stone-900 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Preview Image */}
          <div data-cursor="zoom" className="relative aspect-square w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group">
            <ImageWithFallback
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              category={product.category}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.discountBadge && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#C59B27] text-stone-950 shadow-xs">
                  {product.discountBadge}
                </span>
              )}
              {product.organicCertified && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800 text-amber-100 shadow-xs">
                  100% Organic Certified
                </span>
              )}
            </div>

            {/* Share & Wishlist overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:bg-white transition-colors shadow-xs"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs ${
                  inWishlist
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnail Selector */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#1C3A27] ring-2 ring-[#1C3A27]/30'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs & CTAs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between text-xs text-ashoka-sage font-bold tracking-widest uppercase mb-1">
              <span>{product.category}</span>
              {product.hindiName && <span className="font-sans text-stone-500">{product.hindiName}</span>}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">{product.subtitle}</p>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-stone-100">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units left)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-stone-900 font-sans">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-base text-stone-400 line-through">
                    ₹{selectedVariant.originalPrice}
                  </span>
                )}
                {selectedVariant.originalPrice && (
                  <span className="text-xs font-bold text-[#1C3A27] bg-emerald-100 px-2 py-0.5 rounded-md">
                    SAVE ₹{selectedVariant.originalPrice - selectedVariant.price}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">Inclusive of all taxes & free express shipping on ₹999+</p>
            </div>
          </div>

          {/* Weight Variant Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Select Pack Weight: <strong className="text-stone-900">{selectedVariant.weight}</strong>
            </label>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v: ProductVariant) => (
                <button
                  key={v.weight}
                  onClick={() => setSelectedVariant(v)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all ${
                    selectedVariant.weight === v.weight
                      ? 'bg-[#1C3A27] text-white border-[#1C3A27] shadow-sm'
                      : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  <span>{v.weight}</span>
                  <span className="opacity-80">₹{v.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Quantity:
              </label>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MagneticButton
                type="button"
                onClick={handleAddToCart}
                className="py-3.5 px-6 rounded-xl bg-[#1C3A27] hover:bg-[#244833] text-amber-100 font-bold text-sm shadow-md hover:shadow-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> ADD TO CART
              </MagneticButton>

              <MagneticButton
                type="button"
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-xl bg-[#C59B27] hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md hover:shadow-xl transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> BUY IT NOW
              </MagneticButton>
            </div>
          </div>

          {/* Delivery & Trust Highlights */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-700">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-ashoka-sage shrink-0" />
              <div>
                <strong className="block text-stone-900 font-bold">Express Delivery</strong>
                <span>Estimated 2-4 business days</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
              <div>
                <strong className="block text-stone-900 font-bold">100% Quality Assured</strong>
                <span>Lab certified Ayurvedic purity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Benefits, Ingredients, Usage, Reviews */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-stone-200 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'border-[#1C3A27] text-[#1C3A27]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Health Benefits
          </button>

          <button
            onClick={() => setActiveTab('ingredients')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-[#1C3A27] text-[#1C3A27]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Ingredients & Sourcing
          </button>

          <button
            onClick={() => setActiveTab('usage')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'usage'
                ? 'border-[#1C3A27] text-[#1C3A27]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            How to Use
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#1C3A27] text-[#1C3A27]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Customer Reviews ({MOCK_REVIEWS.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-2">
          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{product.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.benefits.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-[#1C3A27] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Composition & Sourcing</h4>
              <ul className="list-disc pl-5 space-y-1">
                {product.ingredients.map((ing: string, i: number) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
              <p className="text-xs text-stone-500 italic mt-2">
                All raw ingredients undergo sun-drying and micro-milling without high thermal heat to preserve bio-active enzymes.
              </p>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Recommended Dosage & Usage</h4>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-stone-800 font-medium">
                {product.howToUse}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {MOCK_REVIEWS.map((rev: Review) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-serif font-bold text-stone-900 text-sm">{rev.userName}</h5>
                      <span className="text-[10px] text-emerald-800 font-semibold">
                        Verified Buyer • {rev.userLocation}
                      </span>
                    </div>
                    <RatingStars rating={rev.rating} size="sm" showNumber={false} />
                  </div>
                  <h6 className="font-bold text-xs text-stone-900">{rev.title}</h6>
                  <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel: Product) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>

      {/* Sticky Mobile Purchase CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-3 px-4 border-t border-stone-200 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] text-stone-500 uppercase font-semibold">Total Price</span>
          <span className="text-lg font-bold text-stone-900">₹{selectedVariant.price * quantity}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 bg-[#1C3A27] text-amber-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};
