// Romaji to Hiragana converter
const romajiToHiragana = (() => {
  const map = {
    'a':'あ','i':'い','u':'う','e':'え','o':'お',
    'ka':'か','ki':'き','ku':'く','ke':'け','ko':'こ',
    'sa':'さ','shi':'し','su':'す','se':'せ','so':'そ','si':'し',
    'ta':'た','chi':'ち','tsu':'つ','te':'て','to':'と','ti':'ち','tu':'つ',
    'na':'な','ni':'に','nu':'ぬ','ne':'ね','no':'の',
    'ha':'は','hi':'ひ','fu':'ふ','he':'へ','ho':'ほ','hu':'ふ',
    'ma':'ま','mi':'み','mu':'む','me':'め','mo':'も',
    'ya':'や','yu':'ゆ','yo':'よ',
    'ra':'ら','ri':'り','ru':'る','re':'れ','ro':'ろ',
    'wa':'わ','wo':'を','n':'ん',
    'ga':'が','gi':'ぎ','gu':'ぐ','ge':'げ','go':'ご',
    'za':'ざ','ji':'じ','zu':'ず','ze':'ぜ','zo':'ぞ','zi':'じ',
    'da':'だ','di':'ぢ','du':'づ','de':'で','do':'ど',
    'ba':'ば','bi':'び','bu':'ぶ','be':'べ','bo':'ぼ',
    'pa':'ぱ','pi':'ぴ','pu':'ぷ','pe':'ぺ','po':'ぽ',
    'kya':'きゃ','kyu':'きゅ','kyo':'きょ',
    'sha':'しゃ','shu':'しゅ','sho':'しょ','sya':'しゃ','syu':'しゅ','syo':'しょ',
    'cha':'ちゃ','chu':'ちゅ','cho':'ちょ','tya':'ちゃ','tyu':'ちゅ','tyo':'ちょ',
    'nya':'にゃ','nyu':'にゅ','nyo':'にょ',
    'hya':'ひゃ','hyu':'ひゅ','hyo':'ひょ',
    'mya':'みゃ','myu':'みゅ','myo':'みょ',
    'rya':'りゃ','ryu':'りゅ','ryo':'りょ',
    'gya':'ぎゃ','gyu':'ぎゅ','gyo':'ぎょ',
    'ja':'じゃ','ju':'じゅ','jo':'じょ','jya':'じゃ','jyu':'じゅ','jyo':'じょ',
    'bya':'びゃ','byu':'びゅ','byo':'びょ',
    'pya':'ぴゃ','pyu':'ぴゅ','pyo':'ぴょ',
    'nn':'ん','n ':'ん '
  };
  return (romaji) => {
    let result = '', i = 0, input = romaji.toLowerCase();
    while (i < input.length) {
      let matched = false;
      for (let len = 3; len >= 1; len--) {
        const slice = input.substr(i, len);
        if (map[slice]) {
          result += map[slice];
          i += len;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const c = input[i];
        if (c === ' ' || c === '　') result += c;
        else if (i + 1 < input.length && input[i] === input[i + 1] && /[kstchmyrwgzdbpn]/.test(c)) {
          result += 'っ';
        } else {
          result += c;
        }
        i++;
      }
    }
    return result;
  };
})();

// Romaji to Kanji dictionary (common words)
const romajiToKanjiDict = {
  'neko': ['猫'],
  'inu': ['犬'],
  'tori': ['鳥'],
  'sakana': ['魚'],
  'hana': ['花', '鼻'],
  'yama': ['山'],
  'kawa': ['川', '河'],
  'mizu': ['水'],
  'hi': ['火', '日'],
  'tsuki': ['月'],
  'hoshi': ['星'],
  'sora': ['空'],
  'ame': ['雨', '飴'],
  'yuki': ['雪'],
  'kaze': ['風'],
  'ki': ['木', '気'],
  'mori': ['森'],
  'umi': ['海'],
  'ishi': ['石'],
  'tsuchi': ['土'],
  'hito': ['人'],
  'otoko': ['男'],
  'onna': ['女'],
  'kodomo': ['子供', '子ども'],
  'chichi': ['父'],
  'haha': ['母'],
  'ani': ['兄'],
  'ane': ['姉'],
  'otouto': ['弟'],
  'imouto': ['妹'],
  'kazoku': ['家族'],
  'tomodachi': ['友達', '友だち'],
  'sensei': ['先生'],
  'gakusei': ['学生'],
  'ie': ['家'],
  'heya': ['部屋'],
  'mado': ['窓'],
  'to': ['戸', '都'],
  'michi': ['道'],
  'kuni': ['国'],
  'machi': ['町', '街'],
  'mura': ['村'],
  'kuruma': ['車'],
  'densha': ['電車'],
  'jitensha': ['自転車'],
  'hon': ['本'],
  'kami': ['紙', '神'],
  'te': ['手'],
  'ashi': ['足', '脚'],
  'atama': ['頭'],
  'me': ['目'],
  'mimi': ['耳'],
  'kuchi': ['口'],
  'kokoro': ['心'],
  'karada': ['体'],
  'iro': ['色'],
  'aka': ['赤'],
  'ao': ['青'],
  'shiro': ['白'],
  'kuro': ['黒'],
  'kiiro': ['黄色'],
  'midori': ['緑'],
  'asa': ['朝'],
  'hiru': ['昼'],
  'yoru': ['夜'],
  'kyou': ['今日'],
  'ashita': ['明日'],
  'kinou': ['昨日'],
  'ima': ['今'],
  'toki': ['時'],
  'nichi': ['日'],
  'getsu': ['月'],
  'nen': ['年'],
  'shuukan': ['週間'],
  'hon': ['本'],
  'dai': ['台'],
  'mai': ['枚'],
  'satsu': ['冊'],
  'hiki': ['匹'],
  'nin': ['人'],
  'gatsu': ['月'],
  'nichi': ['日'],
  'youbi': ['曜日'],
  'getsuyoubi': ['月曜日'],
  'kayoubi': ['火曜日'],
  'suiyoubi': ['水曜日'],
  'mokuyoubi': ['木曜日'],
  'kinyoubi': ['金曜日'],
  'doyoubi': ['土曜日'],
  'nichiyoubi': ['日曜日']
};

function findKanjiSuggestions(romaji) {
  const normalized = romaji.toLowerCase().trim();
  return romajiToKanjiDict[normalized] || [];
}

const LS = {
  decks: "kanji_decks_v2",
  custom: "kanji_custom_v1",
  edits: "kanji_edits_v1",
  deleted: "kanji_deleted_v1",
  marks: "kanji_bookmarks_v1",
  memos: "kanji_memos_v1",
};
const load = (k, fb) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch { return fb; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.warn(`save failed for ${k}:`, e); } };

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

