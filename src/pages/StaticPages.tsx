import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export const AboutUsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
    <div className="text-center space-y-2">
      <span className="text-xs font-bold text-[#4E6E4C] uppercase tracking-widest">OUR STORY</span>
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">About Ashoka Herbs & Dry Fruits</h1>
    </div>

    <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
      <div className="flex justify-center mb-4">
        <img src="/ashoka-logo.jpg" alt="Ashoka Logo" className="w-24 h-24 rounded-full border-2 border-[#C59B27]" />
      </div>

      <p>
        Founded in 2024, Ashoka Herbs and Dry Fruits was born out of a passion for authentic Ayurvedic wellness and premium natural dry fruits direct from Indian growers. Based in Meerut, Uttar Pradesh, we bridge the gap between traditional wisdom and modern convenient D2C delivery.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
          <h4 className="font-serif font-bold text-stone-900 text-sm">Direct Kashmiri Sourcing</h4>
          <p className="text-xs text-stone-600 mt-1">Our Mamra almonds, saffron, and walnuts are handpicked from verified high-altitude valley orchards.</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
          <h4 className="font-serif font-bold text-stone-900 text-sm">Traditional Sun-Drying</h4>
          <p className="text-xs text-stone-600 mt-1">Ayurvedic herbs are sun-dried and micro-milled without thermal breakdown to retain volatile oils.</p>
        </div>
      </div>
    </div>
  </div>
);

export const ContactUsPage: React.FC = () => {
  const { addToast } = useShop();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Message Sent!', 'We will respond within 2 hours on WhatsApp/Email.', 'success');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#4E6E4C] uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Contact & Customer Support</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-[#1C3A27] text-white p-8 rounded-3xl space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#C59B27]">Ashoka Experience Center</h3>
          <p className="text-xs text-amber-100/80 leading-relaxed">
            Have questions about dosage, custom dry fruit gift hampers, or order status? Our wellness experts are here to help.
          </p>

          <div className="space-y-4 text-xs pt-2">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#C59B27]" />
              <span>Call / WhatsApp: +91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C59B27]" />
              <span>Email: support@ashokaherbs.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#C59B27]" />
              <span>Store: Civil Lines, Meerut Cantt, UP - 250001</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg">Send Us a Message</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#1C3A27]"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-[#1C3A27] text-amber-100 font-bold text-xs rounded-xl shadow-md hover:bg-[#244833] transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'Are your herbs 100% organic and free from added preservatives?',
      a: 'Yes! All Ashoka herbs are grown in chemical-free organic soil, sun-dried naturally, and milled without artificial preservatives or colorings.',
    },
    {
      q: 'What is the difference between California Almonds and Kashmiri Mamra Almonds?',
      a: 'Mamra almonds are wild concave-shaped almonds from Kashmir containing up to 50% natural almond oil. California almonds are pasteurized and contain only 20-25% oil.',
    },
    {
      q: 'How long does delivery take across India?',
      a: 'Orders are dispatched within 24 hours from our Meerut warehouse via Delhivery Express. Metro delivery takes 2-3 business days, rest of India takes 3-5 days.',
    },
    {
      q: 'What payment options do you support?',
      a: 'We support Razorpay (Cards, Netbanking, UPI, Wallets), Instant UPI QR code payment, and Cash on Delivery (COD).',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#4E6E4C] uppercase tracking-widest">HELP CENTER</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-ashoka-sage shrink-0" /> {faq.q}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
