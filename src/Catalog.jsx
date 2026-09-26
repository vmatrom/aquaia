import { useState } from "react";
import { ArrowUpRight, MapPin, Users, Waves } from "lucide-react";
import { activities, money } from "./data";

const categories = [
  "Todas",
  "Jet ski",
  "Barcos",
  "Veleros",
  "Parasailing",
  "Snorkel",
  "Hinchables",
];

export default function Catalog({ onBook, onMap }) {
  const [filter, setFilter] = useState("Todas");
  const visible = activities.filter(
    (activity) => filter === "Todas" || activity.category === filter,
  );
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <small className="lime">WATER SPORTS SANTA POLA</small>
          <h1>
            Tu próxima
            <br />
            aventura
            <br />
            <span>empieza en el mar.</span>
          </h1>
          <p>
            Motos de agua, barcos, veleros y experiencias para descubrir Santa
            Pola y Tabarca.
          </p>
          <div className="benefits">
            <span>
              <Waves /> Actividades para todos
            </span>
            <span>
              <Users /> Particulares y grupos
            </span>
            <span>
              <MapPin /> Salida desde Santa Pola
            </span>
          </div>
        </div>
        <div className="hero-media">
          <img
            src={`${import.meta.env.BASE_URL}assets/hero.png`}
            alt="Moto de agua sobre el Mediterráneo"
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
            {categories.map((category) => (
              <button
                key={category}
                aria-pressed={filter === category}
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <p className="catalog-count">
          {visible.length} experiencias · tarifas de referencia de la web
          oficial
        </p>
        <div className="activity-grid">
          {visible.map((activity) => (
            <article className="activity" key={activity.id}>
              <button
                className={`activity-photo ${activity.image}`}
                onClick={() => onBook(activity)}
                aria-label={`Preparar reserva de ${activity.title}`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/${activity.image === "island" || activity.image === "coast" ? "tabarca" : "hero"}.png`}
                  alt="Experiencia acuática en Santa Pola"
                  loading="lazy"
                />
                <span>{activity.category}</span>
              </button>
              <div className="activity-body">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <small>{activity.capacity}</small>
                <div className="price-row">
                  <div>
                    <small>Desde</small>
                    <strong>{money(activity.price)}</strong>
                    <small> / {activity.unit}</small>
                  </div>
                  <button
                    className="round"
                    onClick={() => onBook(activity)}
                    aria-label={`Elegir ${activity.title}`}
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
          <span className="lime">PROMOCIONES DE DEMOSTRACIÓN</span>
          <h3>Tu próxima escapada tiene código.</h3>
          <p>
            Prueba <strong>AQUA10</strong> para simular un 10 % de descuento. No
            es una promoción oficial.
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
            <p>Team building, celebraciones y salidas a medida para grupos.</p>
          </div>
        </div>
        <button
          className="button"
          onClick={() => onBook({ ...activities[7], group: true })}
        >
          Organizar una salida en grupo <ArrowUpRight size={18} />
        </button>
      </section>
    </>
  );
}
