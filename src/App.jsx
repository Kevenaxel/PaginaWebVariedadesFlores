import { useState, useEffect } from 'react'

const SERVICES = [
  {
    icon: '🛒',
    title: 'Tienda de Consumo',
    desc: 'Alimentos, bebidas, productos de limpieza e higiene personal. Todo lo que necesitás para tu hogar a los mejores precios.',
    tag: 'Abierto todos los días',
    color: '#1a1adb',
    bg: '#e8e8ff',
  },
  {
    icon: '💸',
    title: 'Entrega de Remesas',
    desc: 'Agente autorizado Banco Promerica. Recibí el dinero de tus familiares desde el exterior de forma rápida y segura. Solo presentá tu DUI.',
    tag: 'Agente Promerica',
    color: '#b45309',
    bg: '#fef3c7',
  },
  {
    icon: '👗',
    title: 'Venta de Ropa',
    desc: 'Ropa para damas, caballeros y niños. Moda accesible y de calidad para toda la familia.',
    tag: 'Para toda la familia',
    color: '#dc2626',
    bg: '#fee2e2',
  },
  {
    icon: '📱',
    title: 'Celulares y Tecnología',
    desc: 'Venta de celulares, bocinas bluetooth y auriculares. Tecnología accesible para todos.',
    tag: 'Tecnología y accesorios',
    color: '#059669',
    bg: '#d1fae5',
  },
]

const CLOTHES = [
  { icon: '👔', label: 'Caballeros', desc: 'Camisas, pantalones, casual' },
  { icon: '👗', label: 'Damas', desc: 'Blusas, vestidos, sport' },
  { icon: '👦', label: 'Niños', desc: 'Uniforme y diario' },
  { icon: '👟', label: 'Accesorios', desc: 'Complementos y más' },
]

const TECH = [
  { icon: '📱', label: 'Celulares', desc: 'Smartphones de todas las marcas' },
  { icon: '🔊', label: 'Bocinas', desc: 'Bluetooth portátiles' },
  { icon: '🎧', label: 'Auriculares', desc: 'Bluetooth y alámbricos' },
  { icon: '🔌', label: 'Accesorios', desc: 'Cargadores, cases y más' },
]

