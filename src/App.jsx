import { useState, useEffect, useRef, useMemo, memo } from 'react'

const LOGO = '/logo.png'

const CATALOGO_PRODUCTOS = [
  { id: 1, nombre: 'Gaseosa Coca-Cola Lata', categoria: 'Bebidas', precio: '$1.00 C/U', imagen: '/Coca-Lata.jpg' },
  { id: 2, nombre: 'Gaseosa Coca-Cola Lata Fardo 24 Unidades', categoria: 'Bebidas', precio: '$16.50 C/U', imagen: '/Coca-Lata-Fardo-24.webp' },
  { id: 3, nombre: 'Arroz San Pedro 1 lb', categoria: 'Básicos', precio: '$0.80 C/U', imagen: '/Arroz-SanPedro-Precocido.jpg' },
  { id: 4, nombre: 'Arroz San Francisco 1 lb', categoria: 'Básicos', precio: '$0.80 C/U', imagen: '/Arroz-SanFrancsico.jpg' },
  { id: 5, nombre: 'Arroz 5 Estrellas 1 lb', categoria: 'Básicos', precio: '$0.75 C/U', imagen: '/Arroz-5Estrella.webp' },
  { id: 6, nombre: 'Arroz San Pedro Blanco 1 lb', categoria: 'Básicos', precio: '$0.75 C/U', imagen: '/Arroz-SanPedro-Blanco.jpg' },
  { id: 7, nombre: 'Aceite Capullo 750ml', categoria: 'Aceites', precio: '$2.25 C/U', imagen: '/Aceite-Capullo750ml.webp' },
  { id: 8, nombre: 'Aceite Mazola 700ml', categoria: 'Aceites', precio: '$2.35 C/U', imagen: '/aceite-mazola.webp' },
  { id: 9, nombre: 'Aceite Orisol 700ml', categoria: 'Aceites', precio: '$2.20 C/U', imagen: '/Aceite-Orisol700ml.webp' },
  { id: 10, nombre: 'Aceite Dorado 700ml', categoria: 'Aceites', precio: '$2.00 C/U', imagen: '/Aceite-Dorado700ml.webp' },
  { id: 11, nombre: 'Cafe Riko 50 Sobres', categoria: 'Cafe', precio: '$4.50 C/U', imagen: '/Cafe-Riko 50sobres.jpg' },
  { id: 12, nombre: 'CosCafe 55 Sobres', categoria: 'Cafe', precio: '$4.75 C/U', imagen: '/Coscafe-55Sobres.webp' },
  { id: 13, nombre: 'CosCafe 40 Sobres', categoria: 'Cafe', precio: '$3.50 C/U', imagen: '/Coscafe-40sobres.jpg' },
  { id: 14, nombre: 'Cafe Listo 60 Sobres', categoria: 'Cafe', precio: '$5.25 C/U', imagen: '/Cafelisto-60sobres.png' },
  { id: 15, nombre: 'Cafe Listo 40 Sobres', categoria: 'Cafe', precio: '$3.50 C/U', imagen: '/Cafelisto-40sobres.png' },
  { id: 16, nombre: 'Cafe Musun 60 Sobres', categoria: 'Cafe', precio: '$4.50 C/U', imagen: '/Cafemusun-60sobres.jpg' },
  { id: 17, nombre: 'Cafe Barrio', categoria: 'Cafe', precio: '$5.50 C/U', imagen: '/Cafebarrio.jpg' }
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

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#productos', label: 'Productos' },
  { href: '#remesas', label: 'Remesas' },
  { href: '#ropa', label: 'Ropa' },
  { href: '#contacto', label: 'Contacto' },
]

const CATEGORIAS_CATALOGO = ['Todos', 'Bebidas', 'Básicos', 'Aceites', 'Cafe']

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, { rootMargin: '50px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ children, delay = 0, y = 16, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.4s ease-out ${delay}s, transform 0.4s ease-out ${delay}s`,
        willChange: inView ? 'auto' : 'opacity, transform',
        ...style
      }}
    >
      {children}
    </div>
  )
}

