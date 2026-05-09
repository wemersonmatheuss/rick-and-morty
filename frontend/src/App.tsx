import { Outlet, Link, useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Portal decoration top */}
      <div style={{
        position: 'fixed', top: -120, right: -120, width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.12) 0%, rgba(0,229,255,0.06) 40%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(6, 11, 16, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', gap: '2rem',
        height: 64,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginRight: 'auto' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #39ff14, #00e5ff, #39ff14)',
            animation: 'portalSpin 4s linear infinite',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900, fontSize: '1rem',
            color: '#39ff14',
            letterSpacing: '0.05em',
            textShadow: '0 0 20px rgba(57,255,20,0.5)',
          }}>
            R&M CREATOR
          </span>
        </div>

        {[
          { to: '/', label: '⬡ Personagens' },
          { to: '/create', label: '+ Criar' },
        ].map(({ to, label }) => (
          <Link key={to} to={to} style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.1em',
            color: location.pathname === to ? '#39ff14' : 'rgba(200, 240, 208, 0.5)',
            textDecoration: 'none',
            padding: '0.4rem 1rem',
            borderRadius: 6,
            border: location.pathname === to ? '1px solid rgba(57,255,20,0.4)' : '1px solid transparent',
            background: location.pathname === to ? 'rgba(57,255,20,0.08)' : 'transparent',
            transition: 'all 0.2s',
          }}>
            {label}
          </Link>
        ))}
      </nav>

      <main style={{ flex: 1, padding: '2.5rem 2rem', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>

      <footer style={{
        textAlign: 'center', padding: '1rem',
        color: 'rgba(90,138,106,0.5)',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '0.65rem', letterSpacing: '0.15em',
      }}>
        WUBBA LUBBA DUB DUB • RICK & MORTY CREATOR
      </footer>
    </div>
  )
}