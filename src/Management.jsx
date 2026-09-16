import { useState } from "react";
import { Ticket, Plus, CalendarDays, ArrowUpRight } from "lucide-react";
import { money, today } from "./data";
export function Reservations({ bookings, onExplore, onCancel }) {
  return (
    <section className="page">
      <div className="section-head">
        <div>
          <h1>
            Tu próxima <span>escapada.</span>
          </h1>
          <p>
            Planes guardados en este dispositivo. Todas las reservas son de
            demostración.
          </p>
        </div>
      </div>
      {!bookings.length ? (
        <div className="empty">
          <CalendarDays size={40} />
          <h2>El mar te está esperando.</h2>
          <p>Elige una experiencia para empezar a preparar tu reserva.</p>
          <button className="button" onClick={onExplore}>
            Explorar experiencias <ArrowUpRight size={18} />
          </button>
        </div>
      ) : (
        <div className="reservation-list">
          {bookings.map((b) => (
            <article className="reservation" key={b.id}>
              <div>
                <small className="lime">
                  {b.id} ·{" "}
                  {b.status === "cancelled"
                    ? "CANCELADA"
                    : b.group
                      ? "SOLICITUD DE GRUPO DEMO"
                      : "RESERVA DEMO"}
                </small>
                <h3>{b.title}</h3>
                <p>
                  {b.date} · {b.time} ·{" "}
                  {b.group ? `${b.attendees} asistentes` : `${b.units} moto(s)`}
                </p>
                {b.notes ? <p>{b.notes}</p> : null}
                <small>
                  {b.name}
                  {b.company ? ` · ${b.company}` : ""}
                </small>
              </div>
              <div className="reservation-total">
                <strong>
                  {b.group ? "Presupuesto pendiente" : money(b.total)}
                </strong>
                {b.promo ? <small>Código: {b.promo}</small> : null}
                {b.status !== "cancelled" ? (
                  <button
                    className="text-button"
                    onClick={() => onCancel(b.id)}
                  >
                    Cancelar plan local
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
export default function Management({ promos, onChange }) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function create(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const code = String(f.get("code")).trim().toUpperCase();
    const type = f.get("type");
    const value = Number(f.get("value"));
    if (promos.some((p) => p.code === code)) {
      setError("Este código ya existe.");
      return;
    }
    if (type === "percent" && value > 100) {
      setError("El porcentaje no puede superar el 100 %.");
      return;
    }
    const p = {
      code,
      type,
      value,
      min: Number(f.get("min")),
      limit: Number(f.get("limit")),
      expires: f.get("expires"),
      active: true,
      used: 0,
    };
    onChange([...promos, p]);
    setError("");
    setMessage(`Código ${code} creado.`);
    e.currentTarget.reset();
  }
  return (
    <section className="page">
      <h1>
        Más planes.
        <br />
        <span>Más posibilidades.</span>
      </h1>
      <p>
        Promociones de demostración. La gestión es local y no está protegida
        como un panel de producción.
      </p>
      <div className="manage-grid">
        <div>
          <h2>Códigos promocionales</h2>
          {promos.map((p) => (
            <article className="promo-row" key={p.code}>
              <Ticket className="lime" />
              <div>
                <h3>{p.code}</h3>
                <p>
                  {p.type === "percent" ? `${p.value} %` : money(p.value)} ·
                  Mínimo {money(p.min)}
                </p>
                <small>
                  Hasta {p.expires} · {p.used}/{p.limit} usos
                </small>
              </div>
              <button
                className={p.active ? "status active" : "status"}
                onClick={() =>
                  onChange(
                    promos.map((x) =>
                      x.code === p.code ? { ...x, active: !x.active } : x,
                    ),
                  )
                }
                aria-label={`${p.active ? "Desactivar" : "Activar"} ${p.code}`}
              >
                {p.active ? "Activo" : "Pausado"}
              </button>
            </article>
          ))}
        </div>
        <form className="promo-form" onSubmit={create}>
          <h2>
            <Plus size={20} /> Nueva promoción
          </h2>
          <label>
            Código
            <input
              name="code"
              required
              pattern="[A-Za-z0-9_-]{3,24}"
              placeholder="VERANO15"
              maxLength={24}
            />
          </label>
          <div className="form-grid">
            <label>
              Tipo
              <select name="type">
                <option value="percent">Porcentaje (%)</option>
                <option value="fixed">Importe fijo (€)</option>
              </select>
            </label>
            <label>
              Descuento
              <input
                name="value"
                required
                type="number"
                min="0.01"
                step="0.01"
                defaultValue="15"
              />
            </label>
            <label>
              Importe mínimo (€)
              <input
                name="min"
                required
                type="number"
                min="0"
                step="0.01"
                defaultValue="0"
              />
            </label>
            <label>
              Límite de usos
              <input
                name="limit"
                required
                type="number"
                min="1"
                step="1"
                defaultValue="50"
              />
            </label>
          </div>
          <label>
            Fecha de caducidad
            <input name="expires" required type="date" min={today()} />
          </label>
          {error ? (
            <p role="alert" className="error">
              {error}
            </p>
          ) : null}
          {message ? (
            <p role="status" className="lime">
              {message}
            </p>
          ) : null}
          <button className="button">
            Crear código <Plus size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
