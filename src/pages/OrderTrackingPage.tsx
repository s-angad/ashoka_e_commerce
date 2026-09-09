import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { OrderStatus, Order, OrderItem, TimelineStep } from '../types';
import {
  Search,
  Truck,
  CheckCircle2,
  Package,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { orders, addToast } = useShop();

  const initialOrderId = searchParams.get('id') || 'ASH10023';
  const [inputOrderId, setInputOrderId] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<Order>(
    orders.find((o: Order) => o.id.toLowerCase() === initialOrderId.toLowerCase()) || orders[0]
  );

  const [whatsAppAlert, setWhatsAppAlert] = useState(activeOrder.whatsAppNotificationsEnabled);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o: Order) => o.id.toLowerCase() === inputOrderId.trim().toLowerCase());
    if (found) {
      setActiveOrder(found);
      setWhatsAppAlert(found.whatsAppNotificationsEnabled);
      setSearchParams({ id: found.id });
    } else {
      addToast('Order Not Found', `No order matches "${inputOrderId}". Showing recent demo order.`, 'warning');
    }
  };

  const toggleWhatsAppAlert = () => {
    const nextState = !whatsAppAlert;
    setWhatsAppAlert(nextState);
    addToast(
      nextState ? 'WhatsApp Alerts Enabled' : 'WhatsApp Alerts Disabled',
      nextState ? `Order #${activeOrder.id} updates will be sent to ${activeOrder.customerPhone}` : 'Updates paused.',
      nextState ? 'success' : 'info'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Search Header */}
      <div className="bg-[#1C3A27] text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
              LIVE ORDER TRACKING
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
              Track Order #{activeOrder.id}
            </h1>
          </div>

          <form onSubmit={handleSearchOrder} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              placeholder="Order ID (e.g. ASH10023)"
              className="px-3.5 py-2 text-xs bg-emerald-950/80 border border-emerald-700 rounded-xl text-white placeholder:text-emerald-500 outline-none focus:border-amber-300"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#C59B27] hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-3.5 h-3.5" /> Track
            </button>
          </form>
        </div>
      </div>

      {/* Main Tracking Details Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Tracking Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Status Banner */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-500 font-medium">Current Status</span>
              <h3 className="font-serif text-xl font-bold text-[#1C3A27] flex items-center gap-2">
                <Truck className="w-5 h-5 text-ashoka-sage" /> {activeOrder.currentStatus}
              </h3>
            </div>

            {activeOrder.trackingNumber && (
              <div className="text-right">
                <span className="text-xs text-stone-500 font-medium">Courier AWB</span>
                <span className="block font-mono text-xs font-bold text-stone-900">
                  {activeOrder.courierName}: {activeOrder.trackingNumber}
                </span>
              </div>
            )}
          </div>

          {/* Timeline Visual Progress */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-8">
            <h4 className="font-serif font-bold text-stone-900 text-base">Shipment Progress Timeline</h4>

            <div className="relative border-l-2 border-stone-200 pl-6 ml-3 space-y-6">
              {activeOrder.timeline.map((step: TimelineStep, idx: number) => (
                <div key={idx} className="relative group">
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      step.completed
                        ? 'bg-[#1C3A27] text-amber-200 border-[#1C3A27]'
                        : 'bg-stone-100 text-stone-400 border-stone-300'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <h5
                        className={`font-serif font-bold text-sm ${
                          step.completed ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {step.status}
                      </h5>
                      <span className="text-xs text-stone-400 font-medium">{step.date}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Mockup Presentation */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h4 className="font-serif font-bold text-stone-900 text-base">Transit Route Preview</h4>
            <div className="relative h-48 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center">
              {/* Decorative map SVG grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
              
              {/* Route line */}
              <div className="absolute w-3/4 h-1 bg-emerald-600 rounded-full flex items-center justify-between">
                <div className="w-4 h-4 rounded-full bg-[#1C3A27] ring-4 ring-emerald-200" title="Dispatch Hub: Meerut" />
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute w-6 h-6 rounded-full bg-[#C59B27]"
                  />
                  <div className="w-5 h-5 rounded-full bg-[#C59B27] ring-4 ring-amber-200 relative z-10" title="Current Location: In Transit" />
                </div>
                <div className="w-4 h-4 rounded-full bg-stone-400" title="Destination Address" />
              </div>

              <div className="absolute bottom-3 left-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-lg border border-stone-200 flex items-center justify-between text-xs text-stone-700">
                <span>Dispatch Hub: <strong>Meerut, UP</strong></span>
                <span>Destination: <strong>{activeOrder.address.city}, {activeOrder.address.state}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* WhatsApp Alert Toggle Box */}
          <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-300" />
                <h4 className="font-serif font-bold text-sm">WhatsApp Alerts</h4>
              </div>
              <button
                type="button"
                onClick={toggleWhatsAppAlert}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  whatsAppAlert ? 'bg-amber-400' : 'bg-emerald-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-stone-950 transition-transform ${
                    whatsAppAlert ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              {whatsAppAlert
                ? `Active updates enabled for ${activeOrder.customerPhone}`
                : 'Enable for real-time delivery alerts via WhatsApp.'}
            </p>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm border-b border-stone-100 pb-2">
              Delivery Address
            </h4>
            <div className="text-xs text-stone-700 space-y-1">
              <strong className="block text-stone-900 font-bold">{activeOrder.address.fullName}</strong>
              <p>{activeOrder.address.addressLine1}</p>
              {activeOrder.address.addressLine2 && <p>{activeOrder.address.addressLine2}</p>}
              <p>{activeOrder.address.city}, {activeOrder.address.state} - {activeOrder.address.pincode}</p>
              <p className="pt-1 text-stone-500">Phone: {activeOrder.address.phone}</p>
            </div>
          </div>

          {/* Package Contents */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm border-b border-stone-100 pb-2">
              Package Items ({activeOrder.items.length})
            </h4>
            <div className="divide-y divide-stone-100">
              {activeOrder.items.map((item: OrderItem, idx: number) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-stone-900">{item.productName}</h5>
                    <span className="text-stone-500">{item.variantWeight} × {item.quantity}</span>
                  </div>
                  <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
