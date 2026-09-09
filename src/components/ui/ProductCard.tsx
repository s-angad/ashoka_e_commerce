import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from './RatingStars';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] || { weight: product.weight, price: product.price, inStock: true, sku: product.sku }
  );
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-2xl hover:border-stone-300/90 transition-all duration-300 overflow-hidden flex flex-col justify-between relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-stone-100/70 overflow-hidden">
        <Link to={`/product/${product.id}`} data-cursor="view" className="block w-full h-full">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discountBadge && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#C59B27] text-stone-950 shadow-md transform group-hover:scale-105 transition-transform">
              {product.discountBadge}
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1C3A27] text-amber-200 shadow-md">
              ★ Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 shadow-md backdrop-blur-xs ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white border border-stone-200/60'
          }`}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${inWishlist ? 'fill-rose-600 text-rose-600 scale-110' : ''}`} />
        </motion.button>

        {/* Organic Certification Tag */}
        {product.organicCertified && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-emerald-800 border border-emerald-200/60 shadow-xs">
            🌱 100% Organic
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Hindi subtitle */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium tracking-wide text-[#4E6E4C] uppercase text-[10px]">
              {product.category}
            </span>
            {product.hindiName && (
              <span className="font-sans text-stone-400 text-xs">{product.hindiName}</span>
            )}
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="group-hover:text-[#1C3A27] transition-colors">
            <h3 className="font-serif text-base font-bold text-stone-900 line-clamp-1 leading-snug group-hover:underline decoration-[#C59B27]/40 underline-offset-4">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mt-1.5">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>
        </div>

        {/* Variant Weight Pills Selection */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {product.variants.map((v) => (
              <button
                key={v.weight}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border transition-all duration-200 ${
                  selectedVariant.weight === v.weight
                    ? 'bg-[#1C3A27] text-white border-[#1C3A27] shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>
        )}

        {/* Price & Action Footer */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-stone-900 font-sans">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{selectedVariant.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500">Incl. all taxes</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#1C3A27] hover:bg-[#244833] text-amber-100 hover:text-white shadow-emerald-950/10'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 animate-bounce" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
