import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Product, ProductCategory } from '../../types';
import { Search, Plus, Edit2, Trash2, X, Image as ImageIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminProductsPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    hindiName: '',
    subtitle: '',
    category: 'Herbs' as ProductCategory,
    price: 350,
    originalPrice: 450,
    sku: 'ASH-NEW-500',
    weight: '500g',
    stock: 50,
    description: '',
    organicCertified: true,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
  });

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.sku.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      hindiName: '',
      subtitle: '',
      category: 'Herbs',
      price: 350,
      originalPrice: 450,
      sku: `ASH-${Math.floor(Math.random() * 9000 + 1000)}`,
      weight: '500g',
      stock: 50,
      description: '',
      organicCertified: true,
      imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    });
    setIsAddDrawerOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      hindiName: p.hindiName || '',
      subtitle: p.subtitle,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || p.price + 100,
      sku: p.sku,
      weight: p.weight,
      stock: p.stock,
      description: p.description,
      organicCertified: p.organicCertified ?? true,
      imageUrl: p.images[0] || '',
    });
    setIsAddDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        hindiName: formData.hindiName,
        subtitle: formData.subtitle,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        sku: formData.sku,
        weight: formData.weight,
        stock: Number(formData.stock),
        description: formData.description,
        organicCertified: formData.organicCertified,
        images: [formData.imageUrl],
      });
    } else {
      addProduct({
        name: formData.name,
        hindiName: formData.hindiName,
        subtitle: formData.subtitle,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        sku: formData.sku,
        weight: formData.weight,
        stock: Number(formData.stock),
        description: formData.description,
        organicCertified: formData.organicCertified,
        images: [formData.imageUrl],
      });
    }
    setIsAddDrawerOpen(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Products Catalogue Management</h1>
          <p className="text-xs text-stone-500 mt-1">Manage SKUs, variants, prices, and stock inventory.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#1C3A27] hover:bg-[#244833] text-amber-200 text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter & Search Controls */}
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

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-semibold">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Herbs">Herbs</option>
            <option value="Dry Fruits">Dry Fruits</option>
            <option value="Remedies">Remedies</option>
            <option value="Nuts">Nuts</option>
            <option value="Seeds">Seeds</option>
            <option value="Powders">Powders</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Weight</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0" />
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-sm">{p.name}</h4>
                        <span className="text-[10px] text-stone-500 line-clamp-1">{p.subtitle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-stone-700">{p.sku}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-ashoka-sage border border-emerald-200">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-stone-900">₹{p.price}</td>
                  <td className="p-4 text-stone-600">{p.weight}</td>
                  <td className="p-4">
                    {p.stock <= 10 ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        Low Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900">
                        {p.stock} units
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-2 text-stone-600 hover:text-[#1C3A27] hover:bg-stone-100 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Slide Drawer */}
      <AnimatePresence>
        {isAddDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  {editingProduct ? 'Edit Product Details' : 'Add New Herbal Product'}
                </h3>
                <button onClick={() => setIsAddDrawerOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Organic Amla Powder"
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Hindi Title (Optional)</label>
                    <input
                      type="text"
                      value={formData.hindiName}
                      onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                      placeholder="e.g. आंवला चूर्ण"
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] font-semibold"
                    >
                      <option value="Herbs">Herbs</option>
                      <option value="Dry Fruits">Dry Fruits</option>
                      <option value="Remedies">Remedies</option>
                      <option value="Nuts">Nuts</option>
                      <option value="Seeds">Seeds</option>
                      <option value="Powders">Powders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Subtitle / Short Tagline</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    required
                    placeholder="100% Pure Organic Wild Amla Powder"
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Orig. Price (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Stock Count</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">SKU Code</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27] font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Default Weight</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                      placeholder="e.g. 500g"
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1C3A27] hover:bg-[#244833] text-amber-200 font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    {editingProduct ? 'Save Product Changes' : 'Publish Product'}
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
