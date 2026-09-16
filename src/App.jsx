import { useState, useEffect, useRef } from 'react'

const LOGO = '/logo.png'

const CATALOGO_PRODUCTOS = [
  {
    id: 1,
    nombre: 'Gaseosa Coca-Cola Lata',
    categoria: 'Bebidas',
    precio: '$1.00 C/U',
    imagen: '/Coca-Lata.jpg',
  },
  {
    id: 2,
    nombre: 'Gaseosa Coca-Cola Lata Fardo 24 Unidades',
    categoria: 'Bebidas',
    precio: '$16.50 C/U',
    imagen: '/Coca-Lata-Fardo-24.webp',
  },
  {
    id: 3,
    nombre: 'Arroz San Pedro 1 lb',
    categoria: 'Básicos',
    precio: '$0.80 C/U',
    imagen: '/Arroz-SanPedro-Precocido.jpg',
  },
  {
    id: 4,
    nombre: 'Arroz San Francisco 1 lb',
    categoria: 'Básicos',
    precio: '$0.80 C/U',
    imagen: '/Arroz-SanFrancsico.jpg',
  },
  {
    id: 5,
    nombre: 'Arroz 5 Estrellas 1 lb',
    categoria: 'Básicos',
    precio: '$0.75 C/U',
    imagen: '/Arroz-5Estrella.webp',
  },
  {
    id: 6,
    nombre: 'Arroz San Pedro Blanco 1 lb',
    categoria: 'Básicos',
    precio: '$0.75 C/U',
    imagen: '/Arroz-SanPedro-Blanco.jpg',
  },
  {
    id: 7,
    nombre: 'Aceite Capullo 750ml',
    categoria: 'Aceites',
    precio: '$2.25 C/U',
    imagen: '/Aceite-Capullo750ml.webp',
  },
  {
    id: 8,
    nombre: 'Aceite Mazola 700ml',
    categoria: 'Aceites',
    precio: '$2.35 C/U',
    imagen: '/aceite-mazola.webp',
  },
  {
    id: 9,
    nombre: 'Aceite Orisol 700ml',
    categoria: 'Aceites',
    precio: '$2.20 C/U',
    imagen: '/Aceite-Orisol700ml.webp',
  }
]

const SERVICES = [
  { icon: '🛒', title: 'Tienda de Consumo', desc: 'Alimentos, bebidas, limpieza e higiene. Todo lo que tu hogar necesita a los mejores precios.', tag: 'Abierto todos los días' },
  { icon: '💸', title: 'Remesas Promerica', desc: 'Agente autorizado Banco Promerica. Recibí el dinero de tus familiares de forma rápida y segura.', tag: 'Solo tu DUI y Clave' },
  { icon: '💸', title: 'Remesas Agrícola', desc: 'Agente autorizado Banco Agrícola. Recibí tus remesas nacionales e internacionales al instante.', tag: 'Solo tu DUI y Clave' },
  { icon: '📱', title: 'Pagos Tigo Money', desc: 'Agente autorizado Tigo Money. Paga tus servicios fácil, rápido y seguro.', tag: 'Solo tu DUI y Clave' },
  { icon: '👗', title: 'Venta de Ropa', desc: 'Moda accesible para damas, caballeros y niños. Calidad y estilo para toda la familia.', tag: 'Toda la familia' },
  { icon: '🔌', title: 'Celulares & Tech', desc: 'Celulares, bocinas bluetooth, auriculares y accesorios. Tecnología al alcance de todos.', tag: 'Tech accesible' },
]

