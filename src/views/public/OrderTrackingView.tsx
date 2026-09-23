/**
 * Halaman Lacak Progress Pesanan (/lacak-pesanan)
 * Klien dapat memantau status, persentase progress, timeline tahapan, dan update berkala.
 * Privasi publik terjamin: tidak mengekspos nomor HP, email, maupun rincian pembayaran.
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { STANDARD_MILESTONES } from '../../types';
import { getWhatsAppOrderLink } from '../../utils/whatsapp';

interface OrderTrackingViewProps {
  initialOrderNumber?: string;
  onNavigate: (tab: string, meta?: any) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  initialOrderNumber,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderNumber || 'WEB-2026-0001');
  const [trackedOrder, setTrackedOrder] = useState<ReturnType<
    typeof storageService.trackOrderByNumber
  > | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Otomatis lacak jika ada initialOrderNumber atau default contoh
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, []);

  const handleSearch = (queryToUse?: string) => {
    const q = (queryToUse !== undefined ? queryToUse : searchQuery).trim().toUpperCase();
    if (!q) {
      setErrorMessage('Silakan masukkan nomor pesanan Anda.');
      setTrackedOrder(null);
      setHasSearched(true);
      return;
    }

    setErrorMessage('');
    const result = storageService.trackOrderByNumber(q);
    setTrackedOrder(result);
    setHasSearched(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return { label: 'Sedang Dikerjakan', class: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'revision':
        return { label: 'Tahap Revisi', class: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'testing':
        return { label: 'Pengujian Sistem', class: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'completed':
        return { label: 'Proyek Selesai', class: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'cancelled':
        return { label: 'Dibatalkan', class: 'bg-rose-100 text-rose-800 border-rose-200' };
      default:
        return { label: 'Belum Dimulai', class: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Transparansi Pengerjaan Proyek
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Lacak Progress Pesanan Website
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Pantau tahapan pembuatan website Anda secara transparan dan berkala tanpa perlu login. Masukkan nomor pesanan resmi yang Anda terima.
        </p>
      </div>

      {/* Input Pencarian Nomor Pesanan */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masukkan Nomor Pesanan (Contoh: WEB-2026-0001)"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm sm:text-base font-mono uppercase tracking-wide focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-98"
          >
            <Search className="w-4 h-4" />
            <span>Lacak Pesanan</span>
          </button>
        </form>

        {/* Quick Sample Chip */}
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
          <span>Contoh pesanan siap uji:</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('WEB-2026-0001');
              handleSearch('WEB-2026-0001');
            }}
            className="font-mono text-indigo-600 font-semibold hover:underline cursor-pointer bg-indigo-50 px-2 py-0.5 rounded"
          >
            WEB-2026-0001
          </button>
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-600 flex items-center gap-1.5 mt-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </p>
        )}
      </div>

      {/* HASIL PELACAKAN */}
      {hasSearched && !trackedOrder && !errorMessage && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Pesanan Tidak Ditemukan</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Nomor pesanan <strong>{searchQuery}</strong> tidak terdaftar di sistem kami. Harap pastikan kembali format penulisan (contoh: <code>WEB-2026-0001</code>) atau hubungi developer.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('request-form')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              <span>Belum mengajukan pesanan? Ajukan sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {trackedOrder && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs space-y-8 p-6 sm:p-10 animate-in fade-in duration-150">
          {/* Baris Atas: Info Proyek & Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {trackedOrder.order_number}
                </span>
                <span className="text-xs font-medium text-slate-500">• {trackedOrder.website_type}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {trackedOrder.project_name}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                  getStatusBadge(trackedOrder.project_status).class
                }`}
              >
                {getStatusBadge(trackedOrder.project_status).label}
              </span>
            </div>
          </div>

          {/* Progress Bar & Persentase */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>Progress Pengerjaan Saat Ini</span>
              </span>
              <span className="font-mono text-lg font-black text-indigo-600">
                {trackedOrder.progress_percentage}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, trackedOrder.progress_percentage))}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1 pt-1">
              <span>
                Tahap: <strong className="text-slate-800">{trackedOrder.current_stage}</strong>
              </span>
              <span>
                Estimasi Selesai:{' '}
                <strong className="text-slate-800">
                  {new Date(trackedOrder.estimated_completion).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </strong>
              </span>
            </div>
          </div>

          {/* Timeline Tahapan Standar */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Tahapan Alur Pengerjaan (Timeline)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {STANDARD_MILESTONES.map((milestone, index) => {
                // Kalkulasi status milestone berdasarkan progress
                const milestoneStepProgress = ((index + 1) / STANDARD_MILESTONES.length) * 100;
                const isPassed = trackedOrder.progress_percentage >= milestoneStepProgress - 5;
                const isCurrent =
                  trackedOrder.current_stage === milestone ||
                  (!isPassed && trackedOrder.progress_percentage >= milestoneStepProgress - 15);

                return (
                  <div
                    key={milestone}
                    className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                      isPassed
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-medium'
                        : isCurrent
                        ? 'bg-blue-50 border-blue-300 text-blue-950 font-semibold ring-1 ring-blue-300'
                        : 'bg-slate-50/60 border-slate-200 text-slate-400'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : isCurrent ? (
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                        •
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                    )}
                    <div>
                      <p className="leading-snug">{milestone}</p>
                      <span className="text-[10px] opacity-75 block mt-0.5">
                        {isPassed ? 'Selesai' : isCurrent ? 'Sedang Dikerjakan' : 'Menunggu'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Riwayat Update Berkala */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Catatan Pembaruan & Log Progres</span>
            </h3>

            {trackedOrder.updates.length === 0 ? (
              <p className="text-xs text-slate-500 italic">Belum ada catatan update tambahan.</p>
            ) : (
              <div className="space-y-3">
                {trackedOrder.updates
                  .slice()
                  .reverse()
                  .map((update) => (
                    <div
                      key={update.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                            {update.stage_name} — {update.progress_percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(update.update_date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{update.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Jaminan Privasi & Hubungi WhatsApp */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Data nomor telepon, tagihan, dan catatan internal Anda dilindungi secara privat.
              </span>
            </div>

            <a
              href={getWhatsAppOrderLink(trackedOrder.order_number, trackedOrder.project_name)}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya Perkembangan via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
