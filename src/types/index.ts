/**
 * Tipe Data & Definisi Model (TypeScript)
 * Merefleksikan struktur tabel database: users, clients, requests, orders, project_updates, portfolio_projects, services.
 */

export type WebsiteType =
  | 'Landing Page'
  | 'Company Profile'
  | 'Toko Online'
  | 'Sistem Informasi'
  | 'Custom Website';

export type BudgetRange =
  | 'Di bawah Rp1.000.000'
  | 'Rp1.000.000–Rp3.000.000'
  | 'Rp3.000.000–Rp5.000.000'
  | 'Di atas Rp5.000.000'
  | 'Belum menentukan';

export type RequestStatus =
  | 'new'
  | 'reviewing'
  | 'discussion'
  | 'quotation'
  | 'approved'
  | 'rejected';

export type PaymentStatus =
  | 'unpaid'
  | 'dp_paid'
  | 'partially_paid'
  | 'paid';

export type ProjectStatus =
  | 'not_started'
  | 'in_progress'
  | 'revision'
  | 'testing'
  | 'completed'
  | 'cancelled';

export type PortfolioCategory =
  | 'Web Development'
  | 'UI/UX Design'
  | 'Lainnya';

export interface Client {
  id: string;
  name: string;
  business_name?: string;
  whatsapp_number: string;
  email: string;
  created_at: string;
}

export interface ProjectRequest {
  id: string;
  request_number: string; // e.g. REQ-2026-0001
  client_id: string;
  client: Client;
  website_type: WebsiteType;
  description: string;
  features?: string;
  reference_url?: string;
  page_count?: string;
  target_deadline?: string;
  budget_range: BudgetRange;
  status: RequestStatus;
  admin_notes?: string;
  order_id?: string; // Tautan ke order jika sudah dikonversi
  created_at: string;
  updated_at: string;
}

export interface ProjectUpdate {
  id: string;
  order_id: string;
  title: string;
  description: string;
  progress_percentage: number;
  stage_name: string;
  update_date: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string; // e.g. WEB-2026-0001
  client_id: string;
  client: Client;
  request_id?: string;
  project_name: string;
  website_type: WebsiteType;
  start_date: string;
  estimated_completion: string;
  total_price: number;
  payment_status: PaymentStatus;
  project_status: ProjectStatus;
  progress_percentage: number;
  current_stage: string;
  updates: ProjectUpdate[];
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: PortfolioCategory;
  short_description: string;
  tech_stack: string[];
  thumbnail_url: string;
  demo_url?: string;
  github_url?: string;
  is_featured: boolean;
  completion_year: string;
}

export interface ServiceItem {
  id: string;
  name: WebsiteType;
  slug: string;
  description: string;
  features: string[];
  starting_price: number;
  is_popular?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

// Label Bahasa Indonesia & Helper Pemetaan Status
export const REQUEST_STATUS_LABELS: Record<RequestStatus, { label: string; color: string }> = {
  new: { label: 'Baru', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  reviewing: { label: 'Sedang Ditinjau', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  discussion: { label: 'Diskusi', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  quotation: { label: 'Penawaran', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  approved: { label: 'Disetujui', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  rejected: { label: 'Ditolak', color: 'bg-rose-100 text-rose-800 border-rose-200' },
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, { label: string; color: string }> = {
  unpaid: { label: 'Belum Dibayar', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  dp_paid: { label: 'DP Dibayar', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  partially_paid: { label: 'Sebagian Dibayar', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  paid: { label: 'Lunas', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, { label: string; color: string }> = {
  not_started: { label: 'Belum Dimulai', color: 'bg-slate-100 text-slate-800 border-slate-200' },
  in_progress: { label: 'Sedang Dikerjakan', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  revision: { label: 'Revisi', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  testing: { label: 'Testing', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  completed: { label: 'Selesai', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  cancelled: { label: 'Dibatalkan', color: 'bg-rose-100 text-rose-800 border-rose-200' },
};

export const STANDARD_MILESTONES = [
  'Brief & Analisis Kebutuhan',
  'Perancangan UI/UX Desain',
  'Pengembangan Frontend Web',
  'Pengembangan Backend & Database',
  'Pengujian Sistem & Keamanan',
  'Sesi Revisi & Penyesuaian Klien',
  'Peluncuran & Deployment Final',
];
