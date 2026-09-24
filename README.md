# Kartu Kanji — Angka & Hubungan Manusia 🟣

Flashcard kanji statis (HTML + CSS + vanilla JS, tanpa build). Bahasa antarmuka: Indonesia.

## Jalankan lokal

Buka `index.html` langsung, atau:

```bash
npx serve .
# atau
python -m http.server 8000
```

## Deploy ke Netlify

1. Drag & drop folder ini ke [app.netlify.com/drop](https://app.netlify.com/drop), **atau**
2. Push ke GitHub → Netlify → *Add new site → Import an existing project* → biarkan build kosong (situs statis, `netlify.toml` sudah disediakan).

## Deploy ke Vercel

1. Push ke GitHub → Vercel → *Add New → Project* → Import repo → Framework Preset: **Other**, tanpa build command (`vercel.json` sudah disediakan), **atau**
2. `npx vercel` dari folder ini.

## Ubah / tambah kartu

Edit `data.js`:

```js
const cards = [
  { kanji: "一日", reading: "ついたち", meaning: "tanggal 1" },
  // tambah di sini…
];
```

Kartu dari pengguna (Add/Edit/Memo/Bookmark) tersimpan otomatis di `localStorage` perangkat.
