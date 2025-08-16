import type { Phone } from "../components/PhoneCard";

// Normalized helper to ensure public asset paths start with '/assets/...'
const img = (p: string) => (p.startsWith("/") ? p : `/${p}`);

export const applePhones: Phone[] = [
  // iPhone 16 series
  { image: img("assets/apple-iphone-16-pro-max-1.jpg"), title: "iPhone 16 Pro Max - 256GB", price: "1115.38 $" },
  { image: img("assets/apple-iphone-16-pro-1.jpg"), title: "iPhone 16 Pro - 256GB", price: "953.85 $" },
  { image: img("assets/apple-iphone-16-pro-1.jpg"), title: "iPhone 16 Pro - 128GB", price: "907.69 $" },
  { image: img("assets/apple-iphone-16-plus-1.jpg"), title: "iPhone 16 Plus - 256GB", price: "800.00 $" },
  { image: img("assets/apple-iphone-16-plus-1.jpg"), title: "iPhone 16 Plus - 128GB", price: "746.15 $" },
  { image: img("assets/apple-iphone-16-1.jpg"), title: "iPhone 16 - 256GB", price: "738.46 $" },
  { image: img("assets/apple-iphone-16-1.jpg"), title: "iPhone 16 - 128GB", price: "676.92 $" },

  // iPhone 15 series
  { image: img("assets/apple-iphone-15-pro-max-1.jpg"), title: "iPhone 15 Pro Max 512GB", price: "884.62 $" },
  { image: img("assets/apple-iphone-15-pro-max-1.jpg"), title: "iPhone 15 Pro Max 256GB", price: "846.15 $" },
  { image: img("assets/apple-iphone-15-pro-1.jpg"), title: "iPhone 15 Pro 512GB", price: "769.23 $" },
  { image: img("assets/apple-iphone-15-pro-1.jpg"), title: "iPhone 15 Pro 256GB", price: "753.85 $" },
  { image: img("assets/apple-iphone-15-pro-1.jpg"), title: "iPhone 15 Pro 128GB", price: "692.31 $" },
  { image: img("assets/apple-iphone-15-plus-1.jpg"), title: "iPhone 15 Plus 256GB", price: "638.46 $" },
  { image: img("assets/apple-iphone-15-plus-1.jpg"), title: "iPhone 15 Plus 128GB", price: "584.62 $" },
  { image: img("assets/apple-iphone-15-1.jpg"), title: "iPhone 15 256GB", price: "607.69 $" },
  { image: img("assets/apple-iphone-15-1.jpg"), title: "iPhone 15 128GB", price: "576.92 $" },

  // iPhone 14 series
  { image: img("assets/apple-iphone-14-pro-max-1.jpg"), title: "iPhone 14 Pro Max 256GB", price: "684.62 $" },
  { image: img("assets/apple-iphone-14-pro-max-1.jpg"), title: "iPhone 14 Pro Max 128GB", price: "638.46 $" },
  { image: img("assets/apple-iphone-14-pro-1.jpg"), title: "iPhone 14 Pro 256GB", price: "566.15 $" },
  { image: img("assets/apple-iphone-14-pro-1.jpg"), title: "iPhone 14 Pro 128GB", price: "550.77 $" },
  { image: img("assets/apple-iphone-14-pro-1.jpg"), title: "iPhone 14 - 256GB - Dual", price: "415.38 $" },

  // iPhone 13 series
  { image: img("assets/apple-iphone-13-pro-max-1.jpg"), title: "iPhone 13 Pro Max 256GB", price: "530.77 $" },
  { image: img("assets/apple-iphone-13-pro-max-1.jpg"), title: "iPhone 13 Pro Max 128GB", price: "492.31 $" },
  { image: img("assets/apple-iphone-13-pro-max-1.jpg"), title: "iPhone 13 Pro 256GB", price: "446.15 $" },
  { image: img("assets/apple-iphone-13-pro-max-1.jpg"), title: "iPhone 13 Pro 128GB", price: "415.38 $" },
  { image: img("assets/apple-iphone-13-pro-max-1.jpg"), title: "iPhone 13 256GB", price: "353.85 $" },
  { image: img("assets/apple-iphone-13-pro-max-1.jpg"), title: "iPhone 13 128GB", price: "323.08 $" },

  // iPhone 12 series
  { image: img("assets/apple-iphone-12-pro-max-1.jpg"), title: "iPhone 12 Pro Max 256GB", price: "407.69 $" },
  { image: img("assets/apple-iphone-12-pro-max-1.jpg"), title: "iPhone 12 Pro Max 128GB", price: "376.92 $" },
  { image: img("assets/apple-iphone-12-pro-max-1.jpg"), title: "iPhone 12 Pro 256GB", price: "330.77 $" },
  { image: img("assets/apple-iphone-12-pro-max-1.jpg"), title: "iPhone 12 Pro 128GB", price: "307.69 $" },
  { image: img("assets/apple-iphone-12-pro-max-1.jpg"), title: "iPhone 12 - 256GB", price: "300.00 $" },
  { image: img("assets/apple-iphone-12-pro-max-1.jpg"), title: "iPhone 12 - 128GB", price: "261.54 $" },

  // iPhone 11 / XS / XR
  { image: img("assets/apple-iphone-11-1.jpg"), title: "iPhone 11 Pro Max - 256GB", price: "307.69 $" },
  { image: img("assets/apple-iphone-11-1.jpg"), title: "iPhone 11 Pro - 256GB", price: "269.23 $" },
  { image: img("assets/apple-iphone-11-1.jpg"), title: "iPhone 11 - 128GB", price: "210.77 $" },
  { image: img("assets/apple-iphone-xs-max-5.jpg"), title: "iPhone XS Max - 256GB", price: "193.85 $" },
  { image: img("assets/apple-iphone-xr-1.jpg"), title: "iPhone XR - 128GB", price: "166.15 $" },
  { image: img("assets/apple-iphone-xr-1.jpg"), title: "iPhone XR - 64GB", price: "152.31 $" },
];

