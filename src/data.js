export const activities = [
  {
    id: "sp30",
    place: "Santa Pola",
    minutes: 30,
    price: 85,
    description:
      "Tu primer encuentro con el mar. Recorre la bahía con un monitor.",
    image: "sea",
    url: "jet-ski-santa-pola-30-minutos",
  },
  {
    id: "sp60",
    place: "Santa Pola",
    minutes: 60,
    price: 135,
    description: "Más tiempo, más emoción. Descubre Santa Pola desde el agua.",
    image: "ride",
    url: "jet-ski-santa-pola-60-minutos",
  },
  {
    id: "tb90",
    place: "Tabarca",
    minutes: 90,
    price: 150,
    description: "Rumbo a la isla de Tabarca. Una escapada al Mediterráneo.",
    image: "island",
    url: "jet-ski-isla-de-tabarca",
  },
  {
    id: "tb120",
    place: "Tabarca",
    minutes: 120,
    price: 185,
    description:
      "La experiencia más larga. Disfruta del trayecto hacia la isla.",
    image: "coast",
    url: "jet-ski-isla-de-tabarca-2-horas",
  },
];
export const money = (n) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
export const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
export const initialPromos = [
  {
    code: "AQUA10",
    type: "percent",
    value: 10,
    min: 0,
    expires: "2027-12-31",
    limit: 50,
    used: 0,
    active: true,
  },
  {
    code: "TABARCA20",
    type: "fixed",
    value: 20,
    min: 150,
    expires: "2027-12-31",
    limit: 25,
    used: 0,
    active: true,
  },
];
export function priceBooking(subtotal, code, promos, day = today()) {
  if (!code.trim()) return { discount: 0, total: subtotal, promo: null };
  const p = promos.find((p) => p.code === code.trim().toUpperCase());
  const error = !p
    ? "Código no encontrado."
    : !p.active
      ? "Este código está desactivado."
      : p.expires < day
        ? "Este código ha caducado."
        : p.used >= p.limit
          ? "Este código ha agotado sus usos."
          : subtotal < p.min
            ? `El importe mínimo es ${money(p.min)}.`
            : null;
  if (error) return { discount: 0, total: subtotal, error };
  const discount = Math.min(
    subtotal,
    Math.round(
      (p.type === "percent" ? (subtotal * p.value) / 100 : p.value) * 100,
    ) / 100,
  );
  return {
    discount,
    total: Math.round((subtotal - discount) * 100) / 100,
    promo: p.code,
  };
}
export function readSaved(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}
