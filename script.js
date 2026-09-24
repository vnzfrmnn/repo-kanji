// Logika flashcard: deck + flip + navigasi + penyimpanan lokal
const LS = {
  custom: "kanji_custom_v1",
  edits: "kanji_edits_v1",
  deleted: "kanji_deleted_v1",
  marks: "kanji_bookmarks_v1",
  memos: "kanji_memos_v1",
};
const load = (k, fb) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch { return fb; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Gabung kartu bawaan (data.js) + tambahan + ubahan pengguna
function getAllCards() {
  const base = (typeof cards !== "undefined" ? cards : []).map((c, i) => ({ id: "d" + i, ...c }));
  const edits = load(LS.edits, {});
  const deleted = new Set(load(LS.deleted, []));
  const custom = load(LS.custom, []);
  const out = [];
  for (const c of base) {
    if (deleted.has(c.id)) continue;
    out.push(edits[c.id] ? { ...c, ...edits[c.id] } : c);
  }
  return out.concat(custom);
}

// State
let deck = getAllCards();
let order = deck.map((_, i) => i); // indeks ke deck
let pos = 0;                        // posisi dalam order
let flipped = false;
let filterMarked = false;
let shuffled = false;
let showHint = false;
let marks = new Set(load(LS.marks, []));
let memos = load(LS.memos, {});

// Elemen
const $ = (id) => document.getElementById(id);
const card = $("card"), cardInner = $("cardInner"), wrap = $("cardWrap");
const elFront = $("kanjiFront"), elRead = $("readingBack"), elMean = $("meaningBack");
const elCounter = $("counter"), elFill = $("barFill"), elPct = $("pct"), elBar = $("barWrap");
const elHint = $("hint"), elMemoDot = $("memoDot"), btnMark = $("btnBookmark");

const toast = (msg) => {
  const t = $("toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(t._h); t._h = setTimeout(() => (t.hidden = true), 2200);
};
const activeIndex = () => order[pos];
const activeCard = () => deck[activeIndex()];

// Terapkan filter + acak ke `order` (pertahankan kartu aktif bila bisa)
function applyView(keepId) {
  const ids = deck.map((_, i) => i).filter((i) => !filterMarked || marks.has(deck[i].id));
  if (shuffled) for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  order = ids.length ? ids : [];
  const k = keepId ? order.indexOf(deck.findIndex((c) => c.id === keepId)) : 0;
  pos = k >= 0 ? k : 0;
  flipped = false;
}

// Render kartu aktif + counter + progress
function render() {
  const c = activeCard();
  $("deckCount").textContent = deck.length;
  $("filterNote").hidden = !filterMarked;
  if (!c) {
    elFront.textContent = "—"; elRead.textContent = "Tidak ada kartu";
    elMean.textContent = filterMarked ? "Belum ada yang ditandai 🔖" : "Tambah kartu baru lewat tombol Add";
    elCounter.textContent = "0/0"; elFill.style.width = "0%"; elPct.textContent = "0%";
    elBar.setAttribute("aria-valuenow", 0); btnMark.setAttribute("aria-pressed", "false");
    elMemoDot.hidden = true; elHint.hidden = true; return;
  }
  elFront.textContent = c.kanji;
  elRead.textContent = c.reading;
  elMean.textContent = c.meaning;
  card.classList.toggle("flipped", flipped);
  card.setAttribute("aria-label", `Kartu ${pos + 1} dari ${order.length}: ${c.kanji}. ${flipped ? c.reading + ", " + c.meaning : "Ketuk untuk membalik."}`);

  elCounter.textContent = `${pos + 1}/${order.length}`;
  const pct = Math.round(((pos + 1) / order.length) * 100);
  elFill.style.width = pct + "%"; elPct.textContent = pct + "%";
  elBar.setAttribute("aria-valuenow", pct);

  const marked = marks.has(c.id);
  btnMark.setAttribute("aria-pressed", String(marked));
  btnMark.setAttribute("aria-label", marked ? "Hapus tanda kartu ini" : "Tandai kartu ini");

  elMemoDot.hidden = !memos[c.id];
  const showH = showHint && !flipped;
  elHint.hidden = !showH;
  if (showH) elHint.textContent = "💡 " + String(c.reading).slice(0, 2) + "…";
  $("memoFor").textContent = "Untuk kartu: " + c.kanji;
}

function flip(v) { if (!activeCard()) return; flipped = v ?? !flipped; render(); }
function go(d) {
  if (!order.length) return;
  pos = (pos + d + order.length) % order.length;
  flipped = false; render();
}
function jumpToDeckIndex(di) {
  const p = order.indexOf(di);
  pos = p >= 0 ? p : 0; flipped = false; render();
}

// Acara: balik + navigasi
card.addEventListener("click", () => flip());
$("btnFlip").addEventListener("click", () => flip());
$("btnNext").addEventListener("click", () => go(1));
$("btnPrev").addEventListener("click", () => go(-1));
$("btnBack").addEventListener("click", () => { pos = 0; flipped = false; render(); toast("Kembali ke kartu pertama"); });
card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
document.addEventListener("keydown", (e) => {
  if (document.querySelector(".overlay:not([hidden])")) return; // jangan ganggu saat modal terbuka
  if (e.key === "ArrowRight") go(1);
  else if (e.key === "ArrowLeft") go(-1);
  else if (e.key === " ") { e.preventDefault(); flip(); }
});

// Swipe kiri/kanan (sentuh)
let tx = 0, dx = 0, swiping = false;
wrap.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; swiping = true; card.classList.add("swiping"); }, { passive: true });
wrap.addEventListener("touchmove", (e) => { if (!swiping) return; dx = e.touches[0].clientX - tx; cardInner.style.transform = `translateX(${dx * 0.25}px)${flipped ? " rotateY(180deg)" : ""}`; }, { passive: true });
wrap.addEventListener("touchend", () => {
  card.classList.remove("swiping"); cardInner.style.transform = "";
  if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  dx = 0; swiping = false;
});