export const samsungPhones: Phone[] = [
  // Z Flip / Fold series (reuse Flip4 image for Flip/Fold where needed)
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Flip 3 128GB", price: "201.92 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Flip 3 256GB", price: "210.00 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Flip 4 128GB", price: "242.31 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Flip 4 256GB", price: "258.46 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Flip 6 256GB", price: "461.54 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 3 256GB", price: "392.31 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 3 512GB", price: "407.69 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 4 256GB", price: "461.54 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 4 512GB", price: "484.62 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 5 256GB", price: "692.31 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 5 512GB", price: "707.69 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 6 256GB", price: "1000.00 $" },
  { image: img("assets/samsung-galaxy-z-flip4-5g-1.jpg"), title: "Galaxy Z Fold 6 512GB", price: "1092.31 $" },

  // S series
  { image: img("assets/samsung-galaxy-s20-1.jpg"), title: "Galaxy S20", price: "150.77 $" },
  { image: img("assets/samsung-galaxy-s21-ultra-5g-1.jpg"), title: "Galaxy S21", price: "184.62 $" },
  { image: img("assets/samsung-galaxy-s21-ultra-5g-1.jpg"), title: "Galaxy S21 Ultra", price: "261.54 $" },
  { image: img("assets/samsung-galaxy-s21-plus-5g-1.jpg"), title: "Galaxy S21 Plus", price: "200.00 $" },

  { image: img("assets/samsung-galaxy-s22-ultra-5g-2.jpg"), title: "Galaxy S22 Ultra 128GB", price: "353.85 $" },
  { image: img("assets/samsung-galaxy-s22-ultra-5g-2.jpg"), title: "Galaxy S22 Ultra 256GB", price: "381.54 $" },
  { image: img("assets/samsung-galaxy-s22-ultra-5g-2.jpg"), title: "Galaxy S22 Ultra 512GB", price: "400.00 $" },

  { image: img("assets/samsung-galaxy-s23-ultra-5g-1.jpg"), title: "Galaxy S23 Ultra 256GB", price: "523.08 $" },
  { image: img("assets/samsung-galaxy-s23-ultra-5g-1.jpg"), title: "Galaxy S23 Ultra 512GB", price: "538.46 $" },

  { image: img("assets/samsung-galaxy-s23-ultra-5g-1.jpg"), title: "Galaxy S24 Ultra 256GB", price: "661.54 $" },
  { image: img("assets/samsung-galaxy-s23-ultra-5g-1.jpg"), title: "Galaxy S24 Ultra 512GB", price: "546.15 $" },
  { image: img("assets/samsung-galaxy-s23-ultra-5g-1.jpg"), title: "Galaxy S24 Ultra (Dual SIM) 256GB", price: "738.46 $" },
  { image: img("assets/samsung-galaxy-s23-ultra-5g-1.jpg"), title: "Galaxy S24 Ultra (Dual SIM) 512GB", price: "815.38 $" },

  { image: img("assets/samsung-galaxy-s23-ultra-5g-1.jpg"), title: "Galaxy S25 Ultra 256GB", price: "969.23 $" },

  // Legacy S9/S10
  { image: img("assets/samsung-galaxy-s9-2.jpg"), title: "Galaxy S9 64GB", price: "112.31 $" },
  { image: img("assets/samsung-galaxy-s9-plus-1.jpg"), title: "Galaxy S9+ 64GB", price: "121.54 $" },
  { image: img("assets/samsung-galaxy-s10-1.jpg"), title: "Galaxy S10 128GB", price: "153.85 $" },
  { image: img("assets/samsung-galaxy-s10-plus-1.jpg"), title: "Galaxy S10+ 128GB", price: "184.62 $" },

  // Note series
  { image: img("assets/samsung-galaxy-note20-1.jpg"), title: "Galaxy Note 20", price: "184.62 $" },
  { image: img("assets/samsung-galaxy-note20-ultra-1.jpg"), title: "Galaxy Note 20 Ultra 256GB", price: "261.54 $" },
  { image: img("assets/samsung-galaxy-note9-1.jpg"), title: "Galaxy Note 8 64GB", price: "113.85 $" },
  { image: img("assets/samsung-galaxy-note9-1.jpg"), title: "Galaxy Note 9 64GB", price: "132.31 $" },
  { image: img("assets/samsung-galaxy-note20-1.jpg"), title: "Galaxy Note 10 256GB", price: "169.23 $" },
  { image: img("assets/samsung-galaxy-note20-ultra-1.jpg"), title: "Galaxy Note 10+ 256GB", price: "215.38 $" },
];

export type { Phone };