function initDecks() {
  let decks = load(LS.decks, null);
  const allCards = getAllCards();
  if (!decks) {
    decks = [{ id: "default", title: "kanji angka, hubungan manusia", cardIds: allCards.map(c => c.id) }];
  }
  const ayahnya1Ids = allCards.filter(c => c.id.startsWith("d") && parseInt(c.id.replace("d", "")) >= 53 && parseInt(c.id.replace("d", "")) < 86).map(c => c.id);
  let ayahnya1 = decks.find(d => d.id === "ayahnya1");
  if (ayahnya1) { ayahnya1.cardIds = ayahnya1Ids; } else { decks.push({ id: "ayahnya1", title: "AYAHNYA 1", cardIds: ayahnya1Ids }); }
  const ayahnya2Ids = allCards.filter(c => c.id.startsWith("d") && parseInt(c.id.replace("d", "")) >= 86 && parseInt(c.id.replace("d", "")) <= 183).map(c => c.id);
  let ayahnya2 = decks.find(d => d.id === "ayahnya2");
  if (ayahnya2) { ayahnya2.cardIds = ayahnya2Ids; } else { decks.push({ id: "ayahnya2", title: "AYAHNYA 2", cardIds: ayahnya2Ids }); }
  const kanji57ayahIds = allCards.filter(c => c.id.startsWith("d") && parseInt(c.id.replace("d", "")) >= 184 && parseInt(c.id.replace("d", "")) <= 240).map(c => c.id);
  let kanji57ayah = decks.find(d => d.id === "kanji5-7-ayah");
  if (kanji57ayah) { kanji57ayah.cardIds = kanji57ayahIds; } else { decks.push({ id: "kanji5-7-ayah", title: "Kanji 5-7 AYAH", cardIds: kanji57ayahIds }); }
  const kanji57anakIds = allCards.filter(c => c.id.startsWith("d") && parseInt(c.id.replace("d", "")) >= 241 && parseInt(c.id.replace("d", "")) <= 421).map(c => c.id);
  let kanji57anak = decks.find(d => d.id === "kanji5-7-anak");
  if (kanji57anak) { kanji57anak.cardIds = kanji57anakIds; } else { decks.push({ id: "kanji5-7-anak", title: "Kanji 5-7 ANAK", cardIds: kanji57anakIds }); }
  try { save(LS.decks, decks); } catch (e) { console.warn("localStorage unavailable"); }
  return decks;
}

const decks = initDecks();
let currentDeckIdx = 0;
let allCards = getAllCards();
let deck = [];
let order = [];
let pos = 0;
let flipped = false;
let filterMarked = false;
let shuffled = false;
let showHint = false;
let marks = new Set(load(LS.marks, []));
let memos = load(LS.memos, {});
let testMode = false;

const $ = (id) => document.getElementById(id);
const isCardPage = !!$("card");

const toast = (msg) => {
  const t = $("toast"); if (!t) return;
  t.textContent = msg; t.hidden = false;
  clearTimeout(t._h); t._h = setTimeout(() => (t.hidden = true), 2200);
};

const openSheet = (id) => { const el = $(id); if (el) el.hidden = false; };
const closeSheet = (id) => { const el = $(id); if (el) el.hidden = true; };

