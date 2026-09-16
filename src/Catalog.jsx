import { useState } from "react";
import { ArrowUpRight, MapPin, Users, Waves } from "lucide-react";
import { activities, money } from "./data";
export default function Catalog({ onBook, onMap }) {
  const [filter, setFilter] = useState("Todas");
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Tu próxima
            <br />
            aventura
            <br />
            <span>empieza en el mar.</span>
          </h1>
          <p>
            Explora Santa Pola y Tabarca en moto de agua.
            <br className="desktop" /> Elige tu ruta y prepara tu próxima
            escapada.
          </p>
          <div className="benefits">
            <span>
              <Waves />
              Sin titulación
            </span>
            <span>
              <Users />
              Con monitor
            </span>
            <span>
              <MapPin />
              Salida desde Santa Pola
            </span>
          </div>
        </div>
        <div className="hero-media">
          <img
            src="/assets/hero.png"
            alt="Ilustración de una moto de agua negra y lima sobre el Mediterráneo"
          />
          <button className="map-link" onClick={onMap}>
            <MapPin size={17} /> Explorar rutas en 3D <ArrowUpRight size={17} />
          </button>
        </div>
      </section>
      <section className="catalog">
        <div className="section-head">
          <h2>
            Elige cómo vivir el <span>Mediterráneo</span>
          </h2>
          <div className="tabs" aria-label="Filtrar experiencias">
            {["Todas", "Santa Pola", "Tabarca"].map((x) => (
              <button
                key={x}
                aria-pressed={filter === x}
                className={filter === x ? "active" : ""}
                onClick={() => setFilter(x)}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="activity-grid">
          {activities
            .filter((a) => filter === "Todas" || a.place === filter)
            .map((a) => (
              <article className="activity" key={a.id}>
                <button
                  className={"activity-photo " + a.image}
                  onClick={() => onBook(a)}
                  aria-label={`Reservar ${a.place} ${a.minutes} minutos`}
                >
                  <img
                    src={
                      "/assets/" +
                      (a.image === "island" || a.image === "coast"
                        ? "tabarca"
                        : "hero") +
                      ".png"
                    }
                    alt={
                      a.place === "Tabarca"
                        ? "Vista ilustrativa de la costa mediterránea"
                        : "Moto de agua en el mar"
                    }
                    loading="lazy"
                  />
                  <span>{a.minutes} min</span>
                </button>
                <div className="activity-body">
                  <h3>
                    {a.place} · {a.minutes} min
                  </h3>
                  <p>{a.description}</p>
                  <div className="price-row">
                    <div>
                      <small>Desde</small>
                      <strong>{money(a.price)}</strong>
                    </div>
                    <button
                      className="round"
                      onClick={() => onBook(a)}
                      aria-label={`Elegir ${a.place} ${a.minutes} min`}
                    >
                      <ArrowUpRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>
      <div className="promo-banner">
        <div>
          <span className="lime">UN POCO MÁS CERCA DEL MAR</span>
          <h3>Tu próxima escapada tiene código.</h3>
          <p>
            Prueba <strong>AQUA10</strong> y descubre el 10 % de descuento en la
            demo.
          </p>
        </div>
        <button className="button" onClick={() => onBook(activities[0])}>
          Preparar mi reserva <ArrowUpRight size={18} />
        </button>
      </div>
      <section className="group-band">
        <div>
          <Users className="lime" />
          <div>
            <h3>El mejor plan se comparte.</h3>
            <p>Grupos, celebraciones y experiencias de empresa.</p>
          </div>
        </div>
        <button
          className="button"
          onClick={() => onBook({ ...activities[2], group: true })}
        >
          Organizar una salida en grupo <ArrowUpRight size={18} />
        </button>
      </section>
    </>
  );
}
