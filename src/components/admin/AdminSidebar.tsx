import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  Users,
  Megaphone,
  BarChart3,
  Settings,
  Store,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Inventory & Stock', path: '/admin/inventory', icon: Boxes },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Marketing & Promos', path: '/admin/marketing', icon: Megaphone },
    { name: 'Advanced Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar & Mobile Drawer Wrapper */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1C3A27] text-white flex flex-col justify-between border-r border-emerald-900 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
            <Link to="/admin" className="flex items-center gap-3">
              <img
                src="/ashoka-logo.jpg"
                alt="Ashoka Admin"
                className="w-10 h-10 rounded-full border border-amber-300 object-cover"
              />
              <div>
                <h3 className="font-serif font-bold text-white text-base leading-none">ASHOKA</h3>
                <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-widest">
                  ADMIN DASHBOARD
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden p-1 text-emerald-300 hover:text-white"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#C59B27] text-stone-950 font-bold shadow-md'
                      : 'text-amber-100/80 hover:bg-emerald-900/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Store Link */}
        <div className="p-4 border-t border-emerald-900 bg-emerald-950/60">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-200 text-xs font-bold transition-colors border border-emerald-700/60"
          >
            <Store className="w-4 h-4 text-amber-300" />
            <span>Switch to Customer Store</span>
          </Link>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs lg:hidden"
        />
      )}
    </>
  );
};