function getCurrentDeck() { return decks[currentDeckIdx]; }

function rebuildDeck() {
  allCards = getAllCards();
  const activeDeck = getCurrentDeck();
  if (!activeDeck) { deck = []; return; }
  deck = allCards.filter(c => activeDeck.cardIds.includes(c.id));
}

function applyView(keepId) {
  const ids = deck.map((_, i) => i).filter((i) => !filterMarked || marks.has(deck[i].id));
  if (shuffled) for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  order = ids.length ? ids : [];
  const k = keepId ? order.indexOf(deck.findIndex((c) => c.id === keepId)) : 0;
  pos = k >= 0 ? k : 0;
  flipped = false; showHint = false;
}

function render() {
  if (!isCardPage) return;
  const c = deck[order[pos]];
  if (!c) {
    ["kanjiFront","readingBack","meaningBack"].forEach(id => { const e = $(id); if (e) e.textContent = "—"; });
    const counter = $("counter"); if (counter) counter.textContent = "0/0";
    return;
  }
  const elFront = $("kanjiFront"), elRead = $("readingBack"), elMean = $("meaningBack");
  if (elFront) elFront.textContent = c.kanji;
  if (elRead) elRead.textContent = c.reading;
  if (elMean) elMean.textContent = c.meaning;
  const elHint = $("hint"); if (elHint) { if (showHint) { elHint.textContent = c.reading; elHint.hidden = false; } else { elHint.hidden = true; } }
  const cardEl = $("card"); if (cardEl) cardEl.classList.toggle("flipped", flipped);
  const counter = $("counter"); if (counter) counter.textContent = `${pos + 1}/${order.length}`;
}

function flip(v) { if (!deck[order[pos]]) return; flipped = v ?? !flipped; render(); }
function go(d) { if (!order.length) return; pos = (pos + d + order.length) % order.length; flipped = false; showHint = false; render(); }

function syncDeckSelector() {
  const sel = $("deckSelector"); if (!sel) return;
  sel.innerHTML = "";
  decks.forEach((d, i) => { const opt = document.createElement("option"); opt.value = i; opt.textContent = d.title; sel.appendChild(opt); });
  sel.value = currentDeckIdx;
  const title = $("deckTitle"); if (title) title.textContent = getCurrentDeck()?.title || "—";
  const count = $("deckCount"); if (count) count.textContent = `${deck.length} kartu`;
}

function switchDeck(idx) { currentDeckIdx = idx; rebuildDeck(); applyView(); render(); syncDeckSelector(); }
function createDeck(title) { decks.push({ id: "c" + Date.now(), title, cardIds: [] }); save(LS.decks, decks); currentDeckIdx = decks.length - 1; switchDeck(currentDeckIdx); toast("Deck baru dibuat"); }

