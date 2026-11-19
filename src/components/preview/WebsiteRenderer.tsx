import React, { useState } from 'react';
import { WebsiteConfig, ProductItem, RecipeItem } from '../../types/website';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ChefHat,
  Heart,
  Store,
  Truck,
  Check,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Building2,
  Package,
  ClipboardList,
  Boxes
} from 'lucide-react';

interface WebsiteRendererProps {
  config: WebsiteConfig;
}

export const WebsiteRenderer: React.FC<WebsiteRendererProps> = ({ config }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeRecipeTab, setActiveRecipeTab] = useState<string>('all');
  const [selectedDataSheetId, setSelectedDataSheetId] = useState<string>('ds-leche');
  
  // Interactive Cart / "Canasta Familiar" State
  const [cartItems, setCartItems] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartSuccessMessage, setCartSuccessMessage] = useState<string | null>(null);

  // Store locator / delivery selector
  const [orderType, setOrderType] = useState<'delivery' | 'store'>('delivery');
  const [selectedCity, setSelectedCity] = useState('Celaya, Guanajuato');

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    favoriteProducts: ['Leche Entera Pasteurizada', 'Yogurt de Fresa', 'Queso Panela'],
  });

  // Wholesale (Ventas a Mayoreo) interactive states
  const [wholesaleLogisticsTab, setWholesaleLogisticsTab] = useState<'empaque' | 'logistica' | 'requisitos'>('empaque');
  const [wholesaleFormStep, setWholesaleFormStep] = useState<'empresa' | 'entrega' | 'pedido' | 'condiciones'>('empresa');
  const [wholesaleSubmitted, setWholesaleSubmitted] = useState(false);
  const [wholesaleForm, setWholesaleForm] = useState({
    // A. Información de la empresa
    razonSocial: '',
    nombreComercial: '',
    rfc: '',
    responsableCompras: '',
    puestoResponsable: '',
    correoEmpresa: '',
    telefonoEmpresa: '',
    domicilioFiscal: '',
    // B. Información de entrega
    centroDistribucion: '',
    direccionEntrega: '',
    ciudadEntrega: '',
    estadoEntrega: '',
    codigoPostalEntrega: '',
    horarioRecepcion: '',
    andenDescarga: 'Sí',
    camarasRefrigeracion: 'Sí',
    // C. Información del pedido
    productoSolicitado: 'Yogur Bebible 220 g',
    presentacion: 'Botella 220 g (Caja con 12 unidades)',
    cantidadCajas: '80',
    unidadesPorCaja: '12',
    frecuenciaPedido: 'Semanal',
    fechaEstimadaEntrega: '',
    // D. Condiciones comerciales
    metodoPago: 'Transferencia electrónica (SPEI)',
    plazoPago: '30 días',
    requiereFactura: 'Sí',
    requisitosEspeciales: '',
    observacionesAdicionales: '',
  });

  const handleWholesaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWholesaleSubmitted(true);
  };

  const getBrandClasses = () => {
    switch (config.brandColor) {
      case 'mumu-pink':
        return {
          primary: 'bg-[#f06282] hover:bg-[#e04f71] text-white shadow-sm',
          accent: 'text-[#e6476b] dark:text-[#f87895]',
          border: 'border-[#fba5b7]/50',
          bgLight: 'bg-[#fff0f4] text-[#cf3559] dark:bg-rose-950/40 dark:text-rose-300',
          focus: 'focus:border-[#f06282]',
        };
      case 'emerald':
        return {
          primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          accent: 'text-emerald-500',
          border: 'border-emerald-500/30',
          bgLight: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
          focus: 'focus:border-emerald-500',
        };
      case 'amber':
        return {
          primary: 'bg-amber-600 hover:bg-amber-700 text-white',
          accent: 'text-amber-500',
          border: 'border-amber-500/30',
          bgLight: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
          focus: 'focus:border-amber-500',
        };
      case 'rose':
        return {
          primary: 'bg-rose-600 hover:bg-rose-700 text-white',
          accent: 'text-rose-500',
          border: 'border-rose-500/30',
          bgLight: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
          focus: 'focus:border-rose-500',
        };
      case 'cyan':
        return {
          primary: 'bg-cyan-600 hover:bg-cyan-700 text-white',
          accent: 'text-cyan-500',
          border: 'border-cyan-500/30',
          bgLight: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
          focus: 'focus:border-cyan-500',
        };
      case 'slate':
        return {
          primary: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
          accent: 'text-slate-900 dark:text-white',
          border: 'border-slate-300 dark:border-slate-700',
          bgLight: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
          focus: 'focus:border-slate-500',
        };
      case 'indigo':
      default:
        return {
          primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          accent: 'text-indigo-400',
          border: 'border-indigo-500/30',
          bgLight: 'bg-indigo-500/10 text-indigo-400',
          focus: 'focus:border-indigo-500',
        };
    }
  };

  const brand = getBrandClasses();
  const isDark = config.theme === 'dark';

  const fontClass = 
    config.fontStyle === 'editorial-serif' 
      ? 'font-serif' 
      : config.fontStyle === 'clean-mono' 
        ? 'font-mono' 
        : 'font-sans';

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setCartSuccessMessage(`¡${product.name} añadido a tu Canasta Familiar!`);
    setTimeout(() => {
      setCartSuccessMessage(null);
    }, 2800);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactData({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
        favoriteProducts: ['Leche Entera Pasteurizada', 'Yogurt de Fresa', 'Queso Panela'],
      });
      setCartItems([]);
    }, 4500);
  };

  return (
    <div className={`w-full min-h-full transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} ${fontClass}`}>
      
      {/* Top Notification Toast for Cart */}
      {cartSuccessMessage && (
        <div className={`fixed top-20 right-6 z-50 ${brand.primary} px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce`}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{cartSuccessMessage}</span>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark + Logo), Zone 2 (Nav links), Zone 3 (1 Primary CTA + Cart) */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${isDark ? 'bg-slate-950/90 border-slate-800/80' : 'bg-white/95 border-[#fba5b7]/40 shadow-xs'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark with official logo */}
          <a href="#" className={`text-2xl font-black tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {config.logoUrl && (
              <img 
                src={config.logoUrl} 
                alt={`${config.name} Logo`} 
                className="w-10 h-10 object-contain rounded-xl border border-[#fba5b7]/50 shadow-xs shrink-0 bg-[#fff5f7]" 
              />
            )}
            <span className="tracking-tight">{config.name}</span>
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {config.navigation.map((item) => (
              <a 
                key={item.id} 
                href={item.href} 
                className={`transition-colors whitespace-nowrap shrink-0 hover:underline ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#f06282]'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action and interactive cart button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Canasta Familiar Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-lg border transition-colors flex items-center gap-2 text-xs font-semibold ${
                isDark 
                  ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800' 
                  : 'border-[#fba5b7]/40 bg-[#fff0f4] text-[#cf3559] hover:bg-[#ffe6ec]'
              }`}
              title="Ver Canasta Familiar"
            >
              <ShoppingBag className={`w-4 h-4 ${brand.accent}`} />
              <span className="hidden sm:inline">Canasta</span>
              {totalCartCount > 0 && (
                <span className={`w-5 h-5 rounded-full ${brand.primary} text-white font-mono text-[11px] flex items-center justify-center font-bold`}>
                  {totalCartCount}
                </span>
              )}
            </button>

            <a
              href="#contacto"
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 ${brand.primary}`}
            >
              {config.hero.primaryCta}
            </a>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg md:hidden ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-3 pb-6 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex flex-col gap-3">
              {config.navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm py-1.5 font-medium ${isDark ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        {config.activeSections.hero && (
          <section className="relative overflow-hidden pt-10 pb-16 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  {/* Unboxed notice/category metadata */}
                  {config.hero.noticeText && (
                    <div className={`text-xs font-medium tracking-wide flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {config.logoUrl && (
                        <img 
                          src={config.logoUrl} 
                          alt="Mu-Mu" 
                          className="w-5 h-5 object-contain rounded-full border border-[#fba5b7] shrink-0 bg-[#fff5f7]" 
                        />
                      )}
                      <span className="font-semibold">{config.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className={`${brand.accent} font-semibold`}>{config.hero.noticeText}</span>
                    </div>
                  )}

                  <h1 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.14] ${isDark ? 'text-white' : 'text-slate-900'}`}
                    style={{ textWrap: 'balance' }}
                  >
                    {config.hero.title}
                  </h1>

                  <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {config.hero.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#productos"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all shadow-md whitespace-nowrap shrink-0 ${brand.primary}`}
                    >
                      <span>{config.hero.primaryCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    {config.hero.secondaryCta && (
                      <a
                        href="#contacto"
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap shrink-0 ${
                          isDark 
                            ? 'border-slate-700 text-slate-200 hover:bg-slate-900' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {config.hero.secondaryCta}
                      </a>
                    )}
                  </div>

                  {/* Trust markers */}
                  <div className={`pt-4 border-t flex flex-wrap items-center gap-6 text-xs ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <div className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${brand.accent} shrink-0`} />
                      <span>Pasteurización suave de alta calidad</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${brand.accent} shrink-0`} />
                      <span>Fresas y leche 100% naturales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${brand.accent} shrink-0`} />
                      <span>Hecho para el bienestar familiar</span>
                    </div>
                  </div>
                </div>

                {/* Hero Image Container with zero-broken-image fallback */}
                <div className="lg:col-span-5">
                  <div className={`relative rounded-2xl overflow-hidden shadow-2xl border aspect-[16/10] ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-100'}`}>
                    <img 
                      src={config.hero.heroImage} 
                      alt="Familia disfrutando lácteos Mu-Mu"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-xs text-white/95 font-medium flex items-center justify-between">
                      <span>{config.tagline}</span>
                      <span className={`${brand.primary} text-white px-2 py-0.5 rounded text-[10px] font-bold`}>100% Campo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* METRICS / NUTRITION & IMPACT ROW */}
        {config.activeSections.metrics && config.metrics && config.metrics.length > 0 && (
          <section id="metricas" className={`py-12 border-y ${isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {config.metrics.map((metric) => (
                  <div key={metric.id} className="space-y-1">
                    <p className={`text-3xl md:text-4xl font-extrabold tracking-tight font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {metric.value}
                    </p>
                    <p className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {metric.label}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {metric.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PRODUCTS SHOWCASE SECTION (LECHE ENTERA, YOGURT DE FRESA, QUESO PANELA) */}
        {config.products && config.products.length > 0 && (
          <section id="productos" className="py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <div className={`text-xs font-semibold tracking-wider uppercase mb-2 ${brand.accent}`}>
                  Nuestra Familia de Productos
                </div>
                <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Nutrición Fresca para Tu Hogar
                </h2>
                <p className={`mt-3 text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Tres pilares esenciales para tus desayunos, meriendas y comidas. Elaborados diariamente con la pureza y frescura del campo mexicano.
                </p>
              </div>

              {/* 3-Column Responsive Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {config.products.map((product) => (
                  <div
                    key={product.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Product Image Container */}
                    <div>
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain p-2 bg-white dark:bg-slate-900 transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {product.badge && (
                          <div className={`absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs ${brand.accent} text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-[#fba5b7]/40`}>
                            {product.badge}
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                          {product.format}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {product.category}
                          </div>
                          <h3 className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {product.name}
                          </h3>
                        </div>

                        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {product.description}
                        </p>

                        {product.idealFor && (
                          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>Ideal para:</strong> {product.idealFor}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Price & Add to Cart button */}
                    <div className={`p-6 pt-0 border-t mt-4 flex items-center justify-between gap-4 ${
                      isDark ? 'border-slate-800/80' : 'border-slate-100'
                    }`}>
                      <div className="pt-4">
                        <span className="text-xs text-slate-400 block">Precio sugerido</span>
                        <span className={`text-2xl font-black font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          ${product.price} <span className="text-xs font-normal text-slate-500">MXN</span>
                        </span>
                      </div>

                      <div className="pt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const dsMap: Record<string, string> = {
                              'p-leche': 'ds-leche',
                              'p-yogurt': 'ds-yogurt',
                              'p-queso': 'ds-queso',
                              'leche-entera': 'ds-leche',
                              'yogurt-fresa': 'ds-yogurt',
                              'queso-panela': 'ds-queso',
                            };
                            if (dsMap[product.id]) {
                              setSelectedDataSheetId(dsMap[product.id]);
                            }
                            const el = document.getElementById('fichas-tecnicas');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          title="Consultar Ficha Técnica Oficial"
                          className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-[#f06282] hover:border-[#fba5b7] transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#f06282]" />
                          <span className="hidden sm:inline">Ficha</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm ${brand.primary}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Añadir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PILLARS OF QUALITY / WHY CHOOSE MU-MU */}
        {config.activeSections.services && config.services && config.services.length > 0 && (
          <section id="servicios" className={`py-20 md:py-24 border-t ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <div className={`text-xs font-semibold tracking-wider uppercase mb-2 ${brand.accent}`}>
                  Compromiso Mu-Mu
                </div>
                <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ¿Por qué las familias eligen Mu-Mu?
                </h2>
                <p className={`mt-3 text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Cuidamos cada eslabón de la cadena productiva con estándares de inocuidad y respeto por la naturaleza.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {config.services.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-6 sm:p-8 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark 
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.title}
                      </h3>
                      {item.price && (
                        <span className={`text-sm font-mono tabular-nums font-semibold shrink-0 ${brand.accent}`}>
                          {item.price}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {item.description}
                    </p>
                    {item.category && (
                      <div className={`mt-4 pt-3 border-t text-xs font-medium ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
                        Pilar: {item.category}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RECIPES SECTION (RECETAS FAMILIARES) */}
        {config.recipes && config.recipes.length > 0 && (
          <section id="recetas" className="py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <div className={`text-xs font-semibold tracking-wider uppercase mb-2 ${brand.accent}`}>
                    Cocina en Familia
                  </div>
                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Recetas Rápidas con el Toque Mu-Mu
                  </h2>
                  <p className={`mt-3 text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Ideas deliciosas y fáciles de preparar en menos de 15 minutos para consentir a quienes más amas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className={`p-6 rounded-2xl border flex flex-col justify-between ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{recipe.prepTime}</span>
                        </span>
                        <span>{recipe.servings}</span>
                      </div>

                      <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {recipe.title}
                      </h3>

                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                        Con {recipe.productUsed}
                      </div>

                      <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {recipe.description}
                      </p>

                      <div className="border-t pt-4 border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-bold mb-2 text-slate-700 dark:text-slate-300">
                          Ingredientes necesarios:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">·</span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href="#contacto"
                        className={`text-xs font-semibold inline-flex items-center gap-1.5 ${brand.accent} hover:underline`}
                      >
                        <span>Pedir ingredientes Mu-Mu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DATA SHEETS SECTION (FICHAS TÉCNICAS OFICIALES) */}
        {config.activeSections.dataSheets && config.dataSheets && config.dataSheets.length > 0 && (() => {
          const activeDS = config.dataSheets.find(ds => ds.id === selectedDataSheetId) || config.dataSheets[0];
          return (
            <section id="fichas-tecnicas" className={`py-20 md:py-24 border-t ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#f06282]" />
                      <span className={`text-xs font-semibold tracking-wider uppercase ${brand.accent}`}>
                        Calidad e Inocuidad Alimentaria
                      </span>
                    </div>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Fichas Técnicas Oficiales
                    </h2>
                    <p className={`mt-3 text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Conoce las especificaciones físico-químicas, microbiológicas y sensoriales de nuestros alimentos lácteos. Documentación técnica para distribuidores, profesionales gastronómicos y familias exigentes.
                    </p>
                  </div>

                  {/* Direct PDF Download & View buttons for active selection */}
                  <div className="shrink-0 flex flex-wrap items-center gap-2.5">
                    <a
                      href={activeDS.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        isDark
                          ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4 text-[#f06282]" />
                      <span>Ver Ficha ({activeDS.code})</span>
                    </a>
                    <a
                      href={activeDS.pdfUrl.split('#')[0]}
                      download="Fichas_Tecnicas_MU-MU.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${brand.primary}`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar PDF Completo</span>
                    </a>
                  </div>
                </div>

                {/* Tabs to switch products */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                  {config.dataSheets.map((ds) => {
                    const isSelected = ds.id === activeDS.id;
                    return (
                      <button
                        key={ds.id}
                        type="button"
                        onClick={() => setSelectedDataSheetId(ds.id)}
                        className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#f06282] text-white shadow-sm'
                            : isDark
                              ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        <FileText className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#f06282]'}`} />
                        <span>{ds.productName}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {ds.code}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Data Sheet Detail Container */}
                <div className={`rounded-2xl border overflow-hidden shadow-xs ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  {/* Document Header Bar */}
                  <div className={`p-6 sm:p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-[#fff5f7] border-[#fba5b7]/30'
                  }`}>
                    <div className="flex items-center gap-5">
                      {activeDS.imageUrl && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={activeDS.imageUrl}
                            alt={activeDS.productName}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                            {activeDS.code}
                          </span>
                          <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {activeDS.revision} · {activeDS.revisionDate}
                          </span>
                          {activeDS.category && (
                            <>
                              <span className="text-xs text-slate-400">·</span>
                              <span className={`text-xs font-semibold ${brand.accent}`}>
                                {activeDS.category}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {activeDS.productName}
                        </h3>
                        {activeDS.description && (
                          <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            {activeDS.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
                      <a
                        href={activeDS.pdfUrl.split('#')[0]}
                        download="Fichas_Tecnicas_MU-MU.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#f06282] hover:bg-[#e04f71] text-white transition-all shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar PDF</span>
                      </a>
                      <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Documento oficial emitido por Mu-Mu Lácteos
                      </span>
                    </div>
                  </div>

                  {/* Basic Logistics & Shelf life bar */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-b text-xs ${
                    isDark ? 'border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800' : 'border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50/50'
                  }`}>
                    <div className="p-4 sm:p-5">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block mb-1">
                        Presentación Oficial
                      </span>
                      <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {activeDS.presentation}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block mb-1">
                        Revisión de Control
                      </span>
                      <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {activeDS.revision} ({activeDS.revisionDate})
                      </span>
                    </div>
                    <div className="p-4 sm:p-5 sm:col-span-2 lg:col-span-1">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block mb-1">
                        Condiciones de Almacenamiento
                      </span>
                      <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {activeDS.storage.map(s => `${s.condition}: ${s.specification}`).join(' · ')}
                      </span>
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="p-6 sm:p-8 space-y-8">
                    {/* Optional Ingredients Section (e.g., Strawberry Drinking Yogurt) */}
                    {activeDS.ingredients && (
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                          <FileText className="w-4 h-4 text-[#f06282]" />
                          <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Ingredientes Declarados
                          </h4>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {activeDS.ingredients}
                        </p>
                      </div>
                    )}

                    {/* Row 1: Organoleptic & Microbiological */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Características Organolépticas */}
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                          <Sparkles className="w-4 h-4 text-[#f06282]" />
                          <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Características Organolépticas
                          </h4>
                        </div>
                        <dl className="space-y-2.5 text-xs">
                          {activeDS.organoleptic.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1 border-b border-slate-100 dark:border-slate-850 last:border-none">
                              <dt className={`font-bold min-w-28 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                {item.characteristic}
                              </dt>
                              <dd className={`sm:text-right ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {item.specification}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {/* Criterios Microbiológicos */}
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Criterios Microbiológicos (Inocuidad)
                          </h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                                <th className="pb-2 font-semibold">Requisito / Ensayo</th>
                                <th className="pb-2 font-semibold text-right">Especificación</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                              {activeDS.microbiological.map((m, idx) => (
                                <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                                  <td className={`py-2 pr-3 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {m.requirement}
                                  </td>
                                  <td className={`py-2 pl-3 text-right font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                                    {m.specification}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Physicochemical & Nutritional Specs */}
                    <div className={`p-5 rounded-xl border ${
                      isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                        <FileText className="w-4 h-4 text-[#f06282]" />
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Características Fisicoquímicas y Nutrimentales
                        </h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                              <th className="pb-2 font-semibold">
                                {activeDS.physicochemicalHeaders?.[0] || 'Requisito'}
                              </th>
                              <th className="pb-2 font-semibold text-right">
                                {activeDS.physicochemicalHeaders?.[1] || 'Mínimo'}
                              </th>
                              <th className="pb-2 font-semibold text-right">
                                {activeDS.physicochemicalHeaders?.[2] || 'Máximo'}
                              </th>
                              {activeDS.physicochemical.some(p => p.unit) && (
                                <th className="pb-2 font-semibold text-right">Unidad</th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-850 tabular-nums">
                            {activeDS.physicochemical.map((p, idx) => (
                              <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                                <td className={`py-2 pr-4 font-sans font-medium text-left ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  {p.requirement}
                                </td>
                                <td className={`py-2 px-3 text-right font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  {p.min}
                                </td>
                                <td className={`py-2 px-3 text-right ${
                                  activeDS.physicochemicalHeaders?.[2] === 'Notas' ? 'font-sans text-slate-500 dark:text-slate-400' : 'font-mono text-slate-700 dark:text-slate-300'
                                }`}>
                                  {p.max}
                                </td>
                                {activeDS.physicochemical.some(item => item.unit) && (
                                  <td className="py-2 pl-3 text-right text-slate-400 font-sans">
                                    {p.unit || ''}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Row 3: Notes & Applicable Regulations */}
                    {(activeDS.notes || (activeDS.regulations && activeDS.regulations.length > 0)) && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {activeDS.notes && (
                          <div className={`p-4 sm:p-5 rounded-xl border ${
                            isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}>
                            <span className="text-[11px] font-bold uppercase tracking-wider block mb-1.5 text-slate-500 dark:text-slate-400">
                              Notas de Calidad y Formulación
                            </span>
                            <p className="text-xs italic leading-relaxed">{activeDS.notes}</p>
                          </div>
                        )}
                        {activeDS.regulations && activeDS.regulations.length > 0 && (
                          <div className={`p-4 sm:p-5 rounded-xl border ${
                            isDark ? 'bg-rose-950/20 border-rose-900/40 text-rose-200' : 'bg-[#fff5f7] border-[#fba5b7]/50 text-slate-800'
                          }`}>
                            <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${brand.accent}`}>
                              Normatividad Aplicable
                            </span>
                            <ul className="space-y-1.5 text-xs">
                              {activeDS.regulations.map((reg, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2">
                                  <span className="text-[#f06282] font-bold">·</span>
                                  <span>{reg}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Row 4: Allergens and Certifications */}
                    <div className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isDark ? 'bg-amber-950/20 border-amber-900/40 text-amber-200' : 'bg-amber-50 border-amber-200/80 text-amber-900'
                    }`}>
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold block uppercase tracking-wider">Declaración de Alérgenos</span>
                          <span className="text-xs leading-relaxed">{activeDS.allergens}</span>
                        </div>
                      </div>
                      <a
                        href="#contacto"
                        className="shrink-0 text-xs font-bold underline hover:opacity-80 transition-opacity"
                      >
                        Solicitar ficha para licitación o maquila &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* WHOLESALE & LOGISTICS SECTION (VENTAS A MAYOREO Y LOGÍSTICA) */}
        {config.activeSections.wholesale && config.wholesale && (
          <section id="mayoreo" className={`py-20 md:py-24 border-t ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <Building2 className="w-4 h-4 text-[#f06282]" />
                    <span className={`text-xs font-semibold tracking-wider uppercase ${brand.accent}`}>
                      Canal Comercial B2B · {config.wholesale.companyName}
                    </span>
                  </div>
                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {config.wholesale.heading}
                  </h2>
                  <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {config.wholesale.intro}
                  </p>
                </div>

                <div className="shrink-0 flex flex-wrap items-center gap-2.5">
                  <a
                    href={config.wholesale.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      isDark
                        ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 text-[#f06282]" />
                    <span>Ver Propuesta PDF</span>
                  </a>
                  <a
                    href={config.wholesale.pdfUrl}
                    download="Ventas_a_Mayoreo_y_Logistica_MU-MU.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${brand.primary}`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar PDF Mayoreo</span>
                  </a>
                </div>
              </div>

              {/* Part 1: Benefits + Wholesale Pricing Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Commercial Benefits */}
                <div className={`lg:col-span-6 p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-[#fff5f7] border-[#fba5b7]/40'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#f06282]" />
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Beneficios para Clientes Comerciales
                    </h3>
                  </div>
                  <p className={`text-xs mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Alianzas estratégicas para supermercados, tiendas de autoservicio, distribuidores, restaurantes y empresas comercializadoras.
                  </p>
                  <ul className="space-y-3">
                    {config.wholesale.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#f06282] shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Wholesale Pricing Table */}
                <div className={`lg:col-span-6 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Precios Preferenciales de Mayoreo
                      </h3>
                      <span className="text-[11px] font-mono font-semibold text-slate-500">MXN / unidad</span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className={`${isDark ? 'bg-slate-950 text-slate-300 border-b border-slate-800' : 'bg-[#fff0f4] text-slate-800 border-b border-[#fba5b7]/40'}`}>
                            <th className="py-3 px-4 font-bold">Producto</th>
                            <th className="py-3 px-4 font-bold text-right">Público general</th>
                            <th className="py-3 px-4 font-bold text-right text-[#e6476b] dark:text-[#f87895]">Mayoreo</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono tabular-nums">
                          {config.wholesale.pricing.map((row, idx) => (
                            <tr key={idx} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                              <td className={`py-3.5 px-4 font-sans font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                {row.product}
                              </td>
                              <td className="py-3.5 px-4 text-right text-slate-500">
                                {row.retailPrice}
                              </td>
                              <td className={`py-3.5 px-4 text-right font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                {row.wholesalePrice}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-xs">
                    <p className={`italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {config.wholesale.pricingDisclaimer}
                    </p>
                    <div className={`p-3 rounded-lg border ${
                      isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <strong className={isDark ? 'text-white' : 'text-slate-800'}>Nota comercial: </strong>
                      {config.wholesale.commercialNote}
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Interactive Logistics, Packaging & Requirements Panel */}
              <div className={`rounded-2xl border overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className={`p-4 sm:p-6 border-b flex flex-wrap gap-2 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  {[
                    { id: 'empaque' as const, label: 'Empaque, Embalaje y Tarimas', icon: Boxes },
                    { id: 'logistica' as const, label: 'Transporte, FEFO y Entrega', icon: Truck },
                    { id: 'requisitos' as const, label: 'Requisitos y Contacto B2B', icon: ClipboardList },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = wholesaleLogisticsTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setWholesaleLogisticsTab(tab.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          active
                            ? 'bg-[#f06282] text-white shadow-sm'
                            : isDark
                              ? 'bg-slate-800 text-slate-300 hover:text-white'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8">
                  {wholesaleLogisticsTab === 'empaque' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#f06282]" />
                          <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {config.wholesale.packagingProposal.title}
                          </h4>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                          <table className="w-full text-left text-xs sm:text-sm">
                            <thead>
                              <tr className={isDark ? 'bg-slate-950 text-slate-300 border-b border-slate-800' : 'bg-[#fff0f4] text-slate-800 border-b border-[#fba5b7]/40'}>
                                <th className="py-2.5 px-4 font-bold">Característica</th>
                                <th className="py-2.5 px-4 font-bold text-right">Especificación propuesta</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {config.wholesale.packagingProposal.specs.map((spec, idx) => (
                                <tr key={idx}>
                                  <td className={`py-2.5 px-4 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {spec.label}
                                  </td>
                                  <td className={`py-2.5 px-4 text-right font-mono font-semibold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {spec.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {config.wholesale.packagingProposal.description}
                        </p>
                        <p className="text-[11px] italic text-slate-500">
                          {config.wholesale.packagingProposal.academicNote}
                        </p>
                      </div>

                      <div className={`lg:col-span-5 p-5 rounded-xl border ${
                        isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Identificación de Tarimas (Etiqueta)
                        </h4>
                        <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Cada tarima deberá contar con una etiqueta legible que incluya:
                        </p>
                        <ul className="space-y-2 text-xs">
                          {config.wholesale.palletIdentification.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#f06282] font-bold">·</span>
                              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {wholesaleLogisticsTab === 'logistica' && (
                    <div className="space-y-6">
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {config.wholesale.logistics.intro}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`p-5 rounded-xl border ${
                          isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Condiciones Logísticas y Sistema FEFO
                          </h4>
                          <ul className="space-y-2.5 text-xs sm:text-sm">
                            {config.wholesale.logistics.conditions.map((cond, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{cond}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`p-5 rounded-xl border ${
                          isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Documentación de Entrega
                          </h4>
                          <ul className="space-y-2.5 text-xs sm:text-sm">
                            {config.wholesale.logistics.deliveryDocs.map((doc, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <FileText className="w-4 h-4 text-[#f06282] shrink-0 mt-0.5" />
                                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {wholesaleLogisticsTab === 'requisitos' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Requisitos para Clientes Mayoristas
                        </h4>
                        <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Para iniciar una relación comercial con MU-MU, los clientes deberán proporcionar:
                        </p>
                        <ol className="space-y-2 text-xs sm:text-sm list-decimal list-inside">
                          {config.wholesale.requirements.map((req, idx) => (
                            <li key={idx} className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                              {req}
                            </li>
                          ))}
                        </ol>
                        <p className={`mt-4 pt-3 border-t text-xs font-medium ${
                          isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'
                        }`}>
                          {config.wholesale.requirementsFooter}
                        </p>
                      </div>

                      <div className={`p-5 rounded-xl border ${
                        isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-[#fff5f7] border-[#fba5b7]/40'
                      }`}>
                        <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Datos Corporativos y Atención Comercial
                        </h4>
                        <dl className="space-y-2.5 text-xs sm:text-sm">
                          <div className="flex justify-between gap-4 py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                            <dt className="font-semibold text-slate-500">Empresa</dt>
                            <dd className={`font-bold text-right ${isDark ? 'text-white' : 'text-slate-900'}`}>{config.wholesale.companyName}</dd>
                          </div>
                          <div className="flex justify-between gap-4 py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                            <dt className="font-semibold text-slate-500">Marca</dt>
                            <dd className={`font-bold text-right ${brand.accent}`}>{config.wholesale.brandName}</dd>
                          </div>
                          <div className="flex justify-between gap-4 py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                            <dt className="font-semibold text-slate-500">Área</dt>
                            <dd className={`text-right ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{config.wholesale.department}</dd>
                          </div>
                          <div className="flex justify-between gap-4 py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                            <dt className="font-semibold text-slate-500">Correo</dt>
                            <dd className={`text-right ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{config.contact.email}</dd>
                          </div>
                          <div className="flex justify-between gap-4 py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                            <dt className="font-semibold text-slate-500">Teléfono</dt>
                            <dd className={`text-right font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{config.contact.phone}</dd>
                          </div>
                          <div className="flex justify-between gap-4 py-1.5">
                            <dt className="font-semibold text-slate-500">Ubicación</dt>
                            <dd className={`text-right max-w-xs ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{config.contact.address}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Part 3: Interactive B2B Enterprise Quote Form ("Solicita una cotización") */}
              <div className={`rounded-2xl border overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`p-6 sm:p-8 border-b ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-[#fff5f7] border-[#fba5b7]/30'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${brand.accent}`}>
                        Formulario de Pedidos Empresariales
                      </span>
                      <h3 className={`text-2xl font-extrabold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Solicita una cotización
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Completa el siguiente formulario para recibir atención comercial y conocer nuestras condiciones de venta a mayoreo.
                      </p>
                    </div>

                    {/* Step indicator tabs */}
                    {!wholesaleSubmitted && (
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: 'empresa' as const, label: 'A. Empresa' },
                          { id: 'entrega' as const, label: 'B. Entrega' },
                          { id: 'pedido' as const, label: 'C. Pedido' },
                          { id: 'condiciones' as const, label: 'D. Condiciones' },
                        ].map((step) => (
                          <button
                            key={step.id}
                            type="button"
                            onClick={() => setWholesaleFormStep(step.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              wholesaleFormStep === step.id
                                ? 'bg-[#f06282] text-white shadow-xs'
                                : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {step.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {wholesaleSubmitted ? (
                    <div className="py-10 text-center space-y-4 max-w-2xl mx-auto">
                      <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                      <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Solicitud Comercial Recibida
                      </h4>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Gracias por tu interés en MU-MU. Hemos recibido tu solicitud comercial. Nuestro equipo de ventas revisará la información proporcionada para preparar una cotización de acuerdo con tus necesidades.
                      </p>
                      <div className={`p-3.5 rounded-xl border text-xs ${
                        isDark ? 'bg-amber-950/20 border-amber-900/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}>
                        <strong>Importante:</strong> enviar una solicitud no representa una confirmación automática de compra.
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setWholesaleSubmitted(false);
                          setWholesaleFormStep('empresa');
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold ${brand.primary}`}
                      >
                        Realizar otra cotización empresarial
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleWholesaleSubmit} className="space-y-6">
                      {/* Step A: Información de la empresa */}
                      {wholesaleFormStep === 'empresa' && (
                        <div className="space-y-4">
                          <h4 className={`text-sm font-bold uppercase tracking-wider pb-2 border-b ${
                            isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
                          }`}>
                            A. Información de la empresa
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-semibold mb-1">Razón social *</label>
                              <input
                                type="text"
                                required
                                placeholder="Ej. Comercializadora del Bajío S.A. de C.V."
                                value={wholesaleForm.razonSocial}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, razonSocial: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Nombre comercial *</label>
                              <input
                                type="text"
                                required
                                placeholder="Ej. Supermercados Centro"
                                value={wholesaleForm.nombreComercial}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, nombreComercial: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">RFC *</label>
                              <input
                                type="text"
                                required
                                placeholder="Ej. CBA980101XYZ"
                                value={wholesaleForm.rfc}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, rfc: e.target.value.toUpperCase() })}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-mono border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Responsable de compras *</label>
                              <input
                                type="text"
                                required
                                placeholder="Nombre completo"
                                value={wholesaleForm.responsableCompras}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, responsableCompras: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Puesto del responsable</label>
                              <input
                                type="text"
                                placeholder="Ej. Gerente de Compras Perecederos"
                                value={wholesaleForm.puestoResponsable}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, puestoResponsable: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Correo electrónico *</label>
                              <input
                                type="email"
                                required
                                placeholder="compras@empresa.com"
                                value={wholesaleForm.correoEmpresa}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, correoEmpresa: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Número telefónico *</label>
                              <input
                                type="tel"
                                required
                                placeholder="Ej. 461 123 4567"
                                value={wholesaleForm.telefonoEmpresa}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, telefonoEmpresa: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold mb-1">Domicilio fiscal *</label>
                              <input
                                type="text"
                                required
                                placeholder="Calle, número, colonia, municipio, estado y C.P."
                                value={wholesaleForm.domicilioFiscal}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, domicilioFiscal: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step B: Información de entrega */}
                      {wholesaleFormStep === 'entrega' && (
                        <div className="space-y-4">
                          <h4 className={`text-sm font-bold uppercase tracking-wider pb-2 border-b ${
                            isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
                          }`}>
                            B. Información de entrega (CEDIS / Sucursal)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-semibold mb-1">Nombre del centro de distribución</label>
                              <input
                                type="text"
                                placeholder="Ej. CEDIS Bajío / Tienda Centro"
                                value={wholesaleForm.centroDistribucion}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, centroDistribucion: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold mb-1">Dirección de entrega</label>
                              <input
                                type="text"
                                placeholder="Dirección completa de recepción de mercancía"
                                value={wholesaleForm.direccionEntrega}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, direccionEntrega: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Ciudad</label>
                              <input
                                type="text"
                                placeholder="Ej. Celaya"
                                value={wholesaleForm.ciudadEntrega}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, ciudadEntrega: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Estado</label>
                              <input
                                type="text"
                                placeholder="Ej. Guanajuato"
                                value={wholesaleForm.estadoEntrega}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, estadoEntrega: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Código postal</label>
                              <input
                                type="text"
                                placeholder="Ej. 38000"
                                value={wholesaleForm.codigoPostalEntrega}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, codigoPostalEntrega: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-mono border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Horario de recepción de mercancía</label>
                              <input
                                type="text"
                                placeholder="Ej. Lunes a Viernes 06:00 - 14:00"
                                value={wholesaleForm.horarioRecepcion}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, horarioRecepcion: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">¿Cuenta con andén de descarga?</label>
                              <select
                                value={wholesaleForm.andenDescarga}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, andenDescarga: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">¿Cuenta con cámaras de refrigeración?</label>
                              <select
                                value={wholesaleForm.camarasRefrigeracion}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, camarasRefrigeracion: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step C: Información del pedido */}
                      {wholesaleFormStep === 'pedido' && (
                        <div className="space-y-4">
                          <h4 className={`text-sm font-bold uppercase tracking-wider pb-2 border-b ${
                            isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
                          }`}>
                            C. Información del pedido
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-semibold mb-1">Producto solicitado</label>
                              <select
                                value={wholesaleForm.productoSolicitado}
                                onChange={(e) => {
                                  const prod = e.target.value;
                                  const defaultPres = prod.includes('Leche')
                                    ? 'Tetra Pak 1 L (Caja con 12 unidades)'
                                    : prod.includes('Yogur')
                                      ? 'Botella 220 g (Caja con 12 unidades)'
                                      : 'Empaque 200 g (Caja con 20 unidades)';
                                  const defaultUnits = prod.includes('Queso') ? '20' : '12';
                                  setWholesaleForm({
                                    ...wholesaleForm,
                                    productoSolicitado: prod,
                                    presentacion: defaultPres,
                                    unidadesPorCaja: defaultUnits,
                                  });
                                }}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              >
                                <option value="Leche 1 L">Leche Entera UHT 1 L ($24.00/u mayoreo)</option>
                                <option value="Yogur Bebible 220 g">Yogur Bebible con Fresa 220 g ($15.00/u mayoreo)</option>
                                <option value="Queso Panela 200 g">Queso Panela 200 g ($31.00/u mayoreo)</option>
                                <option value="Pedido Mixto (Leche / Yogur / Queso)">Pedido Mixto (Leche / Yogur / Queso)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Presentación</label>
                              <input
                                type="text"
                                value={wholesaleForm.presentacion}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, presentacion: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Frecuencia del pedido</label>
                              <select
                                value={wholesaleForm.frecuenciaPedido}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, frecuenciaPedido: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              >
                                <option value="Semanal">Semanal</option>
                                <option value="Quincenal">Quincenal</option>
                                <option value="Mensual">Mensual</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Cantidad de cajas solicitadas</label>
                              <input
                                type="number"
                                min={1}
                                value={wholesaleForm.cantidadCajas}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, cantidadCajas: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-mono border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Unidades por caja</label>
                              <input
                                type="number"
                                min={1}
                                value={wholesaleForm.unidadesPorCaja}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, unidadesPorCaja: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-mono border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Total de unidades calculadas</label>
                              <div className={`w-full px-3 py-2 rounded-lg text-sm font-mono font-bold border ${
                                isDark ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-[#fff5f7] border-[#fba5b7]/50 text-[#e6476b]'
                              }`}>
                                {(Number(wholesaleForm.cantidadCajas || 0) * Number(wholesaleForm.unidadesPorCaja || 0)).toLocaleString('es-MX')} unidades
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Fecha estimada de entrega</label>
                              <input
                                type="date"
                                value={wholesaleForm.fechaEstimadaEntrega}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, fechaEstimadaEntrega: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step D: Condiciones comerciales */}
                      {wholesaleFormStep === 'condiciones' && (
                        <div className="space-y-4">
                          <h4 className={`text-sm font-bold uppercase tracking-wider pb-2 border-b ${
                            isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
                          }`}>
                            D. Condiciones comerciales
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-semibold mb-1">Método de pago solicitado</label>
                              <input
                                type="text"
                                placeholder="Transferencia / Depósito / Crédito"
                                value={wholesaleForm.metodoPago}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, metodoPago: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Plazo de pago solicitado</label>
                              <input
                                type="text"
                                placeholder="Ej. Contado / 15 días / 30 días"
                                value={wholesaleForm.plazoPago}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, plazoPago: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Requiere factura</label>
                              <select
                                value={wholesaleForm.requiereFactura}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, requiereFactura: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-3">
                              <label className="block text-xs font-semibold mb-1">Requisitos especiales de recepción</label>
                              <input
                                type="text"
                                placeholder="Ej. Cita previa, tarima estándar CHEP, emplayado, carta porte, certificados de calidad..."
                                value={wholesaleForm.requisitosEspeciales}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, requisitosEspeciales: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                            <div className="sm:col-span-2 lg:col-span-3">
                              <label className="block text-xs font-semibold mb-1">Observaciones adicionales</label>
                              <textarea
                                rows={2}
                                placeholder="Comentarios adicionales sobre tu pedido o sucursales..."
                                value={wholesaleForm.observacionesAdicionales}
                                onChange={(e) => setWholesaleForm({ ...wholesaleForm, observacionesAdicionales: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Form Action Footer */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {wholesaleFormStep !== 'empresa' && (
                            <button
                              type="button"
                              onClick={() => {
                                const order: ('empresa' | 'entrega' | 'pedido' | 'condiciones')[] = ['empresa', 'entrega', 'pedido', 'condiciones'];
                                const idx = order.indexOf(wholesaleFormStep);
                                if (idx > 0) setWholesaleFormStep(order[idx - 1]);
                              }}
                              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              Anterior
                            </button>
                          )}
                          {wholesaleFormStep !== 'condiciones' && (
                            <button
                              type="button"
                              onClick={() => {
                                const order: ('empresa' | 'entrega' | 'pedido' | 'condiciones')[] = ['empresa', 'entrega', 'pedido', 'condiciones'];
                                const idx = order.indexOf(wholesaleFormStep);
                                if (idx < order.length - 1) setWholesaleFormStep(order[idx + 1]);
                              }}
                              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
                            >
                              Siguiente sección &rarr;
                            </button>
                          )}
                        </div>

                        <button
                          type="submit"
                          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all shadow-md ${brand.primary}`}
                        >
                          Solicitar Cotización
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TESTIMONIALS */}
        {config.activeSections.testimonials && config.testimonials.length > 0 && (
          <section id="testimonios" className={`py-20 md:py-24 border-t ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/80 border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <div className={`text-xs font-semibold tracking-wider uppercase mb-2 ${brand.accent}`}>
                  Familias Mu-Mu
                </div>
                <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Historias y Opiniones desde el Hogar
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {config.testimonials.map((test) => (
                  <div 
                    key={test.id}
                    className={`p-8 rounded-2xl border relative ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <blockquote className={`text-base leading-relaxed italic mb-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      &ldquo;{test.quote}&rdquo;
                    </blockquote>
                    <div className="border-t pt-4 border-slate-200 dark:border-slate-800">
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {test.author}
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span>{test.role}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>{test.company}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ (IF ACTIVE) */}
        {config.activeSections.faq && config.faqs && config.faqs.length > 0 && (
          <section id="faq" className={`py-16 border-t ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Preguntas Frecuentes sobre Nuestros Lácteos
                </h2>
              </div>
              <div className="space-y-4">
                {config.faqs.map((faq) => (
                  <div 
                    key={faq.id}
                    className={`p-5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {faq.question}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT / LOCALIZADOR / PEDIDO FAMILIAR */}
        {config.activeSections.contact && (
          <section id="contacto" className={`py-20 md:py-24 border-t ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/70 border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-6">
                  <div className={`text-xs font-semibold tracking-wider uppercase ${brand.accent}`}>
                    Encuentra o Pide Mu-Mu
                  </div>
                  <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {config.contact.heading}
                  </h2>
                  <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {config.contact.subheading}
                  </p>

                  {/* Mode tabs */}
                  <div className="p-1 bg-slate-200 dark:bg-slate-900 rounded-lg flex gap-1">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                        orderType === 'delivery'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Canasta a Domicilio</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('store')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                        orderType === 'store'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tiendas Cercanas</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className={`w-4 h-4 shrink-0 ${brand.accent}`} />
                      <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{config.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className={`w-4 h-4 shrink-0 ${brand.accent}`} />
                      <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{config.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className={`w-4 h-4 shrink-0 ${brand.accent}`} />
                      <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{config.contact.address}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className={`p-8 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    {formSubmitted ? (
                      <div className="py-12 text-center space-y-4">
                        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          ¡Solicitud recibida con éxito!
                        </h3>
                        <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Nos pondremos en contacto contigo en breve para coordinar la entrega de tus productos Mu-Mu o indicarte la tienda autorizada más cercana a tu hogar.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Nombre y Apellido *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Carmen Treviño"
                              value={contactData.name}
                              onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                              className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors ${
                                isDark 
                                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500' 
                                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Teléfono / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="Ej. 461 123 4567"
                              value={contactData.phone}
                              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                              className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors ${
                                isDark 
                                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500' 
                                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Correo Electrónico
                            </label>
                            <input
                              type="email"
                              placeholder="familia@correo.com"
                              value={contactData.email}
                              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                              className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors ${
                                isDark 
                                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500' 
                                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Ciudad / Región
                            </label>
                            <select
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none ${
                                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            >
                              <option value="Celaya, Guanajuato">Celaya, Guanajuato</option>
                              <option value="Región Laja-Bajío">Región Laja-Bajío</option>
                              <option value="Irapuato y Salamanca">Irapuato y Salamanca</option>
                              <option value="León, Guanajuato">León, Guanajuato</option>
                              <option value="San Miguel de Allende">San Miguel de Allende</option>
                              <option value="Querétaro">Querétaro</option>
                              <option value="Otra Ciudad">Otra Ciudad / Consultar Envío</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {orderType === 'delivery' ? 'Dirección de Entrega y Referencias *' : 'Colonia o Código Postal donde buscas Mu-Mu *'}
                          </label>
                          <textarea
                            rows={2}
                            required
                            placeholder={orderType === 'delivery' ? 'Calle, número, colonia, referencias...' : 'Ej. Colonia Alameda, Las Fuentes o C.P. 38000'}
                            value={contactData.address}
                            onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                            className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors ${
                              isDark 
                                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500' 
                                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                            }`}
                          />
                        </div>

                        {/* Selected products summary */}
                        {cartItems.length > 0 && (
                          <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                            isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                          }`}>
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{totalCartCount} producto(s) en tu canasta</span>
                            </div>
                            <span className="font-bold font-mono text-emerald-600 tabular-nums">
                              Total: ${totalCartPrice} MXN
                            </span>
                          </div>
                        )}

                        <button
                          type="submit"
                          className={`w-full py-3.5 px-6 rounded-lg text-sm font-semibold transition-all shadow-md ${brand.primary}`}
                        >
                          {orderType === 'delivery' ? 'Confirmar Pedido de Canasta Familiar' : 'Consultar Tiendas Más Cercanas'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* CANASTA FAMILIAR SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-md h-full flex flex-col shadow-2xl ${
            isDark ? 'bg-slate-900 text-white border-l border-slate-800' : 'bg-white text-slate-900 border-l border-slate-200'
          }`}>
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {config.logoUrl && (
                  <img 
                    src={config.logoUrl} 
                    alt="Mu-Mu Logo" 
                    className="w-7 h-7 object-contain rounded-lg border border-[#fba5b7]/50 bg-[#fff5f7] shrink-0" 
                  />
                )}
                <h3 className="font-bold text-base">Mi Canasta Familiar Mu-Mu</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Tu canasta aún está vacía
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Agrega leche entera pasteurizada, yogurt de fresa o queso panela para tu familia.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate">{item.product.name}</h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.product.format}</div>
                      <div className={`text-xs font-mono font-bold ${brand.accent} tabular-nums mt-1`}>
                        ${item.product.price} MXN
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, -1)}
                        className="p-1 rounded bg-slate-200 dark:bg-slate-800 hover:opacity-80"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, 1)}
                        className="p-1 rounded bg-slate-200 dark:bg-slate-800 hover:opacity-80"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Subtotal Estimado:</span>
                  <span className={`font-mono ${brand.accent} text-lg tabular-nums`}>
                    ${totalCartPrice} MXN
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    const contactSection = document.getElementById('contacto');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 px-4 rounded-lg ${brand.primary} font-semibold text-xs shadow-md transition-all text-center block`}
                >
                  Proceder con mi Canasta Familiar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUIET FOOTER */}
      <footer className={`py-12 border-t ${isDark ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-[#fff5f7] border-[#fba5b7]/30 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {config.logoUrl && (
              <img 
                src={config.logoUrl} 
                alt={`${config.name} Logo`} 
                className="w-11 h-11 object-contain rounded-xl border border-[#fba5b7]/40 shadow-xs bg-white shrink-0" 
              />
            )}
            <div>
              <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {config.name} Lácteos
              </span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span className="text-xs">Nutrición y amor para la familia mexicana © {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="hover:underline">Aviso de Privacidad</a>
            <a href="#" className="hover:underline">Términos de Compra</a>
            <a href="#" className="hover:underline">Calidad e Inocuidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
