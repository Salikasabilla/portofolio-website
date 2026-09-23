/**
 * Utilitas Integrasi WhatsApp
 * Menggunakan format tautan wa.me dengan pesan otomatis berbahasa Indonesia
 */

const DEFAULT_PHONE = (import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890').replace(/[^0-9]/g, '');

/**
 * Membuat tautan WhatsApp untuk mendiskusikan nomor request yang baru dikirimkan
 */
export function getWhatsAppRequestLink(requestNumber: string, clientName?: string): string {
  const greeting = clientName ? `Halo, saya ${clientName}. ` : 'Halo, ';
  const message = `${greeting}saya baru saja mengirim request pembuatan website dengan nomor ${requestNumber}. Saya ingin mendiskusikan kebutuhan project saya.`;
  return `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Membuat tautan WhatsApp untuk menanyakan progres pesanan resmi
 */
export function getWhatsAppOrderLink(orderNumber: string, projectName?: string): string {
  const projectInfo = projectName ? ` untuk proyek "${projectName}"` : '';
  const message = `Halo, saya ingin menanyakan perkembangan pengerjaan website saya${projectInfo} dengan nomor pesanan ${orderNumber}.`;
  return `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Membuat tautan WhatsApp umum untuk konsultasi
 */
export function getWhatsAppConsultationLink(serviceName?: string): string {
  const serviceText = serviceName ? ` mengenai layanan ${serviceName}` : '';
  const message = `Halo, saya tertarik berkonsultasi${serviceText} untuk pembuatan website bisnis saya.`;
  return `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Memformat nomor WhatsApp agar nyaman dibaca (misal: +62 812-3456-7890)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('62')) {
    return `+62 ${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
  }
  return phone;
}
