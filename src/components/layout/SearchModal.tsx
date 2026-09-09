import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          (p.hindiName && p.hindiName.includes(query)) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Amla Powder', 'Mamra Almonds', 'Ashwagandha', 'Kadha Mix', 'Anjeer', 'Chia Seeds'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/65 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FAF8F3]/95 backdrop-blur-2xl border border-[#C59B27]/30 shadow-2xl w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="p-4 border-b border-stone-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-ashoka-sage shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search herbs, dry fruits, remedies, powders..."
              className="w-full text-base bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-400 font-sans"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 shrink-0 text-xs font-semibold"
            >
              ESC
            </button>
          </form>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {!query.trim() ? (
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#1C3A27] hover:text-white text-stone-700 text-xs font-medium transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Products ({filteredProducts.length})
                </h4>
                <div className="divide-y divide-stone-100">
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 py-3 hover:bg-stone-50 px-2 rounded-xl transition-colors group"
                    >
                      <ImageWithFallback
                        src={p.images[0]}
                        alt={p.name}
                        category={p.category}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-stone-900 group-hover:text-ashoka-green transition-colors truncate">
                          {p.name}
                        </h5>
                        <p className="text-xs text-stone-500 truncate">{p.subtitle}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-stone-900">₹{p.price}</span>
                        <span className="block text-[10px] text-stone-500">{p.weight}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1C3A27] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm font-medium text-stone-700">No products found for "{query}"</p>
                <p className="text-xs text-stone-500 mt-1">Try searching for Amla, Almonds, Kadha, or Figs.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
