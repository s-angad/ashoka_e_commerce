import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, ToastMessage } from '../types';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../data/mockData';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  toasts: ToastMessage[];
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantWeight: string) => void;
  updateQuantity: (productId: string, variantWeight: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addToast: (title: string, description?: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  placeOrder: (orderData: Partial<Order>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Default initial cart with 1 sample item for high UX responsiveness demo
    const p1 = MOCK_PRODUCTS[0];
    return [{ product: p1, selectedVariant: p1.variants[1] || p1.variants[0], quantity: 1 }];
  });
  const [wishlist, setWishlist] = useState<Product[]>([MOCK_PRODUCTS[1], MOCK_PRODUCTS[3]]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const targetVariant = variant || product.variants[0];
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.weight === targetVariant.weight
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, selectedVariant: targetVariant, quantity }];
    });
    addToast('Added to Cart', `${product.name} (${targetVariant.weight}) added to your basket.`, 'success');
  };

  const removeFromCart = (productId: string, variantWeight: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedVariant.weight === variantWeight)));
    addToast('Removed from Cart', 'Item removed from basket.', 'info');
  };

  const updateQuantity = (productId: string, variantWeight: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedVariant.weight === variantWeight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast('Removed from Wishlist', `${product.name} removed.`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        addToast('Saved to Wishlist', `${product.name} added.`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const placeOrder = (orderData: Partial<Order>): Order => {
    const newId = `ASH100${orders.length + 24}`;
    const newOrder: Order = {
      id: newId,
      customerName: orderData.customerName || 'Valued Customer',
      customerPhone: orderData.customerPhone || '+91 98765 43210',
      customerEmail: orderData.customerEmail || 'customer@example.com',
      address: orderData.address || {
        fullName: 'Valued Customer',
        phone: '+91 98765 43210',
        email: 'customer@example.com',
        addressLine1: '123 Heritage Lane',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        variantWeight: item.selectedVariant.weight,
        price: item.selectedVariant.price,
        quantity: item.quantity,
      })),
      subtotal: cartSubtotal,
      deliveryFee: cartSubtotal > 999 ? 0 : 70,
      discount: orderData.discount || 0,
      total: (orderData.total ?? (cartSubtotal + (cartSubtotal > 999 ? 0 : 70))),
      paymentMethod: orderData.paymentMethod || 'Razorpay',
      paymentStatus: 'Paid',
      orderDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      currentStatus: 'Confirmed',
      whatsAppNotificationsEnabled: true,
      timeline: [
        { status: 'Ordered', date: 'Just now', description: 'Order submitted and verified.', completed: true, current: false },
        { status: 'Confirmed', date: 'Just now', description: 'Order confirmed by Ashoka Herbs warehouse.', completed: true, current: true },
        { status: 'Processing', date: 'Pending', description: 'Sun-dried quality check & vacuum packing.', completed: false },
        { status: 'Packed', date: 'Pending', description: 'Eco-friendly sealed box prepared.', completed: false },
        { status: 'Dispatched', date: 'Pending', description: 'Handed to express courier.', completed: false },
        { status: 'Out for Delivery', date: 'Pending', description: 'En route to your doorstep.', completed: false },
        { status: 'Delivered', date: 'Pending', description: 'Handover complete.', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast('Order Placed Successfully!', `Order #${newId} has been confirmed.`, 'success');
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.selectedVariant.price * item.quantity, 0);
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + (cartSubtotal > 999 ? 0 : 70) : 0;

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        toasts,
        searchQuery,
        activeCategory,
        setSearchQuery,
        setActiveCategory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToast,
        removeToast,
        placeOrder,
        getOrderById,
        cartCount,
        cartSubtotal,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