const ProductCard = memo(function ProductCard({ prod }) {
  const waUrl = useMemo(() => {
    return `https://wa.me/50372121235?text=Hola,%20quisiera%20apartar%20para%20pasar%20a%20recoger%20en%20tienda:%20${encodeURIComponent(prod.nombre)}%20(${prod.precio})`
  }, [prod.nombre, prod.precio])

  return (
    <div className="product-card">
      <div className="product-img-box">
        <img
          src={prod.imagen}
          alt={prod.nombre}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = LOGO
          }}
          className="product-img"
        />
        <span className="product-cat-pill">
          {prod.categoria}
        </span>
      </div>

      <div>
        <h3 className="title-font product-title">
          {prod.nombre}
        </h3>
        <div className="title-font product-price">
          {prod.precio}
        </div>
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="btn-product-wa"
      >
        Apartar y recoger en tienda 🏪
      </a>
    </div>
  )
})

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    let ticking = false
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const productosFiltrados = useMemo(() => {
    const normalizar = (txt) => txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const busquedaNorm = normalizar(busqueda)
    const filtroNorm = normalizar(filtroCategoria)
    
    return CATALOGO_PRODUCTOS.filter(p => {
      const cumpleCat = filtroCategoria === 'Todos' || normalizar(p.categoria) === filtroNorm
      const cumpleBusqueda = !busquedaNorm || normalizar(p.nombre).includes(busquedaNorm)
      return cumpleCat && cumpleBusqueda
    })
  }, [filtroCategoria, busqueda])

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050549; color: #ffffff; font-family: 'Inter', system-ui, -apple-system, sans-serif; overflow-x: hidden; }
        
        .app-container { min-height: 100vh; background: #050549; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050549; }
        ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }

        .title-font { font-family: 'Outfit', sans-serif; letter-spacing: -0.02em; }

        .pill { display: inline-flex; align-items: center; gap: 8px; background: #090961; border: 1.5px solid #23238a; color: #fbbf24; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; padding: 7px 16px; border-radius: 100px; }

        .nav-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 5%; height: 70px; display: flex; align-items: center; justify-content: space-between; background: #050549; border-bottom: 1.5px solid #141469; transition: background 0.2s ease; }
        .nav-scrolled { background: #030338; }

        .nav-a { color: #ffffff; font-size: 0.92rem; font-weight: 600; text-decoration: none; position: relative; padding: 4px 0; }
        .nav-a::after { content:''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #fbbf24; transition: width 0.2s; border-radius: 2px; }
        .nav-a:hover { color: #fbbf24; }
        .nav-a:hover::after { width: 100%; }

        .btn-gold { background: #fbbf24; color: #050549; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 0.95rem; border: none; border-radius: 100px; padding: 13px 26px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform 0.15s, background 0.15s; }
        .btn-gold:hover { background: #f59e0b; transform: translateY(-2px); }

        .btn-ghost { background: #090961; color: #ffffff; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.95rem; border: 1.5px solid #262696; border-radius: 100px; padding: 13px 26px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform 0.15s, background 0.15s; }
        .btn-ghost:hover { background: #10107a; border-color: #3b3bc2; transform: translateY(-2px); }

        .btn-nav-catalog { background: #fbbf24; color: #050549; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 0.84rem; border-radius: 100px; padding: 8px 16px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
        .btn-nav-catalog:hover { background: #f59e0b; }

        .btn-wa { background: #25d366; color: #ffffff; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 0.88rem; border: none; border-radius: 100px; padding: 9px 18px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
        .btn-wa:hover { background: #22c55e; }

        .product-card { background: #09095c; border: 1.5px solid #1c1c7a; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; }
        .product-card:hover { border-color: #fbbf24; }

        .product-img-box { width: 100%; height: 230px; border-radius: 12px; overflow: hidden; margin-bottom: 12px; background: #ffffff; position: relative; display: flex; align-items: center; justify-content: center; padding: 10px; }
        .product-img { max-width: 100%; maxHeight: 100%; width: 100%; height: 100%; object-fit: contain; }
        .product-cat-pill { position: absolute; top: 10px; left: 10px; background: #050549; padding: 4px 10px; border-radius: 6px; font-size: 0.72rem; font-weight: 800; color: #fbbf24; text-transform: uppercase; }
        .product-title { font-size: 1.02rem; font-weight: 800; margin-bottom: 6px; color: #ffffff; min-height: 44px; line-height: 1.25; }
        .product-price { font-size: 1.4rem; font-weight: 900; color: #fbbf24; margin-bottom: 12px; }

        .btn-product-wa { background: #25d366; color: #ffffff; padding: 11px 12px; border-radius: 10px; text-decoration: none; text-align: center; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 0.86rem; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-product-wa:hover { background: #22c55e; }

        .filter-btn { background: #09095c; border: 1.5px solid #1f1f85; color: #ffffff; font-size: 0.84rem; font-weight: 700; padding: 8px 18px; border-radius: 100px; cursor: pointer; }
        .filter-btn.active, .filter-btn:hover { background: #fbbf24; color: #050549; border-color: #fbbf24; font-weight: 800; }

        .search-input { width: 100%; max-width: 440px; padding: 12px 20px; border-radius: 100px; border: 1.5px solid #28289c; background: #09095c; color: #ffffff; outline: none; font-size: 0.95rem; font-weight: 500; }
        .search-input::placeholder { color: #94a3b8; }
        .search-input:focus { border-color: #fbbf24; background: #0c0c6b; }

        .svc-card { background: #09095c; border: 1.5px solid #1c1c7a; border-radius: 18px; padding: 26px 22px; }
        .mini-card { background: #09095c; border: 1.5px solid #1c1c7a; border-radius: 16px; padding: 22px 16px; text-align: center; }
        .contact-card { background: #09095c; border: 1.5px solid #1c1c7a; border-radius: 16px; padding: 22px 16px; text-align: center; text-decoration: none; color: #ffffff; display: block; }
        .contact-card:hover { border-color: #fbbf24; }

        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; max-width: 1140px; margin: 0 auto; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 1140px; margin: 0 auto; }
        .grid-products { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 18px; max-width: 1140px; margin: 0 auto; }

        .section { padding: 80px 5%; position: relative; }
        .sh { font-family: 'Outfit', sans-serif; font-size: clamp(2.1rem, 4.5vw, 3.2rem); font-weight: 900; line-height: 1.15; color: #ffffff; }

        .wa-float { position: fixed; bottom: 22px; right: 22px; z-index: 200; width: 56px; height: 56px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 6px 20px rgba(0,0,0,0.4); text-decoration: none; }

        .warning-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(220, 38, 38, 0.25); border: 1.5px solid #ef4444; color: #ffffff; padding: 7px 16px; border-radius: 100px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }

        @media (max-width: 860px) {
          .dnav { display: none !important; }
          .mbtn { display: flex !important; }
          .hero-cols { flex-direction: column !important; text-align: center; gap: 36px !important; }
          .hero-btns { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
          .rem-cols { flex-direction: column !important; text-align: center; }
          .rem-btns { justify-content: center !important; }
          .section { padding: 60px 5%; }
          .grid-products { grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)) !important; gap: 12px !important; }
          .product-img-box { height: 170px !important; }
        }
        @media (min-width: 861px) {
          .mbtn { display: none !important; }
          .mnav { display: none !important; }
        }
      `}</style>

      <nav className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={LOGO} alt="Variedades Flores" width="130" height="46" style={{ height: 46, width: 'auto', objectFit: 'contain' }} />
        </a>

        <div className="dnav" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="#catalogo" className="btn-nav-catalog">
            🛍️ Ver Catálogo
          </a>
          {NAV_LINKS.map(l => <a key={l.href} href={l.href} className="nav-a">{l.label}</a>)}
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp</a>
        </div>

        <button
          className="mbtn"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.7rem', cursor: 'pointer' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div className="mnav" style={{ position: 'fixed', top: 70, left: 0, right: 0, zIndex: 99, background: '#050549', padding: '20px 5%', display: 'flex', flexDirection: 'column', gap: 14, borderBottom: '2px solid #141469' }}>
          <a href="#catalogo" onClick={() => setMenuOpen(false)} className="btn-nav-catalog" style={{ justifyContent: 'center', padding: '12px' }}>
            🛍️ Ver Catálogo de Productos
          </a>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', paddingBottom: 8, borderBottom: '1px solid #111166' }}>{l.label}</a>
          ))}
          <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa" style={{ justifyContent: 'center', marginTop: 4 }}>💬 WhatsApp · 7212-1235</a>
        </div>
      )}

      <section id="top" style={{ minHeight: '92dvh', display: 'flex', alignItems: 'center', padding: '115px 5% 55px', background: '#050549' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%' }}>
          <div className="hero-cols" style={{ display: 'flex', alignItems: 'center', gap: 50, justifyContent: 'space-between' }}>
            
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 20 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  El Carmen, La Unión · El Salvador
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="title-font" style={{ fontSize: 'clamp(2.5rem, 5.8vw, 4.8rem)', fontWeight: 900, lineHeight: 1.04, marginBottom: 18, color: '#ffffff' }}>
                  VARIEDADES <span style={{ color: '#fbbf24' }}>FLORES</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p style={{ color: '#e2e8f0', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 460, marginBottom: 28, fontWeight: 500 }}>
                  <strong style={{ color: '#ffffff' }}>¡Tu punto de confianza!</strong> Tienda de consumo básico, remesas bancarias, ropa y accesorios tech en El Carmen.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 34 }}>
                  <a href="#catalogo" className="btn-gold">🛍️ Ver catálogo con fotos</a>
                  <a href="tel:+50372121235" className="btn-ghost">📞 7212-1235</a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="hero-stats" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[
                    ['5+', 'Servicios'],
                    ['100%', 'Confianza'],
                    ['7:00 AM', 'Apertura'],
                    ['7:00 PM', 'Cierre']
                  ].map(([n, l], i) => (
                    <div key={i} style={{ background: '#09095c', border: '1.5px solid #1c1c7a', borderRadius: 12, padding: '10px 16px', textAlign: 'center', minWidth: 92 }}>
                      <div className="title-font" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fbbf24' }}>{n}</div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div style={{ flexShrink: 0 }}>
              <Reveal delay={0.1} y={0}>
                <div style={{ width: 320, height: 320, borderRadius: 28, background: '#080854', border: '2px solid #1e1e82', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 24, boxShadow: '0 16px 36px rgba(0,0,0,0.35)' }}>
                  <img src={LOGO} alt="Variedades Flores" width="120" height="120" style={{ width: 120, height: 120, objectFit: 'contain' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div className="title-font" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>Atención Presencial</div>
                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Lunes a Domingo · 7am a 7pm</div>
                  </div>
                  <div style={{ background: 'rgba(220, 38, 38, 0.2)', border: '1.5px solid #ef4444', color: '#ffffff', borderRadius: 10, padding: '8px 12px', fontSize: '0.76rem', fontWeight: 700, textAlign: 'center' }}>
                    🏪 Retiro directo en tienda física
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      <section id="catalogo" className="section" style={{ background: '#030338', borderTop: '2px solid #141469' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="pill" style={{ marginBottom: 12 }}>🛍️ Sala de Ventas</div>
            <h2 className="sh" style={{ marginBottom: 10 }}>Catálogo con Precios</h2>
            <p style={{ color: '#e2e8f0', fontSize: '0.98rem', maxWidth: 540, margin: '0 auto 16px', fontWeight: 500 }}>
              Precios transparentes y actualizados. <strong style={{ color: '#fbbf24' }}>Solo retiro en tienda</strong> (no contamos con servicio a domicilio). Escríbenos para apartar tu producto y pasar a recogerlo.
            </p>

            <div>
              <span className="warning-badge">
                ⚠️ Compras y entregas únicamente en tienda física (sin envíos a domicilio)
              </span>
            </div>

            <div style={{ marginBottom: 18 }}>
              <input
                type="text"
                placeholder="🔍 Buscar producto por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="search-input"
              />
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {CATEGORIAS_CATALOGO.map((cat) => (
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
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#cbd5e1', fontSize: '1rem', fontWeight: 600 }}>
              No se encontraron productos con ese criterio.
            </div>
          ) : (
            <div className="grid-products">
              {productosFiltrados.map((prod) => (
                <ProductCard key={prod.id} prod={prod} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="servicios" className="section" style={{ background: '#050549' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div className="pill" style={{ marginBottom: 12 }}>¿Qué ofrecemos?</div>
              <h2 className="sh" style={{ marginBottom: 10 }}>Nuestros Servicios</h2>
              <p style={{ color: '#e2e8f0', maxWidth: 460, margin: '0 auto', lineHeight: 1.6, fontSize: '0.98rem', fontWeight: 500 }}>
                Todo en un solo lugar para vos y tu familia en El Carmen, La Unión.
              </p>
            </div>
          </Reveal>
          <div className="grid-2">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="svc-card">
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: '#0d0d66', border: '1.5px solid #23238a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem', marginBottom: 16 }}>{s.icon}</div>
                  <h3 className="title-font" style={{ fontSize: '1.22rem', fontWeight: 800, marginBottom: 6, color: '#ffffff' }}>{s.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: 14, fontWeight: 500 }}>{s.desc}</p>
                  <span style={{ display: 'inline-block', background: 'rgba(251,191,36,0.15)', border: '1.5px solid #fbbf24', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>{s.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="productos" className="section" style={{ background: '#030338', borderTop: '2px solid #141469' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="pill" style={{ marginBottom: 12 }}>Inventario Disponible</div>
              <h2 className="sh" style={{ marginBottom: 10 }}>Tienda de Consumo</h2>
              <p style={{ color: '#e2e8f0', maxWidth: 480, margin: '0 auto', lineHeight: 1.6, fontSize: '0.98rem', fontWeight: 500 }}>
                Productos de calidad para el hogar listos en sala de venta.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 26 }}>
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
          <Reveal delay={0.1}>
            <div style={{ background: '#09095c', border: '1.5px solid #1c1c7a', borderRadius: 16, padding: '24px 20px', maxWidth: 650, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #1c1c7a' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#0d0d66', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{CONSUMO[activeTab].emoji}</div>
                <h3 className="title-font" style={{ fontSize: '1.25rem', fontWeight: 800, color: CONSUMO[activeTab].color }}>{CONSUMO[activeTab].cat}</h3>
              </div>
              {CONSUMO[activeTab].items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i === CONSUMO[activeTab].items.length - 1 ? 'none' : '1px solid #131366' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: CONSUMO[activeTab].color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '0.92rem', color: '#ffffff' }}>{item}</span>
                  <span style={{ fontSize: '0.72rem', background: '#0d0d66', color: '#cbd5e1', padding: '3px 9px', borderRadius: 6, fontWeight: 700 }}>En tienda</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="remesas" className="section" style={{ background: '#050549' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="rem-cols" style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <Reveal delay={0.05} y={0} style={{ flexShrink: 0 }}>
              <div style={{ width: 125, height: 125, borderRadius: 20, background: '#09095c', border: '1.5px solid #1c1c7a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.4rem' }}>🏦</div>
            </Reveal>
            <div style={{ flex: 1 }}>
              <Reveal>
                <div className="pill" style={{ marginBottom: 14 }}>✅ Promerica · Agrícola · Tigo Money</div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="sh" style={{ marginBottom: 12 }}>Recibí tus remesas y pagá servicios</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.6, maxWidth: 540, marginBottom: 22, fontWeight: 500 }}>
                  Retira tus envíos desde el extranjero de forma ágil y paga recibos de agua, luz o telefonía en un solo punto seguro. <strong style={{ color: '#fbbf24' }}>Solo presenta tu DUI y Clave.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="rem-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="tel:+50372121235" className="btn-gold">📞 7212-1235</a>
                  <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="btn-wa">💬 Consultar por WhatsApp</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="ropa" className="section" style={{ background: '#030338', borderTop: '2px solid #141469' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="pill" style={{ marginBottom: 12 }}>Moda & Gadgets</div>
              <h2 className="sh" style={{ marginBottom: 10 }}>Ropa y Accesorios Tech</h2>
              <p style={{ color: '#e2e8f0', maxWidth: 440, margin: '0 auto', lineHeight: 1.6, fontSize: '0.98rem', fontWeight: 500 }}>
                Calidad garantizada para vestir bien y equiparte con tecnología.
              </p>
            </div>
          </Reveal>
          <div className="grid-4">
            {CLOTHES.map((c, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="mini-card">
                  <div style={{ fontSize: '2.2rem', marginBottom: 6 }}>{c.icon}</div>
                  <h4 className="title-font" style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 4, color: '#ffffff' }}>{c.label}</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.84rem', fontWeight: 500 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="section" style={{ background: '#050549' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="pill" style={{ marginBottom: 12 }}>Ubicación y Horarios</div>
              <h2 className="sh" style={{ marginBottom: 10 }}>Visítanos o Contáctanos</h2>
              <p style={{ color: '#e2e8f0', maxWidth: 420, margin: '0 auto', lineHeight: 1.6, fontSize: '0.98rem', fontWeight: 500 }}>
                Estamos ubicados en El Carmen, La Unión.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto 34px' }}>
            {[
              { icon: '📞', label: 'Teléfono', value: '7212-1235', href: 'tel:+50372121235' },
              { icon: '💬', label: 'WhatsApp', value: '7212-1235', href: 'https://wa.me/50372121235' },
              { icon: '📍', label: 'Ubicación', value: 'El Carmen, La Unión', href: 'https://maps.app.goo.gl/JP1bfBdKs82YSyXJ6' },
              { icon: '🕐', label: 'Horario', value: 'Lun–Dom · 7am–7pm', href: '#' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-card">
                  <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{c.icon}</div>
                  <h4 className="title-font" style={{ fontWeight: 800, fontSize: '0.94rem', marginBottom: 4, color: '#fbbf24' }}>{c.label}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>{c.value}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid #1c1c7a' }}>
              <iframe
                title="Ubicación Variedades Flores"
                src="https://maps.google.com/maps?q=13.3552751,-87.9996124&z=17&output=embed"
                width="100%" height="320" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <footer style={{ background: '#02022b', borderTop: '2px solid #141469', padding: '34px 5%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <img src={LOGO} alt="Variedades Flores" width="120" height="44" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: 4, fontWeight: 600 }}>📍 El Carmen, La Unión · 📞 7212-1235</p>
        <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: 14, fontWeight: 500 }}>Tienda de consumo · Remesas · Ropa · Tecnología</p>
        <p style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>© 2026 Variedades Flores · El Salvador 🇸🇻</p>
      </footer>

      <a href="https://wa.me/50372121235" target="_blank" rel="noreferrer" className="wa-float" aria-label="Contactar por WhatsApp">💬</a>
    </div>
  )
}