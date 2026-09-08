import React, { createContext, useContext, useState } from 'react';
import { Product, Order, InventoryBatch, Customer, OrderStatus } from '../types';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_INVENTORY_BATCHES, MOCK_CUSTOMERS } from '../data/mockData';

interface AdminSettings {
  razorpayTestMode: boolean;
  razorpayKeyId: string;
  delhiveryIntegration: boolean;
  shiprocketIntegration: boolean;
  whatsAppNotifications: boolean;
  whatsAppApiKey: string;
  autoBatchRefill: boolean;
}

interface AdminContextType {
  products: Product[];
  orders: Order[];
  batches: InventoryBatch[];
  customers: Customer[];
  settings: AdminSettings;
  addProduct: (product: Partial<Product>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number) => void;
  addBatch: (batch: Partial<InventoryBatch>) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  toggleOrderWhatsAppAlert: (orderId: string) => void;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  sendWhatsAppMessage: (customerId: string, message: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [batches, setBatches] = useState<InventoryBatch[]>(MOCK_INVENTORY_BATCHES);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [settings, setSettings] = useState<AdminSettings>({
    razorpayTestMode: true,
    razorpayKeyId: 'rzp_test_ASH894129',
    delhiveryIntegration: true,
    shiprocketIntegration: false,
    whatsAppNotifications: true,
    whatsAppApiKey: 'wa_live_sec_892314781',
    autoBatchRefill: true,
  });

  const addProduct = (newProd: Partial<Product>) => {
    const product: Product = {
      id: `prod-${Date.now()}`,
      name: newProd.name || 'New Herbal Product',
      hindiName: newProd.hindiName || '',
      subtitle: newProd.subtitle || 'Organic Herbal Wellness',
      category: newProd.category || 'Herbs',
      rating: 5.0,
      reviewCount: 0,
      price: newProd.price || 350,
      originalPrice: newProd.originalPrice || 450,
      weight: newProd.weight || '500g',
      variants: newProd.variants || [
        { weight: '500g', price: newProd.price || 350, inStock: true, sku: newProd.sku || 'ASH-NEW-500' }
      ],
      images: newProd.images?.length ? newProd.images : ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'],
      description: newProd.description || 'Authentic organic herb carefully harvested.',
      benefits: newProd.benefits?.length ? newProd.benefits : ['100% Organic & Chemical Free'],
      ingredients: newProd.ingredients?.length ? newProd.ingredients : ['100% Pure Herb'],
      howToUse: newProd.howToUse || 'Take 1 teaspoon daily with warm water.',
      stock: newProd.stock || 50,
      sku: newProd.sku || `ASH-${Math.floor(Math.random() * 9000 + 1000)}`,
      organicCertified: newProd.organicCertified ?? true,
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const addBatch = (newBatch: Partial<InventoryBatch>) => {
    const batch: InventoryBatch = {
      id: `bat-${Date.now()}`,
      batchNumber: newBatch.batchNumber || `BAT-2024-${Math.floor(Math.random() * 900 + 100)}`,
      productId: newBatch.productId || products[0].id,
      productName: newBatch.productName || products[0].name,
      weight: newBatch.weight || '500g',
      quantityAdded: newBatch.quantityAdded || 50,
      manufactureDate: newBatch.manufactureDate || new Date().toISOString().substring(0, 10),
      expiryDate: newBatch.expiryDate || '2027-12-31',
      supplier: newBatch.supplier || 'Ashoka Herbal Processing Unit, Meerut',
      status: 'Active',
    };
    setBatches((prev) => [batch, ...prev]);
    // also increment product stock
    if (newBatch.productId) {
      const prod = products.find((p) => p.id === newBatch.productId);
      if (prod) {
        updateStock(prod.id, prod.stock + (newBatch.quantityAdded || 50));
      }
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
          const updatedTimeline = order.timeline.map((step) => {
            if (step.status === newStatus) {
              return { ...step, date: nowStr, completed: true, current: true };
            }
            if (step.current) {
              return { ...step, current: false };
            }
            return step;
          });

          return {
            ...order,
            currentStatus: newStatus,
            timeline: updatedTimeline,
          };
        }
        return order;
      })
    );
  };

  const toggleOrderWhatsAppAlert = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, whatsAppNotificationsEnabled: !o.whatsAppNotificationsEnabled } : o
      )
    );
  };

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const sendWhatsAppMessage = (customerId: string, message: string) => {
    setCustomers((prev) =>
      prev.map((cust) => {
        if (cust.id === customerId) {
          const newLog = {
            id: `log-${Date.now()}`,
            type: 'WhatsApp' as const,
            message,
            timestamp: 'Just Now',
            status: 'Delivered' as const,
          };
          return { ...cust, communicationLogs: [newLog, ...cust.communicationLogs] };
        }
        return cust;
      })
    );
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        batches,
        customers,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        addBatch,
        updateOrderStatus,
        toggleOrderWhatsAppAlert,
        updateSettings,
        sendWhatsAppMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};
