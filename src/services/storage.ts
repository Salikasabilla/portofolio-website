/**
 * Layer Layanan Penyimpanan & Basis Data (Data Persistence & Mock MySQL/Eloquent Store)
 * Menyediakan fungsionalitas CRUD, relasi antar entitas, penomoran otomatis,
 * serta pemisahan data publik (tanpa mengekspos kontak atau data sensitif).
 */

import {
  AdminUser,
  Client,
  Order,
  PortfolioProject,
  ProjectRequest,
  ProjectUpdate,
  RequestStatus,
  ServiceItem,
} from '../types';

const STORAGE_KEYS = {
  CLIENTS: 'portfolio_clients',
  REQUESTS: 'portfolio_requests',
  ORDERS: 'portfolio_orders',
  PORTFOLIO: 'portfolio_projects',
  SERVICES: 'portfolio_services',
  ADMIN_SESSION: 'portfolio_admin_session',
};

// Data Awal Layanan (Seeder Services)
const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Landing Page',
    slug: 'landing-page',
    description: 'Halaman promosi fokus tinggi untuk konversi penjualan, peluncuran produk, atau kampanye iklan digital.',
    features: [
      '1 Halaman Panjang Responsif',
      'Desain Visual Modern & Clean',
      'Kecepatan Loading Dioptimalkan',
      'Integrasi Tombol WhatsApp & Form',
      'SEO Dasar & Google Analytics Setup',
      'Revisi 2x & Panduan Pemakaian',
    ],
    starting_price: 850000,
    is_popular: false,
  },
  {
    id: 'srv-2',
    name: 'Company Profile',
    slug: 'company-profile',
    description: 'Membangun citra dan kredibilitas profesional bisnis Anda dengan profil perusahaan berstandar internasional.',
    features: [
      '4-7 Halaman (Home, Tentang, Layanan, Tim, Kontak)',
      'Desain Eksklusif Sesuai Branding Usaha',
      'Katalog Layanan & Portofolio Klien',
      'Domain & Hosting Setup Termasuk',
      'Panel Admin untuk Edit Konten',
      'Integrasi Google Maps & WhatsApp',
      'Revisi 3x & Garansi 1 Bulan',
    ],
    starting_price: 1650000,
    is_popular: true,
  },
  {
    id: 'srv-3',
    name: 'Toko Online',
    slug: 'toko-online',
    description: 'Platform e-commerce katalog produk lengkap dengan sistem checkout langsung ke WhatsApp atau Payment Gateway.',
    features: [
      'Katalog Produk Tanpa Batas',
      'Kategori & Fitur Pencarian Cepat',
      'Checkout Otomatis ke WhatsApp Admin',
      'Hitung Ongkos Kirim Otomatis (Opsional)',
      'Manajemen Stok & Banner Promo',
      'Dukungan Tampilan Mobile Sempurna',
    ],
    starting_price: 2750000,
    is_popular: false,
  },
  {
    id: 'srv-4',
    name: 'Sistem Informasi',
    slug: 'sistem-informasi',
    description: 'Aplikasi web kustom untuk manajemen data, absensi, inventaris, booking, atau operasional internal bisnis.',
    features: [
      'Arsitektur Database Relasional Aman',
      'Sistem Login Multi-Role & Hak Akses',
      'Dashboard Analitik & Rekap Laporan',
      'Export Data ke PDF & Excel',
      'Backup Data Terjadwal',
      'Pelatihan Penggunaan & Dokumentasi',
    ],
    starting_price: 4500000,
    is_popular: false,
  },
  {
    id: 'srv-5',
    name: 'Custom Website',
    slug: 'custom-website',
    description: 'Solusi website fleksibel yang dirancang khusus dari nol sesuai dengan alur bisnis unik dan kompleksitas Anda.',
    features: [
      'Full-Stack Custom Development',
      'Integrasi REST API Pihak Ketiga',
      'Kustomisasi Fitur Tanpa Batas',
      'Optimasi Kinerja Tinggi',
      'Dukungan Teknis Prioritas',
    ],
    starting_price: 3500000,
    is_popular: false,
  },
];

