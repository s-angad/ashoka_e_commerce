import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, Truck, MessageSquare } from 'lucide-react';
import { OrderItem } from '../types';
import { motion } from 'framer-motion';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || 'ASH10023';
  const { getOrderById } = useShop();

  const order = getOrderById(orderId);

  useEffect(() => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.4 },
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-4 py-12 space-y-8"
    >
      {/* Success Hero Box */}
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl text-center space-y-4 relative overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
          className="w-20 h-20 bg-emerald-100 text-[#1C3A27] rounded-full flex items-center justify-center mx-auto shadow-inner"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>

        <span className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
          ORDER CONFIRMED
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Thank You For Your Order!
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          We have received your order <strong className="text-stone-900">#{orderId}</strong>. Our warehouse team in Meerut is preparing your natural products with fresh nitrogen sealing.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/order-tracking?id=${orderId}`}
              className="px-6 py-3.5 rounded-xl bg-[#1C3A27] text-amber-100 font-bold text-xs shadow-md hover:bg-[#244833] transition-colors flex items-center gap-2"
            >
              <Truck className="w-4 h-4" /> TRACK ORDER STATUS
            </Link>
          </motion.div>

          <Link
            to="/shop"
            className="px-6 py-3.5 rounded-xl bg-stone-100 text-stone-800 font-semibold text-xs border border-stone-300 hover:bg-stone-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* WhatsApp Status Alert Card */}
      <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-white">WhatsApp Notifications Enabled</h4>
            <p className="text-xs text-amber-200/80">Real-time dispatch, courier AWB tracking & delivery rider updates sent to your phone.</p>
          </div>
        </div>
      </div>

      {/* Order Item Summary Card */}
      {order && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-stone-900 text-base border-b border-stone-100 pb-3 flex justify-between">
            <span>Order Summary #{order.id}</span>
            <span className="text-xs text-stone-500 font-normal">{order.orderDate}</span>
          </h3>

          <div className="divide-y divide-stone-100">
            {order.items.map((item: OrderItem, idx: number) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
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

          <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-sm font-bold text-stone-900">
            <span>Total Paid</span>
            <span className="text-base text-[#1C3A27]">₹{order.total}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
