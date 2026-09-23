/**
 * Komponen Utama Aplikasi (App.tsx)
 * Menghubungkan seluruh modul publik (Beranda, Tentang, Layanan, Portofolio, Kontak, Buat Website, Lacak Pesanan)
 * serta Panel Administrasi (Dashboard, Manajemen Request, Manajemen Pesanan & Timeline).
 * Semua konten antarmuka pengguna dalam Bahasa Indonesia.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { HomeView } from './views/public/HomeView';
import { AboutView } from './views/public/AboutView';
import { ServicesView } from './views/public/ServicesView';
import { PortfolioView } from './views/public/PortfolioView';
import { ContactView } from './views/public/ContactView';
import { RequestFormView } from './views/public/RequestFormView';
import { OrderTrackingView } from './views/public/OrderTrackingView';
import { AdminLoginModal } from './views/admin/AdminLoginModal';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { storageService } from './services/storage';
import { AdminUser, WebsiteType } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [navigationMeta, setNavigationMeta] = useState<any>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Inisialisasi session admin dari storage saat awal render
  useEffect(() => {
    const user = storageService.getAdminSession();
    if (user) {
      setAdminUser(user);
    }
  }, []);

  // Router navigasi internal
  const handleNavigate = (tab: string, meta?: any) => {
    setCurrentTab(tab);
    setNavigationMeta(meta || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setCurrentTab('admin-dashboard');
  };

  const handleAdminLogout = () => {
    storageService.adminLogout();
    setAdminUser(null);
    if (currentTab === 'admin-dashboard') {
      setCurrentTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Navbar Publik (Kecuali jika sedang dalam mode full admin dashboard) */}
      {currentTab !== 'admin-dashboard' && (
        <Navbar
          currentTab={currentTab}
          onNavigate={handleNavigate}
          adminUser={adminUser}
          onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
          onLogoutAdmin={handleAdminLogout}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {currentTab === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentTab === 'services' && (
          <ServicesView onNavigate={handleNavigate} />
        )}

        {currentTab === 'portfolio' && (
          <PortfolioView onNavigate={handleNavigate} />
        )}

        {currentTab === 'contact' && (
          <ContactView onNavigate={handleNavigate} />
        )}

        {currentTab === 'request-form' && (
          <RequestFormView
            initialWebsiteType={navigationMeta?.websiteType as WebsiteType | undefined}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'tracking' && (
          <OrderTrackingView
            initialOrderNumber={navigationMeta?.orderNumber}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'admin-dashboard' && adminUser && (
          <AdminDashboardView
            adminUser={adminUser}
            onLogout={handleAdminLogout}
            onNavigateToPublic={(tab) => handleNavigate(tab)}
          />
        )}
      </main>

      {/* Footer Publik */}
      {currentTab !== 'admin-dashboard' && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* Modal Login Admin */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
