import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Settings, CreditCard, Truck, MessageSquare, Key, ShieldCheck, Check } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAdmin();

  return (
    <div className="space-y-8 pb-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">SETTINGS - INTEGRATIONS</h1>
        <p className="text-xs text-stone-500 mt-1">Configure payment gateways, courier integrations, and WhatsApp API webhooks.</p>
      </div>

      <div className="space-y-6">
        {/* Payment Integration Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-ashoka-sage" />
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base">Razorpay Payment Gateway</h3>
                <span className="text-xs text-stone-500">Configured with live test key status</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
              Live Test Mode
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={settings.razorpayKeyId}
                onChange={(e) => updateSettings({ razorpayKeyId: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold text-stone-800"
              />
            </div>
          </div>
        </div>

        {/* Shipping Carrier Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-ashoka-sage" />
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base">Shipping & Courier Integration</h3>
                <span className="text-xs text-stone-500">Automated AWB generation & tracking sync</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <strong className="block text-stone-900 font-bold text-sm">DELHIVERY Express</strong>
                <span className="text-stone-500">Pan-India express logistics integration</span>
              </div>
              <button
                onClick={() => updateSettings({ delhiveryIntegration: !settings.delhiveryIntegration })}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                  settings.delhiveryIntegration
                    ? 'bg-[#1C3A27] text-amber-200'
                    : 'bg-stone-200 text-stone-700'
                }`}
              >
                {settings.delhiveryIntegration ? 'Active ✓' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Integration Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-ashoka-sage" />
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base">WhatsApp API Messaging</h3>
                <span className="text-xs text-stone-500">Automated order dispatch & status alert templates</span>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ whatsAppNotifications: !settings.whatsAppNotifications })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.whatsAppNotifications ? 'bg-[#1C3A27]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.whatsAppNotifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">WhatsApp API Secret Key</label>
              <input
                type="password"
                value={settings.whatsAppApiKey}
                onChange={(e) => updateSettings({ whatsAppApiKey: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold text-stone-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