// Bookmark
btnMark.addEventListener("click", (e) => {
  e.stopPropagation();
  const c = activeCard(); if (!c) return;
  marks.has(c.id) ? marks.delete(c.id) : marks.add(c.id);
  save(LS.marks, [...marks]);
  if (filterMarked) applyView(c.id); // kartu bisa hilang dari view
  render();
  toast(marks.has(c.id) ? "🔖 Ditandai" : "Tanda dihapus");
});

// Fullscreen
$("btnFullscreen").addEventListener("click", async (e) => {
  e.stopPropagation();
  try {
    document.fullscreenElement ? await document.exitFullscreen() : await document.documentElement.requestFullscreen();
  } catch { toast("Fullscreen tidak didukung di sini"); }
});

// Toolbar: Gambar = petunjuk bacaan
$("toolHint").addEventListener("click", (e) => {
  showHint = !showHint;
  e.currentTarget.setAttribute("aria-pressed", String(showHint));
  render(); toast(showHint ? "💡 Petunjuk tampil" : "Petunjuk disembunyikan");
});

// Sheet generik
const openSheet = (id) => { $(id).hidden = false; };
const closeSheet = (id) => { $(id).hidden = true; };
document.querySelectorAll(".overlay").forEach((ov) =>
  ov.addEventListener("click", (e) => { if (e.target === ov) ov.hidden = true; })
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.querySelectorAll(".overlay").forEach((o) => (o.hidden = true));
});

// Filter
$("toolFilter").addEventListener("click", () => { syncFilterUI(); openSheet("ovFilter"); });
function syncFilterUI() {
  $("fAll").classList.toggle("active", !filterMarked);
  $("fMarked").classList.toggle("active", filterMarked);
  $("fShuffle").checked = shuffled;
}
$("fAll").addEventListener("click", () => { filterMarked = false; syncFilterUI(); });
$("fMarked").addEventListener("click", () => { filterMarked = true; syncFilterUI(); });
$("fClose").addEventListener("click", () => {
  shuffled = $("fShuffle").checked;
  applyView(activeCard()?.id); render(); closeSheet("ovFilter");
  toast(shuffled ? "🔀 Urutan diacak" : "Filter diterapkan");
});
$("clearFilter").addEventListener("click", () => { filterMarked = false; applyView(activeCard()?.id); render(); });

