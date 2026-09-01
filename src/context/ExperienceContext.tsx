'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, ProductColorway, PRODUCTS } from '@/data/products';

export type UpperColor = 'white' | 'ice' | 'midnight' | 'graphite' | 'ultraviolet' | 'volt' | 'solar' | 'green';
export type SoleColor = 'white' | 'carbon' | 'black';
export type AccentColor = 'cyan' | 'violet' | 'white' | 'green' | 'orange';
export type Preset = 'ARCTIC' | 'OBSIDIAN' | 'VOLT' | 'ULTRAVIOLET' | 'CARBON' | 'SOLAR' | 'CUSTOM';

export interface SneakerConfig {
  upperColor: UpperColor;
  soleColor: SoleColor;
  accentColor: AccentColor;
  preset: Preset;
}

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  size: string;
  quantity: number;
  colorway: ProductColorway;
  image?: string;
}

export interface OrderData {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  customer: {
    email: string;
    phone: string;
    fullName: string;
  };
  shippingAddress: {
    address: string;
    suite?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'upi' | 'card' | 'netbanking';
  createdAt: string;
  status: 'confirmed' | 'preparing' | 'shipped' | 'delivered';
}

interface ExperienceContextType {
  // Scroll & Scene State
  scrollProgress: number;
  setScrollProgress: (p: number) => void;
  activeScene: number;
  setActiveScene: (s: number) => void;
  isLoaded: boolean;
  setIsLoaded: (l: boolean) => void;
  scrollToScene: (scene: number) => void;
  scrollToCollection: () => void;
  scrollToCheckout: () => void;

  // Customizer Configuration (Act 1 & 3D showroom)
  config: SneakerConfig;
  setUpperColor: (color: UpperColor) => void;
  setSoleColor: (color: SoleColor) => void;
  setAccentColor: (color: AccentColor) => void;
  setPreset: (preset: Preset) => void;

  // 3D Sneaker Orbit/Drag Interaction
  userRotation: { x: number; y: number };
  setUserRotation: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  isDragging: boolean;
  setIsDragging: (d: boolean) => void;

  // Showroom Product Detail Modal (Act 2)
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;

  // Cart & Checkout (Act 3)
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  completedOrder: OrderData | null;
  setCompletedOrder: (order: OrderData | null) => void;
  cartItems: CartItem[];
  addToCart: (product?: Product, colorway?: ProductColorway, size?: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;

  // UI & Nav
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;

  // Flying sneaker effect to cart
  isFlyingToCart: boolean;
}

const PRESET_CONFIGS: Record<Exclude<Preset, 'CUSTOM'>, SneakerConfig> = {
  VOLT: {
    upperColor: 'green',
    soleColor: 'white',
    accentColor: 'green',
    preset: 'VOLT',
  },
  ARCTIC: {
    upperColor: 'green',
    soleColor: 'white',
    accentColor: 'green',
    preset: 'ARCTIC',
  },
  OBSIDIAN: {
    upperColor: 'midnight',
    soleColor: 'black',
    accentColor: 'white',
    preset: 'OBSIDIAN',
  },
  ULTRAVIOLET: {
    upperColor: 'white',
    soleColor: 'white',
    accentColor: 'violet',
    preset: 'ULTRAVIOLET',
  },
  CARBON: {
    upperColor: 'graphite',
    soleColor: 'carbon',
    accentColor: 'cyan',
    preset: 'CARBON',
  },
  SOLAR: {
    upperColor: 'white',
    soleColor: 'white',
    accentColor: 'orange',
    preset: 'SOLAR',
  },
};

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default is Vivid Green
  const [config, setConfig] = useState<SneakerConfig>(PRESET_CONFIGS.VOLT);
  const [userRotation, setUserRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Cart & Checkout State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);

