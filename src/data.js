const official = "https://watersportsantapola.com";

export const activities = [
  {
    id: "sp30",
    category: "Jet ski",
    title: "Jet ski · 30 min",
    place: "Santa Pola",
    minutes: 30,
    price: 85,
    unit: "moto",
    capacity: "Hasta 2 personas por moto",
    description:
      "Ruta con monitor por Playa Lisa y Playa Levante. No requiere titulación.",
    image: "sea",
    times: ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00"],
    officialUrl: `${official}/jet-ski-santa-pola-motos-de-agua-santa-pola.html`,
    route: true,
  },
  {
    id: "sp60",
    category: "Jet ski",
    title: "Jet ski · 60 min",
    place: "Costa de Santa Pola",
    minutes: 60,
    price: 135,
    unit: "moto",
    capacity: "Hasta 2 personas por moto",
    description:
      "Una hora para recorrer distintas playas de la costa con monitor.",
    image: "ride",
    times: ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00"],
    officialUrl: `${official}/jet-ski-santa-pola-motos-de-agua-santa-pola.html`,
    route: true,
  },
  {
    id: "tb90",
    category: "Jet ski",
    title: "Jet ski Tabarca · 90 min",
    place: "Tabarca",
    minutes: 90,
    price: 150,
    unit: "moto",
    capacity: "Hasta 2 personas por moto",
    description:
      "Salida a las 09:00 hacia Tabarca, parada para baño y aperitivo.",
    image: "island",
    times: ["09:00"],
    officialUrl: `${official}/jet-ski-santa-pola-motos-de-agua-santa-pola.html`,
    route: true,
  },
  {
    id: "tb120",
    category: "Jet ski",
    title: "Jet ski Tabarca · 120 min",
    place: "Tabarca",
    minutes: 120,
    price: 185,
    unit: "moto",
    capacity: "Hasta 2 personas por moto",
    description:
      "La experiencia larga a Tabarca, con salida a las 10:00 y aperitivo.",
    image: "coast",
    times: ["10:00"],
    officialUrl: `${official}/jet-ski-santa-pola-motos-de-agua-santa-pola.html`,
    route: true,
  },
  {
    id: "licensed4",
    category: "Jet ski",
    title: "Jet ski con licencia · 4 h",
    place: "Santa Pola",
    minutes: 240,
    price: 250,
    unit: "moto",
    capacity: "Hasta 3 personas · fianza 700 €",
    description:
      "Sea-Doo GTX 130 para navegación con titulación. Combustible no incluido.",
    image: "ride",
    times: ["10:00", "15:00"],
    officialUrl: `${official}/jet-ski-santa-pola-motos-de-agua-santa-pola.html`,
  },
  {
    id: "boat-nolicense",
    category: "Barcos",
    title: "Barco sin licencia · 2 h",
    place: "Santa Pola",
    minutes: 120,
    price: 130,
    unit: "barco",
    capacity: "Hasta 6 personas · fianza 400 €",
    description: "Voraz 5.00 o Compass 165. Combustible no incluido.",
    image: "coast",
    times: ["10:00", "12:30", "16:00", "18:30"],
    officialUrl: `${official}/reservas/product/barcos-de-alquiler-en-santa-pola-sin-licencia/`,
  },
  {
    id: "boat-license",
    category: "Barcos",
    title: "Barco con licencia · medio día",
    place: "Santa Pola",
    minutes: 240,
    price: 230,
    unit: "barco",
    capacity: "Hasta 8–12 personas según modelo · fianza 400 €",
    description:
      "Blueline, Cattleya o Nireus. Titulación y combustible aparte.",
    image: "sea",
    times: ["10:00", "15:00"],
    officialUrl: `${official}/reservas/product/alquiler-de-barcos-en-santa-pola-rent-boat-alicante/`,
  },
  {
    id: "sail-half",
    category: "Veleros",
    title: "Velero con patrón · medio día",
    place: "Marina Miramar",
    minutes: 240,
    price: 300,
    unit: "velero",
    capacity: "8 a 12 personas",
    description:
      "Incluye patrón, combustible, paddle surf, snorkel y limpieza. Tarifa desde temporada baja.",
    image: "coast",
    times: ["10:00", "15:00"],
    officialUrl: `${official}/reservas/product/alquiler-de-veleros-en-santa-pola/`,
  },
  {
    id: "sail-sunset",
    category: "Veleros",
    title: "Velero al atardecer",
    place: "Marina Miramar",
    minutes: 240,
    price: 350,
    unit: "velero",
    capacity: "Hasta 12 personas",
    description:
      "Navegación de 20:00 a 24:00 con patrón para vivir la puesta de sol.",
    image: "island",
    times: ["20:00"],
    officialUrl: `${official}/reservas/product/alquiler-de-velero-en-santa-pola-atardecer`,
  },
  {
    id: "parasailing1",
    category: "Parasailing",
    title: "Parasailing · 1 persona",
    place: "Santa Pola",
    minutes: 15,
    price: 70,
    unit: "persona",
    capacity: "Vuelo de unos 15 minutos",
    description:
      "Precio web individual. Vuelos compartidos sujetos a peso y criterio del patrón.",
    image: "sea",
    times: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00"],
    officialUrl: `${official}/reservas/product/parasailing-en-alicante-barcos-de-alquiler-en-santa-pola/`,
  },
  {
    id: "snorkel",
    category: "Snorkel",
    title: "Speed boat + snorkel Tabarca",
    place: "Tabarca",
    minutes: 150,
    price: 39,
    unit: "persona",
    capacity: "Adultos · menores de 12 años: 35 €",
    description:
      "Excursión de 2,5 horas desde el puerto de Santa Pola con snorkel en Tabarca.",
    image: "island",
    times: ["10:00", "16:00"],
    officialUrl: `${official}/reservas/product/snorkel-en-santa-pola-barcos-de-alquiler/`,
  },
  {
    id: "inflatable",
    category: "Hinchables",
    title: "Speed boat + hinchable",
    place: "Santa Pola",
    minutes: 15,
    price: 25,
    unit: "persona",
    minUnits: 4,
    capacity: "Mínimo 4 personas",
    description:
      "Experiencia de 15 minutos en sofá hinchable remolcado por lancha rápida.",
    image: "ride",
    times: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00"],
    officialUrl: `${official}/reservas/product/alquiler-de-hinchables-en-santa-pola/`,
  },
];

export const routeActivities = activities.filter((activity) => activity.route);
export const activityTitle = (activity) =>
  activity.title || `${activity.place} · ${activity.minutes} min`;
export const unitPlural = (activity, units) => {
  const unit = activity.unit || "unidad";
  const plural = {
    moto: "motos",
    barco: "barcos",
    velero: "veleros",
    persona: "personas",
    unidad: "unidades",
  }[unit];
  return `${units} ${units === 1 ? unit : plural}`;
};
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
