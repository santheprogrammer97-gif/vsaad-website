export interface VsaadSiteConfig {
  name: string;
  fullName: string;
  tagline: string;
  positioning: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  contact: {
    phone: string;
    altPhone?: string;
    email: string;
    salesEmail?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    workingHours: string;
    googleMapsUrl?: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    pinterest?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    canonicalBase: string;
    ogImage: string;
  };
}

export interface VsaadProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: 'granite' | 'tiles' | string;
  categoryName: string;
  finishGroup?: 'Polished' | 'Lapotra' | string;
  adminNote?: string;
  tagline: string;
  description: string;
  finishes: string[];
  defaultFinish: string;
  thicknesses: string[];
  defaultThickness: string;
  origin: string;
  applications: string[];
  compressiveStrength?: string;
  waterAbsorption?: string;
  density?: string;
  pricePerSqFt?: number;
  priceDisplay: string;
  featured: boolean;
  inStock: boolean;
  primaryImage: string;
  galleryImages: string[];
  color: string;
  colorFamily: string;
  subCategory?: 'floor' | 'wall' | 'outdoor' | 'decorative' | string;
  tileFormat?: string;
  slipRating?: string;
}

export interface VsaadCategory {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  productCount: number;
}

export interface VsaadGalleryItem {
  id: string;
  title: string;
  category: 'interiors' | 'commercial' | 'kitchens' | 'flooring' | 'staircases' | 'cladding' | 'closeups';
  categoryLabel: string;
  image: string;
  description: string;
  location?: string;
  material: string;
}

export interface VsaadBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface VsaadFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface VsaadQuoteItem {
  product: VsaadProduct;
  quantitySqFt: number;
  selectedFinish: string;
  selectedThickness: string;
  edgeProfile?: string;
  notes?: string;
}

export interface VsaadEnquiry {
  id: string;
  type: 'enquiry' | 'quote';
  name: string;
  email: string;
  phone: string;
  productInterest?: string;
  category?: string;
  estimatedSqFt?: string;
  projectLocation?: string;
  message?: string;
  items?: {
    id: string;
    name: string;
    finish: string;
    thickness: string;
    sqFt: number;
  }[];
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  notes?: string;
  createdAt: string;
}

export interface VsaadMediaAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  alt: string;
  createdAt?: string;
}

export interface VsaadDatabase {
  siteConfig: VsaadSiteConfig;
  products: VsaadProduct[];
  categories: VsaadCategory[];
  gallery: VsaadGalleryItem[];
  blogPosts: VsaadBlogPost[];
  faqs: VsaadFaqItem[];
  enquiries: VsaadEnquiry[];
  media: VsaadMediaAsset[];
  pages: {
    home?: {
      heroHeadline: string;
      heroSubheadline: string;
      heroEyebrow: string;
      whyTitle?: string;
      whySubtitle?: string;
      ctaHeadline?: string;
      ctaSubheadline?: string;
    };
    about?: {
      headline: string;
      storyHeadline: string;
      storyBody: string;
      values: { title: string; description: string }[];
    };
  };
}
