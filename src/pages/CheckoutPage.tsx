import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';
import { Lock, QrCode, Banknote } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, placeOrder } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: 'Raj Patel',
    phone: '+91 98765 43210',
    email: 'raj.patel@gmail.com',
    addressLine1: 'Flat 402, Green Glen Layout, Bellandur',
    addressLine2: 'Near Columbia Asia Hospital',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    paymentMethod: 'Razorpay' as 'Razorpay' | 'UPI' | 'Card' | 'COD',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 70;
  const total = cartSubtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = placeOrder({
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        address: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
        total,
      });

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsProcessing(false);
      navigate(`/order-success?id=${newOrder.id}`);
    }, 1500);
  };

  if (cart.length === 0) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-[#4E6E4C] uppercase">
          SECURE CHECKOUT
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mt-1">
          Complete Your Order
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Details & Address */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Details */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#1C3A27] text-white text-xs flex items-center justify-center font-sans">
                1
              </span>
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#1C3A27] text-white text-xs flex items-center justify-center font-sans">
                2
              </span>
              Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">House / Flat / Street Address</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">Landmark / Area (Optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">PIN Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Payment Gateway UI */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#1C3A27] text-white text-xs flex items-center justify-center font-sans">
                3
              </span>
              Payment Selection
            </h3>

            <div className="space-y-3">
              <label
                onClick={() => setFormData({ ...formData, paymentMethod: 'Razorpay' })}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'Razorpay'
                    ? 'border-[#1C3A27] bg-emerald-50/60 ring-2 ring-[#1C3A27]/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={formData.paymentMethod === 'Razorpay'}
                    onChange={() => {}}
                    className="accent-[#1C3A27]"
                  />
                  <div>
                    <span className="font-bold text-sm text-stone-900 block flex items-center gap-2">
                      Razorpay Secure Gateway (Cards, Netbanking, Wallets)
                    </span>
                    <span className="text-xs text-stone-500">Official trusted 256-bit encrypted checkout</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#1C3A27] bg-amber-200 px-2 py-0.5 rounded-md">
                  RECOMMENDED
                </span>
              </label>

              <label
                onClick={() => setFormData({ ...formData, paymentMethod: 'UPI' })}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'UPI'
                    ? 'border-[#1C3A27] bg-emerald-50/60 ring-2 ring-[#1C3A27]/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={formData.paymentMethod === 'UPI'}
                    onChange={() => {}}
                    className="accent-[#1C3A27]"
                  />
                  <div>
                    <span className="font-bold text-sm text-stone-900 block">Instant UPI / QR Code (GPay, PhonePe, Paytm)</span>
                    <span className="text-xs text-stone-500">Zero transaction fee instant payment</span>
                  </div>
                </div>
                <QrCode className="w-5 h-5 text-stone-600" />
              </label>

              <label
                onClick={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'COD'
                    ? 'border-[#1C3A27] bg-emerald-50/60 ring-2 ring-[#1C3A27]/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={() => {}}
                    className="accent-[#1C3A27]"
                  />
                  <div>
                    <span className="font-bold text-sm text-stone-900 block">Cash on Delivery (COD)</span>
                    <span className="text-xs text-stone-500">Pay cash upon delivery at your doorstep</span>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-stone-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg border-b border-stone-100 pb-3">
              Order Review ({cart.length} items)
            </h3>

            <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto pr-1">
              {cart.map((item: CartItem) => (
                <div key={`${item.product.id}-${item.selectedVariant.weight}`} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-stone-900 truncate">{item.product.name}</h4>
                      <span className="text-stone-500">{item.selectedVariant.weight} × {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 shrink-0">₹{item.selectedVariant.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span className="font-semibold text-emerald-800">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Payable</span>
                <span className="text-xl text-[#1C3A27]">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#1C3A27] hover:bg-[#244833] disabled:opacity-50 text-amber-100 font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-amber-200 border-t-transparent" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> PAY & PLACE ORDER (₹{total})
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-stone-500">
              By clicking "Pay & Place Order", you agree to Ashoka Herbs' Terms & Conditions.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