// Data Awal Proyek Portofolio (Seeder Projects)
const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'port-1',
    title: 'Website Company Profile Sabila Fashion',
    slug: 'company-profile-sabila-fashion',
    category: 'Web Development',
    short_description: 'Website profil merek busana muslimah kontemporer dengan galeri lookbook interaktif dan katalog koleksi.',
    tech_stack: ['Tailwind CSS', 'TypeScript', 'Node.js', 'Vite'],
    thumbnail_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://example.com/demo-sabila',
    github_url: 'https://github.com/example/sabila-fashion',
    is_featured: true,
    completion_year: '2026',
  },
  {
    id: 'port-2',
    title: 'Klinik Sehat Bahagia - Booking & Antrean',
    slug: 'klinik-sehat-bahagia',
    category: 'Web Development',
    short_description: 'Sistem profil klinik dan pendaftaran jadwal konsultasi dokter secara daring terintegrasi notifikasi pesan.',
    tech_stack: ['Laravel', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    thumbnail_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://example.com/demo-klinik',
    github_url: 'https://github.com/example/klinik-sehat',
    is_featured: true,
    completion_year: '2025',
  },
  {
    id: 'port-3',
    title: 'Dashboard Manajemen Logistik Nusantara',
    slug: 'dashboard-logistik-nusantara',
    category: 'Web Development',
    short_description: 'Sistem informasi monitoring pengiriman armada kargo dan laporan resi logistik antar pulau.',
    tech_stack: ['Express', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    thumbnail_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://example.com/demo-logistik',
    github_url: 'https://github.com/example/logistik-nusantara',
    is_featured: true,
    completion_year: '2025',
  },
  {
    id: 'port-4',
    title: 'Desain Antarmuka Mobile Foodie Nusantara',
    slug: 'ui-ux-foodie-nusantara',
    category: 'UI/UX Design',
    short_description: 'Eksplorasi antarmuka aplikasi pemesanan kuliner tradisional dengan pendekatan micro-interactions.',
    tech_stack: ['Figma', 'Prototyping', 'Design System'],
    thumbnail_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://example.com/figma-preview',
    is_featured: false,
    completion_year: '2026',
  },
];

// Helper membaca LocalStorage
function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultVal;
    return JSON.parse(item);
  } catch {
    return defaultVal;
  }
}

// Helper menulis LocalStorage
function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

class AppStorageService {
  constructor() {
    this.seedDefaultsIfEmpty();
  }

