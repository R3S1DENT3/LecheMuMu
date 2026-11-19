export type TemplateId = 'mumu';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  price?: string;
  features?: string[];
  imageUrl?: string;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  imageUrl?: string;
  linkText?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  format: string;
  imageUrl: string;
  description: string;
  badge?: string;
  nutrition?: { label: string; value: string }[];
  idealFor?: string;
}

export interface RecipeItem {
  id: string;
  title: string;
  prepTime: string;
  servings: string;
  productUsed: string;
  description: string;
  ingredients: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface DataSheetItem {
  id: string;
  code: string;
  productName: string;
  presentation: string;
  revision: string;
  revisionDate: string;
  pdfUrl: string;
  imageUrl?: string;
  category?: string;
  description?: string;
  ingredients?: string;
  organoleptic: { characteristic: string; specification: string }[];
  physicochemicalHeaders?: [string, string, string];
  physicochemical: { requirement: string; min: string; max: string; unit?: string }[];
  microbiological: { requirement: string; specification: string }[];
  storage: { condition: string; specification: string }[];
  allergens: string;
  regulations?: string[];
  notes?: string;
}

export interface WholesalePricingItem {
  product: string;
  retailPrice: string;
  wholesalePrice: string;
}

export interface WholesaleConfig {
  companyName: string;
  brandName: string;
  department: string;
  heading: string;
  intro: string;
  pdfUrl: string;
  benefits: string[];
  pricing: WholesalePricingItem[];
  pricingDisclaimer: string;
  commercialNote: string;
  packagingProposal: {
    title: string;
    specs: { label: string; value: string }[];
    description: string;
    academicNote: string;
  };
  palletIdentification: string[];
  logistics: {
    intro: string;
    conditions: string[];
    deliveryDocs: string[];
  };
  requirements: string[];
  requirementsFooter: string;
}

export interface WebsiteConfig {
  id: TemplateId;
  name: string;
  logoUrl?: string;
  tagline: string;
  category: string;
  brandColor: 'mumu-pink' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate' | 'cyan';
  fontStyle: 'modern-sans' | 'editorial-serif' | 'clean-mono';
  theme: 'light' | 'dark';
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta?: string;
    heroImage: string;
    noticeText?: string;
  };
  navigation: NavItem[];
  services: ServiceItem[];
  metrics?: MetricItem[];
  projects?: ProjectItem[];
  products?: ProductItem[];
  recipes?: RecipeItem[];
  dataSheets?: DataSheetItem[];
  wholesale?: WholesaleConfig;
  testimonials: TestimonialItem[];
  faqs?: FaqItem[];
  contact: {
    heading: string;
    subheading: string;
    email: string;
    phone: string;
    address: string;
    buttonLabel: string;
  };
  activeSections: {
    hero: boolean;
    products?: boolean;
    services: boolean;
    metrics: boolean;
    recipes?: boolean;
    dataSheets?: boolean;
    wholesale?: boolean;
    gallery: boolean;
    testimonials: boolean;
    faq: boolean;
    contact: boolean;
  };
}
