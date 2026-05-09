import { useState, useEffect, useRef } from 'react'

const LOGO = '/logo.png'

const SERVICES = [
  { icon: '🛒', title: 'Tienda de Consumo', desc: 'Alimentos, bebidas, limpieza e higiene. Todo lo que tu hogar necesita a los mejores precios.', tag: 'Abierto todos los días' },
  { icon: '💸', title: 'Remesas Promerica', desc: 'Agente autorizado Banco Promerica. Recibí el dinero de tus familiares de forma rápida y segura.', tag: 'Solo tu DUI y Clave' },
   { icon: '💸', title: 'Remesas Agricola', desc: 'Agente autorizado Banco Promerica. Recibí el dinero de tus familiares de forma rápida y segura.', tag: 'Solo tu DUI y Clave' },
  { icon: '💸', title: 'Pagos Tigo Money', desc: 'Agente autorizado Tigo Money. Paga tus servicios fácil, rápido y seguro.', tag: 'Solo tu DUI y Clave' },
  { icon: '👗', title: 'Venta de Ropa', desc: 'Moda accesible para damas, caballeros y niños. Calidad y estilo para toda la familia.', tag: 'Toda la familia' },
  { icon: '📱', title: 'Celulares & Tech', desc: 'Celulares, bocinas bluetooth, auriculares y accesorios. Tecnología al alcance de todos.', tag: 'Tech accesible' },
]

const CONSUMO = [
  { cat: 'Producto Basico', emoji: '🌾', color: '#fbbf24', items: ['Arroz Precocido', 'Arroz 5 Estrellas', 'Azúcar Normal', 'Azúcar Morena', 'Frijoles', 'Sal'] },
  { cat: 'Aceites', emoji: '🫙', color: '#fb923c', items: ['Aceite Capullo', 'Aceite Orisol', 'Aceite Dorado'] },
  { cat: 'Bebidas', emoji: '🥤', color: '#38bdf8', items: ['Gaseosas', 'Jugos variados', 'Aguas', 'Bebidas energéticas'] },
  { cat: 'Limpieza', emoji: '🧺', color: '#a78bfa', items: ['Rinso', 'Jabón de ropa', 'Jabón de trastes', 'Legía Maxi Plus'] },
  { cat: 'Higiene Personal', emoji: '🧴', color: '#f472b6', items: ['Desodorantes', 'Lociones', 'Jabones de baño'] },
  { cat: 'Tecnología', emoji: '📱', color: '#34d399', items: ['Celulares', 'Bocinas Bluetooth', 'Audífonos', 'Cargadores', 'Cables USB'] },
]
  

