/**
 * Komponen Navigasi Utama (Header & Navbar)
 * Responsif untuk perangkat mobile dan desktop, semua teks dalam Bahasa Indonesia.
 */

import React, { useState } from 'react';
import { Menu, X, Globe, Shield, Send, Search, Sparkles } from 'lucide-react';
import { AdminUser } from '../../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, meta?: any) => void;
  adminUser: AdminUser | null;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  adminUser,
  onOpenAdminLogin,
  onLogoutAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'services', label: 'Layanan' },
    { id: 'portfolio', label: 'Portofolio' },
    { id: 'tracking', label: 'Lacak Pesanan', icon: Search },
    { id: 'contact', label: 'Kontak' },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identitas */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-indigo-600 transition-colors">
              <Globe className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-tight">
                Salika Sabilla
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Jasa Pembuatan Website & Full-Stack
              </span>
            </div>
          </button>

          {/* Navigasi Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Tombol Aksi Kanan */}
          <div className="hidden md:flex items-center gap-3">
            {adminUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    currentTab === 'admin-dashboard'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  Dashboard Admin
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="px-2.5 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium cursor-pointer"
                  title="Keluar dari sesi admin"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Masuk sebagai Administrator"
              >
                <Shield className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => handleNavClick('request-form')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              Ajukan Pembuatan Website
            </button>
          </div>

          {/* Tombol Hamburger Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('request-form')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Send className="w-3 h-3" />
              Pesan Web
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('request-form')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              Ajukan Pembuatan Website
            </button>

            {adminUser ? (
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  Dashboard Admin
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="px-3 py-2 rounded-lg text-xs text-rose-600 bg-rose-50 font-medium"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Login Administrator
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
