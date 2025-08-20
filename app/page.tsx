"use client";

import { useEffect, useMemo, useState } from "react";
import PhoneCard from "../components/PhoneCard";
import { applePhones, samsungPhones } from "../data/phones";

function normalizeStorageToGo(title: string): string | null {
  const m = title.match(/(\d{2,4})\s?GB/i);
  if (!m) return null;
  return `${m[1]} Go`;
}

function subtitleApple(title: string): string {
  const storage = normalizeStorageToGo(title);
  if (/pro\s*max/i.test(title)) return `Pro Max • Titane • iOS${storage ? ` • ${storage}` : ""}`;
  if (/pro(?!\s*max)/i.test(title)) return `Pro • Titane • iOS${storage ? ` • ${storage}` : ""}`;
  if (/plus/i.test(title)) return `Grand écran • iOS${storage ? ` • ${storage}` : ""}`;
  if (/(xr|xs|11|12|13|14|15|16)/i.test(title)) return `Équilibré • iOS${storage ? ` • ${storage}` : ""}`;
  return `iOS${storage ? ` • ${storage}` : ""}`;
}

function subtitleSamsung(title: string): string {
  const storage = normalizeStorageToGo(title);
  if (/flip|fold/i.test(title)) return `Pliable • 5G${storage ? ` • ${storage}` : ""}`;
  if (/ultra/i.test(title)) return `Ultra • S Pen • 5G${storage ? ` • ${storage}` : ""}`;
  if (/plus|\b\+\b/i.test(title)) return `Grand écran • 5G${storage ? ` • ${storage}` : ""}`;
  if (/fe\b/i.test(title)) return `Fan Edition • 5G${storage ? ` • ${storage}` : ""}`;
  if (/note\s?10|note\s?20|note\s?9|note\s?8/i.test(title)) return `S Pen • Productivité${storage ? ` • ${storage}` : ""}`;
  if (/s9|s10|s21|s22|s23|s24|s25/i.test(title)) return `Android • 5G${storage ? ` • ${storage}` : ""}`;
  return `Android${storage ? ` • ${storage}` : ""}`;
}

