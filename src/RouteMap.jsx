import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import * as THREE from "three";
import "maplibre-gl/dist/maplibre-gl.css";
import { ArrowRight, MapPin, LocateFixed, Play, Pause } from "lucide-react";
import { routeActivities } from "./data";
const departure = [-0.5568, 38.1852];
maplibregl.setWorkerUrl(workerUrl);
const routes = {
  sp30: [departure, [-0.557, 38.178], [-0.575, 38.174], [-0.59, 38.178]],
  sp60: [
    departure,
    [-0.557, 38.176],
    [-0.539, 38.179],
    [-0.516, 38.183],
    [-0.491, 38.192],
  ],
  tb90: [
    departure,
    [-0.554, 38.173],
    [-0.527, 38.166],
    [-0.501, 38.162],
    [-0.48, 38.17],
  ],
  tb120: [
    departure,
    [-0.554, 38.173],
    [-0.528, 38.157],
    [-0.493, 38.154],
    [-0.458, 38.156],
    [-0.446, 38.169],
    [-0.48, 38.176],
  ],
};
function jetski() {
  const group = new THREE.Group();
  const dark = new THREE.MeshStandardMaterial({
    color: 0x222827,
    metalness: 0.4,
    roughness: 0.3,
  });
  const lime = new THREE.MeshStandardMaterial({
    color: 0xd4ff38,
    metalness: 0.2,
    roughness: 0.35,
  });
  const shape = new THREE.Shape();
  shape.moveTo(0, 2);
  shape.bezierCurveTo(0.65, 1.7, 1, -0.2, 0.8, -1.5);
  shape.quadraticCurveTo(0, -1.8, -0.8, -1.5);
  shape.bezierCurveTo(-1, -0.2, -0.65, 1.7, 0, 2);
  const hull = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: 0.15,
      bevelSegments: 3,
      steps: 1,
    }),
    dark,
  );
  group.add(hull);
  const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), lime);
  shell.scale.set(0.72, 1.35, 0.3);
  shell.position.set(0, 0.2, 0.4);
  group.add(shell);
  const seat = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 1, 6, 12), dark);
  seat.position.set(0, -0.35, 0.68);
  group.add(seat);
  const hood = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), dark);
  hood.scale.set(0.45, 0.55, 0.32);
  hood.position.set(0, 0.85, 0.75);
  group.add(hood);
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.1, 12),
    dark,
  );
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0, 0.45, 1);
  group.add(handle);
  return group;
}
function modelLayer(state) {
  return {
    id: "aqua-jetski",
    type: "custom",
    renderingMode: "3d",
    onAdd(map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();
      this.scene.add(new THREE.AmbientLight(0xffffff, 2));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(0, -30, 60);
      this.scene.add(light);
      this.model = jetski();
      this.model.traverse((o) => {
        o.frustumCulled = false;
        if (o.material) {
          o.material.side = THREE.DoubleSide;
        }
      });
      this.scene.add(this.model);
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
      });
      this.renderer.autoClear = false;
    },
    render(gl, args) {
      const c = maplibregl.MercatorCoordinate.fromLngLat(
        state.current.point,
        40,
      );
      const s = c.meterInMercatorCoordinateUnits() * 150;
      const transform = new THREE.Matrix4()
        .makeTranslation(c.x, c.y, c.z)
        .scale(new THREE.Vector3(s, -s, s))
        .multiply(new THREE.Matrix4().makeRotationZ(-0.8));
      this.camera.projectionMatrix = new THREE.Matrix4()
        .fromArray(args.defaultProjectionData.mainMatrix)
        .multiply(transform);
      this.renderer.resetState();
      this.renderer.clearDepth();
      this.renderer.render(this.scene, this.camera);
    },
    onRemove() {
      this.scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) o.material.dispose();
      });
      this.renderer.dispose();
    },
  };
}
export default function RouteMap({ onBook }) {
  const container = useRef();
  const map = useRef();
  const animation = useRef();
  const model = useRef({ point: departure });
  const [id, setId] = useState("tb90");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [is3d, setIs3d] = useState(true);
  const [playing, setPlaying] = useState(false);
  const activity = routeActivities.find((a) => a.id === id);
  useEffect(() => {
    let m;
    try {
      m = new maplibregl.Map({
        container: container.current,
        style: {
          version: 8,
          sources: {
            satellite: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
            },
          },
          layers: [
            {
              id: "satellite",
              type: "raster",
              source: "satellite",
              paint: {
                "raster-brightness-max": 0.65,
                "raster-saturation": -0.25,
              },
            },
          ],
        },
        center: [-0.519, 38.177],
        zoom: 12,
        pitch: 52,
        bearing: -12,
        canvasContextAttributes: { antialias: true },
        maxZoom: 17,
        minZoom: 9,
      });
      map.current = m;
      m.addControl(new maplibregl.NavigationControl(), "top-right");
      m.addControl(
        new maplibregl.ScaleControl({ unit: "metric" }),
        "bottom-left",
      );
      m.on("error", () =>
        setError(
          "El fondo del mapa no se ha podido cargar. Comprueba tu conexión.",
        ),
      );
      m.on("load", () => {
        m.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: routes.tb90 },
          },
        });
        m.addLayer({
          id: "route-glow",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#d4ff38",
            "line-width": 12,
            "line-opacity": 0.12,
          },
        });
        m.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#d4ff38",
            "line-width": 3,
            "line-dasharray": [2, 2],
          },
        });
        m.addLayer(modelLayer(model));
        for (const [point, label] of [
          [departure, "Puerto de Santa Pola"],
          [[-0.48, 38.17], "Isla de Tabarca"],
        ]) {
          const el = document.createElement("button");
          el.className = "map-marker";
          el.textContent = label;
          el.setAttribute("aria-label", `Ver ${label}`);
          el.addEventListener("click", () =>
            m.flyTo({ center: point, zoom: 14, pitch: 52 }),
          );
          new maplibregl.Marker({ element: el, anchor: "bottom" })
            .setLngLat(point)
            .addTo(m);
        }
        setReady(true);
      });
    } catch {
      setError(
        "Tu navegador no permite mostrar el mapa 3D. Puedes seguir eligiendo una experiencia en la lista.",
      );
    }
    return () => {
      cancelAnimationFrame(animation.current);
      m?.remove();
      map.current = null;
    };
  }, []);
  useEffect(() => {
    if (!ready || !map.current?.getSource("route")) return;
    map.current.getSource("route").setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: routes[id] },
    });
    model.current.point = departure;
    map.current.triggerRepaint();
    setPlaying(false);
    cancelAnimationFrame(animation.current);
    center();
  }, [id, ready]);
  function center() {
    const bounds = routes[id].reduce(
      (b, p) => b.extend(p),
      new maplibregl.LngLatBounds(routes[id][0], routes[id][0]),
    );
    map.current?.fitBounds(bounds, {
      padding: 85,
      maxZoom: 13,
      pitch: is3d ? 52 : 0,
      bearing: -12,
      duration: 700,
    });
  }
  function animate() {
    if (playing) {
      cancelAnimationFrame(animation.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const points = routes[id];
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / 14000, 1) * (points.length - 1);
      const i = Math.min(Math.floor(progress), points.length - 2);
      const t = progress - i;
      model.current.point = [
        points[i][0] + (points[i + 1][0] - points[i][0]) * t,
        points[i][1] + (points[i + 1][1] - points[i][1]) * t,
      ];
      map.current?.triggerRepaint();
      if (progress < points.length - 1)
        animation.current = requestAnimationFrame(tick);
      else setPlaying(false);
    }
    animation.current = requestAnimationFrame(tick);
  }
  return (
    <section className="page map-page">
      <h1>
        El Mediterráneo,
        <br className="mobile" /> <span>en perspectiva.</span>
      </h1>
      <p>
        Descubre los puntos de salida y visualiza tu recorrido antes de
        reservar.
      </p>
      <div className="map-layout">
        <div>
          <div className="map-frame">
            <div
              className="map-canvas"
              ref={container}
              aria-label="Mapa interactivo de Santa Pola y Tabarca"
            />
            {error ? (
              <div className="map-error" role="alert">
                {error}
              </div>
            ) : null}
            <div className="map-controls">
              <button
                disabled={!ready}
                onClick={() => {
                  setIs3d(!is3d);
                  map.current.easeTo({ pitch: is3d ? 0 : 52 });
                }}
              >
                {is3d ? "Ver 2D" : "Ver 3D"}
              </button>
              <button disabled={!ready} onClick={center}>
                <LocateFixed size={16} />
                Centrar ruta
              </button>
              <button disabled={!ready} onClick={animate}>
                {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
                {playing ? "Pausar" : "Recorrer"}
              </button>
            </div>
          </div>
          <p className="note">
            Recorridos y puntos orientativos, pendientes de validación. No apto
            para navegación. Modelo de moto 3D ampliado para facilitar su
            visualización.
          </p>
        </div>
        <aside className="route-sidebar">
          <h2>Elige tu experiencia</h2>
          <div className="route-options">
            {routeActivities.map((a) => (
              <button
                key={a.id}
                className={id === a.id ? "route-option active" : "route-option"}
                onClick={() => setId(a.id)}
                aria-pressed={id === a.id}
              >
                <span>
                  <strong>{a.title}</strong>
                  <small>{a.minutes} minutos</small>
                </span>
                <span className="radio" />
              </button>
            ))}
          </div>
          <div className="route-stops">
            <MapPin />
            <div>
              <small>Salida aproximada</small>
              <strong>Puerto de Santa Pola</strong>
            </div>
            <MapPin />
            <div>
              <small>Zona de recorrido</small>
              <strong>
                {activity.place === "Tabarca"
                  ? "Isla de Tabarca"
                  : "Bahía de Santa Pola"}
              </strong>
            </div>
          </div>
          <button className="button" onClick={() => onBook(activity)}>
            Elegir esta experiencia <ArrowRight size={18} />
          </button>
        </aside>
      </div>
    </section>
  );
}
