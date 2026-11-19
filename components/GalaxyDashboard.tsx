"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { bodies, galaxyStats, type CelestialBody } from "@/data/celestial";
import {
  Orbit, Search, Sparkles, Telescope, Globe2, Rocket, Stars,
  Settings2, ChevronRight, Play, Volume2, Maximize2, Menu, X
} from "lucide-react";

const GalaxyScene = dynamic(() => import("@/components/GalaxyScene"), { ssr: false });

const navItems = [
  { label: "Galaxy Map", icon: Orbit },
  { label: "Star Systems", icon: Stars },
  { label: "Planets", icon: Globe2 },
  { label: "Missions", icon: Rocket },
  { label: "3D Explorer", icon: Telescope }
];

export default function GalaxyDashboard() {
  const [selected, setSelected] = useState<CelestialBody>(bodies[0]);
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Galaxy Map");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sound, setSound] = useState(false);

  const filtered = useMemo(
    () => bodies.filter((body) => body.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Galactic Journey home">
          <span className="brand-mark"><Orbit size={24} /></span>
          <span><strong>GALACTIC JOURNEY</strong><small>Explore. Travel. Discover.</small></span>
        </a>
        <button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={activeNav === label ? "nav-link active" : "nav-link"}
              onClick={() => { setActiveNav(label); setMobileMenu(false); }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <label className="search-box">
            <Search size={16} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search planets..." />
          </label>
          <button className="avatar" title="Guest profile">G</button>
        </div>
      </header>

      <div className="layout">
        <aside className={mobileMenu ? "sidebar show" : "sidebar"}>
          <div className="side-heading">EXPLORE UNIVERSE</div>
          {[
            ["Milky Way Galaxy", "Our cosmic home", Orbit],
            ["Nearby Galaxies", "Andromeda and beyond", Stars],
            ["Solar Systems", "Explore star systems", Sparkles],
            ["Planets & Moons", "Worlds to discover", Globe2],
            ["Space Missions", "Humanity's journey", Rocket],
            ["Settings", "Customize experience", Settings2]
          ].map(([title, sub, Icon]: any) => (
            <button key={title} className="side-item" onClick={() => setActiveNav(title)}>
              <span className="side-icon"><Icon size={18} /></span>
              <span><b>{title}</b><small>{sub}</small></span>
            </button>
          ))}
          <div className="pro-card">
            <Sparkles size={21} />
            <b>Go beyond the stars</b>
            <p>Discover guided journeys and immersive space stories.</p>
            <button onClick={() => alert("Premium journeys are coming soon.")}>Discover more <ChevronRight size={14} /></button>
          </div>
        </aside>

        <section className="main-content">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> INTERACTIVE COSMIC ATLAS</div>
            <h1>Milky Way <span>Galaxy</span></h1>
            <p className="hero-subtitle">Your journey through our extraordinary cosmic neighborhood.</p>
            <div className="stats-row">
              {galaxyStats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><small>{stat.label}</small></div>)}
            </div>
          </div>

          <div className="scene-toolbar">
            <div><span className="status-pulse" /> 3D EXPLORATION <span className="muted">/ SOLAR NEIGHBORHOOD DEMO</span></div>
            <div className="toolbar-actions">
              <button onClick={() => setSound(!sound)} title="Toggle ambient sound"><Volume2 size={16} /> {sound ? "Sound on" : "Sound off"}</button>
              <button onClick={() => document.documentElement.requestFullscreen?.()} title="Fullscreen"><Maximize2 size={16} /></button>
            </div>
          </div>

          <div className="scene-wrap">
            <GalaxyScene bodies={bodies} selectedId={selected.id} onSelect={setSelected} />
            <div className="scene-hint"><Orbit size={14} /> Drag to rotate · Scroll to zoom · Select a planet</div>
            <div className="scene-center-label"><span className="sun-dot" /> SOLAR SYSTEM EXPLORER</div>
          </div>

          <section className="planet-panel">
            <div className="planet-visual" style={{ "--planet": selected.color } as React.CSSProperties}>
              <div className="planet-sphere" />
              <span className="planet-orbit" />
            </div>
            <div className="planet-info">
              <div className="eyebrow">{selected.type.toUpperCase()} PROFILE</div>
              <h2>{selected.name} <span>{selected.subtitle}</span></h2>
              <p>{selected.description}</p>
              <div className="planet-facts">
                <div><small>Distance</small><b>{selected.distance}</b></div>
                <div><small>Diameter</small><b>{selected.diameter}</b></div>
                <div><small>Temperature</small><b>{selected.temperature}</b></div>
              </div>
              <button className="outline-button" onClick={() => setActiveNav("3D Explorer")}>Explore {selected.name} <ChevronRight size={16} /></button>
            </div>
          </section>

          <section className="discover-section">
            <div className="section-title"><div><div className="eyebrow">CHOOSE YOUR DESTINATION</div><h2>Explore worlds</h2></div><span>{filtered.length} objects</span></div>
            <div className="planet-grid">
              {filtered.map((body) => (
                <button key={body.id} className={selected.id === body.id ? "planet-card selected" : "planet-card"} onClick={() => setSelected(body)}>
                  <span className="mini-planet" style={{ "--planet": body.color } as React.CSSProperties} />
                  <span><b>{body.name}</b><small>{body.subtitle}</small></span>
                  <ChevronRight size={16} />
                </button>
              ))}
              {filtered.length === 0 && <p className="empty-state">No matching planets in this demo catalog.</p>}
            </div>
          </section>

          <footer><span>© 2026 GALACTIC JOURNEY</span><span>Educational visualization · Distances and scales simplified</span></footer>
        </section>

        <aside className="right-panel">
          <div className="panel-card">
            <div className="panel-heading">VIEW CONTROLS <Settings2 size={15} /></div>
            <div className="control-row"><span>Scene mode</span><b>3D Realistic</b></div>
            <div className="control-row"><span>Camera</span><b>Free orbit</b></div>
            <div className="control-row"><span>Objects</span><b>{bodies.length} demo planets</b></div>
            <p className="panel-note">Use your mouse or touch gestures to navigate the 3D scene.</p>
          </div>
          <div className="panel-card">
            <div className="panel-heading">QUICK DESTINATIONS <Play size={14} /></div>
            {bodies.slice(0, 4).map((body) => (
              <button className="quick-destination" key={body.id} onClick={() => setSelected(body)}>
                <span className="quick-dot" style={{ background: body.color }} />
                <span>{body.name}<small>{body.type}</small></span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
          <div className="quote-card"><Sparkles size={18} /><p>“Somewhere, something incredible is waiting to be known.”</p><small>— Carl Sagan</small></div>
        </aside>
      </div>
    </main>
  );
}