export default function Home() {
  // Local fallback catalogue with brand info
  const fallbackPhones = useMemo(
    () =>
      ([
        ...applePhones.map((p) => ({ ...p, brand: "Apple" as const })),
        ...samsungPhones.map((p) => ({ ...p, brand: "Samsung" as const })),
      ]) as Array<import("../components/PhoneCard").Phone & { brand: "Apple" | "Samsung" }>,
    []
  );

  const [allPhones, setAllPhones] = useState<
    Array<import("../components/PhoneCard").Phone & { brand: "Apple" | "Samsung" }>
  >(fallbackPhones);

  // Attempt to fetch from Supabase if env vars are present (client-side)
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return; // keep fallback

    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch(
          `${url}/rest/v1/phones?select=title,brand,price,image_url`,
          {
            headers: {
              apikey: anon,
              Authorization: `Bearer ${anon}`,
            },
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const rows: Array<{
          title: string;
          brand: "Apple" | "Samsung" | string;
          price: number | string | null;
          image_url: string | null;
        }> = await res.json();

        const fmt = (v: number | string | null) => {
          const n = typeof v === "number" ? v : Number(String(v ?? "").trim());
          if (!isFinite(n)) return "";
          return `${n} $`;
        };
        const brandFallback = (b: string) =>
          b.toLowerCase() === "apple"
            ? "/assets/apple-iphone-15-1.jpg"
            : "/assets/samsung-galaxy-s23-ultra-5g-1.jpg";

        const mapped = rows
          .filter((r) => r && r.title && r.brand)
          .map((r) => ({
            image: r.image_url && r.image_url.trim() ? r.image_url : brandFallback(r.brand),
            title: r.title,
            price: fmt(r.price),
            brand: (r.brand === "Apple" || r.brand === "Samsung" ? r.brand : "Samsung") as
              | "Apple"
              | "Samsung",
          }));

        if (mapped.length) setAllPhones(mapped);
      } catch (e) {
        // silent fallback to local data
        console.warn("Supabase fetch failed; using fallback data.");
      }
      return () => controller.abort();
    };
    run();
  }, []);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState<"All" | "Apple" | "Samsung">("All");
  const [model, setModel] = useState<string>("All");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Helper: extract a model name without storage suffix
  const modelFromTitle = (title: string) => title.replace(/\s*-?\s*(?:\d{2,4})\s?GB.*/i, "").trim();

  // Available models based on selected brand
  const modelOptions = useMemo(() => {
    const pool = brand === "All" ? allPhones : allPhones.filter((p) => p.brand === brand);
    const set = new Set<string>();
    pool.forEach((p) => set.add(modelFromTitle(p.title)));
    return ["All", ...Array.from(set).sort()];
  }, [allPhones, brand]);

  // Filter + search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allPhones.filter((p) => {
      if (brand !== "All" && p.brand !== brand) return false;
      if (model !== "All" && modelFromTitle(p.title) !== model) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.price.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    });
  }, [allPhones, brand, model, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  // Reset to first page when filters change
  const onChangeBrand = (b: "All" | "Apple" | "Samsung") => {
    setBrand(b);
    setModel("All");
    setPage(1);
  };

  const onChangeModel = (m: string) => {
    setModel(m);
    setPage(1);
  };

  const renderSubtitle = (title: string, b: "Apple" | "Samsung") =>
    b === "Apple" ? subtitleApple(title) : subtitleSamsung(title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="relative overflow-hidden text-white py-20 mb-12 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 shadow-lg backdrop-blur mb-6">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-sm">
            Catalogue Téléphone (iPhone • Samsung) 2025
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/90 max-w-2xl mx-auto">
            Découvrez notre sélection exclusive des meilleurs smartphones du marché
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full px-5 py-2 bg-white/10 ring-1 ring-white/15 backdrop-blur">
              <span>✨</span>
              <span className="text-sm font-medium">Prix tout inclus</span>
            </div>
            <div className="flex items-center gap-2 rounded-full px-5 py-2 bg-white/10 ring-1 ring-white/15 backdrop-blur">
              <span>🚚</span>
              <span className="text-sm font-medium">Livraison gratuite</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Controls */}
        <section className="rounded-3xl p-6 mb-8 shadow-lg bg-white border border-slate-200">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 mb-1">Recherche</label>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Rechercher par nom, marque ou prix..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Marque</label>
              <select
                value={brand}
                onChange={(e) => onChangeBrand(e.target.value as "All" | "Apple" | "Samsung")}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">Toutes</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Modèle</label>
              <select
                value={model}
                onChange={(e) => onChangeModel(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {modelOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Catalogue */}
        <section id="catalogue" className="rounded-3xl p-8 mb-8 shadow-lg bg-gradient-to-br from-slate-50 to-slate-200">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 w-10 h-10 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white text-lg">📦</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-0">Catalogue</h2>
              <p className="text-gray-600 text-sm">{filtered.length} résultat(s){filtered.length > pageSize ? ` • page ${currentPage}/${totalPages}` : ""}</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center text-slate-500 py-12">Aucun résultat. Essayez d&apos;autres filtres.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginated.map((p) => (
                <PhoneCard key={`${p.brand}-${p.title}`} phone={{ ...p, subtitle: renderSubtitle(p.title, p.brand) }} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((n) => Math.max(1, n - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white disabled:opacity-50"
              >
                Précédent
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                  Math.max(0, currentPage - 3),
                  Math.max(0, currentPage - 3) + 5
                ).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`px-3 py-2 rounded-lg border ${
                      n === currentPage
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white border-slate-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage((n) => Math.min(totalPages, n + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="relative mt-8 text-slate-100 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900">
        <div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full blur" />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="space-y-2">
              <div className="inline-flex items-center text-lg font-semibold">
                <span>COCCINELLE SARL</span>
              </div>
              <p className="text-slate-300 text-sm">Catalogue téléphones haut de gamme</p>
            </div>

            <div className="text-center md:text-left">
              <p className="font-medium">Adresse</p>
              <p className="text-slate-300 text-sm">Avenue Kapenda, Procure, Ref : Cathedrale</p>
            </div>

            <div className="md:text-right text-center space-y-2">
              <p className="font-medium">Contact</p>
              <div className="flex md:justify-end justify-center gap-3">
                <a href="tel:+243970746213" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 transition px-3 py-1.5 text-sm">
                  <span>📞</span>
                  <span className="tracking-wide">+243 970 746 213</span>
                </a>
                <a href="tel:+243851958937" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 transition px-3 py-1.5 text-sm">
                  <span>📞</span>
                  <span className="tracking-wide">+243 851 958 937</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="mt-4 text-center text-xs text-slate-300">© {new Date().getFullYear()} COCCINELLE SARL. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