const CONSUMO = [
  { cat: 'Producto Básico', emoji: '🌾', color: '#fbbf24', items: ['Arroz Precocido', 'Arroz 5 Estrellas', 'Azúcar Normal', 'Azúcar Morena', 'Frijoles', 'Sal'] },
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

function Reveal({ children, delay = 0, y = 24, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
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
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
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

  const categoriasCatalogo = ['Todos', 'Bebidas', 'Básicos', 'Aceites']

  const productosFiltrados = CATALOGO_PRODUCTOS.filter(p => {
    const cumpleCat = filtroCategoria === 'Todos' || p.categoria.toLowerCase() === filtroCategoria.toLowerCase()
    const cumpleBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return cumpleCat && cumpleBusqueda
  })

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#050549', color: '#f8fafc', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050549; }
        ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }

        .title-font { font-family: 'Outfit', sans-serif; letter-spacing: -0.025em; }

        .pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: #fbbf24; font-size: 0.76rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; backdrop-filter: blur(10px); }

        .nav-a { color: rgba(255,255,255,0.8); font-size: 0.88rem; font-weight: 500; text-decoration: none; transition: color 0.2s; position: relative; }
        .nav-a::after { content:''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #fbbf24; transition: width 0.25s; border-radius: 2px; }
        .nav-a:hover { color: #fbbf24; }
        .nav-a:hover::after { width: 100%; }

        .btn-gold { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.95rem; border: none; border-radius: 100px; padding: 13px 28px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(245,158,11,0.5); }

        .btn-ghost { background: rgba(255,255,255,0.07); color: #fff; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.95rem; border: 1px solid rgba(255,255,255,0.22); border-radius: 100px; padding: 13px 28px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .btn-ghost:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.35); transform: translateY(-2px); }

        .btn-nav-catalog { background: #fbbf24; color: #0a0a52; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.82rem; border-radius: 100px; padding: 8px 18px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.25s ease; box-shadow: 0 2px 10px rgba(251,191,36,0.3); }
        .btn-nav-catalog:hover { background: #f59e0b; transform: scale(1.03); }

        .btn-wa { background: #25d366; color: #fff; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.88rem; border: none; border-radius: 100px; padding: 10px 22px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 4px 18px rgba(37,211,102,0.3); }
        .btn-wa:hover { background: #22c55e; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(37,211,102,0.5); }

        .product-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s ease; backdrop-filter: blur(8px); }
        .product-card:hover { transform: translateY(-6px); background: rgba(255,255,255,0.08); border-color: rgba(251,191,36,0.5); box-shadow: 0 12px 28px rgba(0,0,0,0.35); }

        .filter-btn { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.8); font-size: 0.82rem; font-weight: 600; padding: 8px 18px; border-radius: 100px; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active, .filter-btn:hover { background: #fbbf24; color: #0a0a52; border-color: #fbbf24; font-weight: 700; }

        .search-input { width: 100%; max-width: 380px; padding: 12px 20px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); color: #fff; outline: none; font-size: 0.9rem; transition: border-color 0.2s; }
        .search-input:focus { border-color: #fbbf24; background: rgba(255,255,255,0.09); }

        .svc-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 22px; padding: 34px 28px; transition: transform 0.25s, background 0.25s; position: relative; overflow: hidden; }
        .svc-card:hover { transform: translateY(-6px); background: rgba(255,255,255,0.09); }

        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1140px; margin: 0 auto; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 1140px; margin: 0 auto; }
        .grid-products { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; max-width: 1140px; margin: 0 auto; }

        .section { padding: 96px 5%; position: relative; }
        .sh { font-family: 'Outfit', sans-serif; font-size: clamp(2.1rem, 4.5vw, 3.2rem); font-weight: 800; line-height: 1.15; }

        .mini-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 18px; padding: 26px 18px; text-align: center; transition: all 0.25s; }
        .mini-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.1); }

        .contact-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 18px; padding: 26px 18px; text-align: center; text-decoration: none; color: #fff; transition: all 0.25s; display: block; }
        .contact-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.1); }

        .wa-float { position: fixed; bottom: 28px; right: 28px; z-index: 200; width: 60px; height: 60px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 8px 28px rgba(37,211,102,0.45); text-decoration: none; transition: transform 0.2s; }
        .wa-float:hover { transform: scale(1.1); }

        .orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(85px); }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(16px,-12px); } }
        .drift { animation: drift 14s ease-in-out infinite; }
        .drift2 { animation: drift 18s ease-in-out infinite reverse; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 32s linear infinite; }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.75);} }

        @media (max-width: 768px) {
          .dnav { display: none !important; }
          .mbtn { display: flex !important; }
          .hero-cols { flex-direction: column !important; text-align: center; }
          .hero-btns { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
          .rem-cols { flex-direction: column !important; text-align: center; }
          .rem-btns { justify-content: center !important; }
          .section { padding: 75px 5%; }
          .orb-widget { display: none !important; }
          .nav-logo img { width: 160px !important; height: 44px !important; }
          .grid-products { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important; gap: 14px !important; }
        }
        @media (min-width: 769px) {
          .mbtn { display: none !important; }
          .mnav { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5%', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(5, 5, 73, 0.95)' : 'rgba(5, 5, 73, 0.65)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <a href="#top" className="nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={LOGO} alt="Variedades Flores" style={{ height: 52, width: 'auto', objectFit: 'contain' }} />
        </a>

        <div className="dnav" style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <a href="#catalogo" className="btn-nav-catalog">
            🛍️ Catálogo y Precios
          </a>
          {nav.map(l => <a key={l.href} href={l.href} className="nav-a">{l.label}</a>)}
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp</a>
        </div>

        <button className="mbtn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '1.6rem', cursor: 'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div className="mnav" style={{ position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99, background: 'rgba(5, 5, 73, 0.98)', backdropFilter: 'blur(20px)', padding: '24px 5%', display: 'flex', flexDirection: 'column', gap: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="#catalogo" onClick={() => setMenuOpen(false)} className="btn-nav-catalog" style={{ justifyContent: 'center', padding: '12px' }}>
            🛍️ Ver Catálogo de Productos
          </a>
          {nav.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '1.05rem', textDecoration: 'none', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{l.label}</a>
          ))}
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa" style={{ justifyContent: 'center', marginTop: 6 }}>💬 WhatsApp · 7212-1235</a>
        </div>
      )}

      <section id="top" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '105px 5% 60px', background: 'linear-gradient(145deg, #030336 0%, #15159c 60%, #050549 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div className="orb drift" style={{ width: 550, height: 550, background: 'radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 70%)', top: '-5%', left: '-15%' }} />
        <div className="orb drift2" style={{ width: 450, height: 450, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', bottom: '-5%', right: '-10%' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div className="hero-cols" style={{ display: 'flex', alignItems: 'center', gap: 70, justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 24 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
                  El Carmen, La Unión · El Salvador
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="title-font" style={{ fontSize: 'clamp(2.7rem, 6.5vw, 5.2rem)', fontWeight: 900, lineHeight: 1.02, marginBottom: 22 }}>
                  VARIEDADES <span style={{ color: '#fbbf24' }}>FLORES</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 450, marginBottom: 32 }}>
                  <strong style={{ color: '#fff' }}>¡Tu punto de confianza!</strong> Tienda de consumo, remesas bancarias, ropa y tecnología con la mejor atención.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
                  <a href="#catalogo" className="btn-gold">🛍️ Ver catálogo con fotos</a>
                  <a href="tel:+50372121235" className="btn-ghost">📞 7212-1235</a>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="hero-stats" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[['5+','Servicios'],['100%','Confianza'],['7:00 AM','Apertura'],['7:00 PM','Cierre']].map(([n,l],i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '12px 18px', textAlign: 'center', minWidth: 92 }}>
                      <div className="title-font" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fbbf24' }}>{n}</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} y={0} style={{ flexShrink: 0 }}>
              <div className="orb-widget" style={{ width: 370, height: 370, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spin-slow" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px dashed rgba(251,191,36,0.25)' }} />
                <div style={{ position: 'absolute', inset: '13%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
                {SERVICES.map((s, i) => {
                  const angle = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2
                  const r = 150
                  const x = 50 + (r / 370 * 100) * Math.cos(angle)
                  const y = 50 + (r / 370 * 100) * Math.sin(angle)
                  return (
                    <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: 50, height: 50, borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', backdropFilter: 'blur(6px)' }}>
                      {s.icon}
                    </div>
                  )
                })}
                <div style={{ width: 175, height: 175, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', border: '1.5px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 0 50px rgba(251,191,36,0.12)' }}>
                  <img src={LOGO} alt="Logo" style={{ width: 145, height: 145, objectFit: 'contain' }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <svg style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%' }} viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#02022b" />
        </svg>
      </section>

      <section id="catalogo" className="section" style={{ background: '#02022b' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="pill" style={{ marginBottom: 14 }}>🛍️ Galería de Productos</div>
            <h2 className="sh" style={{ marginBottom: 10 }}>Catálogo con Precios</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: 520, margin: '0 auto 24px' }}>
              Precios transparentes y actualizados. Pulsa en pedir por WhatsApp para apartar tu producto de inmediato.
            </p>

            <div style={{ marginBottom: 20 }}>
              <input
                type="text"
                placeholder="🔍 Buscar producto por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="search-input"
              />
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {categoriasCatalogo.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`filter-btn ${filtroCategoria === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {productosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.5)' }}>
              No se encontraron productos con ese criterio.
            </div>
          ) : (
            <div className="grid-products">
              {productosFiltrados.map((prod) => (
                <div key={prod.id} className="product-card">
                  <div style={{
                    width: '100%',
                    height: 250,
                    minHeight: 220,
                    borderRadius: 16,
                    overflow: 'hidden',
                    marginBottom: 14,
                    background: '#ffffff',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                  }}>
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      loading="lazy"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: 14
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'rgba(5,5,73,0.88)',
                      backdropFilter: 'blur(6px)',
                      padding: '4px 10px',
                      borderRadius: 8,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#fbbf24',
                      textTransform: 'uppercase'
                    }}>
                      {prod.categoria}
                    </span>
                  </div>

                  <div>
                    <h3 className="title-font" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8, color: '#fff', minHeight: 46 }}>
                      {prod.nombre}
                    </h3>
                    <div className="title-font" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fbbf24', marginBottom: 16 }}>
                      {prod.precio}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/50372121235?text=Hola,%20quisiera%20pedir:%20${encodeURIComponent(prod.nombre)}%20(${prod.precio})`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#25d366',
                      color: '#fff',
                      padding: '11px 14px',
                      borderRadius: 12,
                      textDecoration: 'none',
                      textAlign: 'center',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: '0 4px 14px rgba(37,211,102,0.25)'
                    }}
                  >
                    Pedir por WhatsApp 💬
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="servicios" className="section" style={{ background: '#030336' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 54 }}>
              <div className="pill" style={{ marginBottom: 12 }}>¿Qué ofrecemos?</div>
              <h2 className="sh" style={{ marginBottom: 12 }}>Nuestros Servicios</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>Todo en un solo lugar para vos y tu familia en El Carmen, La Unión.</p>
            </div>
          </Reveal>
          <div className="grid-2">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="svc-card">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: 20 }}>{s.icon}</div>
                  <h3 className="title-font" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 18 }}>{s.desc}</p>
                  <span style={{ display: 'inline-block', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100 }}>{s.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="productos" className="section" style={{ background: '#050549' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div className="pill" style={{ marginBottom: 12 }}>Inventario Disponible</div>
              <h2 className="sh" style={{ marginBottom: 12 }}>Tienda de Consumo</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Productos de calidad para el hogar listos para llevar.</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
              {CONSUMO.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`filter-btn ${activeTab === i ? 'active' : ''}`}
                >
                  {cat.emoji} {cat.cat}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '32px 28px', maxWidth: 650, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{CONSUMO[activeTab].emoji}</div>
                <h3 className="title-font" style={{ fontSize: '1.3rem', fontWeight: 800, color: CONSUMO[activeTab].color }}>{CONSUMO[activeTab].cat}</h3>
              </div>
              {CONSUMO[activeTab].items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i === CONSUMO[activeTab].items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: CONSUMO[activeTab].color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontWeight: 500, fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', padding: '2px 9px', borderRadius: 100, fontWeight: 600 }}>Disponible</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="remesas" className="section" style={{ background: '#030336' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="rem-cols" style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
            <Reveal delay={0.05} y={0} style={{ flexShrink: 0 }}>
              <div style={{ width: 140, height: 140, borderRadius: 28, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.8rem' }}>🏦</div>
            </Reveal>
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 16 }}>✅ Promerica · Agrícola · Tigo Money</div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="sh" style={{ marginBottom: 14 }}>Recibí tus remesas y pagá servicios</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.98rem', lineHeight: 1.7, maxWidth: 540, marginBottom: 24 }}>
                  Retira tus envíos desde el extranjero de forma ágil y paga recibos de agua, luz o telefonía en un solo punto seguro. <strong style={{ color: '#fff' }}>Solo presenta tu DUI y Clave.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="rem-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <a href="tel:+50372121235" className="btn-gold">📞 7212-1235</a>
                  <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 Consultar por WhatsApp</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="ropa" className="section" style={{ background: '#050549' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="pill" style={{ marginBottom: 12 }}>Moda & Gadgets</div>
              <h2 className="sh" style={{ marginBottom: 12 }}>Ropa y Accesorios Tech</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>Calidad garantizada para vestir bien y equiparte con tecnología.</p>
            </div>
          </Reveal>
          <div className="grid-4">
            {CLOTHES.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="mini-card">
                  <div style={{ fontSize: '2.4rem', marginBottom: 10 }}>{c.icon}</div>
                  <h4 className="title-font" style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: 4 }}>{c.label}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="section" style={{ background: '#030336' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="pill" style={{ marginBottom: 12 }}>Ubicación y Horarios</div>
              <h2 className="sh" style={{ marginBottom: 12 }}>Visítanos o Contáctanos</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>Estamos ubicados en El Carmen, La Unión.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto 36px' }}>
            {[
              { icon: '📞', label: 'Teléfono', value: '7212-1235', href: 'tel:+50372121235' },
              { icon: '💬', label: 'WhatsApp', value: '7212-1235', href: 'https://wa.me/50372121235' },
              { icon: '📍', label: 'Ubicación', value: 'El Carmen, La Unión', href: 'https://maps.app.goo.gl/JP1bfBdKs82YSyXJ6' },
              { icon: '🕐', label: 'Horario', value: 'Lun–Dom · 7am–7pm', href: '#' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-card">
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>{c.icon}</div>
                  <h4 className="title-font" style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 4, color: '#fbbf24' }}>{c.label}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{c.value}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.16}>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}>
              <iframe
                title="Ubicación Variedades Flores"
                src="https://maps.google.com/maps?q=13.3552751,-87.9996124&z=17&output=embed"
                width="100%" height="340" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <footer style={{ background: '#020224', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 5%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <img src={LOGO} alt="Variedades Flores" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: 4 }}>📍 El Carmen, La Unión · 📞 7212-1235</p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginBottom: 18 }}>Tienda de consumo · Remesas · Ropa · Tecnología</p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>© 2026 Variedades Flores · El Salvador 🇸🇻</p>
      </footer>

      <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="wa-float">💬</a>
    </div>
  )
}