function setupCardPage() {
  const cardEl = $("card");
  const btnFlip = $("btnFlip"), btnNext = $("btnNext"), btnPrev = $("btnPrev"), btnBack = $("btnBack");
  const btnMark = $("btnBookmark"), btnMemo = $("btnMemo"), btnFullscreen = $("btnFullscreen");
  const toolHint = $("toolHint"), toolFilter = $("toolFilter"), toolList = $("toolList"), toolEdit = $("toolEdit"), toolTest = $("toolTest");
  const fAll = $("fAll"), fMarked = $("fMarked"), fClose = $("fClose");
  const listClose = $("listClose"), listSearch = $("listSearch");
  const addCancel = $("addCancel"), addSave = $("addSave");
  const editCancel = $("editCancel"), editSave = $("editSave"), editDelete = $("editDelete");
  const memoCancel = $("memoCancel"), memoSave = $("memoSave");
  const newDeckCancel = $("newDeckCancel"), newDeckSave = $("newDeckSave");

  if (cardEl) cardEl.addEventListener("click", () => flip());
  if (btnFlip) btnFlip.addEventListener("click", () => flip());
  if (btnNext) btnNext.addEventListener("click", () => go(1));
  if (btnPrev) btnPrev.addEventListener("click", () => go(-1));
  if (btnBack) btnBack.addEventListener("click", () => { window.location.href = "index.html"; });
  if (cardEl) cardEl.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  document.addEventListener("keydown", (e) => {
    if (document.querySelector(".overlay:not([hidden])")) return;
    if (e.key === "ArrowRight") go(1); else if (e.key === "ArrowLeft") go(-1); else if (e.key === " ") { e.preventDefault(); flip(); }
  });

  let tx = 0, dx = 0, swiping = false;
  const wrap = $("cardWrap");
  if (wrap) {
    wrap.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; swiping = true; if (cardEl) cardEl.classList.add("swiping"); }, { passive: true });
    wrap.addEventListener("touchmove", (e) => { if (!swiping) return; dx = e.touches[0].clientX - tx; if (cardEl) cardEl.style.transform = `translateX(${dx * 0.25}px)`; }, { passive: true });
    wrap.addEventListener("touchend", () => { if (cardEl) { cardEl.classList.remove("swiping"); cardEl.style.transform = ""; } if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1); dx = 0; swiping = false; });
  }

  if (btnMark) btnMark.addEventListener("click", (e) => { e.stopPropagation(); const c = deck[order[pos]]; if (!c) return; marks.has(c.id) ? marks.delete(c.id) : marks.add(c.id); save(LS.marks, [...marks]); if (filterMarked) { rebuildDeck(); applyView(c.id); } render(); toast(marks.has(c.id) ? "Ditandai" : "Tanda dihapus"); });
  if (btnFullscreen) btnFullscreen.addEventListener("click", async (e) => { e.stopPropagation(); try { document.fullscreenElement ? await document.exitFullscreen() : await document.documentElement.requestFullscreen(); } catch { toast("Fullscreen tidak didukung"); } });
  if (toolHint) toolHint.addEventListener("click", () => { showHint = !showHint; toolHint.setAttribute("aria-pressed", String(showHint)); render(); toast(showHint ? "Petunjuk tampil" : "Petunjuk disembunyikan"); });
  const syncFilterUI = () => { if (fAll) fAll.classList.toggle("active", !filterMarked); if (fMarked) fMarked.classList.toggle("active", filterMarked); const fs = $("fShuffle"); if (fs) fs.checked = shuffled; };
  if (toolFilter) toolFilter.addEventListener("click", () => { syncFilterUI(); openSheet("ovFilter"); });
  if (fAll) fAll.addEventListener("click", () => { filterMarked = false; syncFilterUI(); });
  if (fMarked) fMarked.addEventListener("click", () => { filterMarked = true; syncFilterUI(); });
  if (fClose) fClose.addEventListener("click", () => { const fs = $("fShuffle"); if (fs) shuffled = fs.checked; applyView(deck[order[pos]]?.id); render(); closeSheet("ovFilter"); toast(shuffled ? "Urutan diacak" : "Filter diterapkan"); });
  const clearFilter = $("clearFilter");
  if (clearFilter) clearFilter.addEventListener("click", () => { filterMarked = false; applyView(deck[order[pos]]?.id); render(); });
  if (toolList) toolList.addEventListener("click", () => { if (listSearch) listSearch.value = ""; buildDeckList(""); openSheet("ovList"); });
  if (listClose) listClose.addEventListener("click", () => closeSheet("ovList"));
  if (listSearch) listSearch.addEventListener("input", (e) => buildDeckList(e.target.value));
  if (toolEdit) toolEdit.addEventListener("click", () => { const c = deck[order[pos]]; if (!c) return toast("Tidak ada kartu"); const ek = $("editKanji"), er = $("editReading"), em = $("editMeaning"); if (ek) ek.value = c.kanji; if (er) er.value = c.reading; if (em) em.value = c.meaning; openSheet("ovEdit"); });
  if (editCancel) editCancel.addEventListener("click", () => closeSheet("ovEdit"));
  if (editSave) editSave.addEventListener("click", () => { const c = deck[order[pos]]; if (!c) return; const ek = $("editKanji"), er = $("editReading"), em = $("editMeaning"); const v = { kanji: ek?.value.trim()||"", reading: er?.value.trim()||"", meaning: em?.value.trim()||"" }; if (!v.kanji || !v.reading || !v.meaning) return toast("Semua kolom wajib"); if (c.id.startsWith("c")) { const custom = load(LS.custom, []).map((x) => (x.id === c.id ? { ...x, ...v } : x)); save(LS.custom, custom); } else { const edits = load(LS.edits, {}); edits[c.id] = v; save(LS.edits, edits); } rebuildDeck(); applyView(c.id); render(); closeSheet("ovEdit"); toast("Perubahan disimpan"); });
  if (editDelete) editDelete.addEventListener("click", () => { 
    const c = deck[order[pos]]; 
    if (!c) return; 
    openDeleteCardSheet(c); 
  });
  if (btnMemo) btnMemo.addEventListener("click", (e) => { e.stopPropagation(); const c = deck[order[pos]]; if (!c) return; const mt = $("memoText"); if (mt) mt.value = memos[c.id] || ""; openSheet("ovMemo"); setTimeout(() => { if (mt) mt.focus(); }, 50); });
  if (memoCancel) memoCancel.addEventListener("click", () => closeSheet("ovMemo"));
  if (memoSave) memoSave.addEventListener("click", () => { const c = deck[order[pos]]; if (!c) return; const mt = $("memoText"); if (!mt) return; const v = mt.value.trim(); v ? (memos[c.id] = v) : delete memos[c.id]; save(LS.memos, memos); render(); closeSheet("ovMemo"); toast("Memo disimpan"); });

  if (toolTest) toolTest.addEventListener("click", () => startTest());

  document.querySelectorAll(".overlay").forEach((ov) => ov.addEventListener("click", (e) => { if (e.target === ov) ov.hidden = true; }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelectorAll(".overlay").forEach((o) => (o.hidden = true)); });

  // ovDelCard listeners
  const delCardCancel = $("delCardCancel"), delCardSave = $("delCardSave");
  if (delCardCancel) delCardCancel.addEventListener("click", () => { cardToDeleteId = null; closeSheet("ovDelCard"); });
  if (delCardSave) delCardSave.addEventListener("click", confirmDeleteCard);
  const toastUndoBtn = $("toastUndoBtn");
  if (toastUndoBtn) toastUndoBtn.addEventListener("click", undoDeleteCard);

  if (newDeckCancel) newDeckCancel.addEventListener("click", () => closeSheet("ovNewDeck"));
  if (newDeckSave) newDeckSave.addEventListener("click", () => { const title = ($("newDeckInput")||{}).value.trim(); if (!title) return toast("Judul deck kosong"); createDeck(title); closeSheet("ovNewDeck"); });
  if ($("btnAdd")) $("btnAdd").addEventListener("click", () => {
    openSheet("ovAdd");
    // Clear all fields when opening
    ["addRomaji","addKanji","addReading","addMeaning"].forEach(id => { 
      const e = $(id); 
      if (e) {
        e.value = ""; 
        e.placeholder = e.id === "addRomaji" ? "例： neko, tomodachi, sensei" : 
                       e.id === "addMeaning" ? "例： kucing, teman, guru" :
                       e.id === "addKanji" ? "例： 猫" : "例： ねこ";
        if (e.dataset) e.dataset.autoFilled = 'false';
      }
    });
  });
  if (addCancel) addCancel.addEventListener("click", () => closeSheet("ovAdd"));
  
  if (addSave) addSave.addEventListener("click", () => {
    const kanji = ($("addKanji")||{}).value.trim(), reading = ($("addReading")||{}).value.trim(), meaning = ($("addMeaning")||{}).value.trim();
    if (!kanji || !reading || !meaning) return toast("Lengkapi semua kolom");
    const newCard = { id: "c" + Date.now(), kanji, reading, meaning };
    const custom = load(LS.custom, []); custom.push(newCard); save(LS.custom, custom);
    const ad = getCurrentDeck(); ad.cardIds.push(newCard.id); save(LS.decks, decks);
    rebuildDeck(); applyView(); jumpToDeckIndex(deck.length - 1);
    ["addRomaji","addKanji","addReading","addMeaning"].forEach(id => { const e = $(id); if (e) e.value = ""; });
    closeSheet("ovAdd"); toast("Kartu ditambahkan");
  });

  // Auto-fill Romaji -> Kanji/Hiragana
  const addRomaji = $("addRomaji");
  const addReading = $("addReading");
  const addKanji = $("addKanji");
  const addMeaning = $("addMeaning");
  if (addRomaji && addReading && addKanji) {
    addRomaji.addEventListener("input", (e) => {
      const romaji = e.target.value.trim();
      addReading.value = romajiToHiragana(romaji);
      const suggestions = findKanjiSuggestions(romaji);
      if (suggestions.length > 0) {
        addKanji.value = suggestions[0];
        addKanji.placeholder = suggestions.length > 1 ?
          `Atau: ${suggestions.slice(1).join(', ')}` : "例： 猫";
      } else {
        if (!addKanji.value || addKanji.dataset.autoFilled === 'true') {
          addKanji.value = "";
          addKanji.placeholder = "例： 猫";
        }
      }
      addKanji.dataset.autoFilled = 'true';
    });
    addKanji.addEventListener("input", () => {
      addKanji.dataset.autoFilled = 'false';
    });
  }
  // Auto-suggest Kanji from existing cards when typing Indonesian meaning
  if (addMeaning && addKanji && addReading) {
    addMeaning.addEventListener("input", (e) => {
      const meaning = e.target.value.trim().toLowerCase();
      if (meaning.length < 2) return;
      const matches = allCards.filter(c =>
        c.meaning.toLowerCase().includes(meaning) ||
        meaning.includes(c.meaning.toLowerCase())
      );
      if (matches.length > 0 && !addKanji.value) {
        const first = matches[0];
        addKanji.value = first.kanji;
        addReading.value = first.reading;
        addKanji.placeholder = matches.length > 1 ?
          `Atau: ${matches.slice(1).map(c => c.kanji).join(', ')}` : "例： 猫";
        addKanji.dataset.autoFilled = 'true';
      }
    });
  }

  const elDeckSelector = $("deckSelector");
  if (elDeckSelector) elDeckSelector.addEventListener("change", (e) => switchDeck(parseInt(e.target.value, 10)));
  const elDeckTitle = $("deckTitle");
  if (elDeckTitle) {
    elDeckTitle.addEventListener("blur", (e) => { const nt = e.target.textContent.trim(); if (nt && nt !== getCurrentDeck().title) { const idx = currentDeckIdx; const d = decks[idx]; if (d) { d.title = nt; save(LS.decks, decks); syncDeckSelector(); toast("Judul diubah"); } else { e.target.textContent = getCurrentDeck().title; } } });
    elDeckTitle.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); e.target.blur(); } });
  }
}

