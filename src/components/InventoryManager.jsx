import React, { useState } from 'react';
import { 
  Package, Tag, Check, Edit2, RotateCcw, Eye, 
  CheckCircle2, AlertCircle, Search, SlidersHorizontal, 
  Code, Sparkles, ArrowUpRight, DollarSign, Archive, Clock, Calendar, X,
  Upload, Image as ImageIcon, Plus, Trash2, FileText, Wine, Star, CheckCircle, ArrowRight
} from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';

const COMMON_REGIONS = [
  'Speyside',
  'Highlands',
  'Islands',
  'Islay',
  'Lowlands',
  'Campbeltown'
];

const initialNewProductState = {
  name: '',
  fullName: '',
  region: 'Speyside',
  distillery: '',
  caskNumber: '',
  age: '',
  vintage: '',
  abv: '',
  caskType: '',
  price: '',
  originalPrice: '',
  stock: 150,
  bottlesTotal: 150,
  status: 'available', // 'available' | 'upcoming' | 'soldout'
  releaseDate: '17. September 2026',
  badge: 'Neu erhältlich · Sofort lieferbar',
  intro: '',
  tastingNose: '',
  tastingPalate: '',
  tastingFinish: '',
  image: '',
  cardBg: IMAGES.card_bg_speyside,
  galleryImages: [],
  freeShipping: false
};