  // Default starting cart item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'nova-x-volt-volt-UK 9',
      name: 'NOVA X',
      subtitle: 'Volt Surge',
      price: 20999,
      size: 'UK 9',
      quantity: 1,
      colorway: PRODUCTS[2].defaultColorway,
    },
  ]);
  const [isFlyingToCart, setIsFlyingToCart] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion safely on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery) {
          setReducedMotion(mediaQuery.matches);
          const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
          if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
          }
        }
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // Update scene based on scroll progress (Scenes 1 to 8 in Act 1)
  useEffect(() => {
    if (scrollProgress < 0.12) setActiveScene(1);
    else if (scrollProgress < 0.25) setActiveScene(2);
    else if (scrollProgress < 0.38) setActiveScene(3);
    else if (scrollProgress < 0.50) setActiveScene(4);
    else if (scrollProgress < 0.63) setActiveScene(5);
    else if (scrollProgress < 0.75) setActiveScene(6);
    else if (scrollProgress < 0.88) setActiveScene(7);
    else setActiveScene(8);
  }, [scrollProgress]);

  const setUpperColor = useCallback((color: UpperColor) => {
    setConfig((prev) => ({ ...prev, upperColor: color, preset: 'CUSTOM' }));
  }, []);

  const setSoleColor = useCallback((color: SoleColor) => {
    setConfig((prev) => ({ ...prev, soleColor: color, preset: 'CUSTOM' }));
  }, []);

  const setAccentColor = useCallback((color: AccentColor) => {
    setConfig((prev) => ({ ...prev, accentColor: color, preset: 'CUSTOM' }));
  }, []);

  const setPreset = useCallback((preset: Preset) => {
    if (preset !== 'CUSTOM') {
      setConfig(PRESET_CONFIGS[preset]);
    }
  }, []);

  const scrollToScene = useCallback((scene: number) => {
    if (typeof window === 'undefined') return;
    const sceneTargets: Record<number, number> = {
      1: 0.0,
      2: 0.18,
      3: 0.32,
      4: 0.44,
      5: 0.56,
      6: 0.68,
      7: 0.80,
      8: 0.94,
    };
    const targetProgress = sceneTargets[scene] ?? 0;
    const trackHeight = window.innerHeight * 6.5;
    window.scrollTo({ top: targetProgress * trackHeight, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  const scrollToCollection = useCallback(() => {
    if (typeof window === 'undefined') return;
    const colEl = document.getElementById('nova-collection');
    if (colEl) {
      colEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      const targetY = window.innerHeight * 7.0;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  const scrollToCheckout = useCallback(() => {
    if (typeof window === 'undefined') return;
    setIsCartOpen(false);
    const chkEl = document.getElementById('nova-checkout');
    if (chkEl) {
      chkEl.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  const addToCart = useCallback(
    (product?: Product, colorway?: ProductColorway, size = 'UK 9') => {
      const prod = product || PRODUCTS[0];
      const col = colorway || prod.defaultColorway;
      const itemId = `${prod.id}-${col.id}-${size}`;

      setIsFlyingToCart(true);
      setTimeout(() => {
        setCartItems((prev) => {
          const existing = prev.find((item) => item.id === itemId);
          if (existing) {
            return prev.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [
            ...prev,
            {
              id: itemId,
              name: prod.name,
              subtitle: col.name,
              price: prod.price,
              size,
              quantity: 1,
              colorway: col,
            },
          ];
        });
        setIsFlyingToCart(false);
        setIsCartOpen(true);
      }, 400);
    },
    []
  );

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setIsCartOpen(false);
  }, []);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ExperienceContext.Provider
      value={{
        scrollProgress,
        setScrollProgress,
        activeScene,
        setActiveScene,
        isLoaded,
        setIsLoaded,
        scrollToScene,
        scrollToCollection,
        scrollToCheckout,
        config,
        setUpperColor,
        setSoleColor,
        setAccentColor,
        setPreset,
        userRotation,
        setUserRotation,
        isDragging,
        setIsDragging,
        selectedProductForModal,
        setSelectedProductForModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutStep,
        setCheckoutStep,
        completedOrder,
        setCompletedOrder,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        isMenuOpen,
        setIsMenuOpen,
        soundEnabled,
        setSoundEnabled,
        reducedMotion,
        setReducedMotion,
        isFlyingToCart,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};
