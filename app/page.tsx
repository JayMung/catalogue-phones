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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-4">
            <span className="text-6xl">📱</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Catalogue Telephone ( Iphones - Samsung) 2025
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Découvrez notre sélection exclusive des meilleurs smartphones du marché
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-sm font-medium">✨ Prix tout inclus</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-sm font-medium">🚚 Livraison gratuite</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <section className="rounded-3xl p-8 mb-16 shadow-lg bg-gradient-to-br from-slate-50 to-slate-200">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl"></span>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-1">Apple</h2>
              <p className="text-gray-600">Pensez différemment</p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {applePhones.map((p) => (
              <PhoneCard
                key={p.title}
                phone={{ ...p, subtitle: subtitleApple(p.title) }}
              />
            ))}
          </div>
        </section>

        <section className="rounded-3xl p-8 mb-16 shadow-lg bg-gradient-to-br from-slate-50 to-slate-200">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">🅂</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-1">Samsung</h2>
              <p className="text-gray-600">Innovation et performance</p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {samsungPhones.map((p) => (
              <PhoneCard
                key={p.title}
                phone={{ ...p, subtitle: subtitleSamsung(p.title) }}
              />
            ))}
          </div>
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

