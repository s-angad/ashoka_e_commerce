import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { ShoppingBag, Trash2, ArrowRight, Tag, ShieldCheck, RotateCcw, Heart } from 'lucide-react';
import { CartItem } from '../types';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartSubtotal, toggleWishlist, addToast } = useShop();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'ASHOKA10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscount(disc);
      addToast('Coupon Applied!', '10% discount applied to your order.', 'success');
    } else if (couponCode.trim()) {
      addToast('Invalid Coupon', 'Try code "ASHOKA10"', 'error');
    }
  };

  const deliveryFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 70;
  const grandTotal = Math.max(cartSubtotal - discount + deliveryFee, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-12 h-12 stroke-1" />
        </div>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Your Basket is Empty</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-sm mx-auto">
            Looks like you haven't added any natural herbs or dry fruits to your basket yet.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1C3A27] text-amber-200 font-bold text-sm shadow-md hover:bg-[#244833] transition-colors"
        >
          Explore Catalogue <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Item Table */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item: CartItem) => (
            <div
              key={`${item.product.id}-${item.selectedVariant.weight}`}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={item.product.images[0]}
                  alt={item.product.name}
                  category={item.product.category}
                  className="w-20 h-20 rounded-xl object-cover bg-stone-100 shrink-0"
                />
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-base">{item.product.name}</h3>
                  <span className="text-xs font-semibold text-ashoka-sage bg-stone-100 px-2 py-0.5 rounded-md">
                    {item.selectedVariant.weight}
                  </span>
                  <p className="text-xs text-stone-500 mt-1">SKU: {item.selectedVariant.sku}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.product.id, item.selectedVariant.weight, 1)}
                  onDecrease={() => updateQuantity(item.product.id, item.selectedVariant.weight, -1)}
                  size="sm"
                />

                <div className="text-right">
                  <span className="font-serif font-bold text-stone-900 text-base block">
                    ₹{item.selectedVariant.price * item.quantity}
                  </span>
                  <span className="text-[10px] text-stone-400">₹{item.selectedVariant.price} / unit</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(item.product)}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors"
                    title="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant.weight)}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg border-b border-stone-100 pb-3">
              Order Summary
            </h3>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon (e.g. ASHOKA10)"
                  className="w-full text-xs pl-8 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 uppercase font-semibold"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                Apply
              </button>
            </form>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-semibold text-stone-900">₹{cartSubtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Coupon Discount (10%)</span>
                  <span className="font-semibold">-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-semibold text-stone-900">
                  {deliveryFee === 0 ? <span className="text-emerald-800 font-bold">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-xl text-[#1C3A27]">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#1C3A27] hover:bg-[#244833] text-amber-100 font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Razorpay 256-bit SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
