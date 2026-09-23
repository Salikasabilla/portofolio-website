/**
 * Halaman Layanan (Services Page)
 * Menampilkan katalog lengkap paket pembuatan website dengan rincian fitur,
 * estimasi harga mulai, dan tombol pesan langsung ke formulir pengajuan proyek.
 */

import React from 'react';
import { CheckCircle2, ArrowRight, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';
import { storageService } from '../../services/storage';
import { getWhatsAppConsultationLink } from '../../utils/whatsapp';

interface ServicesViewProps {
  onNavigate: (tab: string, meta?: any) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
  const services = storageService.getServices();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
          Pilihan Paket & Solusi
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Layanan Pembuatan Website Profesional
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Pilih jenis website yang paling sesuai dengan target dan skala bisnis Anda. Seluruh website dirancang responsif di ponsel, memiliki performa cepat, dan siap mendatangkan pelanggan.
        </p>
      </div>

      {/* Grid Paket Layanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-2xl p-8 border transition-all flex flex-col justify-between bg-white ${
              service.is_popular
                ? 'border-indigo-600 shadow-md ring-1 ring-indigo-600 relative'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            {service.is_popular && (
              <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold tracking-wide uppercase">
                Rekomendasi Utama
              </span>
            )}

            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-12">
                  {service.description}
                </p>
              </div>

              {/* Harga */}
              <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Mulai Dari</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    Rp{service.starting_price.toLocaleString('id-ID')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  * Biaya final disesuaikan dengan kebutuhan fitur tambahan.
                </span>
              </div>

              {/* Fitur */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Fitur Yang Didapatkan:
                </p>
                <ul className="space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tombol Aksi */}
            <button
              onClick={() => onNavigate('request-form', { websiteType: service.name })}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                service.is_popular
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <span>Pesan Website Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Bagian Konsultasi Kustom */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kebutuhan Khusus / Proyek Skala Besar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Memiliki Kebutuhan Di Luar Paket Di Atas?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Jika bisnis Anda membutuhkan arsitektur sistem informasi khusus, integrasi API perbankan/ekspedisi, atau aplikasi web terdistribusi, silakan diskusikan kebutuhan spesifik Anda secara langsung.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => onNavigate('request-form', { websiteType: 'Custom Website' })}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all text-center cursor-pointer"
          >
            Ajukan Custom Website
          </button>
          <a
            href={getWhatsAppConsultationLink('Custom Website')}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
