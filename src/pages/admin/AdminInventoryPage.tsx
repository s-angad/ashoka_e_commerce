import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { Search, Plus, Upload, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminInventoryPage: React.FC = () => {
  const { products, batches, addBatch, updateStock } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);

  const [batchForm, setBatchForm] = useState({
    batchName: 'BAT-2024-105',
    productId: products[0]?.id || '',
    size: '500g',
    quantity: 50,
    supplier: 'Himalayan Organic Processing Hub',
    expiryDate: '2027-12-31',
    description: 'Fresh autumn sun-dried harvest batch.',
  });

  const [bulkFile, setBulkFile] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (showLowStockOnly && p.stock > 15) return false;
    if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.sku.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === batchForm.productId) || products[0];
    addBatch({
      batchNumber: batchForm.batchName,
      productId: prod.id,
      productName: prod.name,
      weight: batchForm.size,
      quantityAdded: Number(batchForm.quantity),
      supplier: batchForm.supplier,
      expiryDate: batchForm.expiryDate,
    });
    setIsAddBatchOpen(false);
  };

  const handleSimulateBulkUpload = () => {
    setBulkFile('ashoka_inventory_sep_2026.csv');
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Inventory & Stock Control</h1>
          <p className="text-xs text-stone-500 mt-1">Manage warehouse stock levels, batch numbers, and bulk refills.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddBatchOpen(true)}
            className="px-4 py-2.5 bg-[#1C3A27] hover:bg-[#244833] text-amber-200 font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Batch
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#1C3A27]"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={(e) => setShowLowStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#1C3A27] focus:ring-[#1C3A27]"
          />
          Show Low Stock Warnings Only ({products.filter((p) => p.stock <= 15).length})
        </label>
      </div>

      {/* Inventory Stock Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Product Name</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback src={p.images[0]} alt={p.name} category={p.category} className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0" />
                      <div>
                        <h4 className="font-bold text-stone-900">{p.name}</h4>
                        <span className="text-[10px] text-stone-500">{p.weight}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-stone-700">{p.sku}</td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4 font-bold text-stone-900">{p.stock} units</td>
                  <td className="p-4">₹{p.price}</td>
                  <td className="p-4">
                    {p.stock <= 10 ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        Critical ({p.stock})
                      </span>
                    ) : p.stock <= 20 ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        Low Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900">
                        Optimal
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => updateStock(p.id, p.stock + 50)}
                      className="px-3 py-1.5 bg-[#1C3A27] text-amber-200 text-xs font-bold rounded-lg hover:bg-[#244833] transition-colors"
                    >
                      + Add Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Batches Section */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-stone-900 text-base">Warehouse Active Batches</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((b) => (
            <div key={b.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-stone-900 text-sm">{b.batchNumber}</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                  b.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                }`}>
                  {b.status}
                </span>
              </div>
              <h5 className="font-bold text-stone-900">{b.productName} ({b.weight})</h5>
              <p className="text-stone-500">Supplier: {b.supplier}</p>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-stone-600">
                <span>Refill: +{b.quantityAdded} units</span>
                <span>Exp: {b.expiryDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Upload Section */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
          <Upload className="w-4 h-4 text-ashoka-sage" /> Bulk Product CSV Inventory Upload
        </h3>

        <div className="border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center space-y-3 bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer" onClick={handleSimulateBulkUpload}>
          <FileText className="w-10 h-10 text-stone-400 mx-auto" />
          {bulkFile ? (
            <div className="text-emerald-800 font-bold text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> CSV Selected: {bulkFile} (Ready to Process)
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold text-stone-800">Click to upload or drag and drop inventory CSV</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Supports .CSV, .XLSX (Max 10MB)</p>
            </div>
          )}
        </div>
      </div>

      {/* Add New Batch Modal */}
      <AnimatePresence>
        {isAddBatchOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="font-serif font-bold text-stone-900 text-lg">Add New Inventory Batch</h3>
                <button onClick={() => setIsAddBatchOpen(false)} className="text-stone-400">✕</button>
              </div>

              <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Batch Code</label>
                  <input
                    type="text"
                    value={batchForm.batchName}
                    onChange={(e) => setBatchForm({ ...batchForm, batchName: e.target.value })}
                    required
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Target Product</label>
                  <select
                    value={batchForm.productId}
                    onChange={(e) => setBatchForm({ ...batchForm, productId: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.weight})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Pack Size</label>
                    <select
                      value={batchForm.size}
                      onChange={(e) => setBatchForm({ ...batchForm, size: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold"
                    >
                      <option value="250g">250g</option>
                      <option value="500g">500g</option>
                      <option value="1kg">1kg</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Quantity Refill</label>
                    <input
                      type="number"
                      value={batchForm.quantity}
                      onChange={(e) => setBatchForm({ ...batchForm, quantity: Number(e.target.value) })}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Supplier Info</label>
                  <input
                    type="text"
                    value={batchForm.supplier}
                    onChange={(e) => setBatchForm({ ...batchForm, supplier: e.target.value })}
                    required
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsAddBatchOpen(false)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1C3A27] text-amber-200 font-bold rounded-xl shadow-md"
                  >
                    Save Batch & Refill Stock
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
