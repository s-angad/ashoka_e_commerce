import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { QuantitySelector } from '../ui/QuantitySelector';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { ShoppingBag, X, Trash2, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, cartCount, addToast } = useShop();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const progressPercent = Math.min((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartSubtotal, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'ASHOKA10') {
      const discountVal = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discountVal);
      addToast('Coupon Applied!', 'Extra 10% discount applied to your cart.', 'success');
    } else if (couponCode.trim()) {
      addToast('Invalid Coupon', 'Try using coupon code "ASHOKA10"', 'error');
    }
  };

  const deliveryFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 70;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/65 backdrop-blur-xl flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1C3A27]" />
              <h3 className="font-serif text-lg font-bold text-stone-900">Your Cart</h3>
              <span className="bg-[#1C3A27] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {cartSubtotal > 0 && (
            <div className="bg-amber-50/90 border-b border-amber-200/60 p-3 px-4">
              <div className="flex items-center gap-2 text-xs text-amber-900 font-medium mb-1.5">
                <Truck className="w-4 h-4 text-ashoka-sage shrink-0" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="font-bold">₹{remainingForFreeShipping}</strong> more for{' '}
                    <strong className="text-[#1C3A27]">Free Express Shipping</strong>
                  </span>
                ) : (
                  <span className="text-[#1C3A27] font-bold">
                    🎉 You unlocked Free Express Shipping!
                  </span>
                )}
              </div>
              <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1C3A27] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Your basket is empty</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Discover our handpicked natural herbs, Mamra almonds, and authentic wellness blends.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1C3A27] text-amber-100 font-semibold text-xs hover:bg-[#244833] transition-colors shadow-xs"
                >
                  Explore Herbal Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant.weight}`}
                  className="flex gap-3 p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <ImageWithFallback
                    src={item.product.images[0]}
                    alt={item.product.name}
                    category={item.product.category}
                    className="w-18 h-18 rounded-lg object-cover bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant.weight)}
                          className="text-stone-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="inline-block text-[11px] font-semibold text-ashoka-sage bg-stone-200/70 px-2 py-0.5 rounded-md mt-0.5">
                        {item.selectedVariant.weight}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.product.id, item.selectedVariant.weight, 1)}
                        onDecrease={() => updateQuantity(item.product.id, item.selectedVariant.weight, -1)}
                        size="sm"
                      />
                      <span className="text-sm font-bold text-stone-900">
                        ₹{item.selectedVariant.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-stone-50/90 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. ASHOKA10)"
                    className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-stone-300 rounded-lg outline-none focus:border-[#1C3A27] text-stone-900 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Price Details Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{cartSubtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount (ASHOKA10)</span>
                    <span className="font-semibold">-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Express Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-base text-[#1C3A27]">₹{Math.max(cartSubtotal - appliedDiscount + deliveryFee, 0)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <MagneticButton
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#1C3A27] hover:bg-[#244833] text-amber-100 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Quality Assured & Secure Checkout</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