function buildDeckList(q) {
  const box = $("listItems"); if (!box) return; box.innerHTML = "";
  q = (q||"").trim().toLowerCase();
  const rows = deck.map((c, i) => ({ c, i })).filter(({ c }) => !q || c.kanji.includes(q) || c.reading.toLowerCase().includes(q) || c.meaning.toLowerCase().includes(q));
  const listCount = $("listCount"); if (listCount) listCount.textContent = `(${rows.length})`;
  if (!rows.length) { box.innerHTML = "<p class='muted'>Tidak ketemu.</p>"; return; }
  for (const { c, i } of rows) {
    const b = document.createElement("button");
    b.className = "item" + (i === activeIndex() ? " active" : "");
    b.innerHTML = `<span class="k">${c.kanji}</span><span><strong>${c.reading}</strong><span class="m">${c.meaning}</span></span>`;
    b.addEventListener("click", (e) => { 
      if (e.target.closest('.item-delete')) return; // Don't jump if clicking delete
      jumpToDeckIndex(i); closeSheet("ovList"); 
    });
    
    // Add delete button
    const delBtn = document.createElement("button");
    delBtn.className = "item-delete";
    delBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>`;
    delBtn.setAttribute("aria-label", `Hapus kartu ${c.kanji}`);
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openDeleteCardSheet(c);
    });
    b.appendChild(delBtn);
    box.appendChild(b);
  }
}

function startTest() {
  testMode = true;
  shuffled = true;
  filterMarked = false;
  applyView();
  pos = 0;
  flipped = false;
  render();
  toast("Mode Test: semua kartu diacak!");
}

function activeIndex() { return order[pos]; }
function activeCard() { return deck[activeIndex()]; }
function jumpToDeckIndex(di) { const p = order.indexOf(di); pos = p >= 0 ? p : 0; flipped = false; render(); }
function jumpToCard(kanji) { if (!deck.length) return; const idx = deck.findIndex(c => c.kanji === kanji); if (idx >= 0) { pos = idx; flipped = false; render(); } }

let deckToDeleteIdx = -1;
let cardToDeleteId = null;
let deletedCardBackup = null;

function openDeleteSheet(idx) {
  deckToDeleteIdx = idx;
  const name = $("delDeckName");
  if (name && decks[idx]) name.textContent = decks[idx].title;
  openSheet("ovDelDeck");
}

function startEditDeckTitle(idx) {
  const boxes = document.querySelectorAll(".deck-box");
  const box = boxes[idx];
  if (!box) return;
  const titleEl = box.querySelector(".db-title");
  if (!titleEl) return;
  const currentTitle = titleEl.textContent.trim();
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentTitle;
  input.style.cssText = "font:700 15px var(--font-jp); text-align:center; width:100%; padding:4px 8px; border:2px solid var(--purple); border-radius:8px; outline:none; background:#fff;";
  input.maxLength = 40;
  titleEl.textContent = "";
  titleEl.appendChild(input);
  input.focus();
  input.select();
  const finish = () => {
    const nt = input.value.trim();
    if (nt && nt !== currentTitle) { decks[idx].title = nt; save(LS.decks, decks); syncDeckSelector(); toast("Judul diubah"); }
    titleEl.textContent = currentTitle;
  };
  input.addEventListener("blur", finish);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); input.blur(); } else if (e.key === "Escape") { input.value = currentTitle; input.blur(); } });
}

function deleteCard(cardId) {
  // Find card data before deleting for undo
  const allCards = getAllCards();
  const card = allCards.find(c => c.id === cardId);
  if (!card) return null;
  
  deletedCardBackup = {
    ...card,
    deckId: getCurrentDeck().id,
    deckIdx: currentDeckIdx,
    timestamp: Date.now()
  };
  
  // Remove from custom cards
  const custom = load(LS.custom, []).filter((x) => x.id !== cardId);
  save(LS.custom, custom);
  
  // Remove from edits if edited
  const edits = load(LS.edits, {});
  delete edits[cardId];
  save(LS.edits, edits);
  
  // Mark as deleted if base card
  if (!cardId.startsWith("c")) {
    const deleted = new Set(load(LS.deleted, []));
    deleted.add(cardId);
    save(LS.deleted, [...deleted]);
  }
  
  // Remove from marks/memos
  marks.delete(cardId);
  save(LS.marks, [...marks]);
  delete memos[cardId];
  save(LS.memos, memos);
  
  // Remove from current deck
  const ad = getCurrentDeck();
  ad.cardIds = ad.cardIds.filter(id => id !== cardId);
  save(LS.decks, decks);
  
  // Rebuild deck
  rebuildDeck();
  
  return card;
}

function openDeleteCardSheet(card) {
  cardToDeleteId = card.id;
  const delKanji = $("delCardKanji");
  const delReading = $("delCardReading");
  const delMeta = $("delCardMeta");
  if (delKanji) delKanji.textContent = card.kanji;
  if (delReading) delReading.textContent = card.reading;
  if (delMeta) delMeta.textContent = `Kartu "${card.meaning}" akan dihapus dari deck "${getCurrentDeck().title}"`;
  openSheet("ovDelCard");
}

function confirmDeleteCard() {
  if (!cardToDeleteId) return;
  const deletedCard = deleteCard(cardToDeleteId);
  closeSheet("ovDelCard");
  cardToDeleteId = null;
  
  if (isCardPage) {
    applyView();
    render();
    if (deletedCard) showUndoToast(deletedCard);
  } else {
    buildDeckList($("listSearch")?.value || "");
    renderDeckBoxes();
    if (deletedCard) showUndoToast(deletedCard);
  }
}

function showUndoToast(card) {
  const toastEl = $("toastUndo");
  const msgEl = $("toastUndoMsg");
  if (!toastEl || !msgEl) return;
  msgEl.textContent = `Kartu "${card.kanji}" (${card.reading}) dihapus`;
  toastEl.hidden = false;
  
  // Auto-hide after 5 seconds
  clearTimeout(toastEl._h);
  toastEl._h = setTimeout(() => {
    toastEl.hidden = true;
    deletedCardBackup = null;
  }, 5000);
}

function undoDeleteCard() {
  if (!deletedCardBackup) return;
  
  const backup = deletedCardBackup;
  
  // Restore card to custom (works for both custom and base cards)
  const custom = load(LS.custom, []);
  // Remove if already exists (shouldn't happen but safety)
  const existingIdx = custom.findIndex(x => x.id === backup.id);
  if (existingIdx >= 0) custom.splice(existingIdx, 1);
  custom.push({ ...backup });
  save(LS.custom, custom);
  
  // If it was a base card, remove from deleted set
  if (!backup.id.startsWith("c")) {
    const deleted = new Set(load(LS.deleted, []));
    deleted.delete(backup.id);
    save(LS.deleted, [...deleted]);
  }
  
  // Restore to current deck
  const ad = getCurrentDeck();
  if (!ad.cardIds.includes(backup.id)) {
    ad.cardIds.push(backup.id);
    save(LS.decks, decks);
  }
  
  rebuildDeck();
  applyView();
  render();
  buildDeckList($("listSearch")?.value || "");
  renderDeckBoxes();
  
  $("toastUndo").hidden = true;
  deletedCardBackup = null;
  toast("Kartu dikembalikan");
}

function renderDeckBoxes() {
  const bc = $("deckBoxesContainer"); if (!bc) return;
  bc.innerHTML = "";
  if (!decks.length) {
    const empty = document.createElement("div");
    empty.className = "deck-empty";
    empty.innerHTML = `<span class="db-icon">空</span><span class="db-title">Belum ada deck</span><p class="db-count">Buat deck pertama untuk mulai belajar</p>`;
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = "Buat deck";
    btn.addEventListener("click", () => { const inp = $("newDeckInput"); if (inp) inp.value = ""; openSheet("ovNewDeck"); if (inp) setTimeout(() => inp.focus(), 60); });
    empty.appendChild(btn);
    bc.appendChild(empty);
    return;
  }
  decks.forEach((dd, ii) => {
    const firstIcon = dd.cardIds.length ? (allCards.find(c => c.id === dd.cardIds[0])?.kanji || "?") : "?";
    const b = document.createElement("a");
    b.className = "deck-box";
    b.href = `card.html?deck=${ii}`;
    b.innerHTML = `<span class="db-icon">${firstIcon}</span><span class="db-title">${dd.title}</span><span class="db-count">${dd.cardIds.length} kartu</span>`;
    const del = document.createElement("button");
    del.className = "deck-del";
    del.setAttribute("aria-label", `Hapus deck ${dd.title}`);
    del.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>`;
    del.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); openDeleteSheet(ii); });
    const editBtn = document.createElement("button");
    editBtn.className = "deck-edit";
    editBtn.setAttribute("aria-label", `Edit judul deck ${dd.title}`);
    editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    editBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); startEditDeckTitle(ii); });
    const wrap = document.createElement("div");
    wrap.className = "deck-box-wrap";
    wrap.appendChild(b);
    wrap.appendChild(editBtn);
    wrap.appendChild(del);
    bc.appendChild(wrap);
  });
}

