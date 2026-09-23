/**
 * Dashboard Administrator (/admin/dashboard)
 * Seluruh antarmuka, status label, modal, dan pesan aksi dalam Bahasa Indonesia.
 * Mengelola Request Masuk, Pesanan Resmi (Order), Update Timeline Progres, dan Portofolio.
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  FolderPlus,
  LogOut,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  MessageCircle,
  ArrowRight,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';
import { storageService } from '../../services/storage';
import {
  AdminUser,
  Order,
  PaymentStatus,
  ProjectRequest,
  ProjectStatus,
  RequestStatus,
  REQUEST_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  PROJECT_STATUS_LABELS,
  STANDARD_MILESTONES,
} from '../../types';

interface AdminDashboardViewProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onNavigateToPublic: (tab: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  adminUser,
  onLogout,
  onNavigateToPublic,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'orders' | 'portfolio' | 'services'>('overview');

  // Trigger re-render saat data berubah
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const stats = storageService.getDashboardStats();
  const allRequests = storageService.getAllRequests();
  const allOrders = storageService.getAllOrders();
  const allPortfolio = storageService.getPortfolio();
  const allServices = storageService.getServices();

  // State Filter Request
  const [requestSearch, setRequestSearch] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>('all');

  // State Modal Detail Request
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);

  // State Modal Konversi ke Pesanan
  const [convertingRequest, setConvertingRequest] = useState<ProjectRequest | null>(null);
  const [orderProjectName, setOrderProjectName] = useState('');
  const [orderTotalPrice, setOrderTotalPrice] = useState<number>(1500000);
  const [orderEstimatedDate, setOrderEstimatedDate] = useState('');

  // State Modal Tambah Log Update Proyek
  const [selectedOrderForUpdate, setSelectedOrderForUpdate] = useState<Order | null>(null);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateProgress, setUpdateProgress] = useState<number>(50);
  const [updateStage, setUpdateStage] = useState(STANDARD_MILESTONES[2]);

  // State Modal Tambah Portofolio
  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState<'Web Development' | 'UI/UX Design' | 'Lainnya'>('Web Development');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [newPortTech, setNewPortTech] = useState('Tailwind CSS, TypeScript, Vite');
  const [newPortThumb, setNewPortThumb] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80');

  // Filter Data Request
  const filteredRequests = allRequests.filter((r) => {
    const matchesSearch =
      r.request_number.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.client.name.toLowerCase().includes(requestSearch.toLowerCase()) ||
      (r.client.business_name && r.client.business_name.toLowerCase().includes(requestSearch.toLowerCase()));
    const matchesStatus = requestStatusFilter === 'all' || r.status === requestStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handler Konversi Request Menjadi Order Resmi
  const handleConfirmConvertOrder = () => {
    if (!convertingRequest || !orderProjectName.trim() || !orderEstimatedDate) {
      alert('Nama proyek dan estimasi tanggal penyelesaian wajib diisi.');
      return;
    }

    const createdOrder = storageService.convertRequestToOrder(convertingRequest.id, {
      project_name: orderProjectName.trim(),
      total_price: Number(orderTotalPrice) || 1500000,
      estimated_completion: orderEstimatedDate,
    });

    if (createdOrder) {
      alert(`Berhasil membuat pesanan resmi dengan nomor ${createdOrder.order_number}!`);
      setConvertingRequest(null);
      triggerRefresh();
      setActiveTab('orders');
    }
  };

  // Handler Tambah Update Progress Proyek
  const handleAddProjectUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForUpdate || !updateTitle.trim() || !updateDescription.trim()) return;

    storageService.addProjectUpdate(selectedOrderForUpdate.id, {
      title: updateTitle.trim(),
      description: updateDescription.trim(),
      progress_percentage: Number(updateProgress),
      stage_name: updateStage,
      update_date: new Date().toISOString().split('T')[0],
    });

    // Otomatis ubah status ke selesai jika 100% dengan konfirmasi
    if (Number(updateProgress) === 100) {
      const confirmComplete = confirm('Progress telah mencapai 100%. Apakah Anda ingin menandai status proyek ini sebagai "Selesai"?');
      if (confirmComplete) {
        storageService.updateOrder(selectedOrderForUpdate.id, {
          project_status: 'completed',
          progress_percentage: 100,
        });
      }
    }

    setSelectedOrderForUpdate(null);
    setUpdateTitle('');
    setUpdateDescription('');
    triggerRefresh();
  };

  // Handler Hapus Request dengan Konfirmasi
  const handleDeleteRequest = (id: string, reqNum: string) => {
    const ok = confirm(`Apakah Anda yakin ingin menghapus request ${reqNum}? Tindakan ini tidak dapat dibatalkan.`);
    if (ok) {
      storageService.deleteRequest(id);
      setSelectedRequest(null);
      triggerRefresh();
    }
  };

  // Handler Tambah Portofolio
  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim() || !newPortDesc.trim()) return;

    storageService.addPortfolio({
      title: newPortTitle.trim(),
      slug: newPortTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category: newPortCategory,
      short_description: newPortDesc.trim(),
      tech_stack: newPortTech.split(',').map((t) => t.trim()),
      thumbnail_url: newPortThumb.trim(),
      is_featured: true,
      completion_year: String(new Date().getFullYear()),
    });

    setShowAddPortfolioModal(false);
    setNewPortTitle('');
    setNewPortDesc('');
    triggerRefresh();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                AD
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">Panel Administrasi Website</h1>
                <p className="text-[11px] text-slate-400">Masuk sebagai {adminUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateToPublic('home')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Lihat Website Publik
              </button>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Ringkasan Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'requests'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Daftar Request ({stats.totalRequests})</span>
              {stats.newRequests > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Manajemen Pesanan ({allOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'portfolio'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Portofolio ({allPortfolio.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ============================================================
            TAB 1: OVERVIEW / RINGKASAN DASHBOARD
        ============================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Kartu Statistik Utama */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <p className="text-xs text-slate-500 font-medium mb-1">Total Request</p>
                <p className="text-2xl font-extrabold text-slate-900">{stats.totalRequests}</p>
                <span className="text-[11px] text-slate-400">Seluruh pengajuan</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <p className="text-xs text-blue-600 font-bold mb-1">Request Baru</p>
                <p className="text-2xl font-extrabold text-blue-600">{stats.newRequests}</p>
                <span className="text-[11px] text-slate-400">Butuh ditinjau</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <p className="text-xs text-indigo-600 font-bold mb-1">Proyek Aktif</p>
                <p className="text-2xl font-extrabold text-indigo-600">{stats.activeProjects}</p>
                <span className="text-[11px] text-slate-400">Sedang dikerjakan</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <p className="text-xs text-emerald-600 font-bold mb-1">Proyek Selesai</p>
                <p className="text-2xl font-extrabold text-emerald-600">{stats.completedProjects}</p>
                <span className="text-[11px] text-slate-400">Tuntas & live</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <p className="text-xs text-amber-600 font-bold mb-1">Tahap Revisi</p>
                <p className="text-2xl font-extrabold text-amber-600">{stats.revisionProjects}</p>
                <span className="text-[11px] text-slate-400">Penyesuaian klien</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <p className="text-xs text-slate-500 font-medium mb-1">Total Pendapatan</p>
                <p className="text-lg font-black text-slate-900 truncate">
                  Rp{stats.totalRevenue.toLocaleString('id-ID')}
                </p>
                <span className="text-[11px] text-slate-400">Estimasi kas masuk</span>
              </div>
            </div>

            {/* Dua Kolom: Request Terbaru & Pesanan Sedang Berjalan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Request Terbaru */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-indigo-600" />
                    <span>Request Pengajuan Terbaru</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs text-indigo-600 font-semibold hover:underline"
                  >
                    Buka Semua
                  </button>
                </div>

                <div className="space-y-3">
                  {allRequests.slice(0, 4).map((req) => (
                    <div
                      key={req.id}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-indigo-600">
                            {req.request_number}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              REQUEST_STATUS_LABELS[req.status].color
                            }`}
                          >
                            {REQUEST_STATUS_LABELS[req.status].label}
                          </span>
                        </div>
                        <p className="font-bold text-slate-900">{req.client.name}</p>
                        <p className="text-slate-500">{req.website_type} • {req.budget_range}</p>
                      </div>

                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium shrink-0 cursor-pointer"
                      >
                        Detail
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pesanan Aktif & Progress */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>Pesanan Aktif & Progress</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-indigo-600 font-semibold hover:underline"
                  >
                    Kelola Pesanan
                  </button>
                </div>

                <div className="space-y-3">
                  {allOrders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-indigo-600">{order.order_number}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            PROJECT_STATUS_LABELS[order.project_status].color
                          }`}
                        >
                          {PROJECT_STATUS_LABELS[order.project_status].label}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900">{order.project_name}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Tahap: {order.current_stage}</span>
                        <span className="font-bold text-slate-700">{order.progress_percentage}%</span>
                      </div>
                      {/* Bar Mini */}
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${order.progress_percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 2: MANAJEMEN REQUEST KLIEN
        ============================================================ */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Daftar Pengajuan Kebutuhan (Requests)</h2>
                <p className="text-xs text-slate-500">
                  Tinjau brief dari calon klien, hubungi via WhatsApp, dan ubah menjadi Pesanan Resmi setelah disetujui.
                </p>
              </div>

              {/* Pencarian & Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={requestSearch}
                    onChange={(e) => setRequestSearch(e.target.value)}
                    placeholder="Cari nama atau nomor..."
                    className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 w-44 sm:w-56"
                  />
                </div>

                <select
                  value={requestStatusFilter}
                  onChange={(e) => setRequestStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="all">Semua Status</option>
                  <option value="new">Baru</option>
                  <option value="reviewing">Sedang Ditinjau</option>
                  <option value="discussion">Diskusi</option>
                  <option value="quotation">Penawaran</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
            </div>

            {/* Tabel Request */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                    <th className="py-3 px-3">No. Request</th>
                    <th className="py-3 px-3">Nama Klien</th>
                    <th className="py-3 px-3">Jenis Website</th>
                    <th className="py-3 px-3">Budget</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Tanggal</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-indigo-600">
                        {req.request_number}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900">{req.client.name}</p>
                        {req.client.business_name && (
                          <p className="text-[11px] text-slate-500">{req.client.business_name}</p>
                        )}
                      </td>
                      <td className="py-3 px-3">{req.website_type}</td>
                      <td className="py-3 px-3">{req.budget_range}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            REQUEST_STATUS_LABELS[req.status].color
                          }`}
                        >
                          {REQUEST_STATUS_LABELS[req.status].label}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500">
                        {new Date(req.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedRequest(req)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                            title="Lihat Detail Lengkap"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`https://wa.me/${req.client.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Halo ${req.client.name}, kami telah menerima pengajuan website Anda dengan nomor ${req.request_number}. Mari kita diskusikan penawaran terbaiknya.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
                            title="Chat Klien via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          {req.status !== 'approved' && (
                            <button
                              onClick={() => {
                                setConvertingRequest(req);
                                setOrderProjectName(`Website ${req.website_type} ${req.client.business_name || req.client.name}`);
                                setOrderEstimatedDate(
                                  new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                                );
                              }}
                              className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] cursor-pointer"
                              title="Setujui dan Buat Pesanan Resmi"
                            >
                              Jadikan Pesanan
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 3: MANAJEMEN PESANAN RESMI (ORDERS)
        ============================================================ */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Manajemen Pesanan Resmi & Order Tracking</h2>
                <p className="text-xs text-slate-500">
                  Perbarui persentase progress, tambahkan catatan timeline, dan kelola status pembayaran.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {allOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all space-y-4 bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-sm text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                          {order.order_number}
                        </span>
                        <span className="text-xs text-slate-500">• Klien: <strong>{order.client.name}</strong></span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{order.project_name}</h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Pembayaran */}
                      <select
                        value={order.payment_status}
                        onChange={(e) => {
                          storageService.updateOrder(order.id, {
                            payment_status: e.target.value as PaymentStatus,
                          });
                          triggerRefresh();
                        }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer ${
                          PAYMENT_STATUS_LABELS[order.payment_status].color
                        }`}
                      >
                        <option value="unpaid">Belum Dibayar</option>
                        <option value="dp_paid">DP Dibayar</option>
                        <option value="partially_paid">Sebagian Dibayar</option>
                        <option value="paid">Lunas</option>
                      </select>

                      {/* Status Pengerjaan Proyek */}
                      <select
                        value={order.project_status}
                        onChange={(e) => {
                          storageService.updateOrder(order.id, {
                            project_status: e.target.value as ProjectStatus,
                          });
                          triggerRefresh();
                        }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer ${
                          PROJECT_STATUS_LABELS[order.project_status].color
                        }`}
                      >
                        <option value="not_started">Belum Dimulai</option>
                        <option value="in_progress">Sedang Dikerjakan</option>
                        <option value="revision">Revisi</option>
                        <option value="testing">Testing</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </div>
                  </div>

                  {/* Kontrol Progress Slider Langsung */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">
                        Persentase Progress: <strong className="text-indigo-600 text-sm">{order.progress_percentage}%</strong>
                      </span>
                      <span className="text-slate-500">
                        Tahap: <strong className="text-slate-800">{order.current_stage}</strong>
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={order.progress_percentage}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        storageService.updateOrder(order.id, { progress_percentage: val });
                        triggerRefresh();
                      }}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Estimasi Selesai: {order.estimated_completion}</span>
                      <span>Total Biaya: Rp{order.total_price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Tombol Aksi Tambah Update Log & Hapus */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      {order.updates.length} Catatan update telah dipublikasikan ke klien
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrderForUpdate(order);
                          setUpdateProgress(order.progress_percentage);
                          setUpdateStage(order.current_stage);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Update Timeline</span>
                      </button>

                      <button
                        onClick={() => {
                          const ok = confirm(`Hapus pesanan ${order.order_number}?`);
                          if (ok) {
                            storageService.deleteOrder(order.id);
                            triggerRefresh();
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 cursor-pointer"
                        title="Hapus Pesanan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 4: MANAJEMEN PORTOFOLIO
        ============================================================ */}
        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Kelola Portofolio Website</h2>
                <p className="text-xs text-slate-500">
                  Tambah dan kelola karya proyek yang tampil pada galeri publik.
                </p>
              </div>

              <button
                onClick={() => setShowAddPortfolioModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allPortfolio.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/40">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-200">
                    <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.short_description}</p>
                  <div className="flex justify-end pt-2 border-t border-slate-200">
                    <button
                      onClick={() => {
                        const ok = confirm(`Hapus portofolio "${item.title}"?`);
                        if (ok) {
                          storageService.deletePortfolio(item.id);
                          triggerRefresh();
                        }
                      }}
                      className="text-xs text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================
          MODAL DETAIL REQUEST
      ============================================================ */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                  {selectedRequest.request_number}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Detail Pengajuan Proyek</h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-700 text-sm p-2"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Nama Klien:</span>
                <p className="font-bold text-slate-900 text-sm">{selectedRequest.client.name}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Bisnis:</span>
                <p className="font-bold text-slate-900 text-sm">
                  {selectedRequest.client.business_name || '-'}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">WhatsApp:</span>
                <p className="font-bold text-slate-900">{selectedRequest.client.whatsapp_number}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Email:</span>
                <p className="font-bold text-slate-900">{selectedRequest.client.email}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Jenis Website:</span>
                <p className="font-bold text-indigo-600">{selectedRequest.website_type}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Perkiraan Budget:</span>
                <p className="font-bold text-slate-900">{selectedRequest.budget_range}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Deskripsi Kebutuhan:</span>
              <p className="p-3.5 rounded-xl bg-slate-50 text-slate-700 leading-relaxed border border-slate-100">
                {selectedRequest.description}
              </p>
            </div>

            {selectedRequest.features && (
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700 block">Fitur Khusus:</span>
                <p className="p-2.5 rounded-xl bg-slate-50 text-slate-700">{selectedRequest.features}</p>
              </div>
            )}

            {/* Siklus Status Request */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Ubah Siklus Status Request:
              </label>
              <div className="flex flex-wrap gap-2">
                {(['new', 'reviewing', 'discussion', 'quotation', 'approved', 'rejected'] as RequestStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        storageService.updateRequestStatus(selectedRequest.id, st);
                        setSelectedRequest({ ...selectedRequest, status: st });
                        triggerRefresh();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedRequest.status === st
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {REQUEST_STATUS_LABELS[st].label}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDeleteRequest(selectedRequest.id, selectedRequest.request_number)}
                className="text-xs text-rose-600 hover:underline cursor-pointer"
              >
                Hapus Request Ini
              </button>
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL KONVERSI KE PESANAN RESMI (ORDER)
      ============================================================ */}
      {convertingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Konfirmasi Pesanan Resmi</h3>
              <p className="text-xs text-slate-500 mt-1">
                Mengubah request <strong>{convertingRequest.request_number}</strong> menjadi Nomor Pesanan resmi (WEB-YYYY-XXXX).
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Nama Proyek Website
                </label>
                <input
                  type="text"
                  value={orderProjectName}
                  onChange={(e) => setOrderProjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Total Nilai Kontrak (Rp)
                </label>
                <input
                  type="number"
                  value={orderTotalPrice}
                  onChange={(e) => setOrderTotalPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Estimasi Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={orderEstimatedDate}
                  onChange={(e) => setOrderEstimatedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConvertingRequest(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmConvertOrder}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Terbitkan Nomor Pesanan Resmi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL TAMBAH LOG UPDATE PROJEK (TIMELINE)
      ============================================================ */}
      {selectedOrderForUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddProjectUpdate}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5"
          >
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600">
                {selectedOrderForUpdate.order_number}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Tambah Catatan Update Timeline</h3>
              <p className="text-xs text-slate-500">
                Catatan ini akan langsung dapat dilihat oleh klien pada halaman pelacakan pesanan.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Tahapan Pengerjaan (Stage)
                </label>
                <select
                  value={updateStage}
                  onChange={(e) => setUpdateStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-600 cursor-pointer"
                >
                  {STANDARD_MILESTONES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Judul Update
                </label>
                <input
                  type="text"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  placeholder="Contoh: Desain Antarmuka Selesai & Disetujui"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Persentase Progress Baru: <span className="text-indigo-600 font-bold">{updateProgress}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={updateProgress}
                  onChange={(e) => setUpdateProgress(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Rincian Catatan / Penjelasan Progres
                </label>
                <textarea
                  rows={3}
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  placeholder="Tuliskan apa saja yang telah dikerjakan atau sedang diuji..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedOrderForUpdate(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Publikasikan Update
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================
          MODAL TAMBAH PORTOFOLIO BARU
      ============================================================ */}
      {showAddPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreatePortfolio}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">Tambah Proyek Portofolio</h3>
              <p className="text-xs text-slate-500">Tampilkan karya website baru pada galeri Anda.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Judul Proyek</label>
                <input
                  type="text"
                  value={newPortTitle}
                  onChange={(e) => setNewPortTitle(e.target.value)}
                  placeholder="Contoh: Website Travel Nusantara"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Kategori</label>
                <select
                  value={newPortCategory}
                  onChange={(e) => setNewPortCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newPortDesc}
                  onChange={(e) => setNewPortDesc(e.target.value)}
                  placeholder="Ringkasan singkat mengenai website yang dibuat..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Teknologi (Pisahkan koma)</label>
                <input
                  type="text"
                  value={newPortTech}
                  onChange={(e) => setNewPortTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">URL Gambar Thumbnail</label>
                <input
                  type="url"
                  value={newPortThumb}
                  onChange={(e) => setNewPortThumb(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddPortfolioModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Simpan Proyek
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