  private seedDefaultsIfEmpty() {
    // Layanan
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      setLocal(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    }
    // Portofolio
    if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
      setLocal(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
    }
    // Data Klien & Request Awal (Contoh Nyata)
    if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
      const defaultClient: Client = {
        id: 'client-1',
        name: 'Ibu Ratna Sabila',
        business_name: 'Sabila Fashion Store',
        whatsapp_number: '081234567890',
        email: 'ratna@sabilafashion.com',
        created_at: '2026-09-10T10:00:00.000Z',
      };
      setLocal(STORAGE_KEYS.CLIENTS, [defaultClient]);

      const defaultRequest: ProjectRequest = {
        id: 'req-1',
        request_number: 'REQ-2026-0001',
        client_id: defaultClient.id,
        client: defaultClient,
        website_type: 'Company Profile',
        description: 'Membutuhkan website company profile elegan untuk butik busana muslimah, ada galeri katalog produk terbaru dan kontak WhatsApp.',
        features: 'Galeri Foto, Katalog Busana, Formulir Kontak, Integrasi WhatsApp, Peta Lokasi Butik',
        reference_url: 'https://sabilafashion.com',
        page_count: '5-10 Halaman',
        target_deadline: '2026-09-30',
        budget_range: 'Rp1.000.000–Rp3.000.000',
        status: 'approved',
        admin_notes: 'Klien telah sepakat penawaran dan membayar uang muka (DP).',
        order_id: 'order-1',
        created_at: '2026-09-12T08:30:00.000Z',
        updated_at: '2026-09-15T09:00:00.000Z',
      };

      const secondRequest: ProjectRequest = {
        id: 'req-2',
        request_number: 'REQ-2026-0002',
        client_id: defaultClient.id,
        client: defaultClient,
        website_type: 'Toko Online',
        description: 'Ingin membuat toko online UMKM untuk produk kerajinan tangan khas Jawa Barat, checkout via WhatsApp.',
        features: 'Katalog Produk, Filter Kategori, Tombol Pesan WhatsApp per Produk',
        page_count: '1-5 Halaman',
        target_deadline: '2026-10-15',
        budget_range: 'Rp3.000.000–Rp5.000.000',
        status: 'new',
        created_at: '2026-09-21T14:15:00.000Z',
        updated_at: '2026-09-21T14:15:00.000Z',
      };

      setLocal(STORAGE_KEYS.REQUESTS, [defaultRequest, secondRequest]);

      // Seed Order Resmi WEB-2026-0001 sesuai deskripsi prompt (Progress 70%)
      const defaultUpdates: ProjectUpdate[] = [
        {
          id: 'upd-1',
          order_id: 'order-1',
          title: 'Brief & Pengumpulan Kebutuhan Disetujui',
          description: 'Diskusi struktur konten, pemilihan palet warna, dan aset foto butik selesai.',
          progress_percentage: 20,
          stage_name: 'Brief & Analisis Kebutuhan',
          update_date: '2026-09-14',
          created_at: '2026-09-14T10:00:00.000Z',
        },
        {
          id: 'upd-2',
          order_id: 'order-1',
          title: 'Perancangan UI/UX & Wireframe',
          description: 'Desain antarmuka responsif telah disetujui oleh klien.',
          progress_percentage: 40,
          stage_name: 'Perancangan UI/UX Desain',
          update_date: '2026-09-18',
          created_at: '2026-09-18T16:00:00.000Z',
        },
        {
          id: 'upd-3',
          order_id: 'order-1',
          title: 'Pengembangan Frontend Web Selesai',
          description: 'Halaman beranda, galeri lookbook, dan katalog telah selesai dibangun dengan Tailwind CSS.',
          progress_percentage: 60,
          stage_name: 'Pengembangan Frontend Web',
          update_date: '2026-09-20',
          created_at: '2026-09-20T17:30:00.000Z',
        },
        {
          id: 'upd-4',
          order_id: 'order-1',
          title: 'Integrasi Backend & Form WhatsApp',
          description: 'Pengembangan backend dan database sedang dalam tahap integrasi.',
          progress_percentage: 70,
          stage_name: 'Pengembangan Backend & Database',
          update_date: '2026-09-22',
          created_at: '2026-09-22T09:00:00.000Z',
        },
      ];

      const defaultOrder: Order = {
        id: 'order-1',
        order_number: 'WEB-2026-0001',
        client_id: defaultClient.id,
        client: defaultClient,
        request_id: defaultRequest.id,
        project_name: 'Website Company Profile Sabila Fashion',
        website_type: 'Company Profile',
        start_date: '2026-09-15',
        estimated_completion: '2026-09-30',
        total_price: 1800000,
        payment_status: 'dp_paid',
        project_status: 'in_progress',
        progress_percentage: 70,
        current_stage: 'Pengembangan Backend & Database',
        updates: defaultUpdates,
        created_at: '2026-09-15T09:00:00.000Z',
        updated_at: '2026-09-22T09:00:00.000Z',
      };

      setLocal(STORAGE_KEYS.ORDERS, [defaultOrder]);
    }
  }

  // SERVICES
  public getServices(): ServiceItem[] {
    return getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }

  public updateService(updated: ServiceItem): void {
    const services = this.getServices().map((s) => (s.id === updated.id ? updated : s));
    setLocal(STORAGE_KEYS.SERVICES, services);
  }

  // PORTFOLIO
  public getPortfolio(): PortfolioProject[] {
    return getLocal<PortfolioProject[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  }

  public addPortfolio(item: Omit<PortfolioProject, 'id'>): PortfolioProject {
    const portfolio = this.getPortfolio();
    const newProject: PortfolioProject = {
      ...item,
      id: `port-${Date.now()}`,
    };
    portfolio.unshift(newProject);
    setLocal(STORAGE_KEYS.PORTFOLIO, portfolio);
    return newProject;
  }

  public deletePortfolio(id: string): void {
    const portfolio = this.getPortfolio().filter((p) => p.id !== id);
    setLocal(STORAGE_KEYS.PORTFOLIO, portfolio);
  }

  // CLIENTS
  public getClients(): Client[] {
    return getLocal<Client[]>(STORAGE_KEYS.CLIENTS, []);
  }

  private findOrCreateClient(clientData: {
    name: string;
    business_name?: string;
    whatsapp_number: string;
    email: string;
  }): Client {
    const clients = this.getClients();
    const existing = clients.find(
      (c) => c.whatsapp_number === clientData.whatsapp_number || c.email.toLowerCase() === clientData.email.toLowerCase()
    );
    if (existing) {
      existing.name = clientData.name;
      if (clientData.business_name) existing.business_name = clientData.business_name;
      setLocal(STORAGE_KEYS.CLIENTS, clients);
      return existing;
    }

    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: clientData.name,
      business_name: clientData.business_name,
      whatsapp_number: clientData.whatsapp_number,
      email: clientData.email.toLowerCase(),
      created_at: new Date().toISOString(),
    };
    clients.push(newClient);
    setLocal(STORAGE_KEYS.CLIENTS, clients);
    return newClient;
  }

  // GENERATE REQUEST NUMBER: REQ-YYYY-XXXX
  private generateRequestNumber(): string {
    const year = new Date().getFullYear();
    const requests = this.getAllRequests();
    const thisYearRequests = requests.filter((r) => r.request_number.startsWith(`REQ-${year}`));
    const nextSeq = thisYearRequests.length + 1;
    return `REQ-${year}-${String(nextSeq).padStart(4, '0')}`;
  }

  // SUBMIT REQUEST DARI KLIEN
  public createRequest(data: {
    name: string;
    business_name?: string;
    whatsapp_number: string;
    email: string;
    website_type: ProjectRequest['website_type'];
    description: string;
    features?: string;
    reference_url?: string;
    page_count?: string;
    target_deadline?: string;
    budget_range: ProjectRequest['budget_range'];
  }): ProjectRequest {
    const client = this.findOrCreateClient({
      name: data.name,
      business_name: data.business_name,
      whatsapp_number: data.whatsapp_number,
      email: data.email,
    });

    const requests = this.getAllRequests();
    const requestNumber = this.generateRequestNumber();

    const newRequest: ProjectRequest = {
      id: `req-${Date.now()}`,
      request_number: requestNumber,
      client_id: client.id,
      client,
      website_type: data.website_type,
      description: data.description,
      features: data.features,
      reference_url: data.reference_url,
      page_count: data.page_count,
      target_deadline: data.target_deadline,
      budget_range: data.budget_range,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    requests.unshift(newRequest);
    setLocal(STORAGE_KEYS.REQUESTS, requests);
    return newRequest;
  }

  public getAllRequests(): ProjectRequest[] {
    return getLocal<ProjectRequest[]>(STORAGE_KEYS.REQUESTS, []);
  }

  public getRequestByNumber(reqNumber: string): ProjectRequest | null {
    const cleanNumber = reqNumber.trim().toUpperCase();
    return this.getAllRequests().find((r) => r.request_number === cleanNumber) || null;
  }

  public updateRequestStatus(id: string, status: RequestStatus, adminNotes?: string): ProjectRequest | null {
    const requests = this.getAllRequests();
    const target = requests.find((r) => r.id === id);
    if (!target) return null;

    target.status = status;
    if (adminNotes !== undefined) target.admin_notes = adminNotes;
    target.updated_at = new Date().toISOString();

    setLocal(STORAGE_KEYS.REQUESTS, requests);
    return target;
  }

  public deleteRequest(id: string): void {
    const requests = this.getAllRequests().filter((r) => r.id !== id);
    setLocal(STORAGE_KEYS.REQUESTS, requests);
  }

  // GENERATE ORDER NUMBER: WEB-YYYY-XXXX
  private generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const orders = this.getAllOrders();
    const thisYearOrders = orders.filter((o) => o.order_number.startsWith(`WEB-${year}`));
    const nextSeq = thisYearOrders.length + 1;
    return `WEB-${year}-${String(nextSeq).padStart(4, '0')}`;
  }

  // CONVERT REQUEST TO ORDER
  public convertRequestToOrder(
    requestId: string,
    orderParams: {
      project_name: string;
      total_price: number;
      estimated_completion: string;
      start_date?: string;
    }
  ): Order | null {
    const requests = this.getAllRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) return null;

    const orderNumber = this.generateOrderNumber();
    const orderId = `order-${Date.now()}`;
    const orders = this.getAllOrders();

    const initialUpdate: ProjectUpdate = {
      id: `upd-${Date.now()}`,
      order_id: orderId,
      title: 'Proyek Resmi Disetujui & Dibuat',
      description: 'Pesanan website telah resmi disepakati dan masuk ke antrean pengerjaan.',
      progress_percentage: 10,
      stage_name: 'Brief & Analisis Kebutuhan',
      update_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      client_id: req.client_id,
      client: req.client,
      request_id: req.id,
      project_name: orderParams.project_name,
      website_type: req.website_type,
      start_date: orderParams.start_date || new Date().toISOString().split('T')[0],
      estimated_completion: orderParams.estimated_completion,
      total_price: orderParams.total_price,
      payment_status: 'dp_paid',
      project_status: 'in_progress',
      progress_percentage: 10,
      current_stage: 'Brief & Analisis Kebutuhan',
      updates: [initialUpdate],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    setLocal(STORAGE_KEYS.ORDERS, orders);

    // Tandai status request menjadi approved dan kaitkan ID order
    req.status = 'approved';
    req.order_id = newOrder.id;
    req.updated_at = new Date().toISOString();
    setLocal(STORAGE_KEYS.REQUESTS, requests);

    return newOrder;
  }

  public getAllOrders(): Order[] {
    return getLocal<Order[]>(STORAGE_KEYS.ORDERS, []);
  }

  // PUBLIC TRACKING: HANYA MENGEMBALIKAN DATA TIDAK SENSITIF
  public trackOrderByNumber(orderNumber: string): {
    order_number: string;
    project_name: string;
    website_type: string;
    project_status: string;
    progress_percentage: number;
    current_stage: string;
    estimated_completion: string;
    latest_update: string;
    last_updated: string;
    updates: Array<{
      id: string;
      title: string;
      description: string;
      progress_percentage: number;
      stage_name: string;
      update_date: string;
    }>;
  } | null {
    const cleanNumber = orderNumber.trim().toUpperCase();
    const order = this.getAllOrders().find((o) => o.order_number === cleanNumber);
    if (!order) return null;

    const latest = order.updates.length > 0 ? order.updates[order.updates.length - 1] : null;

    return {
      order_number: order.order_number,
      project_name: order.project_name,
      website_type: order.website_type,
      project_status: order.project_status,
      progress_percentage: order.progress_percentage,
      current_stage: order.current_stage,
      estimated_completion: order.estimated_completion,
      latest_update: latest ? latest.description : 'Proyek baru saja dibuat.',
      last_updated: latest ? latest.update_date : order.start_date,
      updates: order.updates.map((u) => ({
        id: u.id,
        title: u.title,
        description: u.description,
        progress_percentage: u.progress_percentage,
        stage_name: u.stage_name,
        update_date: u.update_date,
      })),
    };
  }

  public getOrderById(id: string): Order | null {
    return this.getAllOrders().find((o) => o.id === id) || null;
  }

  public updateOrder(
    id: string,
    updates: Partial<Pick<Order, 'project_name' | 'project_status' | 'payment_status' | 'progress_percentage' | 'current_stage' | 'estimated_completion' | 'total_price'>>
  ): Order | null {
    const orders = this.getAllOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) return null;

    Object.assign(order, updates);
    order.updated_at = new Date().toISOString();
    setLocal(STORAGE_KEYS.ORDERS, orders);
    return order;
  }

  public addProjectUpdate(
    orderId: string,
    data: {
      title: string;
      description: string;
      progress_percentage: number;
      stage_name: string;
      update_date: string;
    }
  ): ProjectUpdate | null {
    const orders = this.getAllOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return null;

    const newUpdate: ProjectUpdate = {
      id: `upd-${Date.now()}`,
      order_id: orderId,
      title: data.title,
      description: data.description,
      progress_percentage: data.progress_percentage,
      stage_name: data.stage_name,
      update_date: data.update_date,
      created_at: new Date().toISOString(),
    };

    order.updates.push(newUpdate);
    order.progress_percentage = data.progress_percentage;
    order.current_stage = data.stage_name;
    order.updated_at = new Date().toISOString();

    setLocal(STORAGE_KEYS.ORDERS, orders);
    return newUpdate;
  }

  public deleteOrder(id: string): void {
    const orders = this.getAllOrders().filter((o) => o.id !== id);
    setLocal(STORAGE_KEYS.ORDERS, orders);
  }

  // ADMIN AUTHENTICATION
  public adminLogin(email: string, password: string): AdminUser | null {
    // Default admin: admin@sabildev.id / admin123
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@sabildev.id' && password === 'admin123') {
      const user: AdminUser = {
        id: 'admin-1',
        name: 'Administrator Salika',
        email: 'admin@sabildev.id',
        role: 'admin',
      };
      setLocal(STORAGE_KEYS.ADMIN_SESSION, user);
      return user;
    }
    return null;
  }

  public getAdminSession(): AdminUser | null {
    return getLocal<AdminUser | null>(STORAGE_KEYS.ADMIN_SESSION, null);
  }

  public adminLogout(): void {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }

  // DASHBOARD STATS
  public getDashboardStats() {
    const requests = this.getAllRequests();
    const orders = this.getAllOrders();

    const totalRequests = requests.length;
    const newRequests = requests.filter((r) => r.status === 'new').length;
    const activeProjects = orders.filter((o) => o.project_status === 'in_progress' || o.project_status === 'revision' || o.project_status === 'testing').length;
    const completedProjects = orders.filter((o) => o.project_status === 'completed').length;
    const revisionProjects = orders.filter((o) => o.project_status === 'revision').length;

    const totalRevenue = orders
      .filter((o) => o.payment_status === 'paid' || o.payment_status === 'partially_paid' || o.payment_status === 'dp_paid')
      .reduce((sum, o) => {
        if (o.payment_status === 'paid') return sum + o.total_price;
        if (o.payment_status === 'dp_paid') return sum + o.total_price * 0.5;
        if (o.payment_status === 'partially_paid') return sum + o.total_price * 0.75;
        return sum;
      }, 0);

    return {
      totalRequests,
      newRequests,
      activeProjects,
      completedProjects,
      revisionProjects,
      totalRevenue,
    };
  }
}

export const storageService = new AppStorageService();
