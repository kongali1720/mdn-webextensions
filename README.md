# 🔧 Web Extension Examples

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Browser Support](https://img.shields.io/badge/Browser-Chrome%20%7C%20Firefox%20%7C%20Edge-blue.svg)](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)

> Kumpulan contoh-contoh Web Extension yang praktis dan mudah dipahami untuk pembelajaran dan referensi pengembangan browser extension.

## 📋 Daftar Isi

- [Tentang Repository](#tentang-repository)
- [Struktur Folder](#struktur-folder)
- [Contoh Extension](#contoh-extension)
- [Cara Instalasi](#cara-instalasi)
- [Pengembangan](#pengembangan)
- [Kompatibilitas Browser](#kompatibilitas-browser)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## 🎯 Tentang Repository

Repository ini berisi kumpulan contoh-contoh Web Extension yang dirancang untuk:

- **Pembelajaran**: Memahami konsep dasar pengembangan browser extension
- **Referensi**: Template dan pola yang dapat digunakan dalam proyek nyata
- **Cross-browser**: Contoh yang kompatibel dengan Chrome, Firefox, dan Edge
- **Best Practices**: Implementasi yang mengikuti standar dan praktik terbaik

## 📁 Struktur Folder

```
web-extension-examples/
├── examples/                     # Contoh-contoh extension
│   ├── notify-link-clicks-i18n/  # Extension dengan notifikasi dan i18n
│   ├── simple-popup/             # Extension dengan popup sederhana
│   ├── content-script-demo/      # Demo content script
│   ├── background-script-demo/   # Demo background script
│   └── options-page-demo/        # Demo halaman pengaturan
├── docs/                         # Dokumentasi tambahan
├── assets/                       # Asset gambar dan ikon
└── README.md                     # Dokumentasi utama
```

## 🚀 Contoh Extension

### 1. Notify Link Clicks i18n
**Lokasi**: `examples/notify-link-clicks-i18n/`

Extension yang menampilkan notifikasi ketika user mengklik link, dengan dukungan internasionalisasi (i18n).

**Fitur**:
- ✅ Content script untuk mendeteksi klik link
- ✅ Background script untuk notifikasi
- ✅ Dukungan multi-bahasa (i18n)
- ✅ Manifest V3

### 2. Simple Popup
**Lokasi**: `examples/simple-popup/`

Extension dengan popup interface sederhana untuk interaksi user.

**Fitur**:
- ✅ Browser action dengan popup
- ✅ Storage API untuk menyimpan preferensi
- ✅ Modern UI dengan HTML/CSS/JS

### 3. Content Script Demo
**Lokasi**: `examples/content-script-demo/`

Demonstrasi penggunaan content script untuk memodifikasi halaman web.

**Fitur**:
- ✅ Injeksi script ke halaman web
- ✅ Komunikasi dengan background script
- ✅ DOM manipulation

### 4. Background Script Demo
**Lokasi**: `examples/background-script-demo/`

Extension yang berjalan di background dengan service worker.

**Fitur**:
- ✅ Service worker (Manifest V3)
- ✅ Event handling
- ✅ Browser API integration

### 5. Options Page Demo
**Lokasi**: `examples/options-page-demo/`

Extension dengan halaman pengaturan yang dapat dikustomisasi user.

**Fitur**:
- ✅ Options page UI
- ✅ Settings storage
- ✅ Form validation

## 🛠️ Cara Instalasi

### Prerequisites
- Browser modern (Chrome 88+, Firefox 89+, Edge 88+)
- Akses ke Developer Mode di browser

### Langkah Instalasi

1. **Clone repository**:
   ```bash
   git clone https://github.com/kongali1720/web-extension-examples.git
   cd web-extension-examples
   ```

2. **Pilih contoh extension yang ingin dicoba**:
   ```bash
   cd examples/notify-link-clicks-i18n
   ```

3. **Load extension ke browser**:

   **Chrome/Edge**:
   - Buka `chrome://extensions/` atau `edge://extensions/`
   - Aktifkan "Developer mode"
   - Klik "Load unpacked"
   - Pilih folder extension yang diinginkan

   **Firefox**:
   - Buka `about:debugging`
   - Klik "This Firefox"
   - Klik "Load Temporary Add-on"
   - Pilih file `manifest.json` dari folder extension

## 💻 Pengembangan

### Setup Development Environment

1. **Install dependencies** (jika diperlukan):
   ```bash
   npm install
   # atau
   bun install
   ```

2. **Development dengan hot reload**:
   ```bash
   npm run dev
   # atau
   bun run dev
   ```

3. **Build untuk production**:
   ```bash
   npm run build
   # atau
   bun run build
   ```

### Struktur Manifest V3

Semua contoh menggunakan Manifest V3 yang merupakan standar terbaru:

```json
{
  "manifest_version": 3,
  "name": "Extension Name",
  "version": "1.0.0",
  "description": "Extension description",
  "permissions": ["activeTab"],
  "action": {
    "default_popup": "popup.html"
  }
}
```

## 🌐 Kompatibilitas Browser

| Fitur | Chrome | Firefox | Edge | Safari |
|-------|--------|---------|------|--------|
| Manifest V3 | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Content Scripts | ✅ | ✅ | ✅ | ✅ |
| Storage API | ✅ | ✅ | ✅ | ✅ |
| i18n API | ✅ | ✅ | ✅ | ✅ |

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

### Guidelines Kontribusi
- Pastikan kode mengikuti standar Manifest V3
- Tambahkan dokumentasi untuk fitur baru
- Test di minimal 2 browser berbeda
- Ikuti struktur folder yang konsisten

## 📚 Resource Tambahan

- [MDN Web Extensions Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Chrome Extensions Developer Guide](https://developer.chrome.com/docs/extensions/)
- [Firefox Add-ons Documentation](https://extensionworkshop.com/)

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👤 Author

**Kongali1720**
- GitHub: [@kongali1720](https://github.com/kongali1720)

---

⭐ Jika repository ini membantu, jangan lupa berikan star!
---
## ☕ Dukung aku agar tetap waras menulis script tengah malam...

👉 [Buy Me a Coffee via PayPal](https://www.paypal.com/paypalme/bungtempong99) 👈  
Support with 💸 so I can buy ☕ and keep being 🔥!

---

## 📫 Let’s Connect Like Hackers

- 🧙 GitHub: [kongali1720](https://github.com/kongali1720)
- 💌 Email: [kongali1720@gmail.com](mailto:kongali1720@gmail.com)
- 🕵️‍♂️ Site: Coming soon — stay curious...

---

💻 INITIATING HUMANITY MODE...

🎯 Target Locked: Anak-anak Pejuang Down Syndrome  
🩺 Status: Butuh Dukungan  
❤️ Response: Buka Hati + Klik Link = Satu Senyum Baru

🧬 Mereka bukan berbeda — mereka dilahirkan untuk mengajarkan dunia tentang cinta yang murni dan kesabaran yang luar biasa.

👣 Setiap langkah kecil mereka = Keajaiban besar.

⚡ Bantu mereka melangkah lebih jauh, dengan caramu sendiri.

<p align="center">
  <a href="https://mydonation4ds.github.io/" target="_blank">
    <img src="https://img.shields.io/badge/SUPPORT--NOW-%F0%9F%A7%A1-orange?style=for-the-badge&logo=heart" />
  </a>
</p>

"Karena jadi hacker hati bukan cuma soal kode... tapi juga soal peduli." 🖤

"Ngoding boleh sambil senyum, asal jangan inject SQL sambil ngambek!" 😜

---