const CONSUMO = [
  {
    categoria: '🌾 Granos y Básicos',
    color: '#92400e',
    bg: '#fef3c7',
    productos: [
      { nombre: 'Arroz Precocido', detalle: 'Listo en minutos' },
      { nombre: 'Arroz 5 Estrellas', detalle: 'Grano largo selecto' },
      { nombre: 'Azúcar Normal', detalle: 'Bolsa y granel' },
      { nombre: 'Azúcar Morena', detalle: 'Natural y saludable' },
    ],
  },
  {
    categoria: '🫙 Aceites',
    color: '#b45309',
    bg: '#ffedd5',
    productos: [
      { nombre: 'Aceite Capullo', detalle: 'El favorito de la familia' },
      { nombre: 'Aceite Orisol', detalle: 'Calidad garantizada' },
      { nombre: 'Aceite Dorado', detalle: 'Rendidor y económico' },
    ],
  },
  {
    categoria: '🥤 Bebidas',
    color: '#0369a1',
    bg: '#e0f2fe',
    productos: [
      { nombre: 'Gaseosas', detalle: 'Todas las marcas' },
      { nombre: 'Jugos', detalle: 'Variedad de sabores' },
      { nombre: 'Aguas', detalle: 'Natural y con gas' },
      { nombre: 'Bebidas energéticas', detalle: 'Variedad completa' },
    ],
  },
  {
    categoria: '🧺 Limpieza del Hogar',
    color: '#0891b2',
    bg: '#cffafe',
    productos: [
      { nombre: 'Rinso', detalle: 'Detergente ropa' },
      { nombre: 'Jabón de Ropa', detalle: 'Barra y líquido' },
      { nombre: 'Jabón de Trastes', detalle: 'Desengrasante' },
      { nombre: 'Legía Maxi Plus', detalle: 'Blanqueador potente' },
    ],
  },
  {
    categoria: '🧴 Higiene Personal',
    color: '#7c3aed',
    bg: '#ede9fe',
    productos: [
      { nombre: 'Desodorantes', detalle: 'Dama y caballero' },
      { nombre: 'Lociones', detalle: 'Variedad de fragancias' },
      { nombre: 'Jabones de baño', detalle: 'Todas las marcas' },
    ],
  },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#consumo', label: 'Productos' },
    { href: '#remesas', label: 'Remesas' },
    { href: '#ropa', label: 'Ropa' },
    { href: '#tecnologia', label: 'Tecnología' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Barlow', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; background: #f5f7fa; }
        a { transition: opacity 0.2s; }
        .nav-links { display: flex; gap: 1.2rem; list-style: none; align-items: center; }
        .hamburger { display: none !important; }
        .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1.2rem; max-width: 960px; margin: 0 auto; }
        .consumo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
        .contact-grid { display: flex; flex-wrap: wrap; gap: 1rem; max-width: 880px; margin: 0 auto; justify-content: center; }
        .contact-card { flex: 1 1 180px; min-width: 180px; }
        .remesas-inner { display: flex; align-items: center; gap: 3rem; flex-wrap: wrap; max-width: 940px; margin: 0 auto; }
        .section-pad { padding: 6rem 2rem; }
        .map-wrap { max-width: 880px; margin: 2.5rem auto 0; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.15); }
        .stats-row { display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; margin-top: 2rem; }
        .stat-box { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 14px; padding: 0.9rem 1.5rem; text-align: center; flex: 1 1 110px; }
        .producto-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .producto-item:last-child { border-bottom: none; }
        @media (max-width: 900px) {
          .nav-links { gap: 0.8rem; }
          .nav-links a { font-size: 0.72rem !important; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .remesas-inner { flex-direction: column; text-align: center; }
          .contact-grid { flex-direction: column; }
          .contact-card { min-width: unset; width: 100%; }
          .section-pad { padding: 4rem 1.2rem !important; }
          .map-wrap { margin: 1.5rem 0 0; border-radius: 12px; }
          .hero-btns { flex-direction: column; align-items: center; }
          .hero-btns a { width: 100%; max-width: 300px; text-align: center; }
          .consumo-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .grid-3 { grid-template-columns: 1fr; }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .stat-box { padding: 0.7rem 1rem; flex: 1 1 90px; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,100,0.97)' : 'rgba(10,10,100,0.75)',
        backdropFilter: 'blur(14px)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0.65rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🌸</div>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 900, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Variedades <span style={{ color: '#fbbf24' }}>Flores</span>
          </span>
        </a>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{ color: 'rgba(255,255,255,0.88)', textDecoration: 'none', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" style={{ background: '#25d366', color: '#fff', padding: '0.45rem 0.9rem', borderRadius: 100, fontWeight: 800, fontSize: '0.75rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>💬 WhatsApp</a>
          </li>
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.5rem' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 54, left: 0, right: 0, zIndex: 99, background: 'rgba(10,10,100,0.98)', backdropFilter: 'blur(14px)', padding: '1.2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{l.label}</a>
          ))}
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" style={{ color: '#25d366', fontWeight: 800, fontSize: '1.05rem', textDecoration: 'none' }}>💬 WhatsApp · 7212-1235</a>
        </div>
      )}

      {/* HERO */}
      <section id="top" style={{
        minHeight: '100dvh',
        background: 'linear-gradient(145deg, #06066e 0%, #1a1adb 55%, #0a0a8a 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', textAlign: 'center',
        padding: '5.5rem 1.5rem 3rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '0.4rem 1rem', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            📍 El Carmen, La Unión · El Salvador
          </div>

          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.4rem, 8vw, 6rem)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            VARIEDADES
          </h1>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.4rem, 8vw, 6rem)', fontWeight: 900, color: '#fbbf24', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '1.4rem' }}>
            FLORES
          </h1>

          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'rgba(255,255,255,0.78)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.65 }}>
            <strong style={{ color: '#fff' }}>¡Tu punto de confianza!</strong> Tienda de consumo, remesas Promerica, ropa y tecnología para toda la familia.
          </p>

          <div className="hero-btns">
            <a href="#servicios" style={{ background: '#fbbf24', color: '#1a1a2e', padding: '0.85rem 2rem', borderRadius: 100, fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 6px 28px rgba(251,191,36,0.45)' }}>Ver servicios →</a>
            <a href="tel:+50372121235" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '0.85rem 2rem', borderRadius: 100, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>📞 7212-1235</a>
          </div>

          <div className="stats-row">
            {[{ n: '5+', label: 'Servicios' }, { n: '100%', label: 'Confianza' }, { n: '7am', label: 'Abrimos' }, { n: '7pm', label: 'Cerramos' }].map((s, i) => (
              <div key={i} className="stat-box">
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24' }}>{s.n}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <svg style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%' }} viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f5f7fa" />
        </svg>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section-pad" style={{ background: '#f5f7fa' }}>
        <p style={{ textAlign: 'center', color: '#1a1adb', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>¿Qué ofrecemos?</p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', color: '#1a1a2e', marginBottom: '0.75rem' }}>Nuestros Servicios</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: 460, margin: '0 auto 3.5rem', lineHeight: 1.6 }}>Todo en un solo lugar para vos y tu familia en El Carmen, La Unión.</p>
        <div className="grid-3">
          {SERVICES.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </section>

      {/* CONSUMO */}
      <section id="consumo" className="section-pad" style={{ background: '#fff' }}>
        <p style={{ textAlign: 'center', color: '#92400e', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Lo que encontrás</p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', color: '#1a1a2e', marginBottom: '0.75rem' }}>Tienda de Consumo</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: 500, margin: '0 auto 3.5rem', lineHeight: 1.6 }}>Productos frescos y de calidad para tu hogar. Todo lo que necesitás lo encontrás aquí.</p>
        <div className="consumo-grid">
          {CONSUMO.map((cat, i) => (
            <div key={i} style={{ background: '#f9fafb', borderRadius: 20, border: `2px solid ${cat.bg}`, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)' }}
            >
              <div style={{ background: cat.bg, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{cat.categoria.split(' ')[0]}</span>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: cat.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {cat.categoria.split(' ').slice(1).join(' ')}
                </h3>
              </div>
              <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
                {cat.productos.map((p, j) => (
                  <div key={j} className="producto-item">
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a2e' }}>{p.nombre}</span>
                      <span style={{ color: '#9ca3af', fontSize: '0.82rem', marginLeft: '0.5rem' }}>— {p.detalle}</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', background: cat.bg, color: cat.color, padding: '0.2rem 0.6rem', borderRadius: 100, fontWeight: 700, whiteSpace: 'nowrap' }}>Disponible</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: '3rem auto 0', background: 'linear-gradient(130deg, #06066e, #1a1adb)', borderRadius: 20, padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '0.4rem' }}>¿No encontrás lo que buscás?</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>Consultanos por WhatsApp y te ayudamos al instante.</p>
          </div>
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" style={{ background: '#25d366', color: '#fff', padding: '0.9rem 2rem', borderRadius: 100, fontWeight: 800, fontSize: '1rem', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}>💬 Escribinos ahora</a>
        </div>
      </section>

      {/* REMESAS */}
      <section id="remesas" className="section-pad" style={{ background: 'linear-gradient(130deg, #06066e 0%, #1a1adb 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div className="remesas-inner">
          <div style={{ fontSize: '5.5rem', flexShrink: 0 }}>🏦</div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.35rem 1rem', borderRadius: 100, marginBottom: '1rem' }}>✅ Agente Autorizado · Banco Promerica</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginBottom: '1rem' }}>
              Recibí tus remesas<br /><span style={{ color: '#60a5fa' }}>con Promerica</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Recibí el dinero que te mandan tus familiares desde EE.UU. u otros países de forma rápida y segura. <strong style={{ color: '#fff' }}>Solo presentá tu DUI y listo.</strong>
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="tel:+50372121235" style={{ display: 'inline-block', background: '#fbbf24', color: '#1a1a2e', padding: '0.8rem 1.8rem', borderRadius: 100, fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none' }}>📞 7212-1235</a>
              <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '0.8rem 1.8rem', borderRadius: 100, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* ROPA */}
      <section id="ropa" className="section-pad" style={{ background: '#f5f7fa' }}>
        <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Moda para todos</p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', color: '#1a1a2e', marginBottom: '0.75rem' }}>Venta de Ropa</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: 440, margin: '0 auto 3.5rem', lineHeight: 1.6 }}>Prendas de calidad para toda la familia a precios que te van a sorprender.</p>
        <div className="grid-4">
          {CLOTHES.map((c, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '2rem 1.2rem', textAlign: 'center', border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(220,38,38,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              <div style={{ fontSize: '2.8rem', marginBottom: '0.8rem' }}>{c.icon}</div>
              <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#1a1a2e', marginBottom: '0.3rem' }}>{c.label}</h4>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section id="tecnologia" className="section-pad" style={{ background: '#fff' }}>
        <p style={{ textAlign: 'center', color: '#059669', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Lo último en tech</p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', color: '#1a1a2e', marginBottom: '0.75rem' }}>Celulares y Tecnología</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: 460, margin: '0 auto 3.5rem', lineHeight: 1.6 }}>Celulares, bocinas bluetooth, auriculares y accesorios al mejor precio.</p>
        <div className="grid-4">
          {TECH.map((c, i) => (
            <div key={i} style={{ background: '#f5f7fa', borderRadius: 16, padding: '2rem 1.2rem', textAlign: 'center', border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(5,150,105,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              <div style={{ fontSize: '2.8rem', marginBottom: '0.8rem' }}>{c.icon}</div>
              <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#1a1a2e', marginBottom: '0.3rem' }}>{c.label}</h4>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section-pad" style={{ background: 'linear-gradient(145deg, #06066e 0%, #1a1adb 100%)' }}>
        <p style={{ textAlign: 'center', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Estamos para vos</p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '0.75rem' }}>Visitanos o Contáctanos</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)', maxWidth: 420, margin: '0 auto 3.5rem', lineHeight: 1.6 }}>Estamos en El Carmen, La Unión. ¡Te esperamos con los brazos abiertos!</p>
        <div className="contact-grid">
          {[
            { icon: '📞', label: 'Teléfono', value: '7212-1235', href: 'tel:+50372121235' },
            { icon: '💬', label: 'WhatsApp', value: '7212-1235', href: 'https://wa.me/50372121235' },
            { icon: '📍', label: 'Ubicación', value: 'El Carmen, La Unión', href: 'https://maps.app.goo.gl/JP1bfBdKs82YSyXJ6' },
            { icon: '🕐', label: 'Horario', value: 'Lunes–Dom · 7am–7pm', href: '#' },
          ].map((c, i) => (
            <a key={i} href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="contact-card"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 16, padding: '1.8rem 1.5rem', textAlign: 'center', color: '#fff', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = '' }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '0.7rem' }}>{c.icon}</div>
              <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>{c.label}</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, fontWeight: 600 }}>{c.value}</p>
            </a>
          ))}
        </div>
        <div className="map-wrap">
          <iframe
            title="Ubicación Variedades Flores"
            src="https://maps.google.com/maps?q=13.3552751,-87.9996124&z=17&output=embed"
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#04044a', color: 'rgba(255,255,255,0.45)', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🌸</div>
          <span style={{ color: '#fbbf24', fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Variedades Flores</span>
        </div>
        <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>📍 El Carmen, La Unión · 📞 7212-1235</p>
        <p style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>Tienda de consumo · Remesas Promerica · Ropa · Celulares y Tecnología</p>
        <p style={{ fontSize: '0.78rem' }}>© 2026 Variedades Flores · El Salvador 🇸🇻</p>
      </footer>

    </div>
  )
}

function ServiceCard({ icon, title, desc, tag, color, bg }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem 2rem', boxShadow: hovered ? '0 20px 50px rgba(26,26,219,0.15)' : '0 2px 16px rgba(0,0,0,0.06)', transform: hovered ? 'translateY(-8px)' : 'none', transition: 'all 0.25s ease', border: '1px solid #f0f0f0', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: color, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease' }} />
      <div style={{ width: 68, height: 68, borderRadius: 18, background: bg, fontSize: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: `0 4px 16px ${color}22` }}>{icon}</div>
      <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '0.7rem' }}>{title}</h3>
      <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.3rem' }}>{desc}</p>
      <span style={{ display: 'inline-block', background: bg, color, borderRadius: 100, padding: '0.35rem 1rem', fontSize: '0.75rem', fontWeight: 800 }}>{tag}</span>
    </div>
  )
}