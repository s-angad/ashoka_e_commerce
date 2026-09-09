import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Customer } from '../../types';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { Search, MapPin, Send, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminCustomersPage: React.FC = () => {
  const { customers, sendWhatsAppMessage } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(customers[0] || null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const handleOpenDetail = (c: Customer) => {
    setSelectedCustomer(c);
    setIsDetailOpen(true);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomer && newMessage.trim()) {
      sendWhatsAppMessage(selectedCustomer.id, newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Customer Management</h1>
          <p className="text-xs text-stone-500 mt-1">Customer profiles, total spending, location map & WhatsApp logs.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs max-w-md relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by customer name, location or phone..."
          className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#1C3A27]"
        />
      </div>

      {/* Customer List Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Location</th>
                <th className="p-4">WhatsApp Status</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-sm">{c.name}</h4>
                        <span className="text-[10px] text-stone-500">{c.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 flex items-center gap-1.5 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-ashoka-sage" /> {c.location}
                  </td>
                  <td className="p-4">
                    {c.whatsAppVerified ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        WhatsApp Verified ✓
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600">
                        Standard SMS
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-stone-900">{c.totalOrders} orders</td>
                  <td className="p-4 font-bold text-[#1C3A27]">₹{c.totalSpent.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenDetail(c)}
                      className="px-3 py-1.5 bg-[#1C3A27] text-amber-200 text-xs font-bold rounded-lg hover:bg-[#244833] inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Customer Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile & WhatsApp Log Drawer */}
      <AnimatePresence>
        {isDetailOpen && selectedCustomer && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F3]">
                <div className="flex items-center gap-3">
                  <ImageWithFallback src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#C59B27]" />
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg">{selectedCustomer.name}</h3>
                    <p className="text-xs text-stone-500">{selectedCustomer.location} • {selectedCustomer.phone}</p>
                  </div>
                </div>
                <button onClick={() => setIsDetailOpen(false)} className="text-stone-400">✕</button>
              </div>

              <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
                {/* Location Map Representation */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">Customer Location Map</h4>
                  <div className="h-36 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:12px_12px] opacity-60" />
                    <div className="relative text-center p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-stone-200 shadow-xs">
                      <MapPin className="w-6 h-6 text-[#1C3A27] mx-auto mb-1" />
                      <strong className="block text-stone-900">{selectedCustomer.location}</strong>
                      <span className="text-[10px] text-stone-500">Geocoded Delivery Zone</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Communication Log */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center justify-between">
                    <span>COMMUNICATION LOG (WhatsApp)</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </h4>

                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {selectedCustomer.communicationLogs.map((log) => (
                      <div key={log.id} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-900">{log.type} Notice</span>
                          <span className="text-[10px] text-stone-500">{log.timestamp}</span>
                        </div>
                        <p className="text-stone-700">{log.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Send New WhatsApp Message Input */}
                  <form onSubmit={handleSendWhatsApp} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type WhatsApp message..."
                      className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#1C3A27] text-amber-200 font-bold rounded-xl shadow-xs flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" /> Send
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
