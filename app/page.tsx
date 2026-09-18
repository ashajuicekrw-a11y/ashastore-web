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
