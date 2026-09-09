import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Product, Order, OrderItem } from '../types';
import { User, Package, Heart, MapPin, LogOut, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  const { orders, wishlist } = useShop();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('orders');

  const customerProfile = {
    name: 'Raj Patel',
    email: 'raj.patel@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka',
    joinedDate: 'May 2024',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Account Header */}
      <div className="bg-[#1C3A27] text-white p-6 sm:p-8 rounded-3xl flex items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#C59B27] text-stone-950 font-serif font-bold text-xl flex items-center justify-center border-2 border-white shadow-xs">
            RP
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">{customerProfile.name}</h1>
            <p className="text-xs text-amber-200/80">{customerProfile.email} • {customerProfile.phone}</p>
          </div>
        </div>

        <Link
          to="/"
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-amber-100 text-xs font-semibold border border-emerald-700 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-[#1C3A27] text-amber-200 shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Package className="w-4 h-4" /> My Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'wishlist'
              ? 'bg-[#1C3A27] text-amber-200 shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Heart className="w-4 h-4" /> Saved Wishlist ({wishlist.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-[#1C3A27] text-amber-200 shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <User className="w-4 h-4" /> Profile Info
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'addresses'
              ? 'bg-[#1C3A27] text-amber-200 shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <MapPin className="w-4 h-4" /> Saved Addresses
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order: Order) => (
              <div key={order.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-3">
                  <div>
                    <span className="font-serif font-bold text-stone-900 text-lg">Order #{order.id}</span>
                    <span className="text-xs text-stone-500 block">Placed on {order.orderDate}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                      {order.currentStatus}
                    </span>
                    <Link
                      to={`/order-tracking?id=${order.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1C3A27] text-amber-100 text-xs font-bold hover:bg-[#244833] transition-colors flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" /> Track Order
                    </Link>
                  </div>
                </div>

                <div className="divide-y divide-stone-100">
                  {order.items.map((item: OrderItem, idx: number) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.productImage} alt="" className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0" />
                        <div>
                          <h4 className="font-bold text-stone-900">{item.productName}</h4>
                          <span className="text-stone-500">{item.variantWeight} × {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <span>Payment: <strong>{order.paymentMethod} ({order.paymentStatus})</strong></span>
                  <span className="text-sm font-bold text-stone-900">Total: ₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {wishlist.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-stone-200 space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif font-bold text-stone-900 text-lg">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone-500">Save items while browsing to find them easily later.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs max-w-xl space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg border-b border-stone-100 pb-3">Personal Profile</h3>
            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Full Name</span>
                <span className="font-bold text-stone-900">{customerProfile.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Email</span>
                <span className="font-bold text-stone-900">{customerProfile.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Phone (WhatsApp)</span>
                <span className="font-bold text-stone-900">{customerProfile.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Member Since</span>
                <span className="font-bold text-stone-900">{customerProfile.joinedDate}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs max-w-xl space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg border-b border-stone-100 pb-3">Default Shipping Address</h3>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
              <strong className="block text-stone-900 font-bold">Raj Patel (Default)</strong>
              <p>Flat 402, Green Glen Layout, Bellandur</p>
              <p>Near Columbia Asia Hospital</p>
              <p>Bengaluru, Karnataka - 560103</p>
              <p className="pt-1 text-stone-500">Phone: +91 98765 43210</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
