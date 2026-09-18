'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, ShieldCheck, Zap, Sparkles, ChevronDown } from 'lucide-react';
import { createClient } from 'next-sanity';

// === 1. KONEKSI KE GUDANG SANITY ===
const sanityClient = createClient({
  projectId: 'gf1kmvik', 
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// === DATA KATEGORI ===
const navItems = [
  { label: 'Semua', icon: '' },
  { label: 'Streaming', icon: '' },
  { label: 'Musik', icon: '' },
  { label: 'Desain', icon: '' },
  { label: 'VPN', icon: '' },
  { label: 'Game', icon: '' },
  { label: 'Edukasi', icon: '' },
  { label: 'AI Tools', icon: '' },
  { label: 'Software', icon: '' }
];

// === KOMPONEN NAVBAR ===
const Navbar = ({ activeCategory, setActiveCategory }: any) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentActive = navItems.find(item => item.label === activeCategory) || navItems[0];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
  <Link href="/" className="flex items-center gap-2.5" onClick={() => setActiveCategory('Semua')}>
  <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Asha<span className="text-cyan-400">Store</span></span>
</Link>
        
        {/* Tombol Kategori Desktop */}
        <div className="hidden lg:flex gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => setActiveCategory(item.label)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                activeCategory === item.label 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>

        {/* TOMBOL DROPDOWN KHUSUS MOBILE */}
        <div className="relative lg:hidden">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all"
          >
            <span>{currentActive.icon}</span>
            <span>{activeCategory}</span>
            <ChevronDown className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden z-50">
              <div className="p-1.5 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveCategory(item.label);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      activeCategory === item.label
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// === KOMPONEN HERO ===
const Hero = () => (
  <section className="relative px-4 md:px-6 py-16 md:py-20 text-center overflow-hidden">
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
        <Zap className="h-3.5 w-3.5 text-cyan-400" /> Proses Instan 1-5 Menit Langsung Aktif
      </div>
      <h1 className="mb-4 text-3xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
        Nikmati Fitur Premium <br className="hidden md:block"/>
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Tanpa Harga Maksimum.</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm font-medium text-slate-300 mt-6">
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-green-400"/> Garansi Penuh</span>
        <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-cyan-400"/> Kualitas Original</span>
      </div>
    </div>
  </section>
);


// === KOMPONEN KARTU PRODUK ===
const ProductCard = ({ product, noWA }: { product: any, noWA: string }) => {
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? product.variants[0] : null);

  // AMAN: Jika harga varian atau harga default tidak ada, otomatis di-set ke 0
  const currentPrice = selectedVariant 
    ? (selectedVariant.variantPrice || 0) 
    : (product.price || 0);

  const variantName = selectedVariant && selectedVariant.variantName ? ` (${selectedVariant.variantName})` : '';
  const title = product.title || 'Produk Tanpa Nama';
  
  const pesan = `Halo Admin AshaStore! 👋\n\nSaya mau order layanan premium nih:\n\n*🛒 Produk:* ${title}${variantName}\n*💳 Harga:* Rp ${currentPrice.toLocaleString('id-ID')}\n\nBoleh minta detail pembayarannya? Terima kasih!`;
  const waLink = `https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="group flex flex-col h-full rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)] transition-all duration-300">
      <div className="relative h-48 md:h-56 bg-slate-950 overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">Premium Item</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        {product.category && (
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-300">
            {product.category}
          </div>
        )}

        <div className="absolute bottom-3 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-1 rounded-xl shadow-lg">
          <p className="text-cyan-400 font-extrabold text-base md:text-lg">Rp {currentPrice.toLocaleString('id-ID')}</p>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-5 md:p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-xs md:text-sm mb-6 flex-grow leading-relaxed line-clamp-3">{product.description || 'Tidak ada deskripsi.'}</p>
        
        {hasVariants && (
          <div className="mb-5">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">Pilih Durasi / Paket</label>
            <div className="p-1 rounded-xl bg-slate-950 border border-slate-800">
              <select 
                className="w-full bg-transparent text-white text-xs md:text-sm font-medium rounded-lg px-3 py-2.5 outline-none cursor-pointer appearance-none"
                onChange={(e) => setSelectedVariant(product.variants[e.target.selectedIndex])}
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2322d3ee' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
              >
                {product.variants.map((v: any, index: number) => (
                  <option key={index} value={v.variantName} className="bg-slate-900 text-white py-2">
                    {v.variantName} {v.variantPrice ? `- Rp ${v.variantPrice.toLocaleString('id-ID')}` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-auto relative flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 text-xs md:text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all active:scale-95">
          <MessageCircle className="h-4 w-4" />
          <span>Amankan Akun Sekarang</span>
        </a>
      </div>
    </div>
  );
};

// === DAFTAR PRODUK ===
const Products = ({ activeCategory }: { activeCategory: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const noWA = '6282223750826'; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "product"]{
          _id, title, price, description, "imageUrl": image.asset->url, variants, category
        }`);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'Semua' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  if (loading) return <div className="py-20 text-center text-cyan-400 text-sm animate-pulse">Menyiapkan katalog premium...</div>;

  return (
    <section className="py-6 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm">Belum ada produk untuk kategori <b className="text-white">{activeCategory}</b>.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} noWA={noWA} />
          ))}
        </div>
      </div>
    </section>
  );
};

// === HALAMAN UTAMA ===
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  return (
    <main className="min-h-screen bg-[#070b14] selection:bg-cyan-500/30 selection:text-cyan-200 font-sans overflow-x-hidden">
      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Hero />
      <Products activeCategory={activeCategory} />
      
      <footer className="border-t border-slate-800/60 bg-[#070b14] py-10 mt-16 text-center">
        <p className="text-slate-500 text-xs font-medium">
          &copy; {new Date().getFullYear()} AshaStore. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
