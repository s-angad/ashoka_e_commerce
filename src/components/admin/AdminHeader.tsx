import React from 'react';
import { Menu, Bell, Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const { products } = useAdmin();
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
          aria-label="Toggle sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative hidden sm:block max-w-xs w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders, SKU, customer..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#1C3A27] text-stone-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Low Stock Alert Badge */}
        {lowStockCount > 0 && (
          <Link
            to="/admin/inventory"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
            <span>{lowStockCount} Low Stock Alerts</span>
          </Link>
        )}

        {/* Quick Customer Store Link */}
        <Link
          to="/"
          target="_blank"
          className="hidden md:flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-[#1C3A27] px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors"
        >
          <span>View Live Store</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Admin Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-stone-200 pl-3">
          <div className="w-8 h-8 rounded-full bg-[#1C3A27] text-amber-200 font-serif font-bold text-xs flex items-center justify-center border border-amber-300">
            AH
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-stone-900 leading-none">Ashoka Admin</span>
            <span className="text-[10px] text-stone-500">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
