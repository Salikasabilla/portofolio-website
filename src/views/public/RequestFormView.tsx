/**
 * Halaman Formulir Pengajuan Proyek Website (/buat-website)
 * Validasi ketat, ramah pengguna, semua pesan error & konfirmasi dalam Bahasa Indonesia.
 * Menghasilkan Nomor Request Unik (REQ-YYYY-XXXX) dan integrasi WhatsApp otomatis.
 */

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageCircle,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  FileText,
} from 'lucide-react';
import { BudgetRange, ProjectRequest, WebsiteType } from '../../types';
import { storageService } from '../../services/storage';
import { getWhatsAppRequestLink } from '../../utils/whatsapp';

interface RequestFormViewProps {
  initialWebsiteType?: WebsiteType;
  onNavigate: (tab: string, meta?: any) => void;
}

export const RequestFormView: React.FC<RequestFormViewProps> = ({
  initialWebsiteType,
  onNavigate,
}) => {
  // Form State
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [websiteType, setWebsiteType] = useState<WebsiteType>(
    initialWebsiteType || 'Company Profile'
  );
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [pageCount, setPageCount] = useState('1-5 Halaman');
  const [targetDeadline, setTargetDeadline] = useState('');
  const [budgetRange, setBudgetRange] = useState<BudgetRange>('Rp1.000.000–Rp3.000.000');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success State
  const [submittedRequest, setSubmittedRequest] = useState<ProjectRequest | null>(null);
  const [copiedNumber, setCopiedNumber] = useState(false);

  const websiteTypes: WebsiteType[] = [
    'Landing Page',
    'Company Profile',
    'Toko Online',
    'Sistem Informasi',
    'Custom Website',
  ];

  const budgetOptions: BudgetRange[] = [
    'Di bawah Rp1.000.000',
    'Rp1.000.000–Rp3.000.000',
    'Rp3.000.000–Rp5.000.000',
    'Di atas Rp5.000.000',
    'Belum menentukan',
  ];

  // Client-Side Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nama lengkap minimal 3 karakter.';
    }

    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Nomor WhatsApp wajib diisi.';
    } else {
      const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 9 || cleanPhone.length > 15) {
        newErrors.whatsappNumber = 'Nomor WhatsApp tidak valid (minimal 9-15 digit angka).';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Masukkan alamat email yang valid.';
      }
    }

    if (!description.trim()) {
      newErrors.description = 'Deskripsi kebutuhan website wajib diisi.';
    } else if (description.trim().length < 20) {
      newErrors.description = 'Deskripsi kebutuhan minimal 20 karakter.';
    }

    if (!agreedToTerms) {
      newErrors.agreedToTerms = 'Anda harus menyetujui ketentuan privasi untuk melanjutkan.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simpan data request ke storage (membuat nomor unik REQ-YYYY-XXXX)
      const created = storageService.createRequest({
        name: name.trim(),
        business_name: businessName.trim() || undefined,
        whatsapp_number: whatsappNumber.trim(),
        email: email.trim(),
        website_type: websiteType,
        description: description.trim(),
        features: features.trim() || undefined,
        reference_url: referenceUrl.trim() || undefined,
        page_count: pageCount,
        target_deadline: targetDeadline || undefined,
        budget_range: budgetRange,
      });

      setSubmittedRequest(created);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Terjadi kesalahan sistem saat mengirim data. Silakan coba kembali.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRequestNumber = () => {
    if (!submittedRequest) return;
    navigator.clipboard.writeText(submittedRequest.request_number);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  // TAMPILAN JIKA BERHASIL SUBMIT (SUCCESS SCREEN)
  if (submittedRequest) {
    const waLink = getWhatsAppRequestLink(
      submittedRequest.request_number,
      submittedRequest.client.name
    );

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Formulir Diterima
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Request Anda Berhasil Dikirim!
            </h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Terima kasih, <strong>{submittedRequest.client.name}</strong>. Brief kebutuhan proyek website Anda telah berhasil tercatat di sistem kami.
            </p>
          </div>

          {/* Kartu Nomor Request Unik */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-center space-y-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Nomor Request Anda
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-indigo-600 font-mono tracking-wider">
                {submittedRequest.request_number}
              </span>
              <button
                onClick={copyRequestNumber}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                title="Salin Nomor Request"
              >
                {copiedNumber ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Harap simpan nomor request ini untuk keperluan komunikasi selanjutnya bersama developer.
            </p>
          </div>

          {/* Alur Selanjutnya */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-left space-y-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Langkah Selanjutnya:</span>
            </h2>
            <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Klik tombol WhatsApp di bawah untuk menghubungkan nomor request Anda.</li>
              <li>Developer akan meninjau brief teknis dan memberikan rekomendasi penawaran.</li>
              <li>Setelah sepakat, pesanan akan diterbitkan <strong>Nomor Pesanan Resmi (Order Number)</strong> untuk dapat Anda lacak perkembangannya secara live.</li>
            </ol>
          </div>

          {/* Tombol Aksi WhatsApp & Beranda */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Diskusikan melalui WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TAMPILAN FORMULIR PENGISIAN
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
          Mulai Kolaborasi
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Ajukan Pembuatan Website
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Ceritakan kebutuhan proyek website Anda secara rinci. Kami akan meninjau dan menyiapkan estimasi waktu serta penawaran terbaik.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-10"
      >
        {errors.form && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* 1. INFORMASI KLIEN */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Informasi Klien & Kontak</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Data ini digunakan untuk komunikasi langsung mengenai progres pengerjaan website Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bpk. Hendra Gunawan"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-600 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nama Bisnis / Organisasi <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Contoh: Sabila Fashion Butik"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Contoh: 081234567890"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.whatsappNumber
                    ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                }`}
              />
              {errors.whatsappNumber && (
                <p className="text-xs text-rose-600 mt-1.5">{errors.whatsappNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Alamat Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                }`}
              />
              {errors.email && <p className="text-xs text-rose-600 mt-1.5">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* 2. SPESIFIKASI PROYEK */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Spesifikasi Kebutuhan Website</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Jelaskan ide dan fitur yang ingin dihadirkan dalam website Anda.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Jenis Website <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {websiteTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setWebsiteType(type)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-left ${
                      websiteType === type
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Deskripsi Kebutuhan Website <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritakan tujuan website Anda, target pengunjung, konsep tampilan, serta konten utama yang ingin ditampilkan (minimal 20 karakter)..."
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.description
                    ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p className="text-xs text-rose-600">{errors.description}</p>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Minimal 20 karakter ({description.trim().length} karakter)
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Fitur Khusus yang Dibutuhkan <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Contoh: Form kontak, galeri, blog, WhatsApp checkout"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Referensi Website yang Disukai <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <input
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://contoh-website.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Perkiraan Jumlah Halaman
                </label>
                <select
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                >
                  <option value="1 Halaman (Single-Page / Landing Page)">1 Halaman (Single Page)</option>
                  <option value="1-5 Halaman">1 - 5 Halaman</option>
                  <option value="5-10 Halaman">5 - 10 Halaman</option>
                  <option value="Lebih dari 10 Halaman">Lebih dari 10 Halaman</option>
                  <option value="Belum Menentukan">Belum Menentukan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Deadline Pengerjaan <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <input
                  type="date"
                  value={targetDeadline}
                  onChange={(e) => setTargetDeadline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. ANGGARAN & PERSETUJUAN */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Estimasi Anggaran & Ketentuan</span>
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Kisaran Budget Anda <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {budgetOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      budgetRange === opt
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-medium'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="budgetRange"
                      value={opt}
                      checked={budgetRange === opt}
                      onChange={() => setBudgetRange(opt)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Checkbox Persetujuan */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  Saya menyetujui bahwa data yang saya berikan digunakan untuk keperluan komunikasi dan pengelolaan project pembuatan website.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-xs text-rose-600 mt-1.5">{errors.agreedToTerms}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Submit */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            * Seluruh informasi brief Anda dijamin keamanannya dan tidak disebarluaskan.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Memproses Data...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kirim Pengajuan Website</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
