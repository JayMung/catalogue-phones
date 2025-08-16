import Image from "next/image";

export type Phone = {
  image: string; // path under /public
  title: string;
  subtitle?: string;
  price: string; // formatted, e.g. "1269.23 $"
};

export default function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-2xl">
      <div className="rounded-xl p-4 mb-4 bg-gradient-to-br from-slate-100 to-slate-200">
        <Image
          src={phone.image}
          alt={phone.title}
          width={320}
          height={320}
          className="mx-auto h-48 w-full object-contain"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{phone.title}</h3>
        {phone.subtitle && (
          <p className="text-sm text-gray-500">{phone.subtitle}</p>
        )}
        <div className="inline-flex items-center justify-center rounded-full text-white font-bold py-2 px-4 text-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
          {phone.price}
        </div>
        <p className="text-xs text-gray-400">Tous frais inclus</p>
      </div>
    </div>
  );
}
