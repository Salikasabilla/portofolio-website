/**
 * Halaman Portofolio (Portfolio Page)
 * Galeri proyek karya dengan filter kategori, rincian teknologi yang digunakan,
 * tautan live demo, dan repositori GitHub.
 */

import React, { useState } from 'react';
import { ExternalLink, Github, Layers, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { storageService } from '../../services/storage';
import { PortfolioCategory, PortfolioProject } from '../../types';

interface PortfolioViewProps {
  onNavigate: (tab: string, meta?: any) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const allProjects = storageService.getPortfolio();

  const categories = ['Semua', 'Web Development', 'UI/UX Design', 'Lainnya'];

  const filteredProjects =
    activeCategory === 'Semua'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
          Galeri Proyek & Eksplorasi
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Portofolio Pengembangan Web & Desain
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Berikut adalah beberapa proyek nyata yang telah saya selesaikan untuk klien UMKM, korporat, maupun riset pengembangan arsitektur web modern.
        </p>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === category
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500 hidden sm:block">
          Menampilkan {filteredProjects.length} proyek
        </span>
      </div>

      {/* Grid Proyek */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Belum ada proyek dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Thumbnail Proyek */}
              <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium">
                    {project.category}
                  </span>
                  {project.completion_year && (
                    <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-semibold">
                      {project.completion_year}
                    </span>
                  )}
                </div>
              </div>

              {/* Rincian Konten */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {project.short_description}
                  </p>

                  {/* Tag Teknologi */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech_stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tautan Aksi */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {project.demo_url ? (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5"
                    >
                      <span>Buka Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Arsip Internal</span>
                  )}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repositori</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Banner Ajakan Bawah */}
      <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-200/70 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            Tertarik Membuat Website Seperti Proyek Di Atas?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Diskusikan ide Anda sekarang dan mari wujudkan platform digital impian bisnis Anda.
          </p>
        </div>
        <button
          onClick={() => onNavigate('request-form')}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all whitespace-nowrap cursor-pointer"
        >
          Ajukan Pembuatan Website
        </button>
      </div>
    </div>
  );
};
