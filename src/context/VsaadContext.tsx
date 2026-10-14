import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  VsaadDatabase,
  VsaadProduct,
  VsaadCategory,
  VsaadGalleryItem,
  VsaadBlogPost,
  VsaadFaqItem,
  VsaadEnquiry,
  VsaadQuoteItem,
  VsaadSiteConfig,
  VsaadMediaAsset,
} from '../types/vsaadTypes';

interface VsaadContextType {
  data: VsaadDatabase | null;
  loading: boolean;
  siteConfig: VsaadSiteConfig | null;
  products: VsaadProduct[];
  categories: VsaadCategory[];
  gallery: VsaadGalleryItem[];
  blogPosts: VsaadBlogPost[];
  faqs: VsaadFaqItem[];
  enquiries: VsaadEnquiry[];
  media: VsaadMediaAsset[];
  quoteCart: VsaadQuoteItem[];
  addToQuoteCart: (item: VsaadQuoteItem) => void;
  removeFromQuoteCart: (productId: string) => void;
  updateQuoteQuantity: (productId: string, sqFt: number) => void;
  clearQuoteCart: () => void;
  submitEnquiry: (enquiryData: Partial<VsaadEnquiry>) => Promise<{ success: boolean; message: string }>;
  submitQuoteRequest: (clientDetails: {
    name: string;
    phone: string;
    email: string;
    projectLocation: string;
    message?: string;
  }) => Promise<{ success: boolean; message: string }>;
  updateCmsCollection: (collection: keyof VsaadDatabase, updatedContent: any) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: VsaadEnquiry['status'], notes?: string) => Promise<boolean>;
  deleteEnquiry: (id: string) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const VsaadContext = createContext<VsaadContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vsaad_database_cache';
const QUOTE_CART_KEY = 'vsaad_quote_cart';

export const VsaadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<VsaadDatabase | null>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.warn('Could not read cached VSAAD data', e);
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(!data);

  // Quote cart state persisted in localStorage
  const [quoteCart, setQuoteCart] = useState<VsaadQuoteItem[]>(() => {
    try {
      const cachedCart = localStorage.getItem(QUOTE_CART_KEY);
      if (cachedCart) return JSON.parse(cachedCart);
    } catch (e) {
      console.warn('Could not read cached cart', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(QUOTE_CART_KEY, JSON.stringify(quoteCart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [quoteCart]);

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/vsaad/all');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('Unable to reach /api/vsaad/all; using cached or fallback data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Quote Cart Actions
  const addToQuoteCart = (item: VsaadQuoteItem) => {
    setQuoteCart(prev => {
      const existingIdx = prev.findIndex(i => i.product.id === item.product.id && i.selectedFinish === item.selectedFinish);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantitySqFt += item.quantitySqFt;
        return copy;
      }
      return [...prev, item];
    });
  };

  const removeFromQuoteCart = (productId: string) => {
    setQuoteCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuoteQuantity = (productId: string, sqFt: number) => {
    setQuoteCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantitySqFt: Math.max(1, sqFt) } : item))
    );
  };

  const clearQuoteCart = () => {
    setQuoteCart([]);
  };

  // Submission Actions
  const submitEnquiry = async (enquiryData: Partial<VsaadEnquiry>) => {
    try {
      const res = await fetch('/api/vsaad/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData),
      });
      const json = await res.json();
      if (json.success) {
        await refreshData();
        return {
          success: true,
          message: json.message || 'Your enquiry has been successfully submitted.',
        };
      }
      return { success: false, message: json.error || 'Failed to submit enquiry.' };
    } catch (err) {
      return { success: false, message: 'Network connection error. Please try again or call us directly.' };
    }
  };

  const submitQuoteRequest = async (clientDetails: {
    name: string;
    phone: string;
    email: string;
    projectLocation: string;
    message?: string;
  }) => {
    const formattedItems = quoteCart.map(item => ({
      id: item.product.id,
      name: item.product.name,
      finish: item.selectedFinish,
      thickness: item.selectedThickness,
      sqFt: item.quantitySqFt,
    }));

    const payload: Partial<VsaadEnquiry> = {
      type: 'quote',
      name: clientDetails.name,
      phone: clientDetails.phone,
      email: clientDetails.email,
      projectLocation: clientDetails.projectLocation,
      message: clientDetails.message || '',
      items: formattedItems,
      estimatedSqFt: `${quoteCart.reduce((acc, curr) => acc + curr.quantitySqFt, 0)} sq.ft`,
      productInterest: quoteCart.map(i => i.product.name).join(', '),
    };

    const result = await submitEnquiry(payload);
    if (result.success) {
      clearQuoteCart();
    }
    return result;
  };

  const updateCmsCollection = async (collection: keyof VsaadDatabase, updatedContent: any): Promise<boolean> => {
    try {
      const res = await fetch(`/api/vsaad/cms/${collection}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      });
      const json = await res.json();
      if (json.success) {
        setData(prev => (prev ? { ...prev, [collection]: updatedContent } : prev));
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to update collection:', err);
      return false;
    }
  };

  const updateEnquiryStatus = async (id: string, status: VsaadEnquiry['status'], notes?: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/vsaad/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      const json = await res.json();
      if (json.success) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const deleteEnquiry = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/vsaad/enquiries/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  return (
    <VsaadContext.Provider
      value={{
        data,
        loading,
        siteConfig: data?.siteConfig || null,
        products: data?.products || [],
        categories: data?.categories || [],
        gallery: data?.gallery || [],
        blogPosts: data?.blogPosts || [],
        faqs: data?.faqs || [],
        enquiries: data?.enquiries || [],
        media: data?.media || [],
        quoteCart,
        addToQuoteCart,
        removeFromQuoteCart,
        updateQuoteQuantity,
        clearQuoteCart,
        submitEnquiry,
        submitQuoteRequest,
        updateCmsCollection,
        updateEnquiryStatus,
        deleteEnquiry,
        refreshData,
      }}
    >
      {children}
    </VsaadContext.Provider>
  );
};

export const useVsaad = () => {
  const context = useContext(VsaadContext);
  if (!context) {
    throw new Error('useVsaad must be used within a VsaadProvider');
  }
  return context;
};
