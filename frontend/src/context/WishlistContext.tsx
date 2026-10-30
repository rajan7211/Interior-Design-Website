import React, { createContext, useContext, useState, useEffect } from 'react';
import { FurnitureProduct } from '../types';
import { FURNITURE_CATALOG } from '../data/mockData';

interface WishlistContextType {
  items: FurnitureProduct[];
  addItem: (product: FurnitureProduct) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  clearWishlist: () => void;
  totalCount: number;
}

const STORAGE_KEY = 'aurelle_saved_inquiries';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<FurnitureProduct[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading wishlist storage', e);
    }
    // Seed with 2 signature pieces to match original UI badge
    return [FURNITURE_CATALOG[0], FURNITURE_CATALOG[2]];
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving wishlist storage', e);
    }
  }, [items]);

  const addItem = (product: FurnitureProduct) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return items.some((p) => p.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        isOpen,
        setIsOpen,
        clearWishlist,
        totalCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

