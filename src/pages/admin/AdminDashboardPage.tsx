import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { CountUpNumber } from '../../components/ui/CountUpNumber';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingBag,
  Users,
  AlertTriangle,
  TrendingUp,
  Eye,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders, updateStock } = useAdmin();

  const lowStockProducts = products.filter((p) => p.stock <= 15);

  const salesTrendData = [
    { month: 'Jan', revenue: 120000, orders: 840 },
    { month: 'Feb', revenue: 145000, orders: 1020 },
    { month: 'Mar', revenue: 160000, orders: 1190 },
    { month: 'Apr', revenue: 190000, orders: 1420 },
    { month: 'May', revenue: 210000, orders: 1650 },
    { month: 'Jun', revenue: 223600, orders: 1833 },
  ];

  const categoryDistribution = [
    { name: 'Dry Fruits', value: 40, color: '#1C3A27' },
    { name: 'Herbs', value: 30, color: '#4E6E4C' },
    { name: 'Nuts', value: 18, color: '#C59B27' },
    { name: 'Remedies', value: 12, color: '#3B291A' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Dashboard Overview</h1>
          <p className="text-xs text-stone-500 mt-1">Real-time performance stats for Ashoka Herbs and Dry Fruits.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-[#1C3A27] hover:bg-[#244833] text-amber-200 text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid with Stagger & Count-Up Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Revenue</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              <CountUpNumber end={223600} prefix="₹" duration={1.8} />
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% from last month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1C3A27] flex items-center justify-center font-bold">
            <IndianRupee className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="bg-[#FAF8F3] p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Orders</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              <CountUpNumber end={1833} duration={1.6} />
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +12.1% growth
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6 text-ashoka-sage" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Customers</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              <CountUpNumber end={942} duration={1.5} />
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +24 new this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1C3A27] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Low Stock Alerts</span>
            <h3 className="font-serif text-2xl font-bold text-amber-800 mt-1">
              <CountUpNumber end={lowStockProducts.length} duration={1.2} suffix=" Items" />
            </h3>
            <span className="text-[11px] text-amber-800 font-semibold mt-1 block">Requires inventory batch refill</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6 text-amber-700" />
          </div>
        </motion.div>
      </div>

      {/* Low Stock Warning Banner & Quick Action */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-amber-900 text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-800" /> Low Stock Inventory Warning
            </h3>
            <Link to="/admin/inventory" className="text-xs font-bold text-amber-900 underline">
              View Inventory Manager →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ImageWithFallback src={p.images[0]} alt={p.name} category={p.category} className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-900 truncate max-w-[120px]">{p.name}</h4>
                    <span className="text-amber-800 font-bold">Only {p.stock} units left!</span>
                  </div>
                </div>
                <button
                  onClick={() => updateStock(p.id, p.stock + 50)}
                  className="px-2.5 py-1 bg-[#1C3A27] text-amber-200 rounded-lg font-bold text-[11px] hover:bg-[#244833] transition-colors"
                >
                  + Add 50
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trend Curve */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Revenue & Sales Overview</h3>
              <p className="text-xs text-stone-500">Monthly revenue trajectory (Jan - Jun 2026)</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Live Tracker
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1C3A27" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1C3A27" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#1C3A27" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Pie */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Sales By Category</h3>
            <p className="text-xs text-stone-500">Revenue contribution per category</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {categoryDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-stone-700 font-medium">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <h3 className="font-serif font-bold text-stone-900 text-base">Recent Customer Orders</h3>
          <Link to="/admin/orders" className="text-xs font-bold text-[#1C3A27] hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">#{o.id}</td>
                  <td className="p-4">
                    <span className="font-bold block">{o.customerName}</span>
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
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                      {o.currentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/orders?id=${o.id}`}
                      className="px-3 py-1.5 bg-[#1C3A27] text-amber-200 rounded-lg text-xs font-bold hover:bg-[#244833] inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
