export type CurrencyType = {
  _id?: string;
  region: string;
  currency: string;
  name: string;
  icon: string;
  country: string;
};
// prettier-ignore
export const CURRENCY_TYPES = [
  // North America
  { region: "US", currency: "USD", name: "United States Dollar", icon: "$", country: "USA" },
  { region: "CA", currency: "CAD", name: "Canadian Dollar", icon: "C$", country: "Canada" },
  { region: "MX", currency: "MXN", name: "Mexican Peso", icon: "Mex$", country: "Mexico" },

  // Europe
  { region: "EU", currency: "EUR", name: "Euro", icon: "€", country: "Eurozone" },
  { region: "GB", currency: "GBP", name: "British Pound Sterling", icon: "£", country: "UK" },
  { region: "CH", currency: "CHF", name: "Swiss Franc", icon: "CHF", country: "Switzerland" },
  { region: "SE", currency: "SEK", name: "Swedish Krona", icon: "kr", country: "Sweden" },
  { region: "NO", currency: "NOK", name: "Norwegian Krone", icon: "kr", country: "Norway" },
  { region: "DK", currency: "DKK", name: "Danish Krone", icon: "kr", country: "Denmark" },

  // Asia
  { region: "IN", currency: "INR", name: "Indian Rupee", icon: "₹", country: "India" },
  { region: "JP", currency: "JPY", name: "Japanese Yen", icon: "¥", country: "Japan" },
  { region: "CN", currency: "CNY", name: "Chinese Yuan", icon: "¥", country: "China" },
  { region: "SG", currency: "SGD", name: "Singapore Dollar", icon: "S$", country: "Singapore" },
  { region: "HK", currency: "HKD", name: "Hong Kong Dollar", icon: "HK$", country: "Hong Kong" },
  { region: "KR", currency: "KRW", name: "South Korean Won", icon: "₩", country: "South Korea" },
  { region: "TH", currency: "THB", name: "Thai Baht", icon: "฿", country: "Thailand" },
  { region: "MY", currency: "MYR", name: "Malaysian Ringgit", icon: "RM", country: "Malaysia" },
  { region: "ID", currency: "IDR", name: "Indonesian Rupiah", icon: "Rp", country: "Indonesia" },

  // Arabic Region (Middle East & North Africa)
  { region: "AE", currency: "AED", name: "United Arab Emirates Dirham", icon: "د.إ", country: "UAE" },
  { region: "SA", currency: "SAR", name: "Saudi Riyal", icon: "﷼", country: "Saudi Arabia" },
  { region: "QA", currency: "QAR", name: "Qatari Riyal", icon: "﷼", country: "Qatar" },
  { region: "KW", currency: "KWD", name: "Kuwaiti Dinar", icon: "د.ك", country: "Kuwait" },
  { region: "OM", currency: "OMR", name: "Omani Rial", icon: "﷼", country: "Oman" },
  { region: "BH", currency: "BHD", name: "Bahraini Dinar", icon: "د.ب", country: "Bahrain" },
  { region: "EG", currency: "EGP", name: "Egyptian Pound", icon: "£", country: "Egypt" },
  { region: "MA", currency: "MAD", name: "Moroccan Dirham", icon: "د.م.", country: "Morocco" },
  { region: "DZ", currency: "DZD", name: "Algerian Dinar", icon: "د.ج", country: "Algeria" },
  { region: "IQ", currency: "IQD", name: "Iraqi Dinar", icon: "ع.د", country: "Iraq" },
  { region: "JO", currency: "JOD", name: "Jordanian Dinar", icon: "د.ا", country: "Jordan" },
  { region: "LB", currency: "LBP", name: "Lebanese Pound", icon: "ل.ل", country: "Lebanon" },
  { region: "SY", currency: "SYP", name: "Syrian Pound", icon: "£", country: "Syria" },
  { region: "YE", currency: "YER", name: "Yemeni Rial", icon: "﷼", country: "Yemen" },

  // South America
  { region: "BR", currency: "BRL", name: "Brazilian Real", icon: "R$", country: "Brazil" },
  { region: "AR", currency: "ARS", name: "Argentine Peso", icon: "$", country: "Argentina" },
  { region: "CL", currency: "CLP", name: "Chilean Peso", icon: "$", country: "Chile" },
  { region: "CO", currency: "COP", name: "Colombian Peso", icon: "$", country: "Colombia" },
  { region: "PE", currency: "PEN", name: "Peruvian Sol", icon: "S/", country: "Peru" },

  // Africa
  { region: "ZA", currency: "ZAR", name: "South African Rand", icon: "R", country: "South Africa" },
  { region: "NG", currency: "NGN", name: "Nigerian Naira", icon: "₦", country: "Nigeria" },
  { region: "KE", currency: "KES", name: "Kenyan Shilling", icon: "KSh", country: "Kenya" },
  { region: "GH", currency: "GHS", name: "Ghanaian Cedi", icon: "₵", country: "Ghana" },

  // Oceania
  { region: "AU", currency: "AUD", name: "Australian Dollar", icon: "A$", country: "Australia" },
  { region: "NZ", currency: "NZD", name: "New Zealand Dollar", icon: "NZ$", country: "New Zealand" }
];
