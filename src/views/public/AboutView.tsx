/**
 * Halaman Tentang Saya (About Page)
 * Berisi profil developer, riwayat pendidikan, keahlian teknis,
 * pengalaman pengembangan web, pengalaman organisasi, dan visi karier.
 */

import React from 'react';
import {
  Code,
  GraduationCap,
  Briefcase,
  Users,
  Target,
  CheckCircle,
  FileCode2,
  Terminal,
  Cpu,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate?: (tab: string, meta?: any) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const devName = import.meta.env.VITE_DEVELOPER_NAME || 'Salika Sabilla';

  const skillGroups = [
    {
      category: 'Frontend Development',
      skills: ['HTML5 & Semantic Markup', 'Tailwind CSS', 'CSS3 / Flex & Grid', 'JavaScript (ES6+)', 'TypeScript', 'Responsive Design'],
    },
    {
      category: 'Backend & Database',
      skills: ['PHP', 'Laravel Framework', 'MySQL Relational Schema', 'Node.js & Express', 'RESTful API Design', 'Authentication & Authorization'],
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git & GitHub Workflow', 'Vite Bundler', 'VS Code', 'Postman API Testing', 'Cloud Deployment (Cloud Run/VPS)', 'Blade Templating'],
    },
  ];

  const experiences = [
    {
      period: '2024 - Sekarang',
      role: 'Freelance Full-Stack Web Developer',
      place: 'Mandiri / Klien UMKM & Korporat',
      description:
        'Merancang dan membangun solusi website company profile, landing page berkonversi tinggi, serta sistem informasi manajemen kustom. Menangani seluruh siklus proyek dari requirement gathering, prototyping UI/UX, database architecture, hingga live deployment.',
    },
    {
      period: '2023 - 2024',
      role: 'Junior Web Developer & Designer',
      place: 'Agensi Digital & Proyek Tim',
      description:
        'Mengembangkan modul antarmuka pengguna berbasis Tailwind CSS, integrasi API backend, optimasi performa loading aset web, serta pemeliharaan sistem inventaris berbasis Laravel dan database MySQL.',
    },
  ];

  const organizations = [
    {
      period: '2023 - 2024',
      role: 'Koordinator Divisi Teknologi & Informasi',
      place: 'Himpunan Mahasiswa Informatika / Komunitas Developer',
      description:
        'Mengelola pemeliharaan website resmi himpunan, menyelenggarakan lokakarya pemrograman web untuk mahasiswa baru, serta mengoordinasikan tim teknis pada kompetisi hackathon tahunan.',
    },
    {
      period: '2022 - 2023',
      role: 'Staff Publikasi & Dokumentasi Digital',
      place: 'Unit Kegiatan Mahasiswa Multimedia',
      description:
        'Merancang aset visual publikasi kegiatan, banner promosi digital, dan mengelola media publikasi daring.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Halaman */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
          Profil Pengembang
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Tentang Saya & Pendekatan Kerja
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Saya seorang Full-Stack Web Developer yang berfokus pada penciptaan website yang tidak hanya indah secara visual, tetapi juga kokoh secara struktur, cepat dimuat, dan memberikan dampak nyata bagi bisnis klien.
        </p>
      </div>

      {/* Profil Singkat & Visi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Perjalanan & Filosofi Coding</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Memulai perjalanan pemrograman dari ketertarikan menyederhanakan proses bisnis melalui teknologi web. Bagi saya, kode yang baik adalah kode yang bersih, mudah dipahami, berstruktur rapi, dan mampu menyelesaikan masalah nyata pengguna.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dalam setiap proyek pembuatan website, saya selalu memprioritaskan keamanan data, kompatibilitas lintas perangkat (mobile-first), dan kemudahan bagi pemilik website untuk mengelola konten mereka secara mandiri.
            </p>
          </div>

          {/* Visi Karier */}
          <div className="bg-indigo-50/70 border border-indigo-100 p-8 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-indigo-800 font-bold text-base">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Tujuan & Visi Karier</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Terus berkembang menjadi Software Architect yang handal dalam merancang sistem skala besar dengan standar clean architecture, sembari aktif membantu para pelaku UMKM dan perusahaan lokal di Indonesia memaksimalkan kehadiran digital mereka.
            </p>
          </div>
        </div>

        {/* Info Cepat / Pendidikan */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base pb-3 border-b border-slate-100">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Pendidikan Formal</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">S1 Teknik Informatika / Ilmu Komputer</p>
              <p className="text-xs text-slate-500 mt-0.5">Fokus Rekayasa Perangkat Lunak & Sistem Basis Data</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                2021 - 2025
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base pb-3 border-b border-slate-100">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <span>Fokus Keahlian Utama</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pengembangan Full-Stack MVC</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Perancangan Database Relasional (MySQL)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>UI/UX Responsif dengan Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sistem Integrasi WhatsApp & Tracking Pesanan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Keahlian Teknis */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
            Keterampilan Teknis
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Teknologi & Perangkat Pengembangan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4 pb-2 border-b border-slate-100">
                {group.category}
              </h3>
              <ul className="space-y-2.5">
                {group.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pengalaman Kerja / Pengembangan */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900">
          <Briefcase className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Riwayat Pengalaman Pengembangan Web</h2>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="font-bold text-slate-900 text-base">{exp.role}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 w-fit">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 mb-3">{exp.place}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pengalaman Organisasi */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900">
          <Users className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Pengalaman Organisasi & Kepemimpinan</h2>
        </div>

        <div className="space-y-4">
          {organizations.map((org, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="font-bold text-slate-900 text-base">{org.role}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 w-fit">
                  {org.period}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 mb-3">{org.place}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{org.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
