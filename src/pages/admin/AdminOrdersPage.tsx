import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Order, OrderStatus } from '../../types';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { Search, Eye, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, toggleOrderWhatsAppAlert } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  const statusOptions: OrderStatus[] = [
    'Ordered',
    'Confirmed',
    'Processing',
    'Packed',
    'Dispatched',
    'Out for Delivery',
    'Delivered',
  ];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.currentStatus !== statusFilter) return false;
    if (
      searchQuery.trim() &&
      !o.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.customerPhone.includes(searchQuery)
    ) {
      return false;
    }
    return true;
  });

  const handleOpenDetail = (o: Order) => {
    setSelectedOrder(o);
    setIsDetailDrawerOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, currentStatus: newStatus });
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Order Management</h1>
          <p className="text-xs text-stone-500 mt-1">Manage order dispatch lifecycle, tracking, and WhatsApp customer updates.</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, customer name or phone..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#1C3A27]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-semibold">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none"
          >
            <option value="All">All Statuses ({orders.length})</option>
            {statusOptions.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status Lifecycle</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">#{o.id}</td>
                  <td className="p-4">
                    <span className="font-bold block text-stone-900">{o.customerName}</span>
                    <span className="text-[10px] text-stone-500">{o.customerPhone}</span>
                  </td>
                  <td className="p-4 text-stone-500">{o.orderDate}</td>
                  <td className="p-4 font-bold text-stone-900">₹{o.total}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {o.paymentMethod} ({o.paymentStatus})
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={o.currentStatus}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1 bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-900 outline-none focus:border-[#1C3A27]"
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenDetail(o)}
                      className="px-3 py-1.5 bg-[#1C3A27] text-amber-200 rounded-lg text-xs font-bold hover:bg-[#244833] inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer View */}
      <AnimatePresence>
        {isDetailDrawerOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F3]">
                <div>
                  <span className="text-[10px] font-bold text-[#4E6E4C] uppercase tracking-widest">CUSTOMER ORDER TRACKER</span>
                  <h3 className="font-serif font-bold text-stone-900 text-xl">Order #{selectedOrder.id}</h3>
                </div>
                <button onClick={() => setIsDetailDrawerOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                {/* Customer Info Card */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">{selectedOrder.customerName}</h4>
                  <p className="text-stone-600">Phone: {selectedOrder.customerPhone}</p>
                  <p className="text-stone-600">Email: {selectedOrder.customerEmail}</p>
                  <p className="text-stone-600 pt-1 border-t border-stone-200">
                    Address: {selectedOrder.address.addressLine1}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}
                  </p>
                </div>

                {/* Timeline Status Progress */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">Status Timeline Progress</h4>
                  <div className="flex items-center justify-between relative px-2">
                    <div className="absolute left-6 right-6 top-3 h-1 bg-stone-200 -z-10" />
                    {['Ordered', 'Processed', 'Shipped', 'Delivered'].map((step, idx) => (
                      <div key={step} className="flex flex-col items-center gap-1 text-[11px]">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          idx <= 2 ? 'bg-[#1C3A27] text-white' : 'bg-stone-200 text-stone-500'
                        }`}>
                          ✓
                        </div>
                        <span className="font-semibold text-stone-800">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Update Status Dropdown */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                  <h4 className="font-serif font-bold text-amber-900 text-sm">UPDATE STATUS</h4>
                  <div className="flex items-center justify-between gap-4">
                    <select
                      value={selectedOrder.currentStatus}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                      className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 outline-none"
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {/* WhatsApp Notification Alert Toggle Switch */}
                  <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-800" />
                      <span className="text-xs font-bold text-stone-900">WhatsApp Dispatch Alert</span>
                    </div>
                    <button
                      onClick={() => toggleOrderWhatsAppAlert(selectedOrder.id)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        selectedOrder.whatsAppNotificationsEnabled ? 'bg-[#1C3A27]' : 'bg-stone-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          selectedOrder.whatsAppNotificationsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Order Items List */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">Ordered Products ({selectedOrder.items.length})</h4>
                  <div className="divide-y divide-stone-100">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={item.productImage}
                            alt={item.productName}
                            className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                          />
                          <div>
                            <h5 className="font-bold text-stone-900">{item.productName}</h5>
                            <span className="text-stone-500">{item.variantWeight} × {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                    <span>Total Amount</span>
                    <span className="text-base text-[#1C3A27]">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
