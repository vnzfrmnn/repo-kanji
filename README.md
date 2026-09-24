# Kartu Kanji — Angka & Hubungan Manusia 🟣

Flashcard kanji statis (HTML + CSS + vanilla JS, tanpa build). Bahasa antarmuka: Indonesia.

## Jalankan lokal

Buka `index.html` langsung, atau:

```bash
npx serve .
# atau
python -m http.server 8000
```

## Fitur Utama

- **Flashcard 3D flip** — klik/ketuk kartu untuk balik, swipe kiri/kanan navigasi
- **Auto-generate Kanji** — ketik **Romaji** (contoh: `neko`, `tomodachi`, `sensei`) → Kanji & Hiragana terisi otomatis  
  Atau ketik **Arti Indonesia** (contoh: `kucing`, `teman`, `guru`) → Kanji diambil dari kamus/kartu existing
- **Multiple Deck** — buat/hapus deck, tiap deck punya kartu sendiri
- **List & Search** — daftar kartu per deck dengan pencarian real-time
- **Edit & Delete** — ubah/hapus kartu dengan konfirmasi overlay indah + **Undo 5 detik**
- **Bookmark & Memo** — tandai kartu suka & catatan pribadi per kartu
- **Test Mode** — acak semua kartu untuk latihan
- **Offline-first** — 100% localStorage, font offline (Plus Jakarta Sans, Noto Sans JP), PWA-ready
- **Responsive & Accessible** — touch target ≥44px, prefers-reduced-motion, keyboard navigation

## Ubah / tambah kartu

Edit `data.js` untuk kartu bawaan:

```js
const cards = [
  { kanji: "一日", reading: "ついたち", meaning: "tanggal 1" },
  // tambah di sini…
];
```

Kartu dari pengguna (Add/Edit/Memo/Bookmark) tersimpan otomatis di `localStorage` perangkat.