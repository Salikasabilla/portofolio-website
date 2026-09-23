/**
 * Komponen Footer Publik
 * Menampilkan kontak resmi, tautan WhatsApp, navigasi cepat, dan hak cipta dalam Bahasa Indonesia.
 */

import React from 'react';
import { Globe, Mail, Phone, Github, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { getWhatsAppConsultationLink, formatPhoneNumber } from '../../utils/whatsapp';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '081234567890';
  const email = import.meta.env.VITE_DEVELOPER_EMAIL || 'salikasabillaf@gmail.com';
  const name = import.meta.env.VITE_DEVELOPER_NAME || 'Salika Sabilla';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Profil Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">{name}</h3>
                <p className="text-xs text-indigo-400">Jasa Pembuatan Website Profesional</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Membantu bisnis, UMKM, dan profesional memiliki website modern, berkecepatan tinggi, dan berorientasi hasil dengan kode bersih dan berstandar industri.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Layanan */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Layanan Website
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Landing Page Promosi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Company Profile Perusahaan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Toko Online UMKM (WhatsApp Checkout)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sistem Informasi & Manajemen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Website Development
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Navigasi Klien */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Pusat Klien
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-indigo-400 font-medium"
                >
                  Lacak Progress Pesanan (Order Tracking)
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('request-form')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ajukan Pembuatan Website
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Galeri Portofolio Proyek
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang Saya & Riwayat Pengalaman
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Konsultasi Langsung
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Saya */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Kontak Cepat
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Ada pertanyaan atau ingin konsultasi awal mengenai kebutuhan proyek Anda?
            </p>
            <div className="space-y-3">
              <a
                href={getWhatsAppConsultationLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-sm font-medium transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: {formatPhoneNumber(phone)}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-sm font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="truncate">{email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {name}. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="text-slate-400">
            Dibangun dengan standar Laravel & Tailwind CSS • Siap Produksi
          </p>
        </div>
      </div>
    </footer>
  );
};