// Daftar kartu
$("toolList").addEventListener("click", () => { $("listSearch").value = ""; buildList(""); openSheet("ovList"); });
$("listClose").addEventListener("click", () => closeSheet("ovList"));
$("listSearch").addEventListener("input", (e) => buildList(e.target.value));
function buildList(q) {
  const box = $("listItems"); box.innerHTML = "";
  q = q.trim().toLowerCase();
  const rows = deck.map((c, i) => ({ c, i })).filter(({ c }) =>
    !q || c.kanji.includes(q) || c.reading.toLowerCase().includes(q) || c.meaning.toLowerCase().includes(q));
  $("listCount").textContent = `(${rows.length})`;
  if (!rows.length) { box.innerHTML = "<p class='muted'>Tidak ketemu. Coba kata lain.</p>"; return; }
  for (const { c, i } of rows) {
    const b = document.createElement("button");
    b.className = "item" + (i === activeIndex() ? " active" : "");
    b.setAttribute("role", "option");
    b.innerHTML = `<span class="k"></span><span><strong></strong><span class="m"></span></span><span class="star">${marks.has(c.id) ? "⭐" : ""}${memos[c.id] ? "📌" : ""}</span>`;
    b.querySelector(".k").textContent = c.kanji;
    b.querySelector("strong").textContent = c.reading;
    b.querySelector(".m").textContent = c.meaning;
    b.addEventListener("click", () => { jumpToDeckIndex(i); closeSheet("ovList"); });
    box.appendChild(b);
  }
}

// Tambah kartu
$("btnAdd").addEventListener("click", () => openSheet("ovAdd"));
$("addCancel").addEventListener("click", () => closeSheet("ovAdd"));
$("addSave").addEventListener("click", () => {
  const kanji = $("addKanji").value.trim(), reading = $("addReading").value.trim(), meaning = $("addMeaning").value.trim();
  if (!kanji || !reading || !meaning) return toast("Lengkapi kanji, bacaan, dan arti dulu");
  const custom = load(LS.custom, []);
  custom.push({ id: "c" + Date.now(), kanji, reading, meaning });
  save(LS.custom, custom);
  deck = getAllCards(); applyView(); jumpToDeckIndex(deck.length - 1);
  $("addKanji").value = $("addReading").value = $("addMeaning").value = "";
  closeSheet("ovAdd"); toast("✅ Kartu ditambahkan");
});

// Edit / hapus kartu aktif
$("toolEdit").addEventListener("click", () => {
  const c = activeCard(); if (!c) return toast("Tidak ada kartu untuk diubah");
  $("editKanji").value = c.kanji; $("editReading").value = c.reading; $("editMeaning").value = c.meaning;
  openSheet("ovEdit");
});
$("editCancel").addEventListener("click", () => closeSheet("ovEdit"));
$("editSave").addEventListener("click", () => {
  const c = activeCard(); if (!c) return;
  const v = { kanji: $("editKanji").value.trim(), reading: $("editReading").value.trim(), meaning: $("editMeaning").value.trim() };
  if (!v.kanji || !v.reading || !v.meaning) return toast("Semua kolom wajib diisi");
  if (c.id.startsWith("c")) {
    const custom = load(LS.custom, []).map((x) => (x.id === c.id ? { ...x, ...v } : x));
    save(LS.custom, custom);
  } else {
    const edits = load(LS.edits, {}); edits[c.id] = v; save(LS.edits, edits);
  }
  deck = getAllCards(); applyView(c.id); render(); closeSheet("ovEdit"); toast("✅ Perubahan disimpan");
});
$("editDelete").addEventListener("click", () => {
  const c = activeCard(); if (!c) return;
  if (!confirm(`Hapus kartu "${c.kanji}"?`)) return;
  if (c.id.startsWith("c")) save(LS.custom, load(LS.custom, []).filter((x) => x.id !== c.id));
  else { const d = new Set(load(LS.deleted, [])); d.add(c.id); save(LS.deleted, [...d]); }
  marks.delete(c.id); save(LS.marks, [...marks]);
  deck = getAllCards(); applyView(); render(); closeSheet("ovEdit"); toast("🗑️ Kartu dihapus");
});

// Memo per kartu
$("btnMemo").addEventListener("click", (e) => {
  e.stopPropagation();
  const c = activeCard(); if (!c) return;
  $("memoText").value = memos[c.id] || "";
  openSheet("ovMemo"); setTimeout(() => $("memoText").focus(), 50);
});
$("memoCancel").addEventListener("click", () => closeSheet("ovMemo"));
$("memoSave").addEventListener("click", () => {
  const c = activeCard(); if (!c) return;
  const v = $("memoText").value.trim();
  v ? (memos[c.id] = v) : delete memos[c.id];
  save(LS.memos, memos); render(); closeSheet("ovMemo"); toast("📌 Memo disimpan");
});

// Mulai
applyView();
render();