export default function InventoryManager({ 
  products, 
  onUpdateProduct, 
  onCreateProduct,
  onDeleteProduct,
  onResetProducts, 
  onNavigateProduct 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [editActiveTab, setEditActiveTab] = useState('general'); // 'general' | 'pricing' | 'sensory' | 'media'
  const [createActiveTab, setCreateActiveTab] = useState('general');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [isCompressingImage, setIsCompressingImage] = useState(false);

  // Edit form state
  const [formState, setFormState] = useState({
    name: '',
    fullName: '',
    region: 'Speyside',
    distillery: '',
    caskNumber: '',
    age: '',
    vintage: '',
    abv: '',
    caskType: '',
    price: 0,
    originalPrice: '',
    stock: 0,
    bottlesTotal: 0,
    status: 'available',
    releaseDate: '17. September 2026',
    badge: '',
    intro: '',
    tastingNose: '',
    tastingPalate: '',
    tastingFinish: '',
    image: '',
    cardBg: IMAGES.card_bg_speyside,
    galleryImages: [],
    freeShipping: false
  });

  // Create form state
  const [newFormState, setNewFormState] = useState(initialNewProductState);

  // Canvas Image Compression helper for ultra-fast, lightweight image storage
  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      if (file.type === 'image/svg+xml') {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = () => resolve('');
        r.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          try {
            const webp = canvas.toDataURL('image/webp', 0.85);
            if (webp && webp.startsWith('data:image/webp')) {
              resolve(webp);
              return;
            }
          } catch (err) {
            // fallback
          }
          const compressed = canvas.toDataURL('image/jpeg', 0.80);
          resolve(compressed);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Add bottle image to gallery
  const handleProductImageUpload = async (file, isCreate = false) => {
    if (!file) return;
    setIsCompressingImage(true);
    try {
      const dataUrl = await compressImageFile(file);
      if (isCreate) {
        setNewFormState(prev => {
          const updated = [...prev.galleryImages, dataUrl];
          return {
            ...prev,
            galleryImages: updated,
            image: prev.image || dataUrl
          };
        });
      } else {
        setFormState(prev => {
          const updated = [...prev.galleryImages, dataUrl];
          return {
            ...prev,
            galleryImages: updated,
            image: prev.image || dataUrl
          };
        });
      }
    } catch (err) {
      console.error('Error compressing image:', err);
    } finally {
      setIsCompressingImage(false);
    }
  };

  // Upload custom tile background
  const handleCardBgUpload = async (file, isCreate = false) => {
    if (!file) return;
    setIsCompressingImage(true);
    try {
      const dataUrl = await compressImageFile(file);
      if (isCreate) {
        setNewFormState(prev => ({ ...prev, cardBg: dataUrl }));
      } else {
        setFormState(prev => ({ ...prev, cardBg: dataUrl }));
      }
    } catch (err) {
      console.error('Error compressing card background image:', err);
    } finally {
      setIsCompressingImage(false);
    }
  };


  // Remove image from gallery
  const handleRemoveGalleryImage = (index, isCreate = false) => {
    if (isCreate) {
      setNewFormState(prev => {
        const updated = prev.galleryImages.filter((_, i) => i !== index);
        const nextPrimary = updated[0] || '';
        return {
          ...prev,
          galleryImages: updated,
          image: nextPrimary
        };
      });
    } else {
      setFormState(prev => {
        const updated = prev.galleryImages.filter((_, i) => i !== index);
        const nextPrimary = updated[0] || '';
        return {
          ...prev,
          galleryImages: updated,
          image: nextPrimary
        };
      });
    }
  };

  // Set selected image as primary cutout bottle (index 0)
  const handleSetPrimaryGalleryImage = (index, isCreate = false) => {
    if (isCreate) {
      setNewFormState(prev => {
        if (index <= 0 || index >= prev.galleryImages.length) return prev;
        const chosen = prev.galleryImages[index];
        const rest = prev.galleryImages.filter((_, i) => i !== index);
        return {
          ...prev,
          galleryImages: [chosen, ...rest],
          image: chosen
        };
      });
    } else {
      setFormState(prev => {
        if (index <= 0 || index >= prev.galleryImages.length) return prev;
        const chosen = prev.galleryImages[index];
        const rest = prev.galleryImages.filter((_, i) => i !== index);
        return {
          ...prev,
          galleryImages: [chosen, ...rest],
          image: chosen
        };
      });
    }
  };

  const handleOpenEdit = (p) => {
    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    const isUpcoming = p.isUpcoming === true;
    let initialStatus = 'available';
    if (isUpcoming) initialStatus = 'upcoming';
    else if (isSoldOut) initialStatus = 'soldout';

    const pReleaseDate = p.releaseDate || '17. September 2026';
    const remaining = p.stock !== undefined ? p.stock : (p.bottlesRemaining !== undefined ? p.bottlesRemaining : (isSoldOut ? 0 : 48));
    const total = p.bottlesTotal || p.bottleCount || remaining || 150;

    const pGallery = Array.isArray(p.galleryImages) && p.galleryImages.length > 0
      ? [...p.galleryImages]
      : [p.cutoutImage || p.image].filter(Boolean);
    const pCardBg = p.cardBg || IMAGES.card_bg_speyside;
    const pPrimaryImage = p.cutoutImage || p.image || pGallery[0] || '';

    setEditingProduct(p);
    setEditActiveTab('general');
    setFormState({
      name: p.name || '',
      fullName: p.fullName || '',
      region: p.region || 'Speyside',
      distillery: p.distillery || '',
      caskNumber: p.caskNumber || '',
      age: p.age || p.ageYears || '',
      vintage: p.vintage || '',
      abv: p.abv || '',
      caskType: p.caskType || '',
      price: p.price,
      originalPrice: p.originalPrice || '',
      stock: remaining,
      bottlesTotal: total,
      status: initialStatus,
      releaseDate: pReleaseDate,
      badge: p.badge || (isUpcoming ? `Release am ${pReleaseDate} · Vorabzugriff` : (isSoldOut ? 'Ausverkauft' : 'Sofort lieferbar')),
      intro: p.intro || '',
      tastingNose: p.tastingNotes?.nose || '',
      tastingPalate: p.tastingNotes?.palate || '',
      tastingFinish: p.tastingNotes?.finish || '',
      image: pPrimaryImage,
      cardBg: pCardBg,
      galleryImages: pGallery,
      freeShipping: !!p.freeShipping
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const numericPrice = parseFloat(formState.price) || editingProduct.price;
    const numericStock = parseInt(formState.stock, 10) || 0;
    const totalBottles = parseInt(formState.bottlesTotal, 10) || editingProduct.bottlesTotal || numericStock;
    const isSoldOut = formState.status === 'soldout' || numericStock === 0;
    const isUpcoming = formState.status === 'upcoming';
    const isAvailable = !isSoldOut && !isUpcoming;
    const releaseDateVal = formState.releaseDate.trim() || '17. September 2026';
    const pricePerLiter = ((numericPrice / 0.7).toFixed(2) + ' € / l').replace('.', ',');

    const validGallery = formState.galleryImages.filter(Boolean);
    const primaryImg = formState.image || validGallery[0] || editingProduct.cutoutImage || editingProduct.image;
    const finalGallery = validGallery.length > 0 ? validGallery : (primaryImg ? [primaryImg] : []);

    const updated = {
      ...editingProduct,
      name: formState.name.trim() || editingProduct.name,
      fullName: formState.fullName.trim() || `${formState.name} ${formState.abv} ${formState.caskType}`.trim(),
      region: formState.region.trim() || editingProduct.region || 'Speyside',
      distillery: formState.distillery.trim() || editingProduct.distillery,
      caskNumber: formState.caskNumber.trim() || editingProduct.caskNumber,
      age: formState.age.trim() || editingProduct.age,
      vintage: formState.vintage.trim() || editingProduct.vintage,
      abv: formState.abv.trim() || editingProduct.abv,
      caskType: formState.caskType.trim() || editingProduct.caskType,
      price: numericPrice,
      originalPrice: formState.originalPrice ? parseFloat(formState.originalPrice) : null,
      pricePerLiter: pricePerLiter,
      stock: numericStock,
      bottlesRemaining: isSoldOut ? 0 : numericStock,
      bottlesTotal: totalBottles,
      bottleCount: `${totalBottles} Flaschen`,
      status: formState.status,
      isAvailable: isAvailable,
      isUpcoming: isUpcoming,
      soldOut: isSoldOut,
      releaseDate: releaseDateVal,
      badge: formState.badge.trim() || (isUpcoming ? `Release am ${releaseDateVal} · Vorabzugriff` : (isSoldOut ? 'Ausverkauft' : 'Sofort lieferbar')),
      freeShipping: !!formState.freeShipping,
      image: primaryImg,
      cutoutImage: primaryImg,
      galleryImages: finalGallery,
      cardBg: formState.cardBg || editingProduct.cardBg || IMAGES.card_bg_speyside,
      intro: formState.intro.trim() || editingProduct.intro,
      tastingNotes: {
        ...(editingProduct.tastingNotes || {}),
        nose: formState.tastingNose.trim() || editingProduct.tastingNotes?.nose || '',
        palate: formState.tastingPalate.trim() || editingProduct.tastingNotes?.palate || '',
        finish: formState.tastingFinish.trim() || editingProduct.tastingNotes?.finish || ''
      }
    };

    onUpdateProduct(updated);
    setEditingProduct(null);
    setSaveSuccessMsg(`"${updated.name}" erfolgreich aktualisiert!`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleSaveNewProduct = (e) => {
    e.preventDefault();
    const numericPrice = parseFloat(newFormState.price) || 109.90;
    const numericStock = parseInt(newFormState.stock, 10) || 100;
    const totalBottles = parseInt(newFormState.bottlesTotal, 10) || numericStock;
    const isSoldOut = newFormState.status === 'soldout' || numericStock === 0;
    const isUpcoming = newFormState.status === 'upcoming';
    const isAvailable = !isSoldOut && !isUpcoming;
    const releaseDateVal = newFormState.releaseDate.trim() || '17. September 2026';
    const pricePerLiter = ((numericPrice / 0.7).toFixed(2) + ' € / l').replace('.', ',');

    const region = newFormState.region.trim() || 'Speyside';
    const regLower = region.toLowerCase();
    let defaultCardBg = IMAGES.card_bg_speyside;
    if (regLower.includes('highland')) defaultCardBg = IMAGES.card_bg_highlands;
    else if (regLower.includes('island') || regLower.includes('islay') || regLower.includes('orkney')) defaultCardBg = IMAGES.card_bg_islands;

    const validGallery = newFormState.galleryImages.filter(Boolean);
    const chosenImage = newFormState.image || validGallery[0] || IMAGES.glenburgie_11_cutout;
    const finalGallery = validGallery.length > 0 ? validGallery : [chosenImage];
    const chosenCardBg = newFormState.cardBg || defaultCardBg;

    const cleanName = newFormState.name.trim() || 'Neuer Single Cask Whisky';
    const slugId = (cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()).replace(/^-+|-+$/g, '');

    const newProduct = {
      id: slugId,
      name: cleanName,
      fullName: newFormState.fullName.trim() || `${cleanName} ${newFormState.abv} ${newFormState.caskType}`.trim(),
      region: region,
      distillery: newFormState.distillery.trim() || `${region} Distillery`,
      distilleryLocation: `${region}, Schottland`,
      age: newFormState.age.trim() || '12 Jahre',
      abv: newFormState.abv.trim() || '54,5% vol.',
      vintage: newFormState.vintage.trim() || `${new Date().getFullYear() - 12} / ${new Date().getFullYear()}`,
      caskType: newFormState.caskType.trim() || 'Oak Barrique',
      caskNumber: newFormState.caskNumber.trim() || `#${Math.floor(100000 + Math.random() * 900000)}`,
      price: numericPrice,
      originalPrice: newFormState.originalPrice ? parseFloat(newFormState.originalPrice) : null,
      pricePerLiter: pricePerLiter,
      isAvailable: isAvailable,
      isUpcoming: isUpcoming,
      isNew: true,
      soldOut: isSoldOut,
      releaseDate: releaseDateVal,
      badge: newFormState.badge.trim() || (isUpcoming ? `Release am ${releaseDateVal} · Vorabzugriff` : (isSoldOut ? 'Ausverkauft' : 'Neu erhältlich · Sofort lieferbar')),
      freeShipping: !!newFormState.freeShipping,
      bottlesTotal: totalBottles,
      bottlesRemaining: isSoldOut ? 0 : numericStock,
      bottleCount: `${totalBottles} Flaschen`,
      stock: numericStock,
      image: chosenImage,
      cutoutImage: chosenImage,
      cardBg: chosenCardBg,
      galleryImages: finalGallery,
      character: ['Single Cask', 'Unchillfiltered', 'Natural Colour', region],
      intro: newFormState.intro.trim() || 'Exklusiver Single Cask Scotch Whisky, handverlesen von Ines Zager. Nativer Alkoholgehalt in Reinkultur.',
      tastingNotes: {
        nose: newFormState.tastingNose.trim() || 'Feine Aromen von getrockneten Früchten, Honig und edler Eiche.',
        palate: newFormState.tastingPalate.trim() || 'Vollmundiger, komplexer Körper mit wärmenden Noten und elegantem Schmelz.',
        finish: newFormState.tastingFinish.trim() || 'Langanhaltend, harmonisch und tiefgründig.'
      },
      history: {
        headline: 'Traditionelle schottische Brennkunst',
        text: 'Handverlesenes Einzelfass aus Schottland, unverfälscht und schonend in rezyklierte Flaschen abgefüllt.',
        image: IMAGES.scotland_distillery
      },
      sustainability: {
        headline: 'Verantwortungsvolle Abfüllung',
        story: 'Abgefüllt in 100% recyceltes Wild Glass mit Naturkorken und umweltfreundlichen Materialien.',
        image: IMAGES.ines_testing
      }
    };

    if (onCreateProduct) {
      onCreateProduct(newProduct);
    } else {
      onUpdateProduct(newProduct);
    }

    setIsCreatingProduct(false);
    setNewFormState(initialNewProductState);
    setSaveSuccessMsg(`Neues Fass "${newProduct.name}" erfolgreich angelegt!`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleDelete = (product) => {
    if (onDeleteProduct) {
      onDeleteProduct(product.id);
      setEditingProduct(null);
      setSaveSuccessMsg(`Fass "${product.name}" wurde gelöscht.`);
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  // Quick Status Toggle directly from table row
  const handleQuickStatusChange = (product, newStatus) => {
    const isUpcoming = newStatus === 'upcoming';
    const isSoldOut = newStatus === 'soldout';
    const isAvailable = newStatus === 'available';
    const releaseDateVal = product.releaseDate || '17. September 2026';
    const remaining = isSoldOut ? 0 : (product.bottlesRemaining > 0 ? product.bottlesRemaining : (product.stock || 48));

    const updated = {
      ...product,
      status: newStatus,
      isAvailable: isAvailable,
      isUpcoming: isUpcoming,
      soldOut: isSoldOut,
      releaseDate: releaseDateVal,
      stock: remaining,
      bottlesRemaining: remaining,
      badge: isUpcoming 
        ? `Release am ${releaseDateVal} · Vorabzugriff` 
        : (isSoldOut ? 'Ausverkauft' : 'Sofort lieferbar')
    };

    onUpdateProduct(updated);
    setSaveSuccessMsg(`Status für "${product.name}" auf "${isAvailable ? 'Sofort lieferbar' : isUpcoming ? `Vorab-Zugriff (ab ${releaseDateVal})` : 'Ausverkauft'}" geändert!`);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.distillery || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.region || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.caskNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    const isUpcoming = p.isUpcoming === true;
    const isAvailable = !isSoldOut && !isUpcoming;

    if (statusFilter === 'available') return isAvailable;
    if (statusFilter === 'upcoming') return isUpcoming;
    if (statusFilter === 'soldout') return isSoldOut;
    return true;
  });

  // KPI Calculations
  const totalCount = products.length;
  const availableCount = products.filter(p => {
    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    const isUpcoming = p.isUpcoming === true;
    return !isSoldOut && !isUpcoming;
  }).length;
  const upcomingCount = products.filter(p => p.isUpcoming === true).length;
  const soldOutCount = products.filter(p => p.soldOut === true || (p.isAvailable === false && !p.isUpcoming)).length;

  return (
    <div className="space-y-6 text-left">
      {/* Success Alert Banner */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-[#E8EFEA] border border-[#C5D8CC] text-[#2D6A4F] flex items-center space-x-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-bold">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Action Bar: Create Product Button + Search & Filters */}
      <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <button
            onClick={() => {
              setNewFormState(initialNewProductState);
              setCreateActiveTab('general');
              setIsCreatingProduct(true);
            }}
            className="px-5 py-3 rounded-xl bg-[#B85D2C] hover:bg-[#9E4C20] text-white font-woodblock text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Neues Fass / Produkt anlegen</span>
          </button>

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#55695E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Fass suchen nach Name, Fassnummer, Destillerie oder Region..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm focus:outline-none focus:border-[#B85D2C] text-[#181F1C]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {[
            { key: 'all', label: `Alle (${totalCount})` },
            { key: 'available', label: `Sofort lieferbar (${availableCount})` },
            { key: 'upcoming', label: `Vorab-Zugriff (${upcomingCount})` },
            { key: 'soldout', label: `Ausverkauft (${soldOutCount})` }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-craft-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === tab.key
                  ? 'bg-[#181F1C] text-white'
                  : 'bg-[#FAF8F5] border border-[#D4C8B8] text-[#55695E] hover:text-[#181F1C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products List (Responsive Desktop Table & Mobile Touch Cards) */}
      <div className="bg-white border border-[#D4C8B8] rounded-3xl overflow-hidden shadow-xs">
        
        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <table className="w-full table-fixed text-left text-sm text-[#181F1C]">
            <thead className="bg-[#FAF8F5] border-b border-[#E2DDD5] text-xs font-craft-mono uppercase text-[#55695E] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-[32%]">Fass / Produkt</th>
                <th className="py-3.5 px-3 w-[15%]">Verkaufspreis</th>
                <th className="py-3.5 px-3 w-[24%]">Status & Release</th>
                <th className="py-3.5 px-3 w-[15%]">Lager / Flaschen</th>
                <th className="py-3.5 px-4 w-[14%] text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD5]">
              {filteredProducts.map((p) => {
                const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
                const isUpcoming = p.isUpcoming === true;
                const releaseDateVal = p.releaseDate || '17. September 2026';
                const remaining = p.stock !== undefined ? p.stock : (p.bottlesRemaining !== undefined ? p.bottlesRemaining : (isSoldOut ? 0 : 48));
                const total = p.bottlesTotal || remaining || 150;

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors group">
                    {/* Bottle thumbnail & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-13 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs relative">
                          {p.cardBg && (
                            <img src={p.cardBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 filter blur-[0.5px]" />
                          )}
                          <img 
                            src={p.cutoutImage || p.image} 
                            alt={p.name} 
                            className="relative z-10 h-full w-full object-contain drop-shadow-sm" 
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-[#181F1C] text-sm sm:text-base group-hover:text-[#B85D2C] transition-colors truncate" title={p.name}>
                            {p.name}
                          </div>
                          <div className="text-[11px] sm:text-xs text-[#55695E] font-craft-mono truncate" title={`${p.distillery} · ${p.region} · ${p.caskNumber || ''}`}>
                            {p.distillery} · {p.region} {p.caskNumber ? `· ${p.caskNumber}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-baseline space-x-1.5 flex-wrap">
                        <span className="font-woodblock text-lg sm:text-xl text-[#181F1C]">
                          {p.price.toFixed(2)} €
                        </span>
                        {p.originalPrice && (
                          <span className="text-[11px] text-stone-400 line-through">
                            {p.originalPrice.toFixed(2)} €
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-[#55695E] block font-craft-mono">
                        {p.pricePerLiter || `${(p.price / 0.7).toFixed(2).replace('.', ',')} € / l`}
                      </span>
                      {p.freeShipping && (
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-[#2D6A4F] font-craft-mono font-bold">
                          Versandfrei
                        </span>
                      )}
                    </td>

                    {/* Status & Release Date Selector */}
                    <td className="py-3.5 px-3">
                      <div className="space-y-1">
                        <select
                          value={isUpcoming ? 'upcoming' : (isSoldOut ? 'soldout' : 'available')}
                          onChange={(e) => handleQuickStatusChange(p, e.target.value)}
                          className={`w-full max-w-[210px] px-2.5 py-1.5 rounded-lg text-xs font-craft-mono font-bold border focus:outline-none transition-all cursor-pointer ${
                            isUpcoming
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : isSoldOut
                              ? 'bg-stone-100 text-stone-700 border-stone-300'
                              : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          }`}
                        >
                          <option value="available">🟢 Sofort lieferbar</option>
                          <option value="upcoming">🟡 Vorab-Zugriff</option>
                          <option value="soldout">⚪ Ausverkauft</option>
                        </select>

                        {isUpcoming && (
                          <div className="text-[10px] text-[#B85D2C] font-craft-mono font-bold flex items-center space-x-1">
                            <Clock className="w-3 h-3 inline shrink-0" />
                            <span className="truncate">ab {releaseDateVal}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Stock & Bottles */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-xs sm:text-sm text-[#181F1C]">
                        {isSoldOut ? (
                          <span className="text-stone-400">0 Flaschen</span>
                        ) : (
                          <span className="text-[#2D6A4F]">{remaining} Flaschen</span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#55695E] block font-craft-mono truncate">
                        von {total} Flaschen
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-[#181F1C] hover:border-[#B85D2C] transition-all shadow-2xs cursor-pointer"
                          title="Fass, Bilder & Notizen bearbeiten"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#B85D2C]" />
                        </button>

                        {onNavigateProduct && (
                          <button
                            onClick={() => onNavigateProduct(p)}
                            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-[#55695E] hover:text-[#181F1C] hover:border-[#B85D2C] transition-all shadow-2xs cursor-pointer"
                            title="Im Shop ansehen"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE TOUCH CARDS */}
        <div className="block md:hidden divide-y divide-[#E2DDD5]">
          {filteredProducts.map((p) => {
            const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
            const isUpcoming = p.isUpcoming === true;
            const releaseDateVal = p.releaseDate || '17. September 2026';
            const remaining = p.stock !== undefined ? p.stock : (p.bottlesRemaining !== undefined ? p.bottlesRemaining : (isSoldOut ? 0 : 48));

            return (
              <div key={p.id} className="p-4 sm:p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-12 h-14 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] p-1 flex items-center justify-center shrink-0 relative overflow-hidden">
                      {p.cardBg && (
                        <img src={p.cardBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 filter blur-[0.5px]" />
                      )}
                      <img src={p.cutoutImage || p.image} alt="" className="relative z-10 h-full w-full object-contain drop-shadow-sm" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-base text-[#181F1C] truncate">{p.name}</h4>
                      <p className="text-xs text-[#55695E] font-craft-mono truncate">{p.distillery} · {p.region}</p>
                      <div className="text-xs text-[#55695E] mt-0.5 font-bold">
                        {isSoldOut ? '0 Flaschen (Ausverkauft)' : `${remaining} Flaschen vorrätig`}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-woodblock text-xl text-[#181F1C] block">
                      {p.price.toFixed(2)} €
                    </span>
                    <span className="text-[10px] text-[#55695E] block font-craft-mono">
                      {p.freeShipping ? 'Versandfrei' : 'inkl. MwSt.'}
                    </span>
                  </div>
                </div>

                {/* Quick Status Dropdown */}
                <div className="space-y-1">
                  <select
                    value={isUpcoming ? 'upcoming' : (isSoldOut ? 'soldout' : 'available')}
                    onChange={(e) => handleQuickStatusChange(p, e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-craft-mono font-bold border focus:outline-none transition-all cursor-pointer ${
                      isUpcoming
                        ? 'bg-amber-50 text-amber-900 border-amber-300'
                        : isSoldOut
                        ? 'bg-stone-100 text-stone-700 border-stone-300'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    }`}
                  >
                    <option value="available">🟢 Sofort lieferbar (Im Shop kaufbar)</option>
                    <option value="upcoming">🟡 Vorab-Zugriff (Release am {releaseDateVal})</option>
                    <option value="soldout">⚪ Ausverkauft (Archiviert)</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] hover:border-[#B85D2C] transition-all flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#B85D2C]" />
                    <span>Bilder & Details bearbeiten</span>
                  </button>

                  {onNavigateProduct && (
                    <button
                      onClick={() => onNavigateProduct(p)}
                      className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-[#55695E] hover:text-[#181F1C] hover:border-[#B85D2C] transition-all shadow-2xs cursor-pointer"
                      title="Im Shop ansehen"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================= */}
      {/* MODAL 1: PRODUKT BEARBEITEN                                    */}
      {/* ============================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-left">
            
            <div className="flex items-start justify-between border-b border-[#E2DDD5] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-14 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] p-1 flex items-center justify-center shrink-0 overflow-hidden relative">
                  {formState.cardBg && (
                    <img src={formState.cardBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 filter blur-[0.5px]" />
                  )}
                  <img src={formState.image || editingProduct.cutoutImage || editingProduct.image} alt="" className="relative z-10 h-full w-full object-contain drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                    {formState.name || editingProduct.name} bearbeiten
                  </h3>
                  <p className="text-xs text-[#55695E] font-craft-mono">
                    ID: {editingProduct.id} · Fass {formState.caskNumber || '–'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="group p-2.5 rounded-full bg-[#FAF8F5] border border-[#D4C8B8] text-stone-500 hover:text-[#181F1C] hover:border-[#B85D2C] hover:bg-white transition-all duration-300 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                title="Schließen"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center space-x-2 border-b border-[#E2DDD5] pb-2 overflow-x-auto">
              {[
                { id: 'general', label: '1. Stammdaten & Fass' },
                { id: 'pricing', label: '2. Preis, Lager & Versand' },
                { id: 'sensory', label: '3. Tasting Notes' },
                { id: 'media', label: `4. Flaschenbilder & Kachel-Hintergrund (${formState.galleryImages?.length || 1})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-craft-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    editActiveTab === tab.id
                      ? 'bg-[#B85D2C] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#55695E] hover:text-[#181F1C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-6">
              
              {/* TAB 1: STAMMDATEN & FASS */}
              {editActiveTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Produktname *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="z.B. Glenburgie 11 Jahre"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Region *
                      </label>
                      <div className="flex space-x-2">
                        <select
                          value={COMMON_REGIONS.includes(formState.region) ? formState.region : 'custom'}
                          onChange={(e) => {
                            if (e.target.value !== 'custom') {
                              setFormState({ ...formState, region: e.target.value });
                            }
                          }}
                          className="w-1/2 px-3 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-xs font-craft-mono text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                        >
                          {COMMON_REGIONS.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                          <option value="custom">Freitext...</option>
                        </select>
                        <input
                          type="text"
                          value={formState.region}
                          onChange={(e) => setFormState({ ...formState, region: e.target.value })}
                          placeholder="Region"
                          className="w-1/2 px-3 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-xs text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Destillerie / Brennerei
                      </label>
                      <input
                        type="text"
                        value={formState.distillery}
                        onChange={(e) => setFormState({ ...formState, distillery: e.target.value })}
                        placeholder="z.B. Glenburgie Distillery"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Fassnummer
                      </label>
                      <input
                        type="text"
                        value={formState.caskNumber}
                        onChange={(e) => setFormState({ ...formState, caskNumber: e.target.value })}
                        placeholder="z.B. #Z15/63004"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-craft-mono text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Reifezeit / Alter
                      </label>
                      <input
                        type="text"
                        value={formState.age}
                        onChange={(e) => setFormState({ ...formState, age: e.target.value })}
                        placeholder="z.B. 11 Jahre"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Destillation / Vintage
                      </label>
                      <input
                        type="text"
                        value={formState.vintage}
                        onChange={(e) => setFormState({ ...formState, vintage: e.target.value })}
                        placeholder="z.B. 2015 / 2026"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Alkoholgehalt (ABV)
                      </label>
                      <input
                        type="text"
                        value={formState.abv}
                        onChange={(e) => setFormState({ ...formState, abv: e.target.value })}
                        placeholder="z.B. 59,2% vol."
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                      Fass-Reifung (Cask Type)
                    </label>
                    <input
                      type="text"
                      value={formState.caskType}
                      onChange={(e) => setFormState({ ...formState, caskType: e.target.value })}
                      placeholder="z.B. 1st Fill Oloroso Barrique oder Bourbon Barrel Finish"
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PREIS, LAGER & STATUS */}
              {editActiveTab === 'pricing' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Verkaufspreis (€) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={formState.price}
                          onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                          className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-base font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#55695E] font-bold">
                          €
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Streichpreis (€, optional)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={formState.originalPrice}
                          onChange={(e) => setFormState({ ...formState, originalPrice: e.target.value })}
                          placeholder="z.B. 129.90"
                          className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-base text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#55695E] font-bold">
                          €
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Verfügbarkeits-Status *
                      </label>
                      <select
                        value={formState.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          let autoBadge = formState.badge;
                          if (newStatus === 'upcoming') autoBadge = `Release am ${formState.releaseDate || '17. September 2026'}`;
                          else if (newStatus === 'soldout') autoBadge = 'Ausverkauft';
                          else autoBadge = 'Neu erhältlich · Sofort lieferbar';
                          setFormState({ ...formState, status: newStatus, badge: autoBadge });
                        }}
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      >
                        <option value="available">🟢 Sofort lieferbar (Im Shop kaufbar)</option>
                        <option value="upcoming">🟡 Vorab-Zugriff (Newsletter-Reservierung)</option>
                        <option value="soldout">⚪ Ausverkauft (Archiviert)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Lagerbestand (Flaschen vorrätig)
                      </label>
                      <input
                        type="number"
                        value={formState.stock}
                        onChange={(e) => setFormState({ ...formState, stock: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Gesamtauflage (Flaschen gesamt)
                      </label>
                      <input
                        type="number"
                        value={formState.bottlesTotal}
                        onChange={(e) => setFormState({ ...formState, bottlesTotal: e.target.value })}
                        placeholder="z.B. 309"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Badge-Hinweistext
                      </label>
                      <input
                        type="text"
                        value={formState.badge}
                        onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                        placeholder="z.B. Neu erhältlich · Sofort lieferbar"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border transition-colors ${formState.status === 'upcoming' ? 'bg-amber-50/60 border-amber-300' : 'bg-[#FAF8F5] border-[#D4C8B8]'}`}>
                    <label className="block text-xs font-craft-mono uppercase text-[#181F1C] font-bold mb-1.5 flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B85D2C]" />
                      <span>Freies Release-Datum für Vorabzugriff</span>
                    </label>
                    <input
                      type="text"
                      value={formState.releaseDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormState({ 
                          ...formState, 
                          releaseDate: val,
                          badge: formState.status === 'upcoming' ? `Release am ${val}` : formState.badge
                        });
                      }}
                      placeholder="z.B. 17. September 2026"
                      className="w-full px-4 py-2.5 bg-white border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>

                  {/* VERSANDKOSTEN FÜR DIESES PRODUKT ABWÄHLEN / AKTIVIEREN */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    formState.freeShipping 
                      ? 'bg-emerald-50/60 border-emerald-300' 
                      : 'bg-[#FAF8F5] border-[#D4C8B8]'
                  }`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <label className="text-xs font-craft-mono uppercase text-[#181F1C] font-bold">
                            Versandkosten für dieses Produkt
                          </label>
                          {formState.freeShipping && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#2D6A4F] font-bold">
                              Versand abgewählt (0,00 €)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#55695E]">
                          {formState.freeShipping 
                            ? 'Versand abgewählt: Dieses Produkt ist versandkostenfrei (0,00 €).'
                            : 'Standardversand aktiv: 6,90 € DHL GoGreen mit 18+ Alterssichtprüfung.'}
                        </p>
                      </div>

                      {/* Toggle Switch */}
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={!formState.freeShipping}
                          onChange={(e) => setFormState({ ...formState, freeShipping: !e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#D4C8B8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D4C8B8] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D6A4F]"></div>
                      </label>
                    </div>

                    <div className="text-[11px] text-[#55695E] border-t border-[#E2DDD5]/70 pt-2.5 mt-2.5 flex items-center justify-between">
                      <span>
                        {formState.freeShipping ? (
                          <span className="text-[#2D6A4F] font-medium flex items-center space-x-1">
                            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Versand abgewählt. Enthält der Warenkorb nur versandkostenfreie Produkte, entfallen die 6,90 € an der Kasse.</span>
                          </span>
                        ) : (
                          <span>Schalter umlegen oder Klick rechts, um den Versand für diesen Artikel abzuwählen.</span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormState(prev => ({ ...prev, freeShipping: !prev.freeShipping }))}
                        className="text-xs text-[#B85D2C] hover:text-[#A04E24] underline font-medium cursor-pointer shrink-0 ml-2"
                      >
                        {formState.freeShipping ? 'Versand berechnen' : 'Versand abwählen'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TASTING NOTES */}
              {editActiveTab === 'sensory' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                      Kurzbeschreibung (Intro auf Flaschenseite)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.intro}
                      onChange={(e) => setFormState({ ...formState, intro: e.target.value })}
                      placeholder="Ein eleganter, fruchtbetonter Aultmore..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#B85D2C] font-bold mb-1">
                      01 · Nase (Aroma & Bukett)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.tastingNose}
                      onChange={(e) => setFormState({ ...formState, tastingNose: e.target.value })}
                      placeholder="Nase: Fast pappsüß im ersten Eindruck..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#B85D2C] font-bold mb-1">
                      02 · Gaumen (Körper & Geschmack)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.tastingPalate}
                      onChange={(e) => setFormState({ ...formState, tastingPalate: e.target.value })}
                      placeholder="Gaumen: Cremig und vollmundig..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#B85D2C] font-bold mb-1">
                      03 · Abgang (Nachklang & Tiefe)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.tastingFinish}
                      onChange={(e) => setFormState({ ...formState, tastingFinish: e.target.value })}
                      placeholder="Abgang: Mittellang bis lang, warm und sehr würzig..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: FLASCHENBILDER & KACHEL-HINTERGRUND */}
              {editActiveTab === 'media' && (
                <div className="space-y-8">
                  
                  {/* SUB-SECTION 1: ZUGEORDNETE FLASCHENBILDER & GALERIE */}
                  <div className="space-y-4">
                    <div className="border-b border-[#E2DDD5] pb-2 flex items-center justify-between">
                      <div>
                        <h4 className="font-woodblock text-lg text-[#181F1C] uppercase">
                          Zugeordnete Flaschen- & Galeriebilder
                        </h4>
                        <p className="text-xs text-[#55695E]">
                          Das 1. Bild ist das freigestellte Hauptbild (transparent vor Kachelhintergrund). Sie können hier Bilder löschen, austauschen oder per Klick zum Hauptbild ernennen.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D4C8B8] rounded-lg text-xs font-craft-mono font-bold text-[#55695E]">
                        {formState.galleryImages?.length || 0} Bilder
                      </span>
                    </div>

                    {/* Image Cards Grid */}
                    {formState.galleryImages && formState.galleryImages.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {formState.galleryImages.map((imgUrl, idx) => {
                          const isPrimary = idx === 0;
                          return (
                            <div 
                              key={idx} 
                              className={`relative rounded-2xl border p-2 bg-[#FAF8F5] flex flex-col justify-between group transition-all shadow-xs ${
                                isPrimary ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20' : 'border-[#D4C8B8]'
                              }`}
                            >
                              <div className="h-36 rounded-xl bg-white border border-[#E2DDD5] p-2 flex items-center justify-center overflow-hidden relative">
                                <img 
                                  src={imgUrl} 
                                  alt={`Flaschenbild ${idx + 1}`} 
                                  className="max-h-full max-w-full object-contain drop-shadow-sm" 
                                />
                                {isPrimary ? (
                                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#2D6A4F] text-white text-[10px] font-craft-mono font-bold rounded shadow-xs flex items-center space-x-1">
                                    <Star className="w-3 h-3 fill-white" />
                                    <span>Hauptbild</span>
                                  </span>
                                ) : (
                                  <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-craft-mono rounded">
                                    #{idx + 1}
                                  </span>
                                )}
                              </div>

                              <div className="pt-2 flex items-center justify-between gap-1">
                                {!isPrimary ? (
                                  <button
                                    type="button"
                                    onClick={() => handleSetPrimaryGalleryImage(idx, false)}
                                    className="text-[10px] font-craft-mono font-bold text-[#B85D2C] hover:underline cursor-pointer"
                                    title="Dieses Bild als primäres Freisteller-Flaschenbild setzen"
                                  >
                                    Als Hauptbild
                                  </button>
                                ) : (
                                  <span className="text-[10px] font-craft-mono font-bold text-[#2D6A4F]">
                                    Aktiv im Shop
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleRemoveGalleryImage(idx, false)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                                  title="Bild von dieser Abfüllung löschen"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#D4C8B8] text-center text-xs text-[#55695E]">
                        Aktuell sind keine Bilder für dieses Fass hinterlegt. Laden Sie unten ein Flaschenfoto hoch.
                      </div>
                    )}

                    {/* Add Image Options */}
                    <div className="pt-2">
                      <label className="flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-[#B85D2C]/40 hover:border-[#B85D2C] bg-[#FAF8F5] hover:bg-white transition-all cursor-pointer group shadow-2xs">
                        <Upload className="w-5 h-5 text-[#B85D2C] mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                          <span className="font-woodblock text-xs uppercase tracking-wider text-[#181F1C] group-hover:text-[#B85D2C] transition-colors block">
                            {isCompressingImage ? 'Bild wird optimiert...' : '+ Flaschenfoto vom PC hinzufügen'}
                          </span>
                          <span className="text-[10px] text-[#55695E] block">
                            PNG, JPG, WebP · wird automatisch web-optimiert
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isCompressingImage}
                          onChange={(e) => e.target.files?.[0] && handleProductImageUpload(e.target.files[0], false)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* SUB-SECTION 2: HINTERGRUNDBILD DER BILDER-KACHEL */}
                  <div className="space-y-4 pt-4 border-t border-[#E2DDD5]">
                    <div className="border-b border-[#E2DDD5] pb-2">
                      <h4 className="font-woodblock text-lg text-[#181F1C] uppercase">
                        Hintergrundbild der Bilder-Kachel (Flaschenbühne)
                      </h4>
                      <p className="text-xs text-[#55695E]">
                        Dieses Hintergrundbild steht hinter der transparenten Flasche im Shop und auf der Flaschenseite.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Aktuelles Bild & Live-Vorschau */}
                      <div className="md:col-span-6 space-y-2">
                        <span className="text-xs font-craft-mono uppercase text-[#55695E] font-bold block">
                          Aktuelles Hintergrundbild (Kachel-Bühne):
                        </span>
                        <div className="h-64 rounded-2xl relative flex items-center justify-center overflow-hidden border border-[#D4C8B8] shadow-md bg-neutral-900">
                          {/* Selected Background */}
                          <img
                            src={formState.cardBg || IMAGES.card_bg_speyside}
                            alt="Aktueller Hintergrund"
                            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] blur-[1px] scale-105"
                          />
                          {/* Vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.20)_0%,_transparent_65%)]" />

                          {/* Primary Bottle */}
                          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-3">
                            <img
                              src={formState.image || (formState.galleryImages && formState.galleryImages[0]) || IMAGES.glenburgie_11_cutout}
                              alt=""
                              className="max-h-[85%] max-w-[85%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                            />
                            <div className="w-20 h-3 bg-black/65 rounded-full blur-md -mt-1.5 opacity-80" />
                          </div>
                        </div>
                      </div>

                      {/* Bild wechseln Aktion */}
                      <div className="md:col-span-6 space-y-4">
                        <div>
                          <span className="text-xs font-craft-mono uppercase text-[#181F1C] font-bold block mb-1">
                            Hintergrundbild anpassen
                          </span>
                          <p className="text-xs text-[#55695E] leading-relaxed">
                            Laden Sie ein neues Foto von Ihrem PC hoch, um das aktuelle Hintergrundbild für dieses Fass zu ersetzen.
                          </p>
                        </div>

                        <label className="flex items-center justify-center p-5 rounded-2xl border-2 border-dashed border-[#B85D2C]/40 hover:border-[#B85D2C] bg-[#FAF8F5] hover:bg-white transition-all cursor-pointer group shadow-2xs">
                          <Upload className="w-5 h-5 text-[#B85D2C] mr-3 shrink-0 group-hover:scale-110 transition-transform" />
                          <div className="text-left">
                            <span className="font-woodblock text-sm uppercase tracking-wider text-[#181F1C] group-hover:text-[#B85D2C] transition-colors block">
                              {isCompressingImage ? 'Bild wird optimiert...' : 'Hintergrundbild wechseln'}
                            </span>
                            <span className="text-[11px] text-[#55695E] block pt-0.5">
                              Neues Bild vom PC hochladen (wird automatisch optimiert)
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isCompressingImage}
                            onChange={(e) => e.target.files?.[0] && handleCardBgUpload(e.target.files[0], false)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E2DDD5] flex flex-col sm:flex-row items-center justify-between gap-3">
                {onDeleteProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Möchten Sie "${editingProduct.name}" wirklich unwiderruflich löschen?`)) {
                        handleDelete(editingProduct);
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-craft-mono font-bold text-rose-700 transition-colors flex items-center space-x-1.5 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Fass löschen</span>
                  </button>
                )}

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-xl border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#55695E] hover:text-[#181F1C] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base tracking-wider uppercase transition-all shadow-md flex items-center space-x-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Speichern & Live anwenden</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 2: NEUES FASS / PRODUKT ANLEGEN                          */}
      {/* ============================================================= */}
      {isCreatingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-left">
            
            <div className="flex items-start justify-between border-b border-[#E2DDD5] pb-4">
              <div>
                <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                  Neues Fass / Produkt anlegen
                </h3>
                <p className="text-xs text-[#55695E] font-craft-mono pt-0.5">
                  Neues Einzelfass direkt im Shop und auf der Startseite veröffentlichen
                </p>
              </div>
              <button
                onClick={() => setIsCreatingProduct(false)}
                className="group p-2.5 rounded-full bg-[#FAF8F5] border border-[#D4C8B8] text-stone-500 hover:text-[#181F1C] hover:border-[#B85D2C] hover:bg-white transition-all duration-300 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                title="Schließen"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center space-x-2 border-b border-[#E2DDD5] pb-2 overflow-x-auto">
              {[
                { id: 'general', label: '1. Stammdaten & Fass' },
                { id: 'pricing', label: '2. Preis, Lager & Versand' },
                { id: 'sensory', label: '3. Tasting Notes' },
                { id: 'media', label: `4. Flaschenbilder & Kachel-Hintergrund (${newFormState.galleryImages?.length || 0})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCreateActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-craft-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    createActiveTab === tab.id
                      ? 'bg-[#B85D2C] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#55695E] hover:text-[#181F1C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveNewProduct} className="space-y-6">
              
              {/* TAB 1: STAMMDATEN */}
              {createActiveTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Produktname *
                      </label>
                      <input
                        type="text"
                        required
                        value={newFormState.name}
                        onChange={(e) => setNewFormState({ ...newFormState, name: e.target.value })}
                        placeholder="z.B. Springbank 12 Jahre"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Region *
                      </label>
                      <div className="flex space-x-2">
                        <select
                          value={COMMON_REGIONS.includes(newFormState.region) ? newFormState.region : 'custom'}
                          onChange={(e) => {
                            if (e.target.value !== 'custom') {
                              setNewFormState({ ...newFormState, region: e.target.value });
                            }
                          }}
                          className="w-1/2 px-3 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-xs font-craft-mono text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                        >
                          {COMMON_REGIONS.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                          <option value="custom">Freitext...</option>
                        </select>
                        <input
                          type="text"
                          value={newFormState.region}
                          onChange={(e) => setNewFormState({ ...newFormState, region: e.target.value })}
                          placeholder="Region"
                          className="w-1/2 px-3 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-xs text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Destillerie / Brennerei
                      </label>
                      <input
                        type="text"
                        value={newFormState.distillery}
                        onChange={(e) => setNewFormState({ ...newFormState, distillery: e.target.value })}
                        placeholder="z.B. Springbank Distillery"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Fassnummer
                      </label>
                      <input
                        type="text"
                        value={newFormState.caskNumber}
                        onChange={(e) => setNewFormState({ ...newFormState, caskNumber: e.target.value })}
                        placeholder="z.B. #2024/09"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-craft-mono text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Reifezeit / Alter
                      </label>
                      <input
                        type="text"
                        value={newFormState.age}
                        onChange={(e) => setNewFormState({ ...newFormState, age: e.target.value })}
                        placeholder="z.B. 12 Jahre"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Destillation / Vintage
                      </label>
                      <input
                        type="text"
                        value={newFormState.vintage}
                        onChange={(e) => setNewFormState({ ...newFormState, vintage: e.target.value })}
                        placeholder="z.B. 2014 / 2026"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Alkoholgehalt (ABV)
                      </label>
                      <input
                        type="text"
                        value={newFormState.abv}
                        onChange={(e) => setNewFormState({ ...newFormState, abv: e.target.value })}
                        placeholder="z.B. 55,4% vol."
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                      Fass-Reifung (Cask Type)
                    </label>
                    <input
                      type="text"
                      value={newFormState.caskType}
                      onChange={(e) => setNewFormState({ ...newFormState, caskType: e.target.value })}
                      placeholder="z.B. 1st Fill Sherry Butt oder Pedro Ximenez Finish"
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PREIS & LAGER */}
              {createActiveTab === 'pricing' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Verkaufspreis (€) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newFormState.price}
                          onChange={(e) => setNewFormState({ ...newFormState, price: e.target.value })}
                          placeholder="119.90"
                          className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-base font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#55695E] font-bold">
                          €
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Streichpreis (€, optional)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={newFormState.originalPrice}
                          onChange={(e) => setNewFormState({ ...newFormState, originalPrice: e.target.value })}
                          placeholder="z.B. 139.90"
                          className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-base text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#55695E] font-bold">
                          €
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Verfügbarkeits-Status *
                      </label>
                      <select
                        value={newFormState.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          let autoBadge = newFormState.badge;
                          if (newStatus === 'upcoming') autoBadge = `Release am ${newFormState.releaseDate || '17. September 2026'}`;
                          else if (newStatus === 'soldout') autoBadge = 'Ausverkauft';
                          else autoBadge = 'Neu erhältlich · Sofort lieferbar';
                          setNewFormState({ ...newFormState, status: newStatus, badge: autoBadge });
                        }}
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      >
                        <option value="available">🟢 Sofort lieferbar (Im Shop kaufbar)</option>
                        <option value="upcoming">🟡 Vorab-Zugriff (Newsletter-Reservierung)</option>
                        <option value="soldout">⚪ Ausverkauft (Archiviert)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Lagerbestand (Flaschen vorrätig)
                      </label>
                      <input
                        type="number"
                        value={newFormState.stock}
                        onChange={(e) => setNewFormState({ ...newFormState, stock: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Gesamtauflage (Flaschen gesamt)
                      </label>
                      <input
                        type="number"
                        value={newFormState.bottlesTotal}
                        onChange={(e) => setNewFormState({ ...newFormState, bottlesTotal: e.target.value })}
                        placeholder="z.B. 250"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                        Badge-Hinweistext
                      </label>
                      <input
                        type="text"
                        value={newFormState.badge}
                        onChange={(e) => setNewFormState({ ...newFormState, badge: e.target.value })}
                        placeholder="z.B. Neu erhältlich · Sofort lieferbar"
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border transition-colors ${newFormState.status === 'upcoming' ? 'bg-amber-50/60 border-amber-300' : 'bg-[#FAF8F5] border-[#D4C8B8]'}`}>
                    <label className="block text-xs font-craft-mono uppercase text-[#181F1C] font-bold mb-1.5 flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B85D2C]" />
                      <span>Release-Datum (für Vorabzugriff)</span>
                    </label>
                    <input
                      type="text"
                      value={newFormState.releaseDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewFormState({
                          ...newFormState,
                          releaseDate: val,
                          badge: newFormState.status === 'upcoming' ? `Release am ${val}` : newFormState.badge
                        });
                      }}
                      placeholder="z.B. 17. September 2026"
                      className="w-full px-4 py-2.5 bg-white border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                  </div>

                  {/* VERSANDKOSTEN FÜR NEUES PRODUKT ABWÄHLEN / AKTIVIEREN */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    newFormState.freeShipping 
                      ? 'bg-emerald-50/60 border-emerald-300' 
                      : 'bg-[#FAF8F5] border-[#D4C8B8]'
                  }`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <label className="text-xs font-craft-mono uppercase text-[#181F1C] font-bold">
                            Versandkosten für dieses Produkt
                          </label>
                          {newFormState.freeShipping && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#2D6A4F] font-bold">
                              Versand abgewählt (0,00 €)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#55695E]">
                          {newFormState.freeShipping 
                            ? 'Versand abgewählt: Dieses Produkt ist versandkostenfrei (0,00 €).'
                            : 'Standardversand aktiv: 6,90 € DHL GoGreen mit 18+ Alterssichtprüfung.'}
                        </p>
                      </div>

                      {/* Toggle Switch */}
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={!newFormState.freeShipping}
                          onChange={(e) => setNewFormState({ ...newFormState, freeShipping: !e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#D4C8B8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D4C8B8] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D6A4F]"></div>
                      </label>
                    </div>

                    <div className="text-[11px] text-[#55695E] border-t border-[#E2DDD5]/70 pt-2.5 mt-2.5 flex items-center justify-between">
                      <span>
                        {newFormState.freeShipping ? (
                          <span className="text-[#2D6A4F] font-medium flex items-center space-x-1">
                            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Versand abgewählt. Enthält der Warenkorb nur versandkostenfreie Produkte, entfallen die 6,90 € an der Kasse.</span>
                          </span>
                        ) : (
                          <span>Schalter umlegen oder Klick rechts, um den Versand für diesen Artikel abzuwählen.</span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNewFormState(prev => ({ ...prev, freeShipping: !prev.freeShipping }))}
                        className="text-xs text-[#B85D2C] hover:text-[#A04E24] underline font-medium cursor-pointer shrink-0 ml-2"
                      >
                        {newFormState.freeShipping ? 'Versand berechnen' : 'Versand abwählen'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TASTING NOTES */}
              {createActiveTab === 'sensory' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1">
                      Kurzbeschreibung (Intro auf Flaschenseite)
                    </label>
                    <textarea
                      rows={3}
                      value={newFormState.intro}
                      onChange={(e) => setNewFormState({ ...newFormState, intro: e.target.value })}
                      placeholder="Ein charaktervoller Single Cask Scotch Whisky..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#B85D2C] font-bold mb-1">
                      01 · Nase (Aroma & Bukett)
                    </label>
                    <textarea
                      rows={3}
                      value={newFormState.tastingNose}
                      onChange={(e) => setNewFormState({ ...newFormState, tastingNose: e.target.value })}
                      placeholder="Nase: Süße Honig- und Vanillenoten, reife Früchte..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#B85D2C] font-bold mb-1">
                      02 · Gaumen (Körper & Geschmack)
                    </label>
                    <textarea
                      rows={3}
                      value={newFormState.tastingPalate}
                      onChange={(e) => setNewFormState({ ...newFormState, tastingPalate: e.target.value })}
                      placeholder="Gaumen: Vollmundig und kräftig mit angenehmer Würze..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-craft-mono uppercase text-[#B85D2C] font-bold mb-1">
                      03 · Abgang (Nachklang & Tiefe)
                    </label>
                    <textarea
                      rows={3}
                      value={newFormState.tastingFinish}
                      onChange={(e) => setNewFormState({ ...newFormState, tastingFinish: e.target.value })}
                      placeholder="Abgang: Lang, wärmend und harmonisch..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:bg-white focus:outline-none focus:border-[#B85D2C] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: FLASCHENBILDER & KACHEL-HINTERGRUND */}
              {createActiveTab === 'media' && (
                <div className="space-y-8">
                  
                  {/* SUB-SECTION 1: FLASCHEN- & GALERIEBILDER */}
                  <div className="space-y-4">
                    <div className="border-b border-[#E2DDD5] pb-2 flex items-center justify-between">
                      <div>
                        <h4 className="font-woodblock text-lg text-[#181F1C] uppercase">
                          Flaschen- & Galeriebilder hinzufügen
                        </h4>
                        <p className="text-xs text-[#55695E]">
                          Laden Sie hier das freigestellte Hauptbild sowie optionale Galerie- und Fassfotos hoch.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D4C8B8] rounded-lg text-xs font-craft-mono font-bold text-[#55695E]">
                        {newFormState.galleryImages?.length || 0} Bilder
                      </span>
                    </div>

                    {/* Image Cards Grid */}
                    {newFormState.galleryImages && newFormState.galleryImages.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {newFormState.galleryImages.map((imgUrl, idx) => {
                          const isPrimary = idx === 0;
                          return (
                            <div 
                              key={idx} 
                              className={`relative rounded-2xl border p-2 bg-[#FAF8F5] flex flex-col justify-between group transition-all shadow-xs ${
                                isPrimary ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20' : 'border-[#D4C8B8]'
                              }`}
                            >
                              <div className="h-36 rounded-xl bg-white border border-[#E2DDD5] p-2 flex items-center justify-center overflow-hidden relative">
                                <img 
                                  src={imgUrl} 
                                  alt={`Flaschenbild ${idx + 1}`} 
                                  className="max-h-full max-w-full object-contain drop-shadow-sm" 
                                />
                                {isPrimary ? (
                                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#2D6A4F] text-white text-[10px] font-craft-mono font-bold rounded shadow-xs flex items-center space-x-1">
                                    <Star className="w-3 h-3 fill-white" />
                                    <span>Hauptbild</span>
                                  </span>
                                ) : (
                                  <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-craft-mono rounded">
                                    #{idx + 1}
                                  </span>
                                )}
                              </div>

                              <div className="pt-2 flex items-center justify-between gap-1">
                                {!isPrimary ? (
                                  <button
                                    type="button"
                                    onClick={() => handleSetPrimaryGalleryImage(idx, true)}
                                    className="text-[10px] font-craft-mono font-bold text-[#B85D2C] hover:underline cursor-pointer"
                                  >
                                    Als Hauptbild
                                  </button>
                                ) : (
                                  <span className="text-[10px] font-craft-mono font-bold text-[#2D6A4F]">
                                    Aktiv im Shop
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleRemoveGalleryImage(idx, true)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                                  title="Bild entfernen"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#D4C8B8] text-center text-xs text-[#55695E]">
                        Noch keine Bilder hinzugefügt. Laden Sie unten das erste Foto hoch.
                      </div>
                    )}

                    {/* Add Image Options */}
                    <div className="pt-2">
                      <label className="flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-[#B85D2C]/40 hover:border-[#B85D2C] bg-[#FAF8F5] hover:bg-white transition-all cursor-pointer group shadow-2xs">
                        <Upload className="w-5 h-5 text-[#B85D2C] mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                          <span className="font-woodblock text-xs uppercase tracking-wider text-[#181F1C] group-hover:text-[#B85D2C] transition-colors block">
                            {isCompressingImage ? 'Bild wird optimiert...' : '+ Flaschenfoto vom PC hinzufügen'}
                          </span>
                          <span className="text-[10px] text-[#55695E] block">
                            PNG, JPG, WebP · automatisch optimiert
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isCompressingImage}
                          onChange={(e) => e.target.files?.[0] && handleProductImageUpload(e.target.files[0], true)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* SUB-SECTION 2: HINTERGRUNDBILD DER BILDER-KACHEL */}
                  <div className="space-y-4 pt-4 border-t border-[#E2DDD5]">
                    <div className="border-b border-[#E2DDD5] pb-2">
                      <h4 className="font-woodblock text-lg text-[#181F1C] uppercase">
                        Hintergrundbild der Bilder-Kachel (Flaschenbühne)
                      </h4>
                      <p className="text-xs text-[#55695E]">
                        Dieses Hintergrundbild steht hinter der transparenten Flasche im Shop und auf der Flaschenseite.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Aktuelles Bild & Live-Vorschau */}
                      <div className="md:col-span-6 space-y-2">
                        <span className="text-xs font-craft-mono uppercase text-[#55695E] font-bold block">
                          Aktuelles Hintergrundbild (Kachel-Bühne):
                        </span>
                        <div className="h-64 rounded-2xl relative flex items-center justify-center overflow-hidden border border-[#D4C8B8] shadow-md bg-neutral-900">
                          {/* Selected Background */}
                          <img
                            src={newFormState.cardBg || IMAGES.card_bg_speyside}
                            alt="Aktueller Hintergrund"
                            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] blur-[1px] scale-105"
                          />
                          {/* Vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,139,56,0.20)_0%,_transparent_65%)]" />

                          {/* Primary Bottle */}
                          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-3">
                            <img
                              src={newFormState.image || (newFormState.galleryImages && newFormState.galleryImages[0]) || IMAGES.glenburgie_11_cutout}
                              alt=""
                              className="max-h-[85%] max-w-[85%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                            />
                            <div className="w-20 h-3 bg-black/65 rounded-full blur-md -mt-1.5 opacity-80" />
                          </div>
                        </div>
                      </div>

                      {/* Bild wechseln Aktion */}
                      <div className="md:col-span-6 space-y-4">
                        <div>
                          <span className="text-xs font-craft-mono uppercase text-[#181F1C] font-bold block mb-1">
                            Hintergrundbild anpassen
                          </span>
                          <p className="text-xs text-[#55695E] leading-relaxed">
                            Laden Sie ein neues Foto von Ihrem PC hoch, um das aktuelle Hintergrundbild für dieses Fass zu ersetzen.
                          </p>
                        </div>

                        <label className="flex items-center justify-center p-5 rounded-2xl border-2 border-dashed border-[#B85D2C]/40 hover:border-[#B85D2C] bg-[#FAF8F5] hover:bg-white transition-all cursor-pointer group shadow-2xs">
                          <Upload className="w-5 h-5 text-[#B85D2C] mr-3 shrink-0 group-hover:scale-110 transition-transform" />
                          <div className="text-left">
                            <span className="font-woodblock text-sm uppercase tracking-wider text-[#181F1C] group-hover:text-[#B85D2C] transition-colors block">
                              {isCompressingImage ? 'Bild wird optimiert...' : 'Hintergrundbild wechseln'}
                            </span>
                            <span className="text-[11px] text-[#55695E] block pt-0.5">
                              Neues Bild vom PC hochladen (wird automatisch optimiert)
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isCompressingImage}
                            onChange={(e) => e.target.files?.[0] && handleCardBgUpload(e.target.files[0], true)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E2DDD5] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingProduct(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#55695E] hover:text-[#181F1C] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base tracking-wider uppercase transition-all shadow-md flex items-center space-x-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Fass anlegen & veröffentlichen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
