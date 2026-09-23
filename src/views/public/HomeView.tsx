/**
 * Halaman Beranda (Home Page)
 * Tampilan profesional untuk freelance web developer Indonesia, memuat hero section,
 * layanan unggulan, portofolio pilihan, alur kerja, dan ajakan kerja sama.
 */

import React from 'react';
import {
  ArrowRight,
  Code2,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  CheckCircle2,
  ExternalLink,
  Github,
  Search,
  MessageCircle,
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { getWhatsAppConsultationLink } from '../../utils/whatsapp';

interface HomeViewProps {
  onNavigate: (tab: string, meta?: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const services = storageService.getServices().slice(0, 3);
  const featuredPortfolio = storageService.getPortfolio().filter((p) => p.is_featured).slice(0, 3);
  const devName = import.meta.env.VITE_DEVELOPER_NAME || 'Salika Sabilla';

  return (
    <div className="space-y-24 py-6">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-indigo-100/60 blur-[120px] -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-8 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Menerima Proyek Pembuatan Website Baru</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
            Halo, saya <span className="text-indigo-600 underline decoration-indigo-300 underline-offset-8">{devName}</span>.<br />
            Web Developer.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Membangun website modern, berkecepatan tinggi, dan berorientasi hasil untuk bisnis Anda. 
            Mulai dari Company Profile, Toko Online UMKM, hingga Sistem Informasi Kustom dengan sistem pemantauan progres pengerjaan transparan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => onNavigate('request-form')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Ajukan Pembuatan Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-2xs hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lihat Portofolio</span>
            </button>
          </div>

          {/* Quick Tracking Prompt */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-xl mx-auto flex items-center justify-center gap-3 text-sm text-slate-600">
            <Search className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Sudah memiliki pesanan?</span>
            <button
              onClick={() => onNavigate('tracking')}
              className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4 cursor-pointer"
            >
              Lacak Progress Pengerjaan Pesanan
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS & JAMINAN KUALITAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-slate-900 text-white shadow-sm">
          <div className="text-center p-3 border-r border-slate-800 last:border-r-0">
            <p className="text-3xl font-extrabold text-indigo-400 mb-1">100%</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Transparansi Progres</p>
          </div>
          <div className="text-center p-3 border-r border-slate-800 last:border-r-0">
            <p className="text-3xl font-extrabold text-indigo-400 mb-1">&lt; 2s</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Kecepatan Loading</p>
          </div>
          <div className="text-center p-3 border-r border-slate-800 last:border-r-0">
            <p className="text-3xl font-extrabold text-indigo-400 mb-1">Responsif</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Mobile & Desktop</p>
          </div>
          <div className="text-center p-3">
            <p className="text-3xl font-extrabold text-indigo-400 mb-1">Garansi</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Bebas Bug & Dukungan</p>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN UNGGULAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
              Solusi Web
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Layanan Pembuatan Website
            </h2>
            <p className="text-slate-600 mt-2 max-w-xl text-sm leading-relaxed">
              Disesuaikan dengan skala kebutuhan usaha Anda, dari branding bisnis hingga platform transaksi online.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            <span>Lihat Semua Layanan & Rincian Harga</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-7 border transition-all flex flex-col justify-between ${
                service.is_popular
                  ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600 relative'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {service.is_popular && (
                <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold tracking-wide uppercase">
                  Paling Banyak Dipilih
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed min-h-10">
                  {service.description}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-xs text-slate-500 block mb-1">Mulai Dari</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    Rp{service.starting_price.toLocaleString('id-ID')}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('request-form', { websiteType: service.name })}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  service.is_popular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Pesan Website Ini
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CARA KERJA LAYANAN */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
              Proses Transparan
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Cara Kerja Kerjasama Layanan
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Alur kerja terstruktur yang dirancang agar Anda selalu mengetahui perkembangan proyek secara real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center mb-4 text-sm border border-indigo-100">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Ajukan Kebutuhan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Isi formulir ringkas mengenai jenis website, referensi desain, fitur yang diinginkan, dan estimasi waktu.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center mb-4 text-sm border border-indigo-100">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Diskusi & Penawaran</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Terima nomor request dan diskusikan rincian via WhatsApp untuk konfirmasi biaya dan kesepakatan uang muka (DP).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center mb-4 text-sm border border-indigo-100">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Pengerjaan & Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Terima Nomor Pesanan resmi (WEB-xxxx) dan pantau persentase progres serta tahapan desain hingga coding secara daring.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center mb-4 text-sm border border-indigo-100">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Revisi & Peluncuran</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengujian menyeluruh, penyempurnaan revisi, dan peluncuran website ke domain resmi Anda dengan garansi pendampingan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PORTOFOLIO PILIHAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
              Karya Terkini
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Portofolio Proyek Terpilih
            </h2>
            <p className="text-slate-600 mt-2 text-sm max-w-xl leading-relaxed">
              Koleksi proyek nyata yang mengutamakan kerapian arsitektur kode dan estetika pengalaman pengguna.
            </p>
          </div>
          <button
            onClick={() => onNavigate('portfolio')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            <span>Buka Seluruh Galeri Portofolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPortfolio.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium">
                  {project.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {project.short_description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech_stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {project.demo_url ? (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                    >
                      <span>Lihat Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Demo Internal</span>
                  )}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Kode</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MENGAPA MEMILIH SAYA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">
              Standar Profesional
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Mengapa Mempercayakan Proyek Website Anda Kepada Saya?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Kode Bersih & Mudah Dipelihara</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tidak menggunakan template berat acak. Struktur kode dibuat rapi mengikuti kaidah MVC dan Tailwind CSS sehingga ringan dan mudah dikembangkan.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Transparansi Order Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Anda tidak perlu khawatir proyek mandek tanpa kabar. Cukup masukkan nomor pesanan Anda untuk memantau status dan catatan pengerjaan secara langsung.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Komunikasi Terbuka & Ramah</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Konsultasi langsung via WhatsApp. Kami membantu Anda merumuskan fitur yang benar-benar efektif bagi bisnis, bukan sekadar menjual paket termahal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8">
        <div className="bg-indigo-50 border border-indigo-200/80 rounded-3xl p-10 sm:p-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Siap Membangun Website untuk Bisnis Anda?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Ajukan kebutuhan Anda sekarang untuk mendapatkan estimasi rancangan dan penawaran biaya transparan tanpa komitmen awal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('request-form')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ajukan Pembuatan Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={getWhatsAppConsultationLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