function setupDashboardPage() {
  renderDeckBoxes();

  const btnAdd = $("btnAdd");
  if (btnAdd) btnAdd.addEventListener("click", () => { const inp = $("newDeckInput"); if (inp) inp.value = ""; openSheet("ovNewDeck"); if (inp) setTimeout(() => inp.focus(), 60); });
  const newDeckCancel = $("newDeckCancel"), newDeckSave = $("newDeckSave");
  if (newDeckCancel) newDeckCancel.addEventListener("click", () => closeSheet("ovNewDeck"));
  if (newDeckSave) newDeckSave.addEventListener("click", () => {
    const title = ($("newDeckInput") || {}).value.trim();
    if (!title) return toast("Judul deck kosong");
    closeSheet("ovNewDeck");
    createDeck(title);
    renderDeckBoxes();
  });
  const delDeckCancel = $("delDeckCancel"), delDeckSave = $("delDeckSave");
  if (delDeckCancel) delDeckCancel.addEventListener("click", () => closeSheet("ovDelDeck"));
  if (delDeckSave) delDeckSave.addEventListener("click", () => {
    if (deckToDeleteIdx < 0 || !decks[deckToDeleteIdx]) return;
    decks.splice(deckToDeleteIdx, 1);
    save(LS.decks, decks);
    if (currentDeckIdx >= decks.length) currentDeckIdx = Math.max(0, decks.length - 1);
    closeSheet("ovDelDeck");
    renderDeckBoxes();
    toast("Deck dihapus");
  });

  // ovDelCard listeners (shared with card page)
  const delCardCancel = $("delCardCancel"), delCardSave = $("delCardSave");
  if (delCardCancel) delCardCancel.addEventListener("click", () => { cardToDeleteId = null; closeSheet("ovDelCard"); });
  if (delCardSave) delCardSave.addEventListener("click", confirmDeleteCard);
  const toastUndoBtn = $("toastUndoBtn");
  if (toastUndoBtn) toastUndoBtn.addEventListener("click", undoDeleteCard);

  // Auto-convert Romaji to Hiragana and auto-fill Kanji
  const addRomaji = $("addRomaji");
  const addReading = $("addReading");
  const addKanji = $("addKanji");
  const addMeaning = $("addMeaning");
  
  if (addRomaji && addReading && addKanji) {
    addRomaji.addEventListener("input", (e) => {
      const romaji = e.target.value.trim();
      const hiragana = romajiToHiragana(romaji);
      addReading.value = hiragana;
      
      // Auto-fill Kanji if found in dictionary
      const suggestions = findKanjiSuggestions(romaji);
      if (suggestions && suggestions.length > 0) {
        // Auto-fill with first suggestion
        addKanji.value = suggestions[0];
        // Show other options if multiple
        if (suggestions.length > 1) {
          addKanji.placeholder = `Atau: ${suggestions.slice(1).join(', ')}`;
        } else {
          addKanji.placeholder = "例： 猫";
        }
      } else {
        // Clear if no match
        if (!addKanji.value || addKanji.dataset.autoFilled === 'true') {
          addKanji.value = "";
          addKanji.placeholder = "例： 猫";
        }
      }
      addKanji.dataset.autoFilled = 'true';
    });
    
    // Allow manual override
    addKanji.addEventListener("input", () => {
      addKanji.dataset.autoFilled = 'false';
    });
  }
  
  // Auto-suggest Kanji from existing cards when typing Indonesian meaning
  if (addMeaning && addKanji && addReading) {
    addMeaning.addEventListener("input", (e) => {
      const meaning = e.target.value.trim().toLowerCase();
      if (meaning.length < 2) return;
      
      // Search existing cards for matching meaning
      const matches = allCards.filter(c => 
        c.meaning.toLowerCase().includes(meaning) || 
        meaning.includes(c.meaning.toLowerCase())
      );
      
      if (matches.length > 0 && !addKanji.value) {
        const first = matches[0];
        addKanji.value = first.kanji;
        addReading.value = first.reading;
        addKanji.placeholder = matches.length > 1 ? `Atau: ${matches.slice(1).map(c => c.kanji).join(', ')}` : "例： 猫";
        addKanji.dataset.autoFilled = 'true';
      }
    });
  }
  
  if (addSave) addSave.addEventListener("click", () => {
    const kanji = ($("addKanji")||{}).value.trim(), reading = ($("addReading")||{}).value.trim(), meaning = ($("addMeaning")||{}).value.trim();
    if (!kanji || !reading || !meaning) return toast("Lengkapi semua kolom");
    const newCard = { id: "c" + Date.now(), kanji, reading, meaning };
    const custom = load(LS.custom, []); custom.push(newCard); save(LS.custom, custom);
    const ad = getCurrentDeck(); ad.cardIds.push(newCard.id); save(LS.decks, decks);
    rebuildDeck(); applyView(); jumpToDeckIndex(deck.length - 1);
    ["addRomaji","addKanji","addReading","addMeaning"].forEach(id => { const e = $(id); if (e) e.value = ""; });
    closeSheet("ovAdd"); toast("Kartu ditambahkan");
  });

  document.querySelectorAll(".overlay").forEach((ov) => ov.addEventListener("click", (e) => { if (e.target === ov) ov.hidden = true; }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelectorAll(".overlay").forEach((o) => (o.hidden = true)); });
}

rebuildDeck();
applyView();
render();

if (isCardPage) {
  const urlParams = new URLSearchParams(window.location.search);
  const deckParam = urlParams.get("deck");
  if (deckParam !== null) { const di = parseInt(deckParam, 10); if (di >= 0 && di < decks.length) currentDeckIdx = di; }
  const targetKanji = urlParams.get("kanji");
  rebuildDeck(); applyView(); render();
  if (targetKanji) jumpToCard(targetKanji);
  setupCardPage();
} else {
  setupDashboardPage();
}
