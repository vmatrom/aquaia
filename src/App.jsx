import { lazy, Suspense, useEffect, useState } from "react";
import { Waves, Smartphone, ArrowUpRight, X } from "lucide-react";
import Catalog from "./Catalog";
import Booking from "./Booking";
import Management, { Reservations } from "./Management";
import { initialPromos, readSaved, activities } from "./data";
const RouteMap = lazy(() => import("./RouteMap"));
export default function App() {
  const [page, setPage] = useState("Experiencias");
  const [selected, setSelected] = useState(null);
  const [bookings, setBookings] = useState(() =>
    readSaved("aqua-bookings-v1", []),
  );
  const [promos, setPromos] = useState(() =>
    readSaved("aqua-promos-v1", initialPromos),
  );
  const [install, setInstall] = useState(null);
  const [installHelp, setInstallHelp] = useState(false);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  function changePromos(next) {
    try {
      localStorage.setItem("aqua-promos-v1", JSON.stringify(next));
      setPromos(next);
    } catch {
      setStorageError("No hay espacio para guardar cambios en este navegador.");
    }
  }
  function save(data) {
    const row = {
      ...data,
      id: "AQ-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
      status: "demo",
      createdAt: new Date().toISOString(),
    };
    const next = [row, ...bookings];
    localStorage.setItem("aqua-bookings-v1", JSON.stringify(next));
    setBookings(next);
    if (data.promo)
      changePromos(
        promos.map((p) =>
          p.code === data.promo ? { ...p, used: p.used + 1 } : p,
        ),
      );
    setPage("Mis reservas");
    return row;
  }
  function cancel(id) {
    const next = bookings.map((b) =>
      b.id === id ? { ...b, status: "cancelled" } : b,
    );
    try {
      localStorage.setItem("aqua-bookings-v1", JSON.stringify(next));
      setBookings(next);
    } catch {
      setStorageError("No se pudo guardar la cancelación.");
    }
  }
  function navigate(next) {
    setPage(next);
    window.scrollTo({ top: 0 });
  }
  async function installApp() {
    if (install) {
      await install.prompt();
      setInstall(null);
    } else setInstallHelp(true);
  }
  return (
    <>
      <header className="header">
        <button
          className="brand"
          onClick={() => navigate("Experiencias")}
          aria-label="AQUA inicio"
        >
          <Waves />
          <span>
            AQUA<small>SANTA POLA JET SKI</small>
          </span>
        </button>
        <nav aria-label="Navegación principal">
          {["Experiencias", "Mapa 3D", "Mis reservas"].map((x) => (
            <button
              className={page === x ? "selected" : ""}
              onClick={() => navigate(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </nav>
        <button className="install" onClick={installApp}>
          <Smartphone size={17} />
          <span>Instalar app</span>
        </button>
      </header>
      <main>
        {storageError ? (
          <p className="error" role="alert">
            {storageError}
          </p>
        ) : null}
        {page === "Experiencias" ? (
          <Catalog onBook={setSelected} onMap={() => navigate("Mapa 3D")} />
        ) : page === "Mapa 3D" ? (
          <Suspense
            fallback={
              <div className="empty">Preparando el mapa del Mediterráneo…</div>
            }
          >
            <RouteMap onBook={setSelected} />
          </Suspense>
        ) : page === "Mis reservas" ? (
          <Reservations
            bookings={bookings}
            onExplore={() => navigate("Experiencias")}
            onCancel={cancel}
          />
        ) : (
          <Management promos={promos} onChange={changePromos} />
        )}
      </main>
      <footer>
        <span>
          Precios publicados en la{" "}
          <a
            href="https://santapolajetski.com/"
            target="_blank"
            rel="noreferrer"
          >
            web oficial <ArrowUpRight size={12} />
          </a>
          . Reservas y promociones de demostración.
        </span>
        <button className="text-button" onClick={() => navigate("Promociones")}>
          Gestionar promociones
        </button>
        <span className="footer-brand">
          SANTA POLA JET SKI <Waves />
        </span>
      </footer>
      {selected ? (
        <Booking
          activity={selected}
          promos={promos}
          onClose={() => setSelected(null)}
          onSave={save}
        />
      ) : null}
      {installHelp ? (
        <div className="toast" role="status">
          <button
            aria-label="Cerrar instrucciones"
            className="close"
            onClick={() => setInstallHelp(false)}
          >
            <X size={18} />
          </button>
          <h3>Lleva AQUA contigo.</h3>
          <p>
            En Chrome o Edge, abre el menú y selecciona «Instalar aplicación».
            En iPhone, usa Safari → Compartir → Añadir a pantalla de inicio.
          </p>
          <small>
            La instalación requiere HTTPS o localhost. El mapa necesita
            conexión.
          </small>
        </div>
      ) : null}
    </>
  );
}
