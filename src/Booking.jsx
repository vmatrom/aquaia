import { useRef, useEffect, useState } from "react";
import { X, ArrowRight, Check, Ticket, ArrowLeft } from "lucide-react";
import { activityTitle, money, priceBooking, today, unitPlural } from "./data";
export default function Booking({ activity, promos, onClose, onSave }) {
  const dialog = useRef(null);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(today());
  const [time, setTime] = useState(activity.times?.[0] || "10:00");
  const [units, setUnits] = useState(activity.minUnits || 1);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(null);
  useEffect(() => {
    const previous = document.activeElement;
    dialog.current.showModal();
    return () => previous?.focus();
  }, []);
  const [group, setGroup] = useState(Boolean(activity.group));
  const [attendees, setAttendees] = useState(8);
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const subtotal = group ? 0 : activity.price * units;
  const quote = priceBooking(subtotal, applied, promos);
  function apply() {
    const q = priceBooking(subtotal, code, promos);
    setError(q.error || "");
    if (!q.error) setApplied(code.trim().toUpperCase());
  }
  function submit(e) {
    e.preventDefault();
    if (date < today()) {
      setStep(1);
      setError("Elige una fecha actual o futura.");
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    const q = priceBooking(subtotal, applied, promos);
    if (q.error) {
      setError(q.error);
      return;
    }
    try {
      const row = onSave({
        activityId: activity.id,
        title: activityTitle(activity),
        date,
        time,
        units,
        group,
        attendees: group ? attendees : null,
        company: group ? company.trim() : "",
        notes: group ? notes.trim() : "",
        name: name.trim(),
        email: email.trim(),
        subtotal,
        ...q,
      });
      setSaved(row);
    } catch {
      setError(
        "No se pudo guardar. Comprueba el almacenamiento del navegador.",
      );
    }
  }
  return (
    <dialog
      ref={dialog}
      aria-label="Preparar reserva"
      className="booking"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="close" aria-label="Cerrar reserva" onClick={onClose}>
        <X />
      </button>
      {saved ? (
        <div className="success">
          <div className="success-icon">
            <Check size={35} />
          </div>
          <h2>
            {group ? "Tu solicitud está guardada." : "Tu plan está guardado."}
          </h2>
          <p>
            Reserva de demostración <strong>{saved.id}</strong>
          </p>
          <p>
            {saved.title}
            <br />
            {date} · {time} ·{" "}
            {group ? `${attendees} asistentes` : unitPlural(activity, units)}
          </p>
          <strong className="big-price">
            {group ? "Presupuesto pendiente" : money(saved.total)}
          </strong>
          <p>No se ha enviado al operador ni realizado ningún cobro.</p>
          <button className="button" onClick={onClose}>
            Ver mis reservas
          </button>
        </div>
      ) : (
        <>
          <small className="lime">PREPARA TU ESCAPADA</small>
          <h2>{activityTitle(activity)}</h2>
          <div className="steps">
            {["Tu experiencia", "Tus datos", "Resumen"].map((s, i) => (
              <span key={s} className={step === i + 1 ? "current" : ""}>
                {i + 1} <span>{s}</span>
              </span>
            ))}
          </div>
          <form onSubmit={submit}>
            {step === 1 ? (
              <>
                <div className="booking-mode">
                  <button
                    type="button"
                    className={!group ? "active" : ""}
                    onClick={() => setGroup(false)}
                  >
                    Particulares
                  </button>
                  <button
                    type="button"
                    className={group ? "active" : ""}
                    onClick={() => {
                      setGroup(true);
                      setApplied("");
                      setError("");
                    }}
                  >
                    Grupos / empresas
                  </button>
                </div>
                <div className="form-grid">
                  <label>
                    Fecha
                    <input
                      required
                      type="date"
                      min={today()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <label>
                    Horario orientativo
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      {(activity.times || ["10:00"]).map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>
                {group ? (
                  <label>
                    Número de asistentes
                    <input
                      type="number"
                      min="2"
                      max="200"
                      required
                      value={attendees}
                      onChange={(e) => setAttendees(Number(e.target.value))}
                    />
                  </label>
                ) : (
                  <label>
                    Número de{" "}
                    {activity.unit === "persona"
                      ? "personas"
                      : `${activity.unit || "unidad"}s`}
                    <select
                      value={units}
                      onChange={(e) => setUnits(Number(e.target.value))}
                    >
                      {Array.from(
                        { length: activity.unit === "persona" ? 12 : 4 },
                        (_, i) => i + (activity.minUnits || 1),
                      ).map((n) => (
                        <option value={n} key={n}>
                          {unitPlural(activity, n)}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <p className="note">
                  Horarios orientativos. Plazas, condiciones y punto de
                  encuentro sujetos a confirmación del operador.
                </p>
              </>
            ) : step === 2 ? (
              <>
                <label>
                  Nombre
                  <input
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    pattern=".*\S.*"
                  />
                </label>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    maxLength={150}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </label>
                {group ? (
                  <>
                    <label>
                      Empresa / nombre del grupo
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Nombre del grupo o empresa"
                        maxLength={120}
                      />
                    </label>
                    <label>
                      Cuéntanos vuestro plan
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Team building, celebración, horarios preferidos…"
                        maxLength={1500}
                      />
                    </label>
                  </>
                ) : null}
                <p className="note">
                  Estos datos se guardan únicamente en este navegador para
                  probar la reserva.
                </p>
              </>
            ) : (
              <>
                <div className="summary-row">
                  <span>
                    {date} · {time}
                  </span>
                  <span>
                    {group
                      ? `${attendees} asistentes`
                      : unitPlural(activity, units)}
                  </span>
                </div>
                <p>
                  {name} · {email}
                </p>
                {group ? (
                  <p className="note">
                    Solicitud de presupuesto para {company || "tu grupo"}. El
                    operador debe confirmar precio, flota y turnos. Los códigos
                    se aplican a reservas individuales.
                  </p>
                ) : (
                  <>
                    <label>
                      Código promocional
                      <div className="code-input">
                        <Ticket size={19} />
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Ej. AQUA10"
                        />
                        <button type="button" onClick={apply}>
                          Aplicar
                        </button>
                      </div>
                    </label>
                    {applied && !quote.error ? (
                      <p className="lime">
                        {applied} aplicado{" "}
                        <button
                          className="text-button"
                          type="button"
                          onClick={() => {
                            setApplied("");
                            setCode("");
                          }}
                        >
                          Quitar
                        </button>
                      </p>
                    ) : null}
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>{money(subtotal)}</span>
                    </div>
                    {quote.discount > 0 ? (
                      <div className="summary-row lime">
                        <span>Descuento</span>
                        <span>−{money(quote.discount)}</span>
                      </div>
                    ) : null}
                  </>
                )}
                <p className="note">
                  Tarifa de referencia de la web oficial. Esta simulación no
                  garantiza precio ni disponibilidad y no genera una reserva
                  real.
                </p>
                <label className="checkbox">
                  <input required type="checkbox" />
                  Entiendo que es una reserva de demostración.
                </label>
              </>
            )}
            {error || quote.error ? (
              <p role="alert" className="error">
                {error || quote.error}
              </p>
            ) : null}
            <div className="booking-bottom">
              <div>
                <small>{group ? "Grupo / empresa" : "Total estimado"}</small>
                <strong style={group ? { fontSize: 17 } : undefined}>
                  {group ? "A consultar" : money(quote.total)}
                </strong>
              </div>
              {step > 1 ? (
                <button
                  aria-label="Paso anterior"
                  type="button"
                  className="round"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft />
                </button>
              ) : null}
              <button className="button" type="submit">
                {step === 3
                  ? group
                    ? "Guardar solicitud demo"
                    : "Guardar reserva demo"
                  : "Continuar"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </>
      )}
    </dialog>
  );
}