const CLOTHES = [
  { icon: '👔', label: 'Caballeros', desc: 'Camisas, pantalones, casual' },
  { icon: '👗', label: 'Damas', desc: 'Blusas, vestidos, sport' },
  { icon: '👦', label: 'Niños', desc: 'Uniforme y diario' },
  { icon: '👟', label: 'Accesorios', desc: 'Complementos y más' },
]

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ children, delay = 0, y = 28, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const nav = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#productos', label: 'Productos' },
    { href: '#remesas', label: 'Remesas' },
    { href: '#ropa', label: 'Ropa' },
    { href: '#tecnologia', label: 'Tech' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const logoStyle = {
    height: 100,
    width: 300,
    objectFit: 'contain',
    mixBlendMode: 'screen',
    filter: 'brightness(1.3) contrast(1.1)',
    display: 'block',
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#06066e', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #06066e; }
        ::-webkit-scrollbar-thumb { background: #fbbf24; border-radius: 10px; }

        .pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: #fbbf24; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 14px; border-radius: 100px; }

        .nav-a { color: rgba(255,255,255,0.8); font-size: 0.82rem; font-weight: 600; text-decoration: none; letter-spacing: 0.04em; transition: color 0.2s; position: relative; }
        .nav-a::after { content:''; position: absolute; bottom: -3px; left: 0; width: 0; height: 2px; background: #fbbf24; transition: width 0.3s; border-radius: 2px; }
        .nav-a:hover { color: #fbbf24; }
        .nav-a:hover::after { width: 100%; }

        .btn-gold { background: linear-gradient(135deg, #fbbf24, #d97706); color: #0a0500; font-weight: 800; font-size: 0.95rem; border: none; border-radius: 100px; padding: 13px 30px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 24px rgba(251,191,36,0.4); }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(251,191,36,0.6); }

        .btn-ghost { background: rgba(255,255,255,0.1); color: #fff; font-weight: 700; font-size: 0.95rem; border: 1px solid rgba(255,255,255,0.28); border-radius: 100px; padding: 13px 30px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: background 0.2s, transform 0.2s; }
        .btn-ghost:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }

        .btn-wa { background: linear-gradient(135deg, #25d366, #128c7e); color: #fff; font-weight: 800; font-size: 0.9rem; border: none; border-radius: 100px; padding: 12px 26px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(37,211,102,0.3); }
        .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,211,102,0.5); }

        .svc-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13); border-radius: 24px; padding: 36px 30px; transition: transform 0.3s, background 0.3s; position: relative; overflow: hidden; }
        .svc-card:hover { transform: translateY(-8px); background: rgba(255,255,255,0.12); }

        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1140px; margin: 0 auto; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 1140px; margin: 0 auto; }

        .section { padding: 110px 5%; position: relative; }

        .eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
        .sh { font-family: 'Syne', sans-serif; font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800; line-height: 1.05; }

        .item-row { display: flex; align-items: center; gap: 10px; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .item-row:last-child { border-bottom: none; padding-bottom: 0; }

        .mini-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 18px; padding: 28px 20px; text-align: center; transition: transform 0.25s, background 0.25s; }
        .mini-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.13); }

        .contact-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 28px 20px; text-align: center; text-decoration: none; color: #fff; transition: transform 0.25s, background 0.25s; display: block; }
        .contact-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.13); }

        .tab-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.13); border-radius: 100px; padding: 10px 22px; font-size: 0.82rem; font-weight: 700; color: rgba(255,255,255,0.6); cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s; }
        .tab-btn.active { background: rgba(251,191,36,0.2); border-color: rgba(251,191,36,0.5); color: #fbbf24; }
        .tab-btn:hover:not(.active) { background: rgba(255,255,255,0.14); color: #fff; }

        .wa-float { position: fixed; bottom: 28px; right: 28px; z-index: 200; width: 62px; height: 62px; border-radius: 50%; background: linear-gradient(135deg, #25d366, #128c7e); display: flex; align-items: center; justify-content: center; font-size: 1.9rem; box-shadow: 0 6px 32px rgba(37,211,102,0.5); text-decoration: none; transition: transform 0.2s; }
        .wa-float:hover { transform: scale(1.12); }

        .orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(90px); }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(18px,-14px); } }
        .drift { animation: drift 14s ease-in-out infinite; }
        .drift2 { animation: drift 18s ease-in-out infinite reverse; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 30s linear infinite; }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.7);} }

        @media (max-width: 768px) {
          .dnav { display: none !important; }
          .mbtn { display: flex !important; }
          .hero-cols { flex-direction: column !important; text-align: center; }
          .hero-btns { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
          .rem-cols { flex-direction: column !important; text-align: center; }
          .rem-btns { justify-content: center !important; }
          .section { padding: 80px 5%; }
          .orb-widget { display: none !important; }
          .nav-logo img { width: 160px !important; height: 44px !important; }
        }
        @media (min-width: 769px) {
          .mbtn { display: none !important; }
          .mnav { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5%', height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,6,110,0.97)' : 'rgba(6,6,110,0.55)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        {/* LOGO SIN TEXTO */}
        <a href="#top" className="nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={LOGO} alt="Variedades Flores" style={logoStyle} />
        </a>

        <div className="dnav" style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          {nav.map(l => <a key={l.href} href={l.href} className="nav-a">{l.label}</a>)}
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa" style={{ padding: '9px 20px', fontSize: '0.8rem' }}>💬 WhatsApp</a>
        </div>

        <button className="mbtn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '1.6rem', cursor: 'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mnav" style={{ position: 'fixed', top: 70, left: 0, right: 0, zIndex: 99, background: 'rgba(6,6,110,0.99)', backdropFilter: 'blur(20px)', padding: '20px 5%', display: 'flex', flexDirection: 'column', gap: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {nav.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{l.label}</a>
          ))}
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa" style={{ justifyContent: 'center', marginTop: 4 }}>💬 WhatsApp · 7212-1235</a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="top" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '100px 5% 60px', background: 'linear-gradient(145deg, #04044a 0%, #1a1adb 55%, #06066e 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)' }} />
        <div className="orb drift" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(251,191,36,0.16) 0%, transparent 70%)', top: '-5%', left: '-15%' }} />
        <div className="orb drift2" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', bottom: '-5%', right: '-10%' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div className="hero-cols" style={{ display: 'flex', alignItems: 'center', gap: 80, justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 28 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
                  El Carmen, La Unión · El Salvador
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.8rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 0.92, marginBottom: 28, letterSpacing: '-0.02em' }}>
                  <span style={{ display: 'block', color: '#fff' }}>VARIEDA</span>
                  <span style={{ display: 'block', WebkitTextStroke: '2px #fbbf24', color: 'transparent' }}>DES</span>
                  <span style={{ display: 'block', color: '#fbbf24' }}>FLORES</span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 440, marginBottom: 36 }}>
                  <strong style={{ color: '#fff' }}>¡Tu punto de confianza!</strong> Tienda de consumo, remesas Promerica, ropa y tecnología para toda la familia.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
                  <a href="#servicios" className="btn-gold">Ver servicios →</a>
                  <a href="tel:+50372121235" className="btn-ghost">📞 7212-1235</a>
                </div>
              </Reveal>
              <Reveal delay={0.28}>
                <div className="hero-stats" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[['5+','Servicios'],['100%','Confianza'],['7am','Abrimos'],['7pm','Cerramos']].map(([n,l],i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '12px 20px', textAlign: 'center', minWidth: 90 }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24' }}>{n}</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* WIDGET CON LOGO GRANDE */}
            <Reveal delay={0.1} y={0} style={{ flexShrink: 0 }}>
              <div className="orb-widget" style={{ width: 380, height: 380, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spin-slow" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px dashed rgba(251,191,36,0.3)' }} />
                <div style={{ position: 'absolute', inset: '12%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
                {SERVICES.map((s, i) => {
                  const angle = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2
                  const r = 155
                  const x = 50 + (r / 380 * 100) * Math.cos(angle)
                  const y = 50 + (r / 380 * 100) * Math.sin(angle)
                  return (
                    <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', backdropFilter: 'blur(8px)' }}>
                      {s.icon}
                    </div>
                  )
                })}
                {/* LOGO GRANDE CENTRO */}
                <div style={{ width: 190, height: 190, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))', border: '2px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 0 60px rgba(251,191,36,0.15)' }}>
                  <img src={LOGO} alt="Logo" style={{ width: 175, height: 175, objectFit: 'contain', mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.1)' }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <svg style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%' }} viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,30 C360,70 1080,0 1440,40 L1440,70 L0,70 Z" fill="#0a0a5e" />
        </svg>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="section" style={{ background: '#0a0a5e' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div className="eyebrow" style={{ color: '#fbbf24', marginBottom: 12 }}>¿Qué ofrecemos?</div>
              <h2 className="sh" style={{ marginBottom: 14 }}>Nuestros Servicios</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>Todo en un solo lugar para vos y tu familia en El Carmen, La Unión.</p>
            </div>
          </Reveal>
          <div className="grid-2">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="svc-card">
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)' }} />
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 22 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                  <span style={{ display: 'inline-block', background: 'rgba(251,191,36,0.14)', border: '1px solid rgba(251,191,36,0.32)', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100 }}>{s.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS ── */}
      <section id="productos" className="section" style={{ background: '#06066e' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="eyebrow" style={{ color: '#fbbf24', marginBottom: 12 }}>Lo que encontrás</div>
              <h2 className="sh" style={{ marginBottom: 14 }}>Tienda de Consumo</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Productos frescos y de calidad. Todo lo que necesitás para tu hogar.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
              {CONSUMO.map((cat, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={'tab-btn' + (activeTab === i ? ' active' : '')}>
                  {cat.emoji} {cat.cat}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '36px 32px', maxWidth: 660, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>{CONSUMO[activeTab].emoji}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: CONSUMO[activeTab].color }}>{CONSUMO[activeTab].cat}</h3>
              </div>
              {CONSUMO[activeTab].items.map((item, i) => (
                <div key={i} className="item-row">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: CONSUMO[activeTab].color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', padding: '3px 10px', borderRadius: 100, fontWeight: 700 }}>Disponible</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2} style={{ marginTop: 40 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.04))', border: '1px solid rgba(251,191,36,0.22)', borderRadius: 22, padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: 6 }}>¿No encontrás lo que buscás?</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem' }}>Consultanos y te ayudamos al instante.</p>
              </div>
              <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 Escribinos ahora</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── REMESAS PROMERICA ── */}
      <section id="remesas" className="section" style={{ background: '#0a0a5e', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', top: '-20%', right: '-10%' }} />
        <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="rem-cols" style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
            <Reveal delay={0.05} y={0} style={{ flexShrink: 0 }}>
              <div style={{ width: 160, height: 160, borderRadius: 32, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem' }}>🏦</div>
            </Reveal>
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 20 }}>✅ Agente Autorizado · Banco Promerica</div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="sh" style={{ marginBottom: 16 }}>Recibí tus remesas<br /><span style={{ color: '#fbbf24' }}>con Promerica</span></h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 500, marginBottom: 28 }}>
                  Recibí el dinero que te mandan tus familiares desde EE.UU. de forma rápida y segura. <strong style={{ color: '#fff' }}>Solo presentá tu DUI y Clave y listo.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="rem-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <a href="tel:+50372121235" className="btn-gold">📞 7212-1235</a>
                  <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

       {/* ── REMESAS AGRICOLA ── */}
      <section id="remesas" className="section" style={{ background: '#0a0a5e', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', top: '-20%', right: '-10%' }} />
        <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="rem-cols" style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
            <Reveal delay={0.05} y={0} style={{ flexShrink: 0 }}>
              <div style={{ width: 160, height: 160, borderRadius: 32, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem' }}>🏦</div>
            </Reveal>
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 20 }}>✅ Agente Autorizado · Banco Agricola</div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="sh" style={{ marginBottom: 16 }}>Recibí tus remesas<br /><span style={{ color: '#fbbf24' }}>con Agricola</span></h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 500, marginBottom: 28 }}>
                  Recibí el dinero que te mandan tus familiares desde EE.UU. de forma rápida y segura. <strong style={{ color: '#fff' }}>Solo presentá tu DUI y Clave y listo.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="rem-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <a href="tel:+50372121235" className="btn-gold">📞 7212-1235</a>
                  <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      
      {/* ── REMESAS Y PAGO DE SERVICIO TIGO MONEY ── */}
      <section id="remesas" className="section" style={{ background: '#0a0a5e', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', top: '-20%', right: '-10%' }} />
        <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="rem-cols" style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
            <Reveal delay={0.05} y={0} style={{ flexShrink: 0 }}>
              <div style={{ width: 160, height: 160, borderRadius: 32, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem' }}>🏦</div>
            </Reveal>
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 20 }}>✅ Agente Autorizado · Tigo Money</div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="sh" style={{ marginBottom: 16 }}>Pagos de Recibos<br /><span style={{ color: '#fbbf24' }}>con TigoMoney</span></h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 500, marginBottom: 28 }}>
                  Paga tus recibos de forma rápida, segura y sin hacer filas con . Realiza pagos de luz, agua, telefonía y más directamente desde tu celular o en puntos autorizados. <strong style={{ color: '#fff' }}>Solo presentá tu recibo y listo.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="rem-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <a href="tel:+50372121235" className="btn-gold">📞 7212-1235</a>
                  <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROPA ── */}
      <section id="ropa" className="section" style={{ background: '#06066e' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="eyebrow" style={{ color: '#f9a8d4', marginBottom: 12 }}>Moda para todos</div>
              <h2 className="sh" style={{ marginBottom: 14 }}>Venta de Ropa</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>Prendas de calidad para toda la familia a precios que te van a sorprender.</p>
            </div>
          </Reveal>
          <div className="grid-4">
            {CLOTHES.map((c, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="mini-card">
                  <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>{c.icon}</div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 6 }}>{c.label}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECNOLOGÍA ── */}
      <section id="tecnologia" className="section" style={{ background: '#0a0a5e' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="eyebrow" style={{ color: '#6ee7b7', marginBottom: 12 }}>Lo último en tech</div>
              <h2 className="sh" style={{ marginBottom: 14 }}>Celulares y Tecnología</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>Celulares, bocinas bluetooth, auriculares y accesorios al mejor precio.</p>
            </div>
          </Reveal>
          <div className="grid-4">
            {[
              { icon: '📱', label: 'Celulares', desc: 'Smartphones de todas las marcas' },
              { icon: '🔊', label: 'Bocinas', desc: 'Bluetooth portátiles' },
              { icon: '🎧', label: 'Auriculares', desc: 'Bluetooth y alámbricos' },
              { icon: '🔌', label: 'Accesorios', desc: 'Cargadores, cases y más' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="mini-card">
                  <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>{c.icon}</div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 6 }}>{c.label}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="section" style={{ background: '#06066e', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)', bottom: '-20%', left: '-10%' }} />
        <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="eyebrow" style={{ color: '#fbbf24', marginBottom: 12 }}>Estamos para vos</div>
              <h2 className="sh" style={{ marginBottom: 14 }}>Visitanos o Contáctanos</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>Estamos en El Carmen, La Unión. ¡Te esperamos!</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto 40px' }}>
            {[
              { icon: '📞', label: 'Teléfono', value: '7212-1235', href: 'tel:+50372121235' },
              { icon: '💬', label: 'WhatsApp', value: '7212-1235', href: 'https://wa.me/50372121235' },
              { icon: '📍', label: 'Ubicación', value: 'El Carmen, La Unión', href: 'https://maps.app.goo.gl/JP1bfBdKs82YSyXJ6' },
              { icon: '🕐', label: 'Horario', value: 'Lunes–Dom · 7am–7pm', href: '#' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-card">
                  <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{c.icon}</div>
                  <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: 6, color: '#fbbf24' }}>{c.label}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{c.value}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ borderRadius: 22, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <iframe
                title="Ubicación Variedades Flores"
                src="https://maps.google.com/maps?q=13.3552751,-87.9996124&z=17&output=embed"
                width="100%" height="380" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#03034a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '48px 5%', textAlign: 'center' }}>
        {/* LOGO FOOTER SIN TEXTO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img
            src={LOGO}
            alt="Variedades Flores"
            style={{ height: 60, width: 240, objectFit: 'contain', mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.1)' }}
          />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', marginBottom: 6 }}>📍 El Carmen, La Unión · 📞 7212-1235</p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', marginBottom: 20 }}>Tienda de consumo · Remesas Promerica · Ropa · Celulares y Tecnología</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 20 }}>
          {nav.map(l => (
            <a key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={e => e.target.style.color = '#fbbf24'}
              onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
            >{l.label}</a>
          ))}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.78rem' }}>© 2026 Variedades Flores · El Salvador 🇸🇻</p>
      </footer>

      <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="wa-float">💬</a>
    </div>
  )
}