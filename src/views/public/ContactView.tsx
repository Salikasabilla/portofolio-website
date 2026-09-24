/**
 * Halaman Kontak (Contact Page)
 * Menyediakan saluran komunikasi resmi dengan developer: WhatsApp, Email, GitHub, Instagram, dan LinkedIn.
 */

import React, { useState } from 'react';
import { Mail, Phone, Github, Instagram, Linkedin, MessageSquare, Copy, Check, Clock, ShieldCheck } from 'lucide-react';
import { getWhatsAppConsultationLink, formatPhoneNumber } from '../../utils/whatsapp';

interface ContactViewProps {
  onNavigate?: (tab: string, meta?: any) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '085713411482';
  const email = import.meta.env.VITE_DEVELOPER_EMAIL || 'salikasabillaf@gmail.com';
  const name = import.meta.env.VITE_DEVELOPER_NAME || 'Salika Sabilla F';

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
          Komunikasi & Konsultasi
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Hubungi Saya
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Punya pertanyaan seputar pembuatan website, ingin mendiskusikan anggaran, atau butuh saran teknis? Silakan hubungi saya melalui saluran di bawah ini.
        </p>
      </div>

      {/* Grid Kontak Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WhatsApp Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">WhatsApp Langsung (Respon Tercepat)</h2>
              <p className="text-xs text-slate-500 mt-1">
                Cocok untuk konsultasi cepat, diskusi lingkup proyek, dan pengiriman dokumen brief.
              </p>
            </div>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">
              {formatPhoneNumber(phone)}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <a
              href={getWhatsAppConsultationLink()}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buka Chat WhatsApp</span>
            </a>
            <button
              onClick={() => copyToClipboard(phone, 'phone')}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Salin Nomor WhatsApp"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Surat Elektronik (Email)</h2>
              <p className="text-xs text-slate-500 mt-1">
                Ideal untuk penawaran kerjasama formal, permintaan proposal resmi, dan berkas perusahaan.
              </p>
            </div>
            <p className="text-xl font-bold text-slate-900 tracking-tight break-all">
              {email}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <a
              href={`mailto:${email}`}
              className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Kirim Pesan Email</span>
            </a>
            <button
              onClick={() => copyToClipboard(email, 'email')}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Salin Alamat Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Profil Media Sosial & Jejaring Profesional */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Jejaring Sosial & Repositori</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://github.com/Salikasabilla"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600">GitHub</p>
              <p className="text-xs text-slate-500">Lihat Repositori & Kontribusi</p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/salika-sabilla-f/"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600">LinkedIn</p>
              <p className="text-xs text-slate-500">Koneksi Profesional</p>
            </div>
          </a>

          <a
            href="https://www.instagram.com/salikasf_?igsh=MXh5aDA1YWVjdjExYg=="
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600">Instagram</p>
              <p className="text-xs text-slate-500">Aktivitas & Desain</p>
            </div>
          </a>
        </div>
      </div>

      {/* Komitmen Layanan & Jam Operasional */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 text-sm mb-1">Jam Operasional & Respon</p>
            <p>Senin – Sabtu, 08:30 – 20:00 WIB. Respon pesan WhatsApp di luar jam kerja tetap diproses pada kesempatan pertama.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 text-sm mb-1">Kerahasiaan Data Klien</p>
            <p>Seluruh berkas brief, akses kredensial, dan materi usaha Anda dijamin aman dan hanya digunakan untuk kepentingan pengerjaan proyek.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